import * as React from 'react';
import { Animated } from "react-animated-css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
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
import Typography from "@mui/material/Typography";
// import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Popover from '@mui/material/Popover';
import ButtonGroup from '@mui/material/ButtonGroup';
import { bodyData, eyeData, noseData, mouthData, itemData, purchaseItem } from './StoreData'


//functions for item store - dialog pop up window and tab functionality 
const ItemStoreDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

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

//end of store functions 


export default function BottomNav() {
  const [customMenu, setCustomMenu] = React.useState(false);

  const toggleCustomMenu = () => setCustomMenu(!customMenu)

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //for store purchase confirm 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const popOpen = Boolean(anchorEl);
  const id = popOpen ? 'simple-popover' : undefined;


  return (
    <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Animated animationIn="bounceInUp" animationOut="bounceOutDown" animationInDuration={500} animationOutDuration={500} isVisible={customMenu}>
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', paddingTop: '20px' }}>
          <div>
            <Button style={customBtn} >
            </Button>
            <div style={customLabel}>COLOR</div>
          </div>
          <div>
            <Button style={customBtn} >
              <img src="./assets/body_fuzzy.png" style={{ objectFit: 'cover', height: '42px', objectPosition: '-1% center' }} />
            </Button>
            <div style={customLabel}>BODY</div>
          </div>
          <div>
            <Button style={customBtn} >
              <img src="./assets/eyes_tired.png" style={{ objectFit: 'cover', height: '100px', objectPosition: '0.69% 8px' }} />
            </Button>
            <div style={customLabel}>EYES</div>
          </div>
          <div>
            <Button style={customBtn} >
              <img src="./assets/nose_disguise.png" style={{ objectFit: 'cover', height: '90px', objectPosition: '45% -2px' }} />
            </Button>
            <div style={customLabel}>NOSE</div>
          </div>
          <div>
            <Button style={customBtn} >
              <img src="./assets/null.png" style={{ height: '100%' }} />
            </Button>
            <div style={customLabel}>MOUTH</div>
          </div>
          <div>
            <Button style={customBtn} >
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
          <Button aria-label="Minigame">
            <VideogameAssetIcon sx={{ color: 'white' }} />
          </Button>
          <Button aria-label="Store" onClick={handleClickOpen}>
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
        >
          <ItemStoreDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Unlockable Items
          </ItemStoreDialogTitle>
          <DialogContent dividers style={{ display: "flex" }}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="basic tabs example"
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      '&.Mui-disabled': { opacity: 0.3 },
                    },
                  }}
                >
                  <Tab label="Color" {...a11yProps(0)} />
                  <Tab label="Body" {...a11yProps(1)} />
                  <Tab label="Eyes" {...a11yProps(2)} />
                  <Tab label="Nose" {...a11yProps(3)} />
                  <Tab label="Mouth" {...a11yProps(4)} />
                  <Tab label="Items" {...a11yProps(5)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                Color options go here, nice
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ImageList sx={{ width: 400, height: 200 }}>
                  {bodyData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        style={{ objectFit: 'cover', height: '42px', objectPosition: '-1% center' }}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={`${item.price}¢`}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                            aria-describedby={id} onClick={openPopover}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ImageList sx={{ width: 250, height: 400 }}>
                  {eyeData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        style={{ objectFit: 'cover', height: '100px', objectPosition: '0.69% 8px' }}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={`${item.price}¢`}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                            aria-describedby={id} onClick={openPopover}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ImageList sx={{ width: 300, height: 300 }}>
                  {noseData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        style={{ objectFit: 'cover', height: '90px', objectPosition: '45% -2px' }}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={`${item.price}¢`}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <ImageList sx={{ width: 300, height: 300 }}>
                  {mouthData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        style={{ height: '100%' }}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={`${item.price}¢`}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <ImageList sx={{ width: 500, height: 500 }}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title}
                        subtitle={`${item.price}¢`}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`${item.price}`} onClick={openPopover}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </TabPanel>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Done
            </Button>
          </DialogActions>
        </ItemStoreDialog>


        {/* confirm for purchase */}

        <Popover
          id={id}
          open={popOpen}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography style={customLabel}>
            Save this item?
          </Typography>
          <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button onClick={purchaseItem(anchorEl)}>Yes</Button>
            <Button>No</Button>
          </ButtonGroup>
        </Popover>
      </div>
    </div >
  );
}
