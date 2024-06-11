import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import React from 'react';
import './NavBar.css';

function Navbar() {
  return (
    <Box component="section" sx={{p:3, }}>
         <Container >
         <Stack spacing={{ xs: 1, sm: 2 }}  direction="row" justifyContent="space-between" alignItems="center"  useFlexGap flexWrap="wrap">  
         <Link  href="/" underline="none">
         <Box className="Netflix" component="section">CineSLICE</Box>
          </Link>  
         <Stack spacing={{ xs: 1, sm: 2 ,color:"red" }}  direction="row" justifyContent="center" alignItems="center"  useFlexGap flexWrap="wrap">
         <Link className="LinkNames" sx={{color:"white", fontSize:18,fontWeight:"bold"}} href="/" underline="none"> Home </Link>
         <Link className="LinkNames" sx={{color:"white", fontSize:18,fontWeight:"bold"}} href="/movies" underline="none"> Movies </Link>
         <Link className="LinkNames" sx={{color:"white", fontSize:18,fontWeight:"bold"}} href="/shows" underline="none"> Tv Shows </Link>
         <Link className="LinkNames"sx={{color:"white", fontSize:18,fontWeight:"bold"}}  href="/search" underline="none"> Search
         {/* <img  className="Searchimg" src="./src/assets/search.png" alt="" /> */}
         </Link>
         </Stack> 
      </Stack>
      </Container>

    </Box>
  )
}

export default Navbar

