import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';


// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names



function Navigation({ currentPage, handlePageChange, userId, logOut }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);





  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        {!userId && <Button onClick={() => handlePageChange('Login')} color="inherit">Login</Button>}
        {!userId && <Button onClick={() => handlePageChange('SignUp')} color="inherit">Sign Up</Button>}
        {userId && <Button onClick={() => logOut()} color="inherit">Logout</Button>}

      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              PocketRascal Logo here
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={() => handlePageChange('CreateRascal')} color='inherit'>Create Rascal</Button>
              <Button onClick={() => handlePageChange('Scene')} color='inherit'>Scene</Button>
              <Button onClick={() => handlePageChange('Minigame')} color='inherit'>Minigame</Button>
              <Button onClick={() => handlePageChange('Dashboard')} color='inherit'>Dashboard</Button>
              {!userId && <Button onClick={() => handlePageChange('Login')} color="inherit">Login</Button>}
              {!userId && <Button onClick={() => handlePageChange('SignUp')} color="inherit">Sign Up</Button>}
              {userId ? <Button onClick={() => logOut()} color="inherit">Logout</Button> : null}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
      </Box>


      {/* <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            href="#login"
            onClick={() => handlePageChange('Login')}
            // Check to see if the currentPage is `Blog`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#signup"
            onClick={() => handlePageChange('SignUp')}
            // This is a conditional (ternary) operator that checks to see if the current page is "Home"
            // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
            className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
          >
            Sign Up
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#newrascal"
            onClick={() => handlePageChange('CreateRascal')}
            // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === 'CreateRascal' ? 'nav-link active' : 'nav-link'}
          >
            Create A Rascal
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#scene"
            onClick={() => handlePageChange('Scene')}
            // Check to see if the currentPage is `About`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === 'Scene' ? 'nav-link active' : 'nav-link'}
          >
            Scene
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#minigame"
            onClick={() => handlePageChange('Minigame')}
            // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === 'Minigame' ? 'nav-link active' : 'nav-link'}
          >
            Minigame
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#dashboard"
            onClick={() => handlePageChange('Dashboard')}
            // Check to see if the currentPage is `Contact`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
            className={currentPage === 'Dashboard' ? 'nav-link active' : 'nav-link'}
          >
            Dashboard
          </a>
        </li>
      </ul> */}
    </div>
  );
}

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             PocketRascal
//           </Typography>
//           <Button color="inherit">Login</Button>
//           <Button color="inherit">Sign Up</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

export default Navigation;