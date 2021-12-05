import React, { useState, useContext } from "react";
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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import StoreBodies from './Store/Body';
import StoreEyes from './Store/Eyes';
import StoreNose from './Store/Nose';
import StoreMouth from './Store/Mouth';
import StoreItem from './Store/Items'
import SavingsIcon from '@mui/icons-material/Savings';
import './Store/store.css'
import { render } from "@testing-library/react";
import Snackbar from '@mui/material/Snackbar';
import AppContext from "./../../AppContext";



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



export default function BottomNav({ openFail, setOpenFail }) {

  const myContext = useContext(AppContext);


  const [customMenu, setCustomMenu] = React.useState(false);
  const toggleCustomMenu = () => {
    setCustomMenu(!customMenu);
    if (carousel) {
      setCarousel(false)
    }
    if (myContext.equipItems) {
      setEquippedItemsWindow(false)
    }
  }

  const [carousel, setCarousel] = React.useState(false)
  // const [carouselContent, setCarouselContent] = React.useState(false)
  const [equippedItemsWindow, setEquippedItemsWindow] = React.useState(false)
  const [prevEvent, setPrevEvent] = React.useState('body')
  const toggleCarousel = (event) => {
    setPrevEvent(event);
    if (carousel && event === prevEvent) {
      setCarousel(false)
      setEquippedItemsWindow(false)
    } else {
      setCarousel(true);
      if (event === 'items') {
        setEquippedItemsWindow(true)
      } else {
        setEquippedItemsWindow(false)
      }
    }
  }

  //custom styling variables 
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

  const bottomNavBtn = {
    maxHeight: '35px',
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


  //remove currently equipped item from rascal
  const removeEquip = (e) => {
    let removeIndex = e.target.getAttribute("itemindex")
    console.log(removeIndex)
    let equipCopy = [...myContext.equipItems]
    equipCopy.splice(removeIndex, 1)
    myContext.setEquipItems(equipCopy)
    elongate()

  }


  //conditional rendering for store items
  const [storeContent, setStoreContent] = useState('Bodies')
  const renderStoreContent = () => {
    if (storeContent === 'Bodies') {
      return <StoreBodies />
    }
    if (storeContent === 'Eyes') {
      return <StoreEyes />
    }
    if (storeContent === 'Nose') {
      return <StoreNose />
    }
    if (storeContent === 'Mouth') {
      return <StoreMouth />
    }
    if (storeContent === 'Items') {
      return <StoreItem />
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

  ///end consts for store 


  let equippedItemsCopy
  function elongate() {
    equippedItemsCopy = [...myContext.equipItems]
    let lengthDiff = 8 - equippedItemsCopy.length
    for (let i = 0; i < lengthDiff; i++) {
      equippedItemsCopy.push({ name: "empty" })
    }
  }
  elongate()

  /////feed/wash fail message snackbar functions 
  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenFail(false);
  };

  const actionFail = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseFail}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <div>
      <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={equippedItemsWindow}>
        <Box sx={{ width: '98%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', paddingTop: '10px' }} id="equipped-items" data-update={myContext.equipItems.length}>
          {equippedItemsCopy.map((item, index) => {
            let imgSrc = item.name || "empty"
            return (
              <div>
                <Button style={equippedItemBtn} key={index} itemIndex={index} onClick={removeEquip}>
                  <img itemIndex={index} src={`./assets/${imgSrc}.png`} />
                </Button>
              </div>
            )
          })}

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

        <div style={{ backgroundImage: 'linear-gradient(rgb(0, 69, 124), rgb(0, 100, 166))', borderTop: 'solid rgb(0, 35, 90) 5px', paddingBottom: '10px', paddingTop: '10px', zIndex: 3 }}>
          <Box sx={{ width: '90%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
            <Button aria-label="Food" id='FeedRascal'>
              <img src="./assets/cookie.png" alt="cookie" style={bottomNavBtn} />
            </Button>
            <Button aria-label="Care" id='WashRascal' >
              <img src="./assets/soap.png" alt="soap" style={bottomNavBtn} />
            </Button>
            <Button aria-label="Minigame" onClick={() => myContext.setCurrentPage('Minigame')}>
              <img src="./assets/game.png" alt="game" style={bottomNavBtn} />
            </Button>
            <Button aria-label="Store" onClick={handleClickOpen('paper')}>
              <img src="./assets/money.png" alt="money" style={bottomNavBtn} />
            </Button>
            <Button aria-label="Customize" onClick={toggleCustomMenu}>
              <img src="./assets/pencil.png" alt="pencil" style={bottomNavBtn} />
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
              <div startIcon={<SavingsIcon />} className="coins">
                {`${myContext.coins}`}<span>¢</span>
              </div>
              <Button autoFocus onClick={handleClose} id="done">
                Done
              </Button>
            </div>
          </ItemStoreDialog>
        </div>

        <Snackbar
          open={openFail}
          autoHideDuration={6000}
          onClose={handleCloseFail}
          message="You need more coins for this!"
          action={actionFail}
        />

      </div >
    </div>
    );
}
