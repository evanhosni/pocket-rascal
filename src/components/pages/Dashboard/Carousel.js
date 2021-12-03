import React, { useState, useEffect } from "react";
import Slider from 'infinite-react-carousel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./carousel.css"

export default function Carousel({prevEvent,unlockedItems,setUnlockedItems,setEquippedItems, equippedItems,setUpdateEquipmentPanel, updateEquipmentPanel}) {
    // React.useEffect(()=>{
    //     setUpdateEquipmentPanel(updateEquipmentPanel+1)
    // },[equippedItems])

    // console.log('carousel',unlockedItems)

    const settings = {
        centerPadding: 35,
        centerMode: true,
        duration: 75,
        slidesToShow: 3
    };

    const colorArray = [...unlockedItems].filter(thingy => thingy.type === 'color')
    const bodyArray = [...unlockedItems].filter(thingy => thingy.type === 'body')
    const eyesArray = [...unlockedItems].filter(thingy => thingy.type === 'eyes')
    const noseArray = [...unlockedItems].filter(thingy => thingy.type === 'nose')
    const mouthArray = [...unlockedItems].filter(thingy => thingy.type === 'mouth')
    const itemsArray = [...unlockedItems].filter(thingy => thingy.type === 'item')
    var newEquippedArray = [...equippedItems]
    function equipItem(e){
        let source = e.target.getAttribute("src")
        var isolate = source.split('/')[2].split('.')[0]
        let findItem = itemsArray.filter(item=>item.name===isolate)
        console.log(findItem)
        newEquippedArray.push(findItem[0])
        console.log(newEquippedArray)
        if(newEquippedArray.length>8){newEquippedArray.length=8}
        setEquippedItems(newEquippedArray)
        
        findItem = []
    }

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
            <div>
                <Button >
                    <img src={`./assets/${object.name}.png`} style={{height: '100%'}}/>
                </Button>
            </div>
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
            <div>
                <Button >
                    <img src={`./assets/${object.name}.png`} style={{height: '100%'}}/>
                </Button>
            </div>
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
            <div>
                <Button >
                    <img src={`./assets/${object.name}.png`} style={{ objectFit: 'cover', height: '100px', objectPosition: '0.69% 8px' }}/>
                </Button>
            </div>
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
            <div>
                <Button >
                    <img src={`./assets/${object.name}.png`} style={{ objectFit: 'cover', height: '90px', objectPosition: '50% -2px' }}/>
                </Button>
            </div>
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
                <Button >
                    <img src={`./assets/${object.name}.png`} style={{ objectFit: 'cover', height: '120px', objectPosition: '50% -8px' }}/>
                </Button>
        </div>)
    }

    const items =() => {
        
        if (itemsArray.length === 0) {
            return (
                <div>
                    <Button >
                        <img src="./assets/null.png" style={{ height: '100%' }} />
                    </Button>
                </div>
            )
        }
        return itemsArray.map((object, i) =>
            <div>
                <Button >
                    <img src={`./assets/${object.name}.png`} onClick={equipItem} item-size={`${object.size}`}style={{height: '100%'}}/>
                </Button>
            </div>
        )
    }

    var tempArray = () => {
        return(
            prevEvent === 'color' ? (colorArray)
            : prevEvent === 'body' ? (bodyArray)
            : prevEvent === 'eyes' ? (eyesArray)
            : prevEvent === 'nose' ? (noseArray)
            : prevEvent === 'mouth' ? (mouthArray)
            : prevEvent === 'items' ? (itemsArray)
            :[]
        )
    }


    // if (tempArray().length ===  2) { //TODO: center when only two items
    //     return(
    //         <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}}>
    //             <Slider { ...settings } prevEvent={prevEvent} className="onlytwo">
    //                 {prevEvent == 'color' ? (color())
    //                 : prevEvent == 'body' ? (body())
    //                 : prevEvent == 'eyes' ? (eyes())
    //                 : prevEvent == 'nose' ? (nose())
    //                 : prevEvent == 'mouth' ? (mouth())
    //                 : prevEvent == 'items' ? (items())
    //                 :(<div/>)}
    //             </Slider>
    //         </div>
    // )
    // } else {
        return(
            <div style={{width: '70%', maxWidth: '400px', margin: 'auto'}} id="custom-slider" data-update={updateEquipmentPanel}>
                <Slider { ...settings } prevEvent={prevEvent}>
                    {prevEvent === 'color' ? (color())
                    : prevEvent === 'body' ? (body())
                    : prevEvent === 'eyes' ? (eyes())
                    : prevEvent === 'nose' ? (nose())
                    : prevEvent === 'mouth' ? (mouth())
                    : prevEvent === 'items' ? (items())
                    :(<div/>)}
                </Slider>
        </div>
        )
    // }
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
