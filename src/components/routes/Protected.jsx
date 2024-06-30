import { Button } from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/useAuth';

function Protected({children}) {
    const {user,SignInWithGoogle,loading} = useAuth();
    if(loading){
        return null;
    }
    return (
    <div style={{display:"flex",flexDirection:'column',justifyItems:"start",alignItems:"start",marginTop:'1.5rem'}}>
        {user ? children : 
            <div style={{alignItems:'center',justifyItems:'center',display:'flex',flexDirection:'column'}}>
                <h3 style={{color:'grey',fontSize:'25px',fontFamily:'monospace'}}>Login to gain access to watchlist</h3>
                
                <Button  variant="outlined" onClick={SignInWithGoogle} color="error" >
                    Login  
                </Button>
            </div>}
    </div>
    )
}

export default Protected
