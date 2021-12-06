import React, {useContext} from 'react';
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AppContext from "./../../../AppContext";
import API from "../../../../utils/API";
import Button from "@mui/material/Button";
import "./store.css";


const eyeData = [
    {
        img: 'eyes_glasses',
        title: 'Glasses',
        price: 50,
        level: 0
    },
    {
        img: 'eyes_cute',
        title: 'Cutesie',
        price: 50,
        level: 0
    },
    {
        img: 'eyes_tired',
        title: 'Tired',
        price: 25,
        level: 0
    },
    {
      img: 'eyes_sunglasses',
      title: 'Sick Shades',
      price: 25,
      level: 0
  },
  
  {
    img: 'eyes_caveman',
    title: 'Caveman',
    price: 25,
    level: 0
},

    
]




export default function StoreEyes(props) {

    const myContext = useContext(AppContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //functions for snackbar for failed purchase from store
  const [openFail, setOpenFail] = React.useState(false);

  const handleFail = () => {
    setOpenFail(true);
  };

  const handleCloseFail = (event, reason) => {
    if (reason === "clickaway") {
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

    //functions for get more coins dialog
    const [moreCoins, setMoreCoins] = React.useState(false);

    const handleMoreCoins = () => {
      setMoreCoins(true);
    };
  
    const handleCloseCoins = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setMoreCoins(false);
    };
  
    const moreCoinsFail = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseCoins}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    const saveNewItem = (item) => {
        const newItem = {
          name: item.img,
          equipped: false,
          type: "eyes",
        };
        console.log(myContext.unlockItems);
        if (myContext.unlockItems.length > 0) {
          myContext.setUnlockItems([...myContext.unlockItems, newItem]);
        } else {
          myContext.setUnlockItems([newItem]);
        }
        API.addUnlockedItem(myContext.userRascal.id, newItem);
        console.log(myContext.unlockItems);
      };
    
      //update the coin value displayed at the bottom of store window
      const purchaseItem = (item) => {
        if (myContext.coins >= item.price) {
          myContext.setUserRascal({...myContext.userRascal, coins:myContext.coins-item.price})
          // myContext.setCoins(myContext.userRascal.coins);
          handleClick();
          saveNewItem(item);
        } else {
          handleFail();
        }
      };

      const checkIfOwned = (item) => {
        var tempArray = []
        for (let i = 0; i < myContext.unlockItems.length; i++) {
            tempArray.push(myContext.unlockItems[i].name);
        }
          if (tempArray.includes(item.img)) {
            return (
                <div className="alreadyowned">
                    [<span>ALREADY OWNED</span>]
                </div>
            )
        } else {
            return (
              <div className="priceandpurchase">
                  <div className="price">{item.price}<span>¢</span></div>
                  <Button id="purchase" onClick={() => {purchaseItem(item)}}>BUY</Button>
              </div>
            )
          }
      }

    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
          <div style={{ padding: 20}}>
            {eyeData.map((item) => (
              <div
                obj={item}
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: '3px',
                  paddingTop: '3px',
                  borderBottom: "dashed black 3px"
                }}
              >
                <div className="imgandtitle">
                    <div className="itemforsale">
                    <img
                        src={`./assets/${item.img}.png`}
                        alt={item.title}
                        style={{
                        objectFit: "cover",
                        height: "140px",
                        objectPosition: "-24px -22px",
                        // backgroundColor:'white'
                        }}
                        loading="lazy"
                    />
                    </div>
                    <div className="title">{item.title}</div>
                </div>
                    {checkIfOwned(item)}
              </div>
            ))}
          </div>
          <Button id="clickbait" onClick={() => {handleMoreCoins()}}><div>Get more <span id="cents">¢</span> !</div></Button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message="Item Saved"
            action={action}
          />
          <Snackbar
            open={openFail}
            autoHideDuration={5000}
            onClose={handleCloseFail}
            message="You need more coins for this item!"
            action={actionFail}
          />
          <Snackbar
            open={moreCoins}
            autoHideDuration={5000}
            onClose={handleCloseCoins}
            message="Play minigames to earn more coins!"
            action={moreCoinsFail}
          />
        </div>
      );

}