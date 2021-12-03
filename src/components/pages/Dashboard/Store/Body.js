import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import API from '../../../../utils/API'
import "./store.css"


const bodyData = [
    {
        img: 'body_curly',
        title: 'Curly Body',
        price: 50,
        level: 1, 
    },
    {
        img: 'body_fuzzy',
        title: 'Fuzzy Body',
        price: 25,
        level: 0
    }
]


export default function StoreBodies(props) {

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
            equipped: false,
            type: 'body'
        }
        console.log(props.unlockedItems)
        if(props.unlockedItems.length>0){

            props.setUnlockedItems([...props.unlockedItems,newItem])
        }else{
            props.setUnlockedItems([newItem])
        }
        API.addUnlockedItem(props.myRascal.id,newItem)
        console.log(props.unlockedItems)
    }

    //update the coin value displayed at the bottom of store window
    const purchaseItem = (item) => {

        if (props.userCoins >= item.price) {
            props.setUserCoins(props.userCoins - item.price);
            handleClick();
            saveNewItem(item);
        } else { handleFail() }

    }


    return (
        <div>
            <div style={{ overflow: 'scroll', padding: 20 }}>
                {bodyData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`./assets/${item.img}.png`}
                            srcSet={`./assets/${item.img}.png`}
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
                                    onClick={() => {
                                        purchaseItem(item)
                                    }}
                                >
                                    <AddCircleIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message='Item Saved'
                action={action}
            />
            <Snackbar
                open={openFail}
                autoHideDuration={6000}
                onClose={handleCloseFail}
                message="You need more coins for this item!"
                action={actionFail}
            />
        </div >
    )

}