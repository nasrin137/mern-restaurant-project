import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";



const CheckoutForm = () => {
    const [error,setError] = useState('');
const [clientSecret,setClientSecret] = useState('');
const [transactionId,setTransactionId] = useState('')
const stripe = useStripe();
const elements = useElements();
const axiosSecure = UseAxiosSecure();
const {user } = useContext(AuthContext)
const [cart,refetch] = useCart();
const navigate = useNavigate();
const calculatePrice = (item)=>{
    return item.price * item.quantity
}
const cartSubTotalPrice = cart.reduce((total,item)=>{
    return total + calculatePrice(item)

},0)
// const orderTotal = cartSubTotal
// const totalPrice = cart.reduce((total,item)=> total + item.price,0) 

    useEffect(()=>{
        if(cartSubTotalPrice > 0){
         axiosSecure.post('/create-payment-intent',{price:cartSubTotalPrice})
         .then(res =>{
             console.log(res.data.clientSecret)
             setClientSecret(res.data.clientSecret)
         })
        }
     },[axiosSecure,cartSubTotalPrice])

    //  handle submit

     const handleSubmit = async(event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement)

        if(card === null){
            return
        }
        const {error,paymentMethod} =  await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('payment error',error)
            setError(error.message)
        }
        else{
            console.log('payment method',paymentMethod)
            setError('')
        }
        // confirm payment
        const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email || 'anoynymous',
                    name:user?.displayName || 'anoynymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error')
        }
        else{
            console.log('payment intent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id',paymentIntent.id)
                setTransactionId(paymentIntent.id);

                // save the payment in the database
                const payment = {
                    email:user.email,
                    price:cartSubTotalPrice,
                    transactionId:paymentIntent.id,
                    date:new Date(),
                    cartIds:cart.map(item=>item._id),
                    menuItemIds:cart.map(item=>item.menuId),
                    status:'pending'
                }
                const res = await axiosSecure.post('/payments',payment)
                console.log('payment saved',res.data);
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for the payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/paymentHistory')
                }
            }
        }
    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
           <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-primary btn-sm my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-600">your transaction id:{transactionId}</p>
      }
      </form>
        </div>
    );
};

export default CheckoutForm;