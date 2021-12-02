import * as React from 'react';
import Slider from 'infinite-react-carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./carousel.css"

export default function Carousel({prevEvent,rascalItemArray,setRascalItemArray}) {

    console.log('carousel',rascalItemArray)

    const settings =  {
        centerPadding: 35,
        centerMode: true,
        duration: 75,
        slidesToShow: 3
    };

    const colorArray = [...rascalItemArray].filter(thingy => thingy.type === 'color')
    const bodyArray = [...rascalItemArray].filter(thingy => thingy.type === 'body')
    const eyesArray = [...rascalItemArray].filter(thingy => thingy.type === 'eyes')
    const noseArray = [...rascalItemArray].filter(thingy => thingy.type === 'nose')
    const mouthArray = [...rascalItemArray].filter(thingy => thingy.type === 'mouth')
    const itemArray = [...rascalItemArray].filter(thingy => thingy.type === 'item')


    // const checkLength = (e) => { //TODO - make items default to active if theres only 3 or less
    //     console.log('yup')
    //     if (itemArray.length === 0) {
    //         return
    //     }
    //     if (itemArray.length <= 3) {
    //         const nodes = document.getElementsByClassName('carousel-item')
    //         for (let i = 0; i < nodes.length; i++) {
    //             nodes[i].setAttribute("class","carousel-item active")
    //         }
    //     }
    // }

    const color = () => {
        if (colorArray.length === 0) {
            return (
                <div>
                    <Button>
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        return  colorArray.map((object, i) =>
        <div obj={object} key={i}>
            <Button />
        </div> )
    }

    const body =() => {
        if (bodyArray.length === 0) {
            return (
                <div>
                    <Button >
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        return  bodyArray.map((object, i) =>
        <div obj={object} key={i}>
            <Button />
        </div>)
    }

    const eyes =() => {
        if (eyesArray.length === 0) {
            return (
                <div>
                    <Button >
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        return  eyesArray.map((object, i) =>
        <div obj={object} key={i}>
            <Button />
        </div>)
    }

    const nose =() => {
        if (noseArray.length === 0) {
            return (
                <div>
                    <Button >
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        return  noseArray.map((object, i) =>
        <div obj={object} key={i}>
            <Button />
        </div>)
    }

    const mouth =() => {
        if (mouthArray.length === 0) {
            return (
                <div>
                    <Button >
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        return  mouthArray.map((object, i) =>
        <div obj={object} key={i}>
            <Button />
        </div>)
    }

    const items =() => {
        if (itemArray.length === 0) {
            return (
                <div>
                    <Button >
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        if (itemArray.length <= 3) {
            return itemArray.map((object, i) =>
            <div>
                <Button>
                    <img src={`./assets/${object.name}.png`} style={{height: '100%'}}/>
                </Button>
            </div>
        )
        }
        return itemArray.map((object, i) =>
            <div>
                <Button >
                    <img src={`./assets/${object.name}.png`} style={{height: '100%'}}/>
                </Button>
            </div>
        )
    }

    // console.log(prevEvent+`Array`)

    if (prevEvent != 'items') {
        return(
            <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}}>
                <Slider { ...settings } className="active">
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
    } else {
    return(
        <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}}>
            <Slider { ...settings } >
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
}

// checkLength()


// }


            {/* <div>
                <Button >
                <img src="./assets/body_fuzzy.png" className="body" style={{objectFit: 'cover', height: '33.6px', objectPosition:'-1% center'}}/>
                </Button>
            </div>
            <div>
                <Button >
                <img src="./assets/eyes_tired.png" className="eyes" style={{objectFit: 'cover', height: '80px', objectPosition:'0.69% 6.4px'}}/>
                </Button>
            </div>
            <div>
                <Button >
                <img src="./assets/nose_disguise.png" className="nose" style={{objectFit: 'cover', height: '72px', objectPosition:'45% -1.6px'}}/>
                </Button>
            </div>
            <div>
                <Button >
                <img src="./assets/null.png" style={{height: '100%'}}/>
                </Button>
            </div>
            <div>
                <Button >
                <div style={{display: 'flex', alignItems: 'center', color: 'black', fontSize: 'xx-large', fontWeight: 'bold'}}>3<span style={{fontSize:'xxx-large'}}>/</span>8</div>
                </Button>
            </div> */}