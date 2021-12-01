import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Button from '@mui/material/Button';
// import StatusBars from './pages/Dashboard/StatusBars';


// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names



function Navigation({ currentPage, handlePageChange, userId, logOut }) {

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);





  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   handleMobileMenuClose();
  // };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  // const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >

  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <Button onClick={() => handlePageChange('CreateRascal')} color='inherit'>Create</Button>
  //       <Button onClick={() => handlePageChange('Scene')} color='inherit'>Scene</Button>
  //       <Button onClick={() => handlePageChange('Minigame')} color='inherit'>Minigame</Button>
  //       <Button onClick={() => handlePageChange('Dashboard')} color='inherit'>Dash</Button>
  //       {!userId && <Button onClick={() => handlePageChange('Login')} color="inherit">Login</Button>}
  //       {!userId && <Button onClick={() => handlePageChange('SignUp')} color="inherit">Sign Up</Button>}
  //       {userId && <Button onClick={() => logOut()} color="inherit">Logout</Button>}
  //     </MenuItem>
  //   </Menu>
  // );

  // return (
  //   <div>
  //     <Box sx={{ display: 'flex' }}>
  //       <CssBaseline />
  //       <AppBar position="fixed">
  //         <Toolbar>
  //           <Box sx={{ flexGrow: 1 }} />
  //           {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  //             <Button onClick={() => handlePageChange('CreateRascal')} color='inherit'>Create Rascal</Button>
  //             <Button onClick={() => handlePageChange('Scene')} color='inherit'>Scene</Button>
  //             <Button onClick={() => handlePageChange('Minigame')} color='inherit'>Minigame</Button>
  //             <Button onClick={() => handlePageChange('Dashboard')} color='inherit'>Dashboard</Button>
  //             {!userId && <Button onClick={() => handlePageChange('Login')} color="inherit">Login</Button>}
  //             {!userId && <Button onClick={() => handlePageChange('SignUp')} color="inherit">Sign Up</Button>}
  //             {userId && <Button onClick={() => logOut()} color="inherit">Logout</Button>}
  //           </Box> */}
  //           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
  //             <IconButton
  //               size="large"
  //               aria-label="show more"
  //               aria-controls={mobileMenuId}
  //               aria-haspopup="true"
  //               onClick={handleMobileMenuOpen}
  //               color="inherit"
  //             >
  //               <MoreIcon />
  //             </IconButton>
  //           </Box>
  //         </Toolbar>
  //       </AppBar>

  //       {renderMobileMenu}
  //     </Box>


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