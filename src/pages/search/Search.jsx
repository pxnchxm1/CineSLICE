import { CircularProgress, Grid, Skeleton, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/CardComponent';
import Pagination from '../../components/Pagination';
import { fetchSearch } from '../../services/api';
import '../movies.css';


function Search() {
  const [searchValue,setSearchValue] = useState("");
  const [totalPages,setTotalPages] = useState(1);
  const [activepage,setactivepage] = useState(1);
  const [loading,setisLoading]=useState(false);
  const [data,setData] = useState([]);
  useEffect(()=>{
    setisLoading(true);
    fetchSearch(activepage,searchValue)
    .then((res)=>{
      console.log(res);
      setData(res?.results);
      setactivepage(res?.page);
      setTotalPages(res?.total_pages);
    })
    .catch((err)=>{console.log(err)}).finally(()=>{setisLoading(false)})
  
  },[activepage,searchValue])

  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchValue(searchValue);
   }
 
  return (
    <Container sx={{ml:5}}>
      <Stack   direction="row"  alignItems="baseline" justifyContent="space-between" >  
      <h2 style={{ fontSize:"larger", fontWeight:"normal" }}>SEARCH</h2></Stack>
      <form onSubmit={handleSearch}>
        <input type="text"  value={searchValue} 
        placeholder='Search movies, tv shows' 
        onChange={(e)=>{setSearchValue(e.target.value)}}/>
      </form>
      {loading && (<Stack justifyContent={'center'}  alignItems={'center'} marginTop={10}>
        <CircularProgress style={{justifyContent:"center" ,alignItems:"center",color:"red"}}/>
      </Stack>)}
      {data?.length===0 && loading && (
              <h4 style={{fontSize:20 ,color:"white.100",textAlign:"center",marginTop:"100px"}}>
                No results found</h4>)}
      <Grid className='GridBox' container   
      gridTemplateColumns={{base:"repeat(2,1fr)",sm:"repeat(2,1fr)",md:"repeat(3,1fr)",
      lg:"repeat(5,1fr)"}} justifyContent="space-between" alignItems="center">
        {data?.length>0 && !loading && data?.map((item,i)=>{
          return loading? (<Skeleton key={i}  sx={{ bgcolor: 'grey.900' }} 
            className='Skeleton' variant="rectangular" width={200} height={500} bgcolor="grey"/>) 
            :(<CardComponent  key={item?.id} item={item} type={item?.media_type}/>
              
            )
        })}
         </Grid>
         {data?.length>0 && !loading &&
         <Pagination activepage={activepage} totalPages={totalPages} setActivePage={setactivepage}/>}
       
        
  
    </Container>
  )
}

export default Search
