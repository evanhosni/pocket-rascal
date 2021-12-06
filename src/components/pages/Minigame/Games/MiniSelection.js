import React from 'react';
import Slingshot from './Slingshot/Slingshot'
import SnakeMini from './Snake/Snake';
import Pinball from './Pinball/Pinball'

export default function MiniSelection() {
    var minigames = [
        // <Slingshot />,
        <SnakeMini 
        color1="#15aabf"
        color2="#fab005"
        backgroundColor="#495057"
        />,
        <Pinball/>
    ];

    const selectedGame = minigames[Math.floor(Math.random() * (minigames.length))]


    return selectedGame
    

}