import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

const actions = [
  { icon: <EditIcon />, name: 'Body' },
  { icon: <EditIcon />, name: 'Face' },
  { icon: <EditIcon />, name: 'Color' },
  { icon: <EditIcon />, name: 'Items' },
];

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500, position: 'fixed', bottom:200}}>
      <BottomNavigation
        sx={{position: 'absolute', bottom: 16, left: 16 }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="MiniGame" icon={<VideogameAssetIcon />} />
        <BottomNavigationAction label="Pet Rascal" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Give Snack" icon={<LocalDiningIcon />} />
        
      </BottomNavigation>
        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 150 }}
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
