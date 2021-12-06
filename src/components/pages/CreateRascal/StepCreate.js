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



export default function VerticalLinearStepper() {

  const myContext = useContext(AppContext);

  const [activeStep, setActiveStep] = useState(0);
  const [newRascalName,setNewRascalName] = useState('');
  const [newRascalColor,setNewRascalColor]= useState('');
  const [newRascalBody,setNewRascalBody]= useState('');
  const [newRascalEyes,setNewRascalEyes]= useState('');
  const [newRascalMouth,setNewRascalMouth]= useState('');
  
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
    myContext.setUserRascal({
      name:newRascalName,
      color:newRascalColor,
      body:newRascalBody,
      eyes:newRascalEyes,
      mouth:newRascalMouth,
      happiness:50,
      hunger:50,
      level:1,
      coins:50
    })
    myContext.setUnlockItems([{name:newRascalBody,type:'body'},{name:newRascalMouth, type:"mouth"},{name:newRascalEyes,type:"eyes"},{name:newRascalColor,type:'color'}])
    API.createRascal(myContext.user.id,{
      name:newRascalName,
      color:newRascalColor,
      body:newRascalBody,
      eyes:newRascalEyes,
      mouth:newRascalMouth,
      happiness:50,
      hunger:50,
      level:1,
      coins:50
    }).then(promise=>{
      console.log(promise)
      myContext.setUserRascal({
        name:newRascalName,
        color:newRascalColor,
        body:newRascalBody,
        eyes:newRascalEyes,
        mouth:newRascalMouth,
        happiness:50,
        hunger:50,
        level:1,
        coins:50,
        UserId:promise.data.UserId,
        id:promise.data.id
      })
      
      API.addUnlockedItem(promise.data.id,[{name:newRascalBody,type:'body'},{name:newRascalMouth, type:"mouth"},{name:newRascalEyes,type:"eyes"},{name:newRascalColor,type:'color'}]).then(promises=>{

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
          onChange={(e)=>{setNewRascalName(e.target.value)}}
        >
          <TextField className={classes.root} id="standard-basic" label="Enter name here" variant="standard" />
        </Box>
    },
    {
      label: 'Select a body for your pocket Rascal:',
      description:
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your Rascal's body:</FormLabel>
          <RadioGroup onChange={(e)=>{setNewRascalBody(e.target.value)}}row aria-label="body" name="row-radio-buttons-group">
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
      label: 'Select eyes for your pocket Rascal:',
      description:
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your Rascal's eyes:</FormLabel>
          <RadioGroup onChange={(e)=>{setNewRascalEyes(e.target.value)}}row aria-label="eyes" name="row-radio-buttons-group">
            <FormControlLabel value="eyes_cute" control={<Radio />} data-id="eyes-type" label="Cute" />
            <FormControlLabel value="eyes_tired" control={<Radio />} label="Tired" data-id="eyes-type" />
            <FormControlLabel value="eyes_glasses" control={<Radio />} label="Glasses" data-id="eyes-type" />
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
      label: 'Select a mouth for your pocket Rascal:',
      description:
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your Rascal's mouth:</FormLabel>
          <RadioGroup onChange={(e)=>{setNewRascalMouth(e.target.value)}}row aria-label="mouth" name="row-radio-buttons-group">
            <FormControlLabel value="mouth_simple" control={<Radio />} data-id="mouth-type" label="Simple" />
            {/* <FormControlLabel value="mouth_tired" control={<Radio />} label="Tired" data-id="mouth-type" />
            <FormControlLabel value="mouth_glasses" control={<Radio />} label="Glasses" data-id="mouth-type" /> */}
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
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your Rascal's color:</FormLabel>
          <RadioGroup onChange={(e)=>{setNewRascalColor(e.target.value)}}row aria-label="color" name="color-radio">
            <FormControlLabel value="white" control={<Radio />} data-id="color" label="White" />
            <FormControlLabel value="blue" control={<Radio />} label="Blue" data-id="color" />
            <FormControlLabel value="red" control={<Radio />} label="Red" data-id="color" />
            <FormControlLabel value="green" control={<Radio />} label="Green" data-id="color" />
            <FormControlLabel value="orange" control={<Radio />} label="Orange" data-id="color" />
            <FormControlLabel value="purple" control={<Radio />} label="Purple" data-id="color" />
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
  ];


  return (
    <Box sx={{ maxWidth: 400 }} id="creation-panel"className={classes.root}>
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