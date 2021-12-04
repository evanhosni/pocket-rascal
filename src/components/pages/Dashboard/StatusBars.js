
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Chip from '@mui/material/Chip';
import Navigation from '../../Navigation';


function statusPopper() {
  const messages = ['Wow, I sure could use a tasty lil snack...',
    'Does anyone else feel a bit dirty right now, or is it just me?',
    'All this sitting around being adorable gets kind of boring... A minigame might fix that...',
    "I look incredible! But it's always fun to switch it up a bit..."
  ]
  const selected = messages[Math.floor(Math.random() * (messages.length))]

  return selected
}


export default function StatusBars({ currentPage, handlePageChange, userId, myRascal, logOut }) {
  //style status bar to customize -- made it thicker and green
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 25,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#00cc00' : '#00cc00',
    },
  }));


  //functions for the pop up window when the smiley button is clicked
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  //level variable

  var userLvl = myRascal.level;
  const chipLabel = ('LVL ' + userLvl)



  return (
    <div style={{ paddingTop: 12, paddingBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundImage: 'linear-gradient(rgb(0, 100, 166), rgb(0, 69, 124))', borderBottom: 'solid rgb(0, 35, 90) 5px' }}>
      <div style={{ width: '1%', maxWidth: 55, textAlign: 'left' }} />
      <div style={{ width: '100%', maxWidth: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '0.5%' }}>
        <IconButton aria-describedby={id} type="button" onClick={handleClick} size="large">
          <SentimentSatisfiedAltIcon sx={{ color: 'white' }} fontSize="inherit" />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>{/* TODO: use hover w popover instead, better for mobile */}
          <Box sx={{ border: 2, p: 1, bgcolor: 'background.paper', borderRadius: '15px', fontWeight: 'bold', fontSize: '20px' }}>
            {statusPopper()}
          </Box>
        </Popper>
        <Box sx={{ flexGrow: 1, border: 5, borderRadius: 5 }}>
          <BorderLinearProgress variant="determinate" value={myRascal.happiness} />
        </Box>
        <Chip sx={{ color: 'white', background: 'transparent' }} label={chipLabel} />
      </div>
      <div style={{ width: 55, textAlign: 'right', marginRight: '1%' }}>
        <Navigation currentPage={currentPage} handlePageChange={handlePageChange} userId={userId} logOut={logOut} />
      </div>
    </div>
  );
}
