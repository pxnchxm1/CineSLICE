import { Box, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';
import '../pages/movies.css';
import { imagePath } from '../services/api';

function CardComponent({item,type}) {
  
  return (
    <Link  href={`${type}/${item?.id}`} underline="none">
      <Box className="MovieTitle" style={{background:"transparent" ,border:"none",height:"205px",width:"200px",marginBottom:"10px"}}>
      <Box className="MovieBox" component="section"  >
        <img className="MovieImg"   srcset={`${imagePath}/${item?.poster_path}`}  alt={item?.title || item?.name}/>
        
      </Box>
      <Box  className="MovieDetails">
        <h4  style= {{color:'white' ,fontSize:14 ,fontFamily:"monospace",fontWeight:"bold",textAlign:"center", justifyItem:"center"}}>{item?.title ||item?.name}</h4>
        <h4  style={{color:'white' ,fontSize:14 ,fontFamily:"monospace",fontWeight:"normal",textAlign:"center", justifyItem:"center"}}> { new Date(item?.release_date ||item?.first_air_date).getFullYear() || "N/A"}</h4>
         <Stack direction={"row"} justifyContent={'center'} gap={1}  marginBottom={1}>
          <img style={{height:20,width:20}}src="../src/assets/star.png" />
          <h4  style={{color:'white' ,fontFamily:"monospace",fontWeight:"normal"}}>{item?.vote_average} votes</h4>
         </Stack>
         
      </Box>
      </Box>
    </Link>
  )
}

export default CardComponent
