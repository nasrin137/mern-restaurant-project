import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY)
const Payment = () => {
    return (
        <div className="section-container">
        {/* banner */}
    <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className="flex flex-col justify-center items-center gap-8">
            {/* texts */}
            <div className="px-4">
                <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Payment</h2>
            </div>
        </div>
    </div>
    <div>
        <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>

        </Elements>
    </div>









        </div>
    );
};

export default Payment;