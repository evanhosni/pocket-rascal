import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


const itemData = [
    {
        img: 'cherry',
        title: 'Cherry Hat',
        price: 50,
        level: 0
    },
    {
        img: 'party_hat',
        title: 'Party Hat',
        price: 50,
        level: 0
    },
    {
        img: 'top_hat',
        title: 'Top Hat',
        price: 50,
        level: 0
    },
    {
        img: 'waffle_cone',
        title: 'Waffle Cone',
        price: 50,
        level: 0
    },
    {
        img: 'arm_glove',
        title: 'Gloved Arms',
        price: 50,
        level: 0
    },
    {
        img: 'arm_default',
        title: 'Stick Arms',
        price: 25,
        level: 0
    }
]

function purchaseItem(image,price) {
    //function here to reduce total amount of coins after a purchase 
    console.log(image,price)

}


export default function StoreItem() {

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
        <ImageList sx={{ width: '95%', height: 400 }} cols={2} rowHeight={164} style={{overflow:'scroll',padding:20}}>
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