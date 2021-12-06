import React, { useContext, useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AppContext from './AppContext'


const TutorialDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const NameChangeDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const NameChangeDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

NameChangeDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


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
    navButtonsAlwaysVisible: true,
    swipe: true,
    fullHeightHover: false
  };

  function Item(props) {
    return (
      <Paper style={{ minHeight: '45vh', maxHeight: 'fit-content' }}>
        <div style={{ maxWidth: '45vh', maxHeight: '25vh' }}>
          <img src={`./assets/${props.item.source}.png`} alt='' style={{ width:'100%', height:'100%' }} />
        </div>
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
      source: 'tutorial-customize',
      description: "The options are endless! Give your Rascal a lil party hat. Or don't - you can make him lame, too. Dress up your Rascal by clicking the pencil at the bottom of the page. If you change your mind on an equipped item, click it's image at the top of the screen to remove it."
    },
    {
      name: "Minigames",
      source: 'tutorial-minigames',
      description: "Gain some pocket change by playing games. You can use pocket change to buy new items, crumbs, or soap to keep your pocket friend looking fresh and feeling happy."
    },
    {
      name: "Care",
      description: "Speaking of happiness - your new Rascal is a moody lil guy. Keep an eye on his status bar to make sure his mood stays in the green! Feeding him crumbs, washing him, switching up his look, and playing games will help to keep his boredom down and his happiness high. If you aren't sure what's got your friend in the red, click the smiley for some hints."
    }
  ];


  //name change dialog

  const [openName, setOpenName] = React.useState(false);

  const handleNameOpen = () => {
    setOpenName(true);
  };
  const handleNameClose = () => {
    setOpenName(false);
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
        <MoreVertIcon sx={{ color: 'white' }} />
      </IconButton>
      <Menu

        style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
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
        <MenuItem style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
          onClick={handleNameOpen} color='inherit'>{`Hi, ${myContext.userRascal.name}`}</MenuItem>
        <MenuItem style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
          onClick={handleClickOpen} color='inherit'>Tutorial</MenuItem>
        <MenuItem style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
          onClick={() => myContext.setCurrentPage('CreateRascal')} color='inherit'>Create</MenuItem>
        {!myContext.user.id && <MenuItem style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
          onClick={() => myContext.setCurrentPage('Login')} color="inherit">Login</MenuItem>}
        {!myContext.user.id && <MenuItem style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
          onClick={() => myContext.setCurrentPage('SignUp')} color="inherit">Sign Up</MenuItem>}
        {myContext.user.id && <MenuItem style={{ fontFamily: "'Nanum Pen Script', sans-serif" }}
          onClick={() => myContext.logOut()} color="inherit">Logout</MenuItem>}
      </Menu>


      <TutorialDialog onClose={handleClickClose} open={open} aria-labelledby="customized-dialog-title">
        <DialogTitle id="customized-dialog-title" style={{ fontSize: 'larger', textAlign: 'center', fontFamily: "'Nanum Pen Script',sans-serif" }}>
          Welcome to Pocket Rascal!
        </DialogTitle>
        <div id='tutorial-content' style={{overflow:'scroll'}}>
          <Carousel
            {...settings} style={{ alignItems: 'center' }}
            navButtonsProps={{
              style: {
                backgroundColor: 'transparent',
                color: 'black'
              }
            }}
            navButtonsWrapperProps={{
              style: {
                bottom: '0',
                top: 'unset'
              }
            }}
          >
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </div>
        <div id='tutorial-btns' style={{ display: 'flex', justifyContent: 'flex-end', padding: 5 }}>
          <Button autoFocus onClick={handleClickClose} id="done">
            Done
          </Button>

        </div>
      </TutorialDialog>
      <div>

        <NameChangeDialog
          onClose={handleNameClose}
          aria-labelledby="customized-dialog-title"
          open={openName}
        >
          <NameChangeDialogTitle style={{ backgroundColor: "lightblue" }} id="customized-dialog-title" onClose={handleNameClose}>
            Are you sure you want to rename your Rascal?
          </NameChangeDialogTitle>
          <DialogContent style={{ backgroundColor: "lightblue" }} dividers>
            <Typography gutterBottom>
              Your lil buddy is already so attached to their name...
            </Typography>

            <Typography gutterBottom>
              If you're positive, go ahead and click to continue -- but it'll cost you!
            </Typography>
          </DialogContent>
          <DialogActions style={{ backgroundColor: "lightblue" }}>
            <Button autoFocus onClick={handleNameClose}>
              Nevermind
            </Button>
            <Button autoFocus onClick={handleNameClose}>
              Change Name
            </Button>
          </DialogActions>
        </NameChangeDialog>
      </div>
    </>
  );
}


export default Navigation;