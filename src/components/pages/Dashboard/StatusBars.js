// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import CircularProgress from '@mui/material/CircularProgress';

// export default function CircularDeterminate() {
//   const [happiness, setHappiness] = React.useState(75);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setHappiness((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//     }, 1800000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <Stack spacing={2} direction="row">
//       <CircularProgress variant="determinate" value={25} />
//       <CircularProgress variant="determinate" value={50} />
//       <CircularProgress variant="determinate" value={75} />
//       <CircularProgress variant="determinate" value={100} />
//       <CircularProgress variant="determinate" value={happiness} />
//     </Stack>
//   );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Chip from '@mui/material/Chip';
import Navigation from '../../Navigation';




export default function StatusBars({currentPage={currentPage}, handlePageChange={handlePageChange}}) {
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


  //setting interval timer for the bar to reduce over time depending on the happiness value 
  const [happiness, setHappiness] = React.useState(75);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHappiness((oldHappiness) => {
        if (oldHappiness === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldHappiness + diff, 100);
      });
    }, 1800000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //functions for the pop up window when the smiley button is clicked
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

   //level variable

   const userLvl = 5;
   const chipLabel = ('LVL ' + userLvl)
 


  return (
    <div style={{paddingTop: 10, paddingBottom: 10, display:'flex', alignItems:'center', justifyContent:'space-between', background: 'black'}}>
      <div style={{width:'1%', maxWidth:55, textAlign: 'left'}}/>
      <div style={{width: '100%', maxWidth: 500, display:'flex', alignItems:'center', justifyContent:'space-between', marginLeft: '0.5%'}}>
        <IconButton aria-describedby={id} type="button" onClick={handleClick} size="large">
          <SentimentSatisfiedAltIcon sx={{ color: 'white'}} fontSize="inherit" />
        </IconButton>
        <Popper id={id} open={open} anchorEl={anchorEl}>{/* TODO: use hover w popover instead, better for mobile */}
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            Wow, I sure could use a tasty lil snack....
          </Box>
        </Popper>
      <Box sx={{ flexGrow: 1, border: 5, borderRadius: 5 }}>
        <BorderLinearProgress variant="determinate" value={happiness} />
      </Box>
      <Chip sx={{ color: 'white', background: 'transparent'}} label={chipLabel} />
      </div>
      <div style={{width:55, textAlign: 'right', marginRight: '1%'}}>
      <Navigation currentPage={currentPage} handlePageChange={handlePageChange}/>
      </div>
    </div>
  );
}