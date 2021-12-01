import * as React from 'react';
import {Animated} from "react-animated-css";
import Carousel from './Carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShowerIcon from '@mui/icons-material/Shower';
import StoreIcon from '@mui/icons-material/Store';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MoodIcon from '@mui/icons-material/Mood';
import CategoryIcon from '@mui/icons-material/Category';

export default function BottomNav() {
  const [customMenu, setCustomMenu] = React.useState(false);
  const toggleCustomMenu = () => {
    setCustomMenu(!customMenu);
    if(carousel) {
      setCarousel(false)
    }
    if(equippedLimbs) {
      setEquippedLimbs(false)
    }
  }

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
    cursor:'pointer',
    background:'white',
    border: 'solid black 3px',
    borderRadius: '50%',
    maxWidth:'40px',
    maxHeight:'40px',
    minWidth:'40px',
    minHeight:'40px'
  }

  const customBtn = {
    padding: 0,
    cursor:'pointer',
    background:'white',
    border: 'solid black 3px',
    borderRadius: '50%',
    maxWidth:'50px',
    maxHeight:'50px',
    minWidth:'50px',
    minHeight:'50px'
  }

  const customLabel = {
    padding: '5px 0',
    color:'black',
    textAlign:'center',
    fontWeight: 'bolder'
  }

  return (
    <>

    <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={equippedLimbs}>
      <Box sx={{ width: '98%', maxWidth: 800, mx:'auto', display:'flex', alignItems:'center', justifyContent:'space-evenly', flexWrap: 'wrap', paddingTop: '10px' }}>
          <div>
            <Button style={equippedLimbBtn} >
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/body_fuzzy.png" style={{objectFit: 'cover', height: '33.6px', objectPosition:'-1% center'}}/>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/eyes_tired.png" style={{objectFit: 'cover', height: '80px', objectPosition:'0.69% 6.4px'}}/>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/nose_disguise.png" style={{objectFit: 'cover', height: '72px', objectPosition:'45% -1.6px'}}/>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <img src="./assets/null.png" style={{height: '100%'}}/>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <div style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold'}}>3<span style={{fontSize:'xxx-large'}}>/</span>8</div>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <div style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold'}}>3<span style={{fontSize:'xxx-large'}}>/</span>8</div>
            </Button>
          </div>
          <div>
            <Button style={equippedLimbBtn} >
              <div style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold'}}>3<span style={{fontSize:'xxx-large'}}>/</span>8</div>
            </Button>
          </div>
        </Box>
    </Animated>

    <div style={{position: 'absolute', bottom:0, left: 0, width: '100%'}}>
      <Animated animationIn="fadeIn" animationOut="fadeOut" animationInDuration={300} animationOutDuration={200} isVisible={carousel}>
        <Carousel prevEvent={prevEvent}/>
      </Animated>

      <Animated animationIn="bounceInUp" animationOut="bounceOutDown" animationInDuration={500} animationOutDuration={500} isVisible={customMenu}>
        <Box sx={{ width: '100%', maxWidth: 800, mx:'auto', display:'flex', alignItems:'center', justifyContent:'space-evenly', flexWrap: 'wrap', paddingTop: '10px' }}>
          <div>
            <Button style={customBtn} onClick={() => toggleCarousel('color')} >
            </Button>
            <div style={customLabel}>COLOR</div>
          </div>
          <div>
            <Button style={customBtn} onClick={() => toggleCarousel('body')} >
              <img src="./assets/body_fuzzy.png" style={{objectFit: 'cover', height: '42px', objectPosition:'-1% center'}}/>
            </Button>
            <div style={customLabel}>BODY</div>
          </div>
          <div>
            <Button style={customBtn} onClick={() => toggleCarousel('eyes')} >
              <img src="./assets/eyes_tired.png" style={{objectFit: 'cover', height: '100px', objectPosition:'0.69% 8px'}}/>
            </Button>
            <div style={customLabel}>EYES</div>
          </div>
          <div>
            <Button style={customBtn} onClick={() => toggleCarousel('nose')} >
              <img src="./assets/nose_disguise.png" style={{objectFit: 'cover', height: '90px', objectPosition:'45% -2px'}}/>
            </Button>
            <div style={customLabel}>NOSE</div>
          </div>
          <div>
            <Button style={customBtn} onClick={() => toggleCarousel('mouth')} >
              <img src="./assets/null.png" style={{height: '100%'}}/>
            </Button>
            <div style={customLabel}>MOUTH</div>
          </div>
          <div>
            <Button style={customBtn} onClick={() => toggleCarousel('limbs')} >
              <div style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold'}}>3<span style={{fontSize:'xxx-large'}}>/</span>8</div>
            </Button>
            <div style={customLabel}>ADD-ONS</div>
          </div>
        </Box>
      </Animated>

      <div style={{background:'black', paddingBottom: '15px', paddingTop:'15px', zIndex: 3}}>
        <Box sx={{ width: '90%', maxWidth: 800, mx:'auto', display:'flex', alignItems:'center', justifyContent:'space-evenly', flexWrap: 'wrap', background:'black' }}>
          <Button aria-label="Food">
            <FastfoodIcon sx={{ color: 'white' }}/>
          </Button>
          <Button aria-label="Care" >
            <ShowerIcon sx={{ color: 'white' }}/>
          </Button>
          <Button aria-label="Minigame">
            <VideogameAssetIcon sx={{ color: 'white' }}/>
          </Button>
          <Button aria-label="Store">
            <StoreIcon sx={{ color: 'white' }}/>
          </Button>
          <Button aria-label="Customize" onClick={toggleCustomMenu}>
            <EditIcon sx={{ color: 'white' }}/>
          </Button>
        </Box>
      </div>
    </div>

    </>
  );
}
