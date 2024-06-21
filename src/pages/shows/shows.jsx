import { Grid, Skeleton } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/CardComponent';
import Pagination from '../../components/Pagination';
import { fetchShows } from '../../services/api';
import '../movies.css';
function Shows() {
  const [shows,setShows]= useState([]);
  const [activepage,setActivePage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchDatas = async()=>{
      try{
        setLoading(true);
        const [showdetails] = await Promise.all([fetchShows(activepage,totalPages)]);
        setShows(showdetails?.results);
        setActivePage(showdetails?.page);
        setTotalPages(showdetails?.total_pages);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }
    fetchDatas();
  },[activepage,totalPages]);
  return (
    <Container sx={{ml:5}} >
      <h2 style={{ fontSize:"medium", fontWeight:"normal" }}>TV SHOWS</h2>
      <Grid className='GridBox' container   gridTemplateColumns={{base:"repeat(2,1fr)",sm:"repeat(2,1fr)",md:"repeat(3,1fr)",lg:"repeat(5,1fr)"}} justifyContent="space-between" alignItems="center">
        {shows && shows?.map((item,i)=>{
          return loading? (<Skeleton key={i}  sx={{ bgcolor: 'grey.900' }} className='Skeleton' variant="rectangular" width={200} height={200} />) :(<CardComponent key={item?.id} item={item} type={'tv'}/>)
        })}
        </Grid>
        <Pagination activepage={activepage} totalPages={totalPages} setActivePage={setActivePage}/>
    </Container>
  )
}

export default Shows
