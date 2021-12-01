import React from 'react';
import Slingshot from './Slingshot'
import SnakeMini from './Snake';

export default function MiniSelection() {
    var minigames = [<Slingshot />, <SnakeMini />];

    const selectedGame = minigames[Math.floor(Math.random() * (minigames.length))]


    return selectedGame
    

}