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
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import API from "../../../utils/API"
import AppContext from "./../../AppContext";
import './stepstyle.css'

const useStyles = makeStyles({
  root: {
    background: 'white',
    fontFamily: "'Nanum Pen Script', sans-serif",
    marginBottom: 1
  },
  stepLabelLabel: {
    fontFamily: "'Nanum Pen Script', sans-serif",
    "&.Mui-active": {
      fontFamily: "'Nanum Pen Script', sans-serif"
    },
    "&.Mui-completed": {
      fontFamily: "'Nanum Pen Script', sans-serif"
    },
  },
  stepIconRoot: {
    color: "rgba(0,169,191,0.7)",
    fontFamily: "'Nanum Pen Script', sans-serif",
    "&.Mui-active": {
      color: "#00717f",
      fontFamily: "'Nanum Pen Script', sans-serif"
    },
    "&.Mui-completed": {
      color: "#30694b",
      fontFamily: "'Nanum Pen Script', sans-serif"
    },
  },
  stepIconText: {
    fontFamily: "'Nanum Pen Script', sans-serif",
  },
  typography: {
    fontFamily: "'Nanum Pen Script', sans-serif"
  },
  select: {
    height: '2.5em',
  },
  menuItem: {
    fontFamily: "'Nanum Pen Script', sans-serif",
  },
  form: {
    fontFamily: "'Nanum Pen Script', sans-serif",
    "&MuiInputLabel-root": {
      fontFamily: "'Nanum Pen Script', sans-serif",
    }

  }
});

const BpIcon = styled('span')(() => ({
  fontFamily: "'Nanum Pen Script', sans-serif",
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',

  backgroundColor: '#f5f8fa',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },

}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#00717f',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#00717f',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
        marginLeft: 2
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}


//what are you doing, StepCreate?


const Btn = {
  color: "white",
  fontFamily: "'Nanum Pen Script', sans-serif",
  fontSize: "x-large",
  backgroundColor: "rgb(187, 0, 0)",
  minHeight: "30px",
  maxHeight: "30px",
}

