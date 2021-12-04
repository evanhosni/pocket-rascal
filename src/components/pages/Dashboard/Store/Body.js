import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import API from "../../../../utils/API";
import "./store.css";

const bodyData = [
  {
    img: "body_curly",
    title: "Curly",
    price: 250,
    level: 1,
  },
  {
    img: "body_fuzzy",
    title: "Fuzzy",
    price: 250,
    level: 0,
  }
];

export default function StoreBodies(props) {

    console.log('yeee',props.unlockedItems)

  //functions for snackbar for successful purchase from store
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
      type: "body",
    };
    console.log(props.unlockedItems);
    if (props.unlockedItems.length > 0) {
      props.setUnlockedItems([...props.unlockedItems, newItem]);
    } else {
      props.setUnlockedItems([newItem]);
    }
    API.addUnlockedItem(props.myRascal.id, newItem);
    console.log(props.unlockedItems);
  };

  //update the coin value displayed at the bottom of store window
  const purchaseItem = (item) => {
    if (props.userCoins >= item.price) {
      props.myRascal.coins = (props.myRascal.coins - item.price)
      props.setUserCoins(props.myRascal.coins);
      handleClick();
      saveNewItem(item);
    } else {
      handleFail();
    }
  };

  const checkIfOwned = (item) => {
    var tempArray = []
    for (let i = 0; i < props.unlockedItems.length; i++) {
        tempArray.push(props.unlockedItems[i].name);
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
        {bodyData.map((item) => (
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
                    height: "90px",
                    objectPosition: "0 -11px",
                    // backgroundColor: 'white'
                    }}
                    loading="lazy"
                />
                </div>
                <div className="title">{item.title}</div>
            </div>
                {/* <div className="priceandpurchase">
                    <div className="price">{item.price}<span>¢</span></div>
                    <Button id="purchase" onClick={() => {purchaseItem(item)}}>BUY</Button>
                </div> */}
                {checkIfOwned(item)}
          </div>
        ))}
      </div>
      <Button id="clickbait" onClick={() => {handleMoreCoins()}}><div>Get more <span id="cents">¢</span> !</div></Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Item Purchased"
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
