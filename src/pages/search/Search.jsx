import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { fetchSearch } from '../../services/api';
import '../movies.css';
function Search() {
  const [searchValue,setSearchValue] = useState("");
  const [activepage,setactivepage] = useState(1);
  useEffect(()=>{},[]);
  const handleSearch=(e)=>{
    e.preventDefault();
    fetchSearch(searchValue,activepage).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
  }
  return (
    <Container sx={{ml:5}}>
      <Stack   direction="row"  alignItems="baseline" justifyContent="space-between" >  
      <h2 style={{ fontSize:"larger", fontWeight:"normal" }}>SEARCH</h2></Stack>
      <form onSubmit={handleSearch}>
        <input type="text"  value={searchValue} placeholder='Search movies, tv shows' onChange={(e)=>{setSearchValue(e.target.value)}}/>
      </form>
    </Container>
  )
}

export default Search
