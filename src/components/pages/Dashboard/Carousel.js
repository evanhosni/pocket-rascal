import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./carousel.css"

export default class Carousel extends Component {
  render() {

    const settings =  {
        centerPadding: 35,
        centerMode: true,
        duration: 75,
        slidesToShow: 3
    };

    const customDiv = {
        display: 'flex',
        justifySelf: 'space-around',
        alignContent: 'flex-end',
    }

    const customBtn = {
        padding: 0,
        cursor:'pointer',
        background:'white',
        border: 'solid black 3px',
        borderRadius: '50%',
    }

    return (
      <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}}>
        <Slider { ...settings }>
            <div style={customDiv}>
                <Button style={customBtn} className="bruh" >
                </Button>
            </div>
            <div style={customDiv}>
                <Button style={customBtn} >
                <img src="./assets/body_fuzzy.png" className="body" style={{objectFit: 'cover', height: '33.6px', objectPosition:'-1% center'}}/>
                </Button>
            </div>
            <div style={customDiv}>
                <Button style={customBtn} >
                <img src="./assets/eyes_tired.png" className="eyes" style={{objectFit: 'cover', height: '80px', objectPosition:'0.69% 6.4px'}}/>
                </Button>
            </div>
            <div style={customDiv}>
                <Button style={customBtn} >
                <img src="./assets/nose_disguise.png" className="nose" style={{objectFit: 'cover', height: '72px', objectPosition:'45% -1.6px'}}/>
                </Button>
            </div>
            <div style={customDiv}>
                <Button style={customBtn} >
                <img src="./assets/null.png" style={{height: '100%'}}/>
                </Button>
            </div>
            <div style={customDiv}>
                <Button style={customBtn} >
                <div style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold'}}>3<span style={{fontSize:'xxx-large'}}>/</span>8</div>
                </Button>
            </div>
        </Slider>
      </div>
    );
  }
}