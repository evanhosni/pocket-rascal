import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import API from "../../../utils/API"
import AppContext from "./../../AppContext";

const useStyles = makeStyles({
  root: {
    background: 'white',
  },
});


//what are you doing, StepCreate?



export default function VerticalLinearStepper(props) {

  const myContext = useContext(AppContext);

  const [activeStep, setActiveStep] = useState(0);
  const [newRascalName,setNewRascalName] = useState('');
  const [newRascalColor,setNewRascalColor]= useState('');
  const [newRascalBody,setNewRascalBody]= useState('');
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleFinish = () =>{
    props.setMyRascal({
      name:newRascalName,
      color:newRascalColor,
      body:newRascalBody,
      happiness:50,
      hunger:50,
      level:1,
      coins:50
    })
    props.setUnlockedItems([{name:newRascalBody,type:'body'}])
    API.createRascal(props.userState.id,{
      name:newRascalName,
      color:newRascalColor,
      body:newRascalBody,
      happiness:50,
      hunger:50,
      level:1,
      coins:50
    }).then(promise=>{
      console.log(promise)
      props.setMyRascal({
        name:newRascalName,
        color:newRascalColor,
        body:newRascalBody,
        happiness:50,
        hunger:50,
        level:1,
        coins:50,
        UserId:promise.data.UserId,
        id:promise.data.id
      })
      API.addUnlockedItem(promise.data.id,{name:newRascalBody,type:"body"}).then(promises=>{

        myContext.setCurrentPage("Dashboard")
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    })


  }



  const classes = useStyles();

  const steps = [
    {
      label: 'Choose a name for your Rascal:',
      description:
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          value={newRascalName}
          onChange={(e)=>{setNewRascalName(e.target.value); props.setMyRascal({body:newRascalBody,color:newRascalColor,name:e.target.value})}}
        >
          <TextField className={classes.root} id="standard-basic" label="Enter name here" variant="standard" />
        </Box>
    },
    {
      label: 'Select a body for your pocket Rascal:',
      description:
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your Rascal's body:</FormLabel>
          <RadioGroup onChange={(e)=>{setNewRascalBody(e.target.value); props.setMyRascal({name:newRascalName,color:newRascalColor,body:e.target.value})}}row aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel value="body_fuzzy" control={<Radio />} data-id="body-type" label="Fuzzy" />
            <FormControlLabel value="body_curly" control={<Radio />} label="Curly" data-id="body-type" />
            {/* <FormControlLabel value="other" control={<Radio />} label="Body3" />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="other"
            /> */}
          </RadioGroup>
        </FormControl>
    },
    {
      label: 'Choose a color for your new friend:',
      description:
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel className={classes.root} id="demo-simple-select-label">Color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newRascalColor}
              label="Color"
              onChange={(e)=>{setNewRascalColor(e.target.value); props.setMyRascal({body:newRascalBody,name:newRascalName,color:e.target.value})}}
            >
              <MenuItem value={'blue'}>Blue</MenuItem>
              <MenuItem value={'green'}>Green</MenuItem>
              <MenuItem value={'red'}>Red</MenuItem>
            </Select>
          </FormControl>
        </Box>
    },
  ];


  return (
    <Box sx={{ maxWidth: 400 }} id="creation-panel"className={classes.root} style={{background:'transparent'}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel 
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
          <Button onClick={handleFinish} sx={{ mt: 1, mr: 1 }}>
            Continue
          </Button>
        </Paper>
      )}
    </Box>
  );
}