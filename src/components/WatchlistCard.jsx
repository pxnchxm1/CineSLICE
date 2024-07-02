
import { Star } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/watchlist.css';
import { useAuth } from '../context/useAuth';
import { imagePath } from '../services/api';
import { useFirestore } from '../services/firestore';


const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const handleRemoveClick = (event) => {
    event.preventDefault();
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`} style={{ textDecoration: 'none' ,padding:"2rem"}}>
      <Box className="ItemGrid"   display="flex" alignItems="center" gap={4} >
        <Box position="relative" padding={1} >
          <img className='MoviePoster'
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            style={{ objectFit: 'cover' ,opacity:"0.5"}}
          />
            <Button 
              aria-label="Remove from watchlist"
              className='Cross'
              style={{
                // backgroundColor:'black',
                position: 'absolute',
                zIndex: 999,
                top: '3px',
                left: '-15px',
              
              }}
              onClick={handleRemoveClick}
            >
              <CloseIcon  sx={{ color: "red", }}  />
            </Button>
      
        </Box>

        <Box style={{color:"grey" }} >
          <Typography className="Title" style={{fontFamily:'monospace' }}>
           
            {item?.title || item?.name}
          </Typography>
          <Typography variant="subtitle2" color="red" className="year" style={{ marginTop: '8px' }}>
            {new Date(item?.release_date || item?.first_air_date).getFullYear() || 'N/A'}
          </Typography>
          <Box display="flex" alignItems="center" marginTop="12px" gap={2}>
            <Star fontSize="small" style={{color:"orange"}} />
            <Typography variant="body2" align="center">
              {item?.vote_average?.toFixed(1)}
            </Typography>
          </Box>
          <Typography  className='Overview' style={{ marginTop: '12px',textAlign:'justify',marginRight:"25px",fontSize:'15px',fontFamily:'monospace' }} >
            {item?.overview}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default WatchlistCard;
