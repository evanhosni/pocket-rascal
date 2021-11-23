import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //const vars for select box in 3rd tab
    const [color, setColor] = React.useState('');

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ borderRight: 1, borderColor: 'divider' }}>
                    <Tab label="Name Your Rascal" {...a11yProps(0)} />
                    <Tab label="Choose Starter Body" {...a11yProps(1)} />
                    <Tab label="Pick A Color" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your Rascal's body:</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel value="female" control={<Radio />} label="Body1" />
                        <FormControlLabel value="male" control={<Radio />} label="Body2" />
                        <FormControlLabel value="other" control={<Radio />} label="Body3" />
                        <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                        />
                    </RadioGroup>
                </FormControl>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={color}
                            label="Color"
                            onChange={handleColorChange}
                        >
                            <MenuItem value={10}>Blue</MenuItem>
                            <MenuItem value={20}>Green</MenuItem>
                            <MenuItem value={30}>Red</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </TabPanel>
        </Box>
    );
}