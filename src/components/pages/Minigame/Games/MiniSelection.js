import React from 'react';
import Slingshot from './Slingshot/Slingshot'
import SnakeMini from './Snake/Snake';
import Pinball from './Pinball/Pinball'

export default function MiniSelection() {
    var minigames = [
        // <Slingshot />,
        // <SnakeMini 
        // color1="#248ec2"
        // color2="#1d355e"
        // backgroundColor="#ebebeb"
        // />,
        <Pinball/>
    ];

    const selectedGame = minigames[Math.floor(Math.random() * (minigames.length))]


    return selectedGame
    

}