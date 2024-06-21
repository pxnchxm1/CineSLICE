import { CircularProgress, Select } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/CardComponent';
import Pagination from '../../components/Pagination';
import { fetchMovie } from '../../services/api';
import '../movies.css';
function Movies() {
  const [movies,setMovie]= useState([]);
  const [activepage,setActivePage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [sortby,setSortBy]=useState('popularity.desc');
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchDatas = async()=>{
      try{
        setLoading(true);
        const [moviedetails] = await Promise.all([fetchMovie(activepage,sortby)]);
        setMovie(moviedetails?.results);
        setActivePage(moviedetails?.page);
        setTotalPages(moviedetails?.total_pages);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }
    fetchDatas();
  },[activepage,totalPages,sortby]);
  if(loading){
    return <Stack justifyContent={'center'}   direction="row" mt={20}>
      <CircularProgress style={{justifyContent:"center" ,alignItems:"center",color:"red"}}/>
    </Stack>
  }
  return (
    <Container  sx={{ml:5}}>
      <Stack direction={'row'} gap={2} justifyItems={'center'} alignItems={'center'}>
      <h2 style={{ fontSize:"medium", fontWeight:"normal" }}>DISCOVER MOVIES</h2>
         <Select variant="filled" className='Select' sx={{color:'red',height:'40px',width:'200px',padding:"5px",marginBottom:"1rem",
        }}
          
          value={sortby}
          label="Sort by"
          onChange={(e)=>{
            setActivePage(1);
            setSortBy(e.target.value)}}
        >
         
          <MenuItem value={'popularity.desc'}>Popular</MenuItem>
          <MenuItem value={'vote_average.desc&vote_count.gte=1000'}>Top Rated</MenuItem>
        </Select>

      </Stack>
      <Grid className='GridBox' container   gridTemplateColumns={{base:"repeat(2,1fr)",sm:"repeat(2,1fr)",md:"repeat(3,1fr)",lg:"repeat(5,1fr)"}} justifyContent="space-between" alignItems="center">
        {movies && movies?.map((item,i)=>{
          return loading? (<Skeleton key={i}  sx={{ bgcolor: 'grey.900' }} className='Skeleton' variant="rectangular" width={200} height={200} />) :(<CardComponent key={item?.id} item={item} type={'movie'}/>)
        })}
        </Grid>
        <Pagination activepage={activepage} totalPages={totalPages} setActivePage={setActivePage}/>
    </Container>
  )
}

export default Movies

