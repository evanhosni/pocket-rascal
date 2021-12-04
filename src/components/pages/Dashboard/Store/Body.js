import React, {useContext} from "react";
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
import AppContext from "./../../../AppContext";

const bodyData = [
  {
    img: "body_curly",
    title: "Curly",
    price: 50,
    level: 1,
  },
  {
    img: "body_fuzzy",
    title: "Fuzzy",
    price: 25,
    level: 0,
  },
];

export default function StoreBodies(props) {

  const myContext = useContext(AppContext);

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

  const saveNewItem = (item) => {
    const newItem = {
      name: item.img,
      equipped: false,
      type: "body",
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
      myContext.userRascal.coins = (myContext.userRascal.coins - item.price)
      myContext.setCoins(myContext.userRascal.coins);
      handleClick();
      saveNewItem(item);
    } else {
      handleFail();
    }
  };

  return (
    <div>
      <div style={{ overflow: "scroll", padding: 20 }}>
        {bodyData.map((item) => (
          // <ImageListItem key={item.img} className="itemforsale">
          //     <img
          //         src={`./assets/${item.img}.png`}
          //         srcSet={`./assets/${item.img}.png`}
          //         alt={item.title}
          //         style={{ objectFit: 'cover', height: '42px', objectPosition: '-1% center' }}
          //         loading="lazy"
          //     />
          //     <ImageListItemBar
          //         title={item.title}
          //         subtitle={`${item.price}¢`}
          //         actionIcon={
          //             <IconButton
          //                 sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          //                 aria-label={`info about ${item.title}`}
          //                 onClick={() => {
          //                     purchaseItem(item)
          //                 }}
          //             >
          //                 <AddCircleIcon />
          //             </IconButton>
          //         }
          //     />
          // </ImageListItem>
          <div
            obj={item}
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className="titleandprice">
              <Button className="itemforsale">
                <img
                  src={`./assets/${item.img}.png`}
                  alt={item.title}
                  style={{
                    objectFit: "cover",
                    height: "84px",
                    objectPosition: "-0.5% center",
                  }}
                  loading="lazy"
                />

              </Button>
              <div className="title">{item.title}</div>
            </div>
            {/* <div className="dots">..............................................................................................................................................................</div> */}
            {/* <div className="titleandprice"> */}
            {/* <div className="title">{item.title}</div> */}
            <div className="coins">{item.price}<span>¢</span></div>
            <Button id="purchase" onClick={()=>(console.log(myContext.coins))}>BUY</Button>

            {/* <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${item.title}`}
              onClick={() => {
                purchaseItem(item);
              }}
            >
              <AddCircleIcon />
            </IconButton> */}
          </div>
        ))}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Item Saved"
        action={action}
      />
      <Snackbar
        open={openFail}
        autoHideDuration={6000}
        onClose={handleCloseFail}
        message="You need more coins for this item!"
        action={actionFail}
      />
    </div>
  );
}



{/* <ImageListItemBar
                            title={item.title}
                            subtitle={`${item.price}¢`}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.title}`}
                                    onClick={() => {
                                        purchaseItem(item)
                                    }}
                                >
                                    <AddCircleIcon />
                                </IconButton>
                            }
                        /> */}