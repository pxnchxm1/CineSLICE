import { CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import WatchlistCard from '../components/WatchlistCard';
import { useAuth } from '../context/useAuth';
import { useFirestore } from '../services/firestore';
import './movies.css';

function Watchlist() {
  const {getWatchlist} = useFirestore();
  const {user} = useAuth();
  const [loading, setloading] = useState(true);
  const [watchlist,setWatchlist]= useState([]);

  useEffect(()=>{
    if(user?.uid){
      getWatchlist(user?.uid).then((data)=>{
        setWatchlist(data);
        console.log(data);
      }).catch((e)=>{console.log(e)}).finally(()=>{setloading(false)});
    }
  },[user?.uid,getWatchlist])
  return (
    <Container  sx={{ml:4}}>
      <ToastContainer/>
    <Stack direction={'column'} gap={2}  >
    <h2 style={{ fontSize:18, fontWeight:"bold" }}>WATCHLIST</h2>
    {loading && (<Stack justifyContent={'center'}   direction="row" mt={20}>
    <CircularProgress style={{justifyContent:"center" ,alignItems:"center",color:"red"}}/>
    </Stack>)}

    {!loading && watchlist.length===0 &&(<Stack justifyContent={'center'}   direction="row" mt={20}>
    <Typography style={{color:"grey",fontSize:16,marginTop:'2rem'}}>Your WatchList is Empty</Typography>
    </Stack>)}

   {!loading && watchlist.length>0 && (
    <Grid
    templateColumns={{
      base: "1fr",
    }}
    gap={"4"}
  >
    {watchlist?.map((item) => (
      <WatchlistCard
        key={item?.id}
        item={item}
        type={item?.type}
        setWatchlist={setWatchlist}
      />
    ))}
  </Grid>
   )}

    </Stack>
  </Container> 
   
)
}

export default Watchlist
