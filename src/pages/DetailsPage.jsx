import { Box, Button, Chip, CircularProgress, Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoComponent from '../components/VideoComponent';
import { fetchCredits, fetchDetails, fetchVideos, imagePath, imagePathOriginal } from '../services/api';
import { hrToMin, ratingColor, ratingToPercentage } from '../utils/helper';
import './detailspage.css';

function DetailsPage() {
    const router = useParams();
    const {type,id}=router;
    
    const [loading,setloading] = useState(true);
    const [details,setdetails] = useState({});
    const [cast,setCast] = useState({});
    const [video,setVideo]=useState(null);
    const [videos,setVideos]=useState({});

    const title = (details?.title || details?.name);
    const releaseDate = type==="tv"? details?.first_air_date : details?.release_date;
    
    useEffect(()=>{
      const fetchData =async()=>{
        try {
        const [detailsData,creditsData,videoData] =  await Promise.all([
          fetchDetails(type,id),
          fetchCredits(type,id),
        fetchVideos(type,id)])
          setloading(true);
          setdetails(detailsData);
          setCast(creditsData?.cast?.slice(0,10));
          const video = videoData?.results?.find((vid)=>vid?.type === 'Trailer');
          setVideo(video);
          const videos = videoData?.results?.filter((video)=> video?.type !== 'Trailer').slice(0,10);
          setVideos(videos);

        } catch (error) {
          console.log (error);
        }finally{
          setloading(false);
        }
      }
      fetchData();
    },[type,id])

  if(loading){
    return <Stack justifyContent={'center'}   direction="row" mt={20}>
      <CircularProgress style={{justifyContent:"center" ,alignItems:"center",color:"red"}}/>
    </Stack>
  }
  console.log(details);
  return (
    <Box>
        <Box style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)), url(${imagePathOriginal}/${details?.backdrop_path})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',}} className="DetailBox" >
           <Container maxWidth={'container.xl'}>
            <Stack alignItems={'center'} gap={4} direction={"row"}>
            <img className="MovieImage" height={"400px"} style={{borderRadius:"sm"}} src={`${imagePath}/${details?.poster_path}`} />
            <Box className="MovieNameNYear">
              <Stack alignItems={"center"}  gap={2}  direction={"row"}>
                <h3 style={{fontSize:22 ,color:"white.100"}}>{title}
                <Typography as="span" style={{fontSize:22 ,color:"grey",marginLeft:10}}>{new Date(releaseDate).getFullYear()} </Typography>
                </h3>
              </Stack>
              <Stack alignItems={"center"} direction={"row"}>
                  <img src="../src/assets/calendar.png" height={20}/>
                  <Typography as="span" style={{fontSize:15 ,color:"grey",marginLeft:10}}>{new Date(releaseDate).toLocaleDateString('en-US')}(US)  </Typography>
                  {type==="movie" &&(
                <>
                 
                <Stack alignItems={"center"} direction={"row"} marginLeft={2}>
                  <img src="../src/assets/time.png" height={20}/>
                  <Typography as="span" style={{fontSize:13 ,color:"grey",marginLeft:10}}>{hrToMin(details?.runtime)}</Typography>
              </Stack>
                </>
              )}
              </Stack>
              
              <Stack alignItems={'center'} direction={"row"} > 

                <Box sx={{ position: 'relative', display: 'inline-flex',marginTop:2 }}>
                  <CircularProgress variant="determinate" thickness={3.9} value={100}  color="inherit" />
                  <CircularProgress variant="determinate" value={ratingToPercentage(details?.vote_average)} thickness={3.9}
                    sx={{color: ratingColor(details?.vote_average),position: 'absolute',top: 0,left: 0, }}/>
            
                  <Box  sx={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex',
                    alignItems: 'center',   justifyContent: 'center', }}>
                    <Typography variant="caption" component="div" color="grey" fontWeight={'bold'}>
                    {`${Math.round(ratingToPercentage(details?.vote_average))}%`} </Typography>
                  </Box>
                </Box>
                <Typography as="span" style={{fontSize:18 ,color:"grey",marginLeft:10,marginTop:10,fontWeight:"bold"}}>User Score </Typography>
                <Button  variant="outlined" onClick={console.log("click")} color="success" style={{marginLeft:10,marginTop:10, display:"none"}}>
                 In Watchlist
                </Button>
                <Button variant="outlined" onClick={console.log("click")} color="error" style={{marginLeft:10,marginTop:10}}>
 + Add to Watchlist 
</Button>
              </Stack>
              <Typography variant="caption" component="div" color="grey" fontWeight={'normal'} fontStyle={'italic'} fontSize={18} marginTop={1}fontFamily={'monospace'} >
              {details?.tagline} </Typography>
              <h4 style={{fontSize:20 ,color:"white.100"}}>Overview</h4>
                <Typography as="span" className="Overview" style={{fontSize:12 ,color:"grey", fontFamily:"monospace"}}>{details?.overview} </Typography>
                <Stack marginTop={1} gap={2} direction={'row'}>
            {details?.genres?.map((genre) => (
                <Chip  className="Chip" key={genre.id} label={genre.name} color="success" variant="outlined" />
            ))}
            </Stack>
            </Box>
            </Stack>
            </Container>
           
      </Box>
      <Container maxWidth="container.xl"  >
  
        <h2  style={{fontSize:20, fontFamily:'monospace',marginLeft:25,textTransform:"uppercase"}}>Cast</h2>
         {cast?.length===0 && <Typography as="span" style={{fontSize:15 ,color:"grey", fontFamily:"monospace"}}>No cast </Typography>
          }
          <Stack className='others' direction={"row"}>
        {cast && cast?.map((items)=>(
          <Box key={items?.id} p={1}>
            <img className="MovieImgone" src={`${imagePath}/${items?.profile_path}`} />

          </Box>
          ))}
        </Stack>
        <h2  style={{fontSize:20, fontFamily:'monospace',marginLeft:25,textTransform:"uppercase"}}>Videos</h2>
        <VideoComponent id={video?.key} marginTop={10}/>
        <Stack  className='vids' direction={"row"} >
        {videos && videos?.map((items)=>(
          <Box key={items?.id}  >
           <VideoComponent id={items?.key} small />
           <Typography className='clamp-lines' fontSize={10} color={'grey'} textAlign={'center'} paddingLeft={3} paddingRight={3} >{items?.name}</Typography>

          </Box>
          ))}
        </Stack>
      </Container>
      </Box>
      
  )
}

export default DetailsPage

