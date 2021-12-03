import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Navigation({ currentPage, handlePageChange, userId, logOut }) {


  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
        // sx={{ ml: 1 }}
      >
        <MoreVertIcon sx={{color:'white'}}/>
      </IconButton>
      <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
        <MenuItem onClick={() => handlePageChange('CreateRascal')} color='inherit'>Create</MenuItem>
        <MenuItem onClick={() => handlePageChange('Minigame')} color='inherit'>Minigame</MenuItem>
        <MenuItem onClick={() => handlePageChange('Dashboard')} color='inherit'>Dash</MenuItem>
        {!userId && <MenuItem onClick={() => handlePageChange('Login')} color="inherit">Login</MenuItem>}
        {!userId && <MenuItem onClick={() => handlePageChange('SignUp')} color="inherit">Sign Up</MenuItem>}
        {userId && <MenuItem onClick={() => logOut()} color="inherit">Logout</MenuItem>}
      </Menu>
    </>
  );
}


export default Navigation;