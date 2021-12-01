import React, { useState } from "react";
import { Animated } from "react-animated-css";
import Carousel from './Carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EditIcon from '@mui/icons-material/Edit';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShowerIcon from '@mui/icons-material/Shower';
import StoreIcon from '@mui/icons-material/Store';
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ButtonGroup from '@mui/material/ButtonGroup';
import StoreBodies from './Store/Body';
import StoreEyes from './Store/Eyes';
import StoreNose from './Store/Nose';
import StoreMouth from './Store/Mouth';
import StoreItem from './Store/Items'
import SavingsIcon from '@mui/icons-material/Savings';
import Stack from '@mui/material/Stack';



//functions for item store - dialog pop up window and tab functionality 
const ItemStoreDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));


const ItemStoreDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

ItemStoreDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};



export default function BottomNav({ currentPage, handlePageChange, myRascal, setRascalLimbArray }) {
  const [customMenu, setCustomMenu] = React.useState(false);
  const toggleCustomMenu = () => setCustomMenu(!customMenu);

  const [carousel, setCarousel] = React.useState(false)
  const [equippedLimbs, setEquippedLimbs] = React.useState(false)
  const [prevEvent, setPrevEvent] = React.useState(null)
  const toggleCarousel = (event) => {
    if (carousel && event === prevEvent) {
      setCarousel(false)
      setEquippedLimbs(false)
    } else {
      setCarousel(true)
      if (event === 'color') {

        setEquippedLimbs(false)
      }
      if (event === 'body') {

        setEquippedLimbs(false)
      }
      if (event === 'eyes') {

        setEquippedLimbs(false)
      }
      if (event === 'nose') {

        setEquippedLimbs(false)
      }
      if (event === 'mouth') {

        setEquippedLimbs(false)
      }
      if (event === 'limbs') {

        setEquippedLimbs(true)
      }
    }
    setPrevEvent(event)
  }

  const equippedLimbBtn = {
    padding: 0,
    cursor: 'pointer',
    background: 'white',
    border: 'solid black 3px',
    borderRadius: '50%',
    maxWidth: '40px',
    maxHeight: '40px',
    minWidth: '40px',
    minHeight: '40px'
  }

  const customBtn = {
    padding: 0,
    cursor: 'pointer',
    background: 'white',
    border: 'solid black 3px',
    borderRadius: '50%',
    maxWidth: '50px',
    maxHeight: '50px',
    minWidth: '50px',
    minHeight: '50px'
  }

  const customLabel = {
    padding: '5px 0',
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bolder'
  }

  //for store modal pop up 
  const [open, setOpen] = React.useState(false);

  //scrollable
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //conditional rendering for store items
  const [storeContent, setStoreContent] = useState('Bodies')

  const [userCoins, setUserCoins] = useState(50);
  const userLevel = myRascal.level;
  // setUserCoins(25)

  const renderStoreContent = () => {
    if (storeContent === 'Bodies') {
      return <StoreBodies userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} />
    }
    if (storeContent === 'Eyes') {
      return <StoreEyes userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} />
    }
    if (storeContent === 'Nose') {
      return <StoreNose userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} />
    }
    if (storeContent === 'Mouth') {
      return <StoreMouth userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} />
    }
    if (storeContent === 'Items') {
      return <StoreItem userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} />
    }
  }

  const buttons = [
    <Button key="one" style={{ fontSize: '12px' }} onClick={() => setStoreContent('Color')}>Color</Button>,
    <Button key="two" style={{ fontSize: '12px' }} onClick={() => setStoreContent('Bodies')}>Body</Button>,
    <Button key="three" style={{ fontSize: '12px' }} onClick={() => setStoreContent('Eyes')}>Eyes</Button>,
    <Button key="four" style={{ fontSize: '12px' }} onClick={() => setStoreContent('Nose')}>Nose</Button>,
    <Button key="five" style={{ fontSize: '12px' }} onClick={() => setStoreContent('Mouth')}>Mouth</Button>,
    <Button key="six" style={{ fontSize: '12px' }} onClick={() => setStoreContent('Items')}>Items</Button>,
  ];


  return (
    <div>

      <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={carousel}>
        <Box sx={{ width: '98%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', paddingTop: '10px' }}>
          <div>
            <Button style={equippedLimbBtn} >
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/body_fuzzy.png" style={{ objectFit: 'cover', height: '33.6px', objectPosition: '-1% center' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/eyes_tired.png" style={{ objectFit: 'cover', height: '80px', objectPosition: '0.69% 6.4px' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/nose_disguise.png" style={{ objectFit: 'cover', height: '72px', objectPosition: '45% -1.6px' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/null.png" style={{ height: '100%' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
            </Button>
          </div>
        </Box>
      </Animated>

      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={carousel}>
          <Carousel prevEvent={prevEvent} />
        </Animated>

        <Animated animationIn="bounceInUp" animationOut="bounceOutDown" animationInDuration={500} animationOutDuration={500} isVisible={customMenu}>
          <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', paddingTop: '10px' }}>
            <div>
              <Button style={customBtn} onClick={() => toggleCarousel('color')} >
              </Button>
              <div style={customLabel}>COLOR</div>
            </div>
            <div>
              <Button style={customBtn} onClick={() => toggleCarousel('body')} >
                <img src="./assets/body_fuzzy.png" style={{ objectFit: 'cover', height: '42px', objectPosition: '-1% center' }} />
              </Button>
              <div style={customLabel}>BODY</div>
            </div>
            <div>
              <Button style={customBtn} onClick={() => toggleCarousel('eyes')} >
                <img src="./assets/eyes_tired.png" style={{ objectFit: 'cover', height: '100px', objectPosition: '0.69% 8px' }} />
              </Button>
              <div style={customLabel}>EYES</div>
            </div>
            <div>
              <Button style={customBtn} onClick={() => toggleCarousel('nose')} >
                <img src="./assets/nose_disguise.png" style={{ objectFit: 'cover', height: '90px', objectPosition: '45% -2px' }} />
              </Button>
              <div style={customLabel}>NOSE</div>
            </div>
            <div>
              <Button style={customBtn} onClick={() => toggleCarousel('mouth')} >
                <img src="./assets/null.png" style={{ height: '100%' }} />
              </Button>
              <div style={customLabel}>MOUTH</div>
            </div>
            <div>
              <Button style={customBtn} onClick={() => toggleCarousel('limbs')} >
                <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
              </Button>
              <div style={customLabel}>ADD-ONS</div>
            </div>
          </Box>
        </Animated>

        <div style={{ background: 'black', paddingBottom: '15px', paddingTop: '15px', zIndex: 3 }}>
          <Box sx={{ width: '90%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', background: 'black' }}>
            <Button aria-label="Food">
              <FastfoodIcon sx={{ color: 'white' }} />
            </Button>
            <Button aria-label="Care" >
              <ShowerIcon sx={{ color: 'white' }} />
            </Button>
            <Button aria-label="Minigame" onClick={() => handlePageChange('Minigame')}>
              <VideogameAssetIcon sx={{ color: 'white' }} />
            </Button>
            <Button aria-label="Store" onClick={handleClickOpen('paper')}>
              <StoreIcon sx={{ color: 'white' }} />
            </Button>
            <Button aria-label="Customize" onClick={toggleCustomMenu}>
              <EditIcon sx={{ color: 'white' }} />
            </Button>
          </Box>
        </div>

        <div>
          <ItemStoreDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            scroll={scroll}
            sx={{ width: '99%' }}
          >
            <ItemStoreDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              <ButtonGroup aria-label="small button group" variant="text" size='small'>
                {buttons}
              </ButtonGroup>

            </ItemStoreDialogTitle>
            <DialogContent>
              {renderStoreContent()}
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button disabled variant="outlined" startIcon={<SavingsIcon />}>
                  {`${userCoins}¢`}
                </Button>
                <Button autoFocus onClick={handleClose}>
                  Done
                </Button>
              </Stack>
            </DialogActions>
          </ItemStoreDialog>
        </div>
      </div >
    </div>
  );
}
