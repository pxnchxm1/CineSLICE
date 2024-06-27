import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [user,setUser] = useState('');
    const [loading,setloading]=useState(true);

    function SignInWithGoogle(){
        const provider =new GoogleAuthProvider();
        return signInWithPopup(auth,provider);
    }
    
    function logout(){
        auth.signOut(auth);
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUser(currentUser);
            }else{
                setUser(null);
            }setloading(false);
        })
    },[]);
    return( <>
    <AuthContext.Provider value={{user,loading,logout,SignInWithGoogle}}>
        {children}
    </AuthContext.Provider>
    </>)
}
