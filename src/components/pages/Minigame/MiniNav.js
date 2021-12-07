import React, { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SavingsIcon from '@mui/icons-material/Savings';
import HomeIcon from '@mui/icons-material/Home';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppContext from "./../../AppContext";





export default function MiniNav() {

    const myContext = useContext(AppContext);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    

    return (
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
            <div style={{ background: 'black', paddingBottom: '15px', paddingTop: '15px', zIndex: 3 }}>
                <Box sx={{ width: '90%', maxWidth: 800, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap', background: 'black' }}>
                    <Button aria-label="Home" onClick={()=>handleClickOpen()}>
                        <HomeIcon sx={{ color: 'white' }} />
                    </Button>
                    <Button variant="outlined" sx={{ color: 'white' }} startIcon={<SavingsIcon />}>
                        {`${myContext.userRascal.coins}¢`}
                    </Button>
                    <Chip sx={{ color: 'white', background: 'transparent' }} label={`LVL ${myContext.userRascal.level}`} />
                </Box>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{fontFamily: "'Nanum Pen Script', sans-serif"}}>
                    {"Exit Game?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{fontFamily: "'Nanum Pen Script', sans-serif"}} >
                        Are you sure you want to return to the homepage? Your game progress will be lost forever!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={handleClose} style={{fontFamily: "'Nanum Pen Script', sans-serif", color: 'black'}}>Continue Game</Button>
                    <Button 
                    onClick={()=>myContext.setCurrentPage('Dashboard')} autoFocus style={{fontFamily: "'Nanum Pen Script', sans-serif", color: 'black'}}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}