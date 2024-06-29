import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
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
return {addDocument,addToWatchlist}}

const checkInWatchlist = async(userId,dataId)=>{
    const docRef = doc(db, "users", userId?.toString(),"Watchlist",dataId?.toString());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return true;
    }else{
            return false;
        }
}