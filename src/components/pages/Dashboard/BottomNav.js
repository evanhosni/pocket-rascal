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
import './Store/store.css'
import { render } from "@testing-library/react";



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



export default function BottomNav({ currentPage, handlePageChange, myRascal,setMyRascal, unlockedItems, equippedItems,setUnlockedItems,setEquippedItems }) {
  const [customMenu, setCustomMenu] = React.useState(false);
  const toggleCustomMenu = () => {
    setCustomMenu(!customMenu);
    if(carousel) {
      setCarousel(false)
    }
    if(equippedItems) {
      setEquippedItemsB(false)
    }
  }

  const [carousel, setCarousel] = React.useState(false)
  // const [carouselContent, setCarouselContent] = React.useState(false)
  const [equippedItemsB, setEquippedItemsB] = React.useState(false)
  const [prevEvent, setPrevEvent] = React.useState('body')
  const toggleCarousel = (event) => {
    if (carousel && event === prevEvent) {
      setCarousel(false)
      setEquippedItemsB(false)
    } else {
      setCarousel(true)
      if (event === 'color') {

        setEquippedItemsB(false)
      }
      if (event === 'body') {

        setEquippedItemsB(false)
      }
      if (event === 'eyes') {

        setEquippedItemsB(false)
      }
      if (event === 'nose') {

        setEquippedItemsB(false)
      }
      if (event === 'mouth') {

        setEquippedItemsB(false)
      }
      if (event === 'items') {

        setEquippedItemsB(true)
      }
    }
    setPrevEvent(event)
  }

  const equippedItemBtn = {
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

  const [userCoins, setUserCoins] = useState(2500);
  const userLevel = myRascal.level;
  // setUserCoins(25)

  const renderStoreContent = () => {
    if (storeContent === 'Bodies') {
      return <StoreBodies userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
    }
    if (storeContent === 'Eyes') {
      return <StoreEyes userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
    }
    if (storeContent === 'Nose') {
      return <StoreNose userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
    }
    if (storeContent === 'Mouth') {
      return <StoreMouth userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
    }
    if (storeContent === 'Items') {
      return <StoreItem userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
    }
  }

  const buttons = [
    <Button key="one" className="tab" onClick={() => setStoreContent('Color')}>COLOR</Button>,
    <Button key="two" className="tab" onClick={() => setStoreContent('Bodies')}>BODY</Button>,
    <Button key="three" className="tab" onClick={() => setStoreContent('Eyes')}>EYES</Button>,
    <Button key="four" className="tab" onClick={() => setStoreContent('Nose')}>NOSE</Button>,
    <Button key="five" className="tab" onClick={() => setStoreContent('Mouth')}>MOUTH</Button>,
    <Button key="six" className="tab" onClick={() => setStoreContent('Items')}>ADD-ONS</Button>,
  ];


  return (
    <div>


    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={equippedItemsB}>
      <Box sx={{ width: '98%', maxWidth: 800, mx:'auto', display:'flex', alignItems:'center', justifyContent:'space-evenly', flexWrap: 'wrap', paddingTop: '10px' }}>

          <div>
            <Button style={equippedItemBtn} >
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <img src="./assets/body_fuzzy.png" style={{ objectFit: 'cover', height: '33.6px', objectPosition: '-1% center' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <img src="./assets/eyes_tired.png" style={{ objectFit: 'cover', height: '80px', objectPosition: '0.69% 6.4px' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <img src="./assets/nose_disguise.png" style={{ objectFit: 'cover', height: '72px', objectPosition: '45% -1.6px' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <img src="./assets/null.png" style={{ height: '100%' }} />
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
            </Button>
          </div>
          <div>
            <Button style={equippedItemBtn} >
              <div style={{ display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold' }}>3<span style={{ fontSize: 'xxx-large' }}>/</span>8</div>
            </Button>
          </div>
        </Box>
      </Animated>

      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={carousel}>
          <Carousel prevEvent={prevEvent} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
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
                <img src="./assets/nose_disguise.png" style={{ objectFit: 'cover', height: '90px', objectPosition: '50% -2px' }} />
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
              <Button style={customBtn} onClick={() => toggleCarousel('items')} >
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
              // onClose={handleClose}
            >
            <div id="tab">
              {buttons}
            </div>

            </ItemStoreDialogTitle>
            <div id="store-content">
              {renderStoreContent()}
            </div>
              <div id="bottom-tab">
                <Button disabled variant="outlined" startIcon={<SavingsIcon />}>
                  {`${userCoins}¢`}
                </Button>
                <Button autoFocus onClick={handleClose} id="done">
                  Done
                </Button>
              </div>
          </ItemStoreDialog>
        </div>
      </div >
    </div>
  );
}
