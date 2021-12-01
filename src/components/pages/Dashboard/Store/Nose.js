import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

const noseData = [
    {
        img: 'nose_cute',
        title: 'Button Nose',
        price: 50,
        level: 0
    },
    {
        img: 'nose_disguise',
        title: 'Nose Disguise',
        price: 25,
        level: 0
    }
]

function purchaseItem(image, price) {
    //function here to reduce total amount of coins after a purchase 
    console.log(image, price)

}


export default function StoreNose() {

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

    return (
        <div>

            <ImageList sx={{ width: '95%', height: 400 }} cols={2} rowHeight={164} style={{ overflow: 'scroll', padding: 20 }}>
                {noseData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`./assets/${item.img}.png`}
                            srcSet={`./assets/${item.img}.png`}
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
                                    onClick={() => {
                                        purchaseItem(item.img, item.price);
                                        handleClick()
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
        </div>


    )
}