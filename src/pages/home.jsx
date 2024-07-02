
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from "@mui/material/Stack";
import { default as React, useEffect, useState } from 'react';
import CardComponent from '../components/CardComponent.jsx';
import { fetchTrending } from "../services/api.js";
import './movies.css';

const Home = () => {
  const [data,setData]=useState([]);
  const [timeWindow,setTimeWindow] = useState("day");
  const[loading,setLoading] = useState(true);

  useEffect(()=>{
     fetchTrending(timeWindow).then((res)=>{
      setData(res)}).catch((err)=>{
      console.log(err,'err')
     })
     .finally(()=>{setLoading(false);})
  },[timeWindow])
  if(loading){
    return <Stack justifyContent={'center'}   direction="row" mt={20}>
      <CircularProgress style={{justifyContent:"center" ,alignItems:"center",color:"red"}}/>
    </Stack>
  }
  return (
    <Box component="section" sx={{p:4, mb:2}}>
    <Container container spacing={3} direction="row" justifycontent={"center"} >
    <Stack   direction="row"  alignItems="baseline" justifyContent="space-between"  >  
      <h2 className="Trending" style={{ fontSize:"larger", fontWeight:"normal",color:"grey" }}>TRENDING</h2>
      <Stack className="TimeWindow" direction="row" sx={{marginLeft:"20px"}} >
        <Box 
        sx={{color:"white"}}
        className="TodayThisWeek" 
        bgcolor={`${timeWindow=="day"?"red":"black"}`}
        as="button" 
        onClick={()=>{setTimeWindow("day")}}>Today</Box>
        <Box sx={{color:"grey"}} bgcolor={`${timeWindow==="week"?"red":"black"}`} className="TodayThisWeek" as="button" onClick={()=>{setTimeWindow("week")}}>This Week</Box>
      </Stack>
      </Stack>
      {/* {loading && <center><div>Loading...</div></center>} */}
    <Grid className='GridBox' container   gridTemplateColumns={{base:"repeat(2,1fr)",sm:"repeat(2,1fr)",md:"repeat(3,1fr)",lg:"repeat(5,1fr)"}} justifyContent="space-between" alignItems="center">
        {data && data?.map((item,i)=>{
          return loading? (<Skeleton key={i}  sx={{ bgcolor: 'grey.900' }} className='Skeleton' variant="rectangular" width={200} height={200} />) :(<CardComponent key={item?.id} item={item} type={item?.media_type}/>)
        })}
        </Grid>
    </Container></Box>
  )
}

export default Home
