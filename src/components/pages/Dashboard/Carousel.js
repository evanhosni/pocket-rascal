import * as React from 'react';
import Slider from 'infinite-react-carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./carousel.css"

export default function Carousel({prevEvent}) {

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

    console.log(prevEvent)

    const colorArray = [0,1,2,3]
    const bodyArray = [0,1,2,3]
    const eyesArray = [0,1,2,3]
    const noseArray = [0,1,2,3]
    const mouthArray = [0,1,2,3]
    const itemsArray = [0,1,2,3]

    // let array

    // const [content, setContent] = React.useState('bruh')

    // if(prevEvent === 'color') {
    //     setContent('color')
    // }


    //     return (
    //         <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}}>
    //             <Slider { ...settings }>
    //                 {colorArray.map((object, i) =>
    //                     <div style={customDiv} obj={object} key={i}>
    //                         <Button style={customBtn} ></Button>
    //                     </div> 
    //                 )}
    //                 {/* <div>bruh</div>
    //                 <div>bruhf</div>
    //                 <div>brugfh</div> */}
    //                 {/* <div>{content}</div> */}

    //             </Slider>
    //         </div>
    //     )
    // }
    const color = () => {
        return  colorArray.map((object, i) =>
        <div style={customDiv} obj={object} key={i}>
            <Button style={customBtn} />
        </div> )
    }

    const body =() => {
        return  bodyArray.map((object, i) =>
        <div style={customDiv} obj={object} key={i}>
            <Button style={customBtn} />
        </div>)
    }

    const eyes =() => {
        return  eyesArray.map((object, i) =>
        <div style={customDiv} obj={object} key={i}>
            <Button style={customBtn} />
        </div>)
    }

    const nose =() => {
        return  noseArray.map((object, i) =>
        <div style={customDiv} obj={object} key={i}>
            <Button style={customBtn} />
        </div>)
    }

    const mouth =() => {
        return  mouthArray.map((object, i) =>
        <div style={customDiv} obj={object} key={i}>
            <Button style={customBtn} />
        </div>)
    }

    const items =() => {
        return  itemsArray.map((object, i) =>
        <div style={customDiv} obj={object} key={i}>
            <Button style={customBtn} />
        </div>)
    }


    return(
    <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}}>
        <Slider { ...settings }>
            {prevEvent == 'color' ? (color())
            : prevEvent == 'body' ? (body())
            : prevEvent == 'eyes' ? (eyes())
            : prevEvent == 'nose' ? (nose())
            : prevEvent == 'mouth' ? (mouth())
            : prevEvent == 'items' ? (items())
            :(<div/>)}
        </Slider>
    </div>
    )
}



// }


            {/* <div style={customDiv}>
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
            </div> */}