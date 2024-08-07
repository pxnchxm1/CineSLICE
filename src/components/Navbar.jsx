import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography, useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import './NavBar.css';


function Navbar() {

  const  {user,loading,logout,SignInWithGoogle} = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = async() => {
    try{
      await SignInWithGoogle();
      console.log("success");
    }
    catch(e){
      console.log(e);
    }
  }
  const isMobile = useMediaQuery('(max-width:767px)');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box component="section" sx={{p:2, }}>
         <Container >
         <Stack  spacing={{ xs: 1, sm: 2 }}  direction="row" justifyContent="space-between" alignItems="center"  useFlexGap flexWrap="wrap">  
         <Link  href="/" underline="none">
         <Box className="Netflix" component="section">CineSLICE</Box>
          </Link>  
          {isMobile ? (
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{color:"grey"}}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem ><Link className="LinkNames" sx={{color:"grey",fontSize:18,fontWeight:"bold"}} href="/" underline="none"> Home </Link></MenuItem>
            <MenuItem ><Link className="LinkNames" sx={{ color:"grey",fontSize:18,fontWeight:"bold"}} href="/movies" underline="none"> Movies </Link></MenuItem>
            <MenuItem ><Link className="LinkNames" sx={{ color:"grey",fontSize:18,fontWeight:"bold"}} href="/shows" underline="none"> Tv Shows </Link></MenuItem>
            <MenuItem ><Link className="LinkNames" sx={{color:"grey", fontSize:18,fontWeight:"bold"}}  href="/search" underline="none"> Search</Link></MenuItem>
            {user && (<MenuItem><Link className="LinkNames" sx={{color:"grey", fontSize:18,fontWeight:"bold"}}  href="/watchlist" underline="none"> Watchlist</Link></MenuItem>)}
            {user && (<Typography className="LinkNames" onClick={logout} sx={{paddingLeft:"1rem",fontWeight:"bold",color:"grey"}}>Logout</Typography>)}
            {!user && (<Typography className="LinkNames" sx={{paddingLeft:"1rem",fontWeight:"bold",color:"grey"}} onClick={handleLogin} >Login</Typography>)}
          </Menu>
        </>
      ) : (
        <Stack className="NavComponent" spacing={{ xs: 1, sm: 2 ,color:"red" }}  direction="row" justifyContent="center" alignItems="center"  useFlexGap flexWrap="wrap">
         <Link className="LinkNames" sx={{color:"grey",fontSize:18,fontWeight:"bold"}} href="/" underline="none"> Home </Link>
         <Link className="LinkNames" sx={{ color:"grey",fontSize:18,fontWeight:"bold"}} href="/movies" underline="none"> Movies </Link>
         <Link className="LinkNames" sx={{ color:"grey",fontSize:18,fontWeight:"bold"}} href="/shows" underline="none"> Tv Shows </Link>
         <Link className="LinkNames"sx={{color:"grey", fontSize:18,fontWeight:"bold"}}  href="/search" underline="none"> Search
         </Link>
        
          {user && (
            <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2,backgroundColor:"black" ,border:"2px solid red"}}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  
                >
                  <Avatar onClick={handleClose} sx={{ width: 22,height: 22,backgroundColor:"black" }} ></Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
            
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              
              <MenuItem onClick={handleClose}>
                <Avatar sx={{padding:"2px",height:"22px",width:"22px",marginRight:"10px"}} />  
                <Link  sx={{color:"black", fontSize:15,fontWeight:"normal"}} href="/watchlist" underline="none"> Watchlist</Link>
        
              </MenuItem>
              <Divider />
              
              
              <MenuItem onClick={logout}>
                <ListItemIcon sx={{marginRight:"2px",marginLeft:"2px"}}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
              
            </Menu>
          </React.Fragment>
          )}
         {!user && (
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{ ml: 2,backgroundColor:"black" ,border:"2px solid red"}}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              
            >
              <Avatar onClick={handleLogin} sx={{ width: 22,height: 22,backgroundColor:"black" }} >P</Avatar>
            </IconButton>
          </Tooltip>
        </Box>
         )}
        </Stack> 
      )}
        
      </Stack>
      </Container>

    </Box>
  )
}

export default Navbar

