import React, { useContext, useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import AppContext from './AppContext'


function Navigation({ userId }) {

  const myContext = useContext(AppContext);


  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //tutorial module 

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  //tutorial carousel

  const settings = {
    autoPlay: false,
    navButtonsAlwaysVisible: true
  };

  function Item(props) {
    return (
      <Paper style={{ width: '98%', padding: 5, height: '100%' }}>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>

      </Paper>
    );
  }

  const items = [
    {
      name: "Thanks for joining us!",
      description: "Here's a quick lil tutorial on how to make sure your lil lint friend thrives"
    },
    {
      name: "Customize",
      description: "The options are endless! Give your Rascal a lil party hat. Or don't - you can make him lame, too. Dress up your Rascal by clicking the pencil at the bottom of the page. This will bring up all of your available items. If you change your mind on an equipped item, click it's image at the top of the screen to remove it."
    },
    {
      name: "Minigames",
      description: "Gain some pocket change by playing games. You can use pocket change to buy new items, crumbs, or soap to keep your pocket friend looking fresh and feeling happy."
    },
    {
      name: "Care",
      description: "Speaking of happiness - your new Rascal is a moody lil guy. Keep an eye on his status bar to make sure his mood stays in the green! Feeding him, washing him, switching up his look, and playing games will help to keep his boredom down and his happiness high. If you aren't sure what's got your friend in the red, click the smiley for some hints."
    }
  ];


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
        <MoreVertIcon sx={{ color: 'white' }} />
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
        <MenuItem onClick={() => myContext.setCurrentPage('CreateRascal')} color='inherit'>Create</MenuItem>
        <MenuItem onClick={handleClickOpen} color='inherit'>Tutorial</MenuItem>
        <MenuItem onClick={() => myContext.setCurrentPage('Dashboard')} color='inherit'>Dash</MenuItem>
        {!myContext.user.id && <MenuItem onClick={() => myContext.setCurrentPage('Login')} color="inherit">Login</MenuItem>}
        {!myContext.user.id && <MenuItem onClick={() => myContext.setCurrentPage('SignUp')} color="inherit">Sign Up</MenuItem>}
        {myContext.user.id && <MenuItem onClick={() => myContext.logOut()} color="inherit">Logout</MenuItem>}
      </Menu>


      <Dialog onClose={handleClickClose} open={open} sx={{ width: 'fit-content' }}>
        <DialogTitle>Welcome to Pocket Rascal!</DialogTitle>
        <div>
          <Carousel {...settings}>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </div>
      </Dialog>
    </>
  );
}


export default Navigation;