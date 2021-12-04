import React, { useContext } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AppContext from "./../../../AppContext";
import API from "../../../../utils/API";


const itemData = [
    {
        img: 'cherry',
        title: 'Cherry Hat',
        price: 50,
        level: 0,
        size: 2.5
    },
    {
        img: 'party_hat',
        title: 'Party Hat',
        price: 50,
        level: 0,
        size: 1.7
    },
    {
        img: 'top_hat',
        title: 'Top Hat',
        price: 50,
        level: 0,
        size: 2.2
    },
    {
        img: 'waffle_cone',
        title: 'Waffle Cone',
        price: 50,
        level: 0,
        size: 1.7
    },
    {
        img: 'arm_glove',
        title: 'Gloved Arms',
        price: 50,
        level: 0,
        size: 3.4
    },
    {
        img: 'arm_default',
        title: 'Stick Arms',
        price: 25,
        level: 0,
        size: 2.8
    }
]




export default function StoreItem(props) {

    const myContext = useContext(AppContext);

    //functions for snackbar for successful purchase from store 
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
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
    }

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

    const saveNewItem = (item) => {
        const newItem = {
            name: item.img,
            size: item.size,
            equipped: false,
            type: 'item'
        }

        console.log(myContext.unlockItems);
        if (myContext.unlockItems.length > 0) {
            myContext.setUnlockItems([...myContext.unlockItems, newItem]);
        } else {
            myContext.setUnlockItems([newItem]);
        }
        API.addUnlockedItem(myContext.userRascal.id, newItem);
        console.log(myContext.unlockItems);
    }

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
            <ImageList sx={{ width: '95%', height: 400 }} cols={2} rowHeight={164} style={{ overflow: 'scroll', padding: 20 }}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`./assets/${item.img}.png`}
                            srcSet={`./assets/${item.img}.png`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={`${item.price}¢`}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick={() => {
                                        purchaseItem(item)
                                    }
                                    }

                                >
                                    <AddCircleIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
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
    )
}