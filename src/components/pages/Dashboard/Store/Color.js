import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import API from "../../../../utils/API";
import "./store.css";
import AppContext from "./../../../AppContext";

const bodyData = [
    {
        img: "agedpink",
        title: "Aged Pink",
        price: 250,
        level: 1,
    },
    {
        img: "black",
        title: "Black",
        price: 250,
        level: 0,
    },
    {
        img: "blue",
        title: "Blue",
        price: 250,
        level: 0,
    },
    {
        img: "brown",
        title: "Brown",
        price: 250,
        level: 0,
    },
    {
        img: "gold",
        title: "Gold",
        price: 250,
        level: 0,
    },
    {
        img: "green",
        title: "Green",
        price: 250,
        level: 0,
    },
    {
        img: "hotpink",
        title: "Hot Pink",
        price: 250,
        level: 0,
    },
    {
        img: "lightblue",
        title: "Light Blue",
        price: 250,
        level: 0,
    },
    {
        img: "limegreen",
        title: "Lime Green",
        price: 250,
        level: 0,
    },
    {
        img: "mythicgray",
        title: "Thicc Gray",
        price: 250,
        level: 0,
    },
    {
        img: "orange",
        title: "Orange",
        price: 250,
        level: 0,
    },
    {
        img: "pink",
        title: "Pink",
        price: 250,
        level: 0,
    },
    {
        img: "purple",
        title: "Purple",
        price: 250,
        level: 0,
    },
    {
        img: "red",
        title: "Red",
        price: 250,
        level: 0,
    },
    {
        img: "sage",
        title: "Sage Green",
        price: 250,
        level: 0,
    },
    {
        img: "teal",
        title: "Teal",
        price: 250,
        level: 0,
    },
    {
        img: "yellow",
        title: "Yellow",
        price: 250,
        level: 0,
    },
    {
        img: "white",
        title: "White",
        price: 250,
        level: 0,
    },
];

export default function StoreColors(props) {

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
            type: "color",
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
                    <Button id="purchase" onClick={() => { purchaseItem(item) }}>BUY</Button>
                </div>
            )
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 20 }}>
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
                                    src={`./assets/body_fuzzy_${item.img}.png`}
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
                        {checkIfOwned(item)}
                    </div>
                ))}
            </div>
            <Button id="clickbait" onClick={() => { handleMoreCoins() }}><div>Get more <span id="cents">¢</span> !</div></Button>
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
