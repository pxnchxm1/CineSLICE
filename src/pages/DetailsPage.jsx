
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDetails } from '../services/api';
import './detailspage.css';

function DetailsPage() {
    const router = useParams();
    const {type,id}=router;
    
    const [loading,setloading] = useState(true);
    const [details,setdetails] = useState({});

    const title = (details?.title || details?.name);
    const releaseDate = type==="tv"? details?.first_air_date : details?.release_date;

    useEffect(()=>{
        fetchDetails(type,id).then((res)=>{setdetails(res);}).catch((err)=>{console.log(err)}).finally(()=>{setloading(false);})
    },[type,id]);

  if(loading){
    return <Stack justifyContent={'center'}   direction="row" mt={20}>
      <CircularProgress style={{justifyContent:"center" ,alignItems:"center",color:"red"}}/>
    </Stack>
  }
  return (
    <></>
  )
}

export default DetailsPage
