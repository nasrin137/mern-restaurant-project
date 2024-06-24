import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Components/firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[loading,setLoading]=useState(true)
    const axiosPublic = useAxiosPublic()


      // create an account
      const createUser = (email, password) => {
    
        return createUserWithEmailAndPassword(auth, email, password)
    }
      // signup with gmail
      const signUpWithGmail = () => {
        
        return  signInWithPopup(auth, googleProvider)
      }
       // login using email & password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
            // logout 
    const logOut = () =>{
        setUser(null)
        return signOut(auth);
    }
         // update profile
    const updateUserProfile = (name, photoURL) => {
        return  updateProfile(auth.currentUser, {
              displayName: name, photoURL: photoURL
            })
      }
          // check signed-in user
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false)
                    }
                })

            }else{
                localStorage.removeItem('access-token')
                setLoading(false)

            }
           
        });
  
        return () =>{
            return unsubscribe();
        }
    }, [axiosPublic])
  

    const authInfo = {
        user,createUser,login,updateUserProfile,signUpWithGmail,loading,     logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;