import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShowerIcon from '@mui/icons-material/Shower';
import StoreIcon from '@mui/icons-material/Store';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MoodIcon from '@mui/icons-material/Mood';
import CategoryIcon from '@mui/icons-material/Category';

const actions = [
  { icon: <StoreIcon />, name: 'Shop' },
  { icon: <ColorLensIcon />, name: 'Color' },
  { icon: <CategoryIcon />, name: 'Items' },
  { icon: <MoodIcon />, name: 'Face' },
  { icon: <EditIcon />, name: 'Body' },
];

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500, background:'transparent',display:'flex', alignItems:'flex-end'}}>
      <BottomNavigation
        sx={{position: 'absolute', bottom: 16, left:0, background:'transparent' }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={{ color: 'white' }} label="Feed" icon={<FastfoodIcon sx={{ color: 'white' }} />} />
        <BottomNavigationAction sx={{ color: 'white' }} label="Love" icon={<FavoriteIcon sx={{ color: 'white' }} />} />
        <BottomNavigationAction sx={{ color: 'white' }} label="Care" icon={<ShowerIcon sx={{ color: 'white' }} />} />
        <BottomNavigationAction sx={{ color: 'white' }} label="MiniGame" icon={<VideogameAssetIcon sx={{ color: 'white' }} />} />
        
      </BottomNavigation>
        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right:0 }}
        icon={<EditIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
