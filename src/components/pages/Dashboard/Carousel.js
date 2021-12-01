import React from 'react';
import Slider from 'infinite-react-carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./carousel.css"

export default function Carousel(prevEvent) {

    const previousEvent = prevEvent;

    const settings = {
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
        cursor: 'pointer',
        background: 'white',
        border: 'solid black 3px',
        borderRadius: '50%',
    }

    console.log(previousEvent)

    const colorArray = [0, 1, 2, 3]
    const bodyArray = [0, 1, 2, 3]
    const eyesArray = [0, 1, 2, 3]
    const noseArray = [0, 1, 2, 3]
    const mouthArray = [0, 1, 2, 3]
    const limbsArray = [0, 1, 2, 3]


    function chooseArray(prevEvent) {
        switch (prevEvent) {
            case 'color':
                return (
                    <div>
                        {colorArray.map((object, i) =>
                            <div style={customDiv} obj={object} key={i}>
                                <Button style={customBtn} ></Button>
                            </div>
                        )}
                    </div>
                );
            case 'body':
                return (
                    <div>
                        {bodyArray.map((object, i) =>
                            <div style={customDiv} obj={object} key={i}>
                                <Button style={customBtn} />
                            </div>
                        )}
                    </div>
                )
            default:
                return (
                    <div></div>
                )


        }

    }

    const colors = (
        colorArray.map((object, i) =>
            <div style={customDiv} obj={object} key={i}>
                <Button style={customBtn} ></Button>
            </div>
        )

    )

    const body = (
        bodyArray.map((object, i) =>
                            <div style={customDiv} obj={object} key={i}>
                                <Button style={customBtn} />
                            </div>
                        )
    )


    return (
        <div style={{ width: '70%', maxWidth: '400px', margin: 'auto' }}>
            <Slider {...settings}>

                {prevEvent === 'color' ? colors : prevEvent === 'body' ? body : (<div></div>) }

                {colors}

            </Slider>
        </div>
    )
}


// if (prevEvent === 'color') {
//     console.log('doin this', prevEvent)
//     return (
//         <div style={{ width: '70%', maxWidth: '400px', margin: 'auto' }}>
//             <Slider {...settings}>
//                 {colorArray.map((object, i) =>
//                     <div style={customDiv} obj={object} key={i}>
//                         <Button style={customBtn} />
//                     </div>
//                 )}
//             </Slider>
//         </div>
//     )
// } else if (prevEvent === 'body') {
//     console.log('doin this', prevEvent)
//     return (
//         <div style={{ width: '70%', maxWidth: '400px', margin: 'auto' }}>
//             <Slider {...settings}>
//                 {bodyArray.map((object, i) =>
//                     <div style={customDiv} obj={object} key={i}>
//                         <Button style={customBtn} />
//                     </div>
//                 )}
//             </Slider>
//         </div>
//     );
// } else {
//     console.log('doin this', prevEvent)
//     // for some reason there must be a slider returned otherwise formatting issue
//     return (
//         <div style={{ width: '70%', maxWidth: '400px', margin: 'auto' }}>
//             <Slider {...settings}>
//                 <div />
//             </Slider>
//         </div>
//     )
// }


// }


/* <div style={customDiv}>
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
            </div> */