export default function VerticalLinearStepper() {

  const myContext = useContext(AppContext);

  const [activeStep, setActiveStep] = useState(0);
  const [newRascalName, setNewRascalName] = useState('');
  const [newRascalColor, setNewRascalColor] = useState('');
  const [newRascalBody, setNewRascalBody] = useState('');
  const [newRascalEyes, setNewRascalEyes] = useState('');
  const [newRascalMouth, setNewRascalMouth] = useState('');


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    myContext.setUserRascal({
      name: newRascalName,
      color: newRascalColor,
      body: newRascalBody,
      eyes: newRascalEyes,
      mouth: newRascalMouth,
      happiness: 50,
      hunger: 50,
      level: 1,
      coins: 50
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
        name: newRascalName,
        color: newRascalColor,
        body: newRascalBody,
        eyes: newRascalEyes,
        mouth: newRascalMouth,
        happiness: 50,
        hunger: 50,
        level: 1,
        coins: 50,
        UserId: promise.data.UserId,
        id: promise.data.id
      })
      
      API.addUnlockedItem(promise.data.id,[{name:newRascalBody,type:'body'},{name:newRascalMouth, type:"mouth"},{name:newRascalEyes,type:"eyes"},{name:newRascalColor,type:'color'}]).then(promises=>{

        myContext.setCurrentPage("Dashboard")
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })


  }



  const classes = useStyles();

  const steps = [
    {
      label: 'Select a body for your buddy:',
      description:
        <FormControl component="fieldset">
          <RadioGroup size="small" onChange={(e) => { setNewRascalBody(e.target.value) }} row aria-label="body" name="row-radio-buttons-group">
            <FormControlLabel
              classes={{ label: classes.typography }}
              value="body_fuzzy" control={<BpRadio />} data-id="body-type" label="Fuzzy" />
            <FormControlLabel
              classes={{ label: classes.typography }}
              value="body_curly" control={<BpRadio />} label="Curly" data-id="body-type" />
          </RadioGroup>
        </FormControl>
    },
    {
      label: 'Pick out some eyes for your Rascal:',
      description:
        <FormControl component="fieldset">
          <RadioGroup onChange={(e) => { setNewRascalEyes(e.target.value) }} row aria-label="eyes" name="row-radio-buttons-group">
            <FormControlLabel
              classes={{ label: classes.typography }}
              value="eyes_cute" control={<BpRadio />} data-id="eyes-type" label="Cute" />
            <FormControlLabel
              classes={{ label: classes.typography }}
              value="eyes_tired" control={<BpRadio />} label="Tired" data-id="eyes-type" />
            <FormControlLabel
              classes={{ label: classes.typography }}
              value="eyes_glasses" control={<BpRadio />} label="Glasses" data-id="eyes-type" />
          </RadioGroup>
        </FormControl>
    },
    {
      label: 'Choose a mouth:',
      description:
        <FormControl component="fieldset">
          <RadioGroup onChange={(e) => { setNewRascalMouth(e.target.value) }} row aria-label="mouth" name="row-radio-buttons-group">
            <FormControlLabel
              classes={{ label: classes.typography }}
              value="mouth_simple" control={<BpRadio />} data-id="mouth-type" label="Simple" />
          </RadioGroup>
        </FormControl>
    },
    {
      label: 'Pick a color for your lint:',
      description:
        <FormControl component="fieldset">
          <RadioGroup onChange={(e)=>{setNewRascalColor(e.target.value)}}row aria-label="color" name="color-radio">
            <FormControlLabel 
            classes={{ label: classes.typography }} value="white" control={<BpRadio />} data-id="color" label="White" />
            <FormControlLabel 
            classes={{ label: classes.typography }} value="blue" control={<BpRadio />} label="Blue" data-id="color" />
            <FormControlLabel 
            classes={{ label: classes.typography }} value="red" control={<BpRadio />} label="Red" data-id="color" />
            <FormControlLabel 
            classes={{ label: classes.typography }} value="green" control={<BpRadio />} label="Green" data-id="color" />
            <FormControlLabel 
            classes={{ label: classes.typography }} value="orange" control={<BpRadio />} label="Orange" data-id="color" />
            <FormControlLabel 
            classes={{ label: classes.typography }} value="purple" control={<BpRadio />} label="Purple" data-id="color" />
          </RadioGroup>
        </FormControl>
        
    },
    {
      label: 'Give your new lil friend a name:',
      description:
        <Box
          component="form"
          sx={{
            '& > :not(style)': { width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          value={newRascalName}
          onChange={(e) => { setNewRascalName(e.target.value) }}
        >
          <TextField style={{ background: 'transparent' }} className={classes.root} id="standard-basic" label="Enter name here" variant="standard"
            InputProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }}
            InputLabelProps={{ classes: { root: classes.form, label: classes.form, input: classes.form, inputbase: classes.form } }} />
        </Box>
    }
  ];

  const canvas = document.getElementById('rascalCanvas')
  if(canvas){
  canvas.setAttribute('style', 'top: -180%')
  }
 


  return (
    <>
      <Box sx={{ maxWidth: 400 }} id="creation-panel" className={classes.root} style={{
        background: 'transparent',
        marginLeft: 10,
        marginTop: 10,
      }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step
              key={step.label}>
              <StepLabel classes={{ label: classes.stepLabelLabel }}
                StepIconProps={{
                  classes: { root: classes.stepIconRoot, text: classes.stepIconText, label: classes.stepLabelLabel },
                }}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography
                  TypographyProps={{
                    classes: { root: classes.typography }
                  }}
                >{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      style={Btn} 
                      variant="contained"
                      onClick={handleNext}

                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                    <Button style={{ color: 'black' }}
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
          <Paper square elevation={0} sx={{ p: 3, background:'transparent' }}>
            <Button style={Btn} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Edit
            </Button>
            <Button style={Btn} onClick={handleFinish} sx={{ mt: 1, mr: 1 }}>
              START PLAYING!
            </Button>
          </Paper>
        )}
      </Box>
      <div style={{position:"absolute", bottom:100, left:'0', right:'0', marginRight:'auto',marginLeft:'auto',textAlign:'center'}}>
        {
        newRascalName && <h1 style={{fontSize:'48px'}}>{`Hi, I'm ${newRascalName}`}</h1> }

      </div>
    </>
  );
}