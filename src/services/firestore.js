import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useCallback } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from "./firebase";
export const useFirestore = () => {
   
// Add a new document with a generated id.
const addDocument = async (collectionName,data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
}
const addToWatchlist = async(userId,dataId,data)=>{
    if(await checkInWatchlist(userId,dataId)){
        toast.error("Already in watchlist");
        return false;
    }
        try{
            await setDoc(doc(db, "users", userId,"Watchlist",dataId), data);
            toast.success("Added to Watchlist !", {});
    
            return ;
        }
        catch(e){
            console.log(e,"error");
            toast.error("Error Adding to Watchlist !", {});
        
    } 
}
const checkInWatchlist = async(userId,dataId)=>{
    const docRef = doc(db, "users", userId?.toString(),"Watchlist",dataId?.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return true;
    }else{
            return false;
        }
}
const removeFromWatchlist = async(userId,dataId)=>{
    try{
        await deleteDoc(doc(db, "users", userId?.toString(),"Watchlist",dataId?.toString()));
        toast.success("Removed from watchlist");
    }catch(e){
        console.log(e,'error while deleting !');
        toast.error("Error removing from watchlist");
    }
}

const getWatchlist = useCallback( async(userId)=>{
    const querySnapshot = await getDocs(collection(db, "users",userId,"Watchlist"));
    const data = querySnapshot.docs.map((doc)=>({
        ...doc.data()
    }));
    return data;
},[]);
return {addDocument,addToWatchlist,checkInWatchlist,removeFromWatchlist,getWatchlist}}

