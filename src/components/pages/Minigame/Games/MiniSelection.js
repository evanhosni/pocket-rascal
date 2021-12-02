import React from 'react';
import Slingshot from './Slingshot'
import SnakeMini from './Snake';

export default function MiniSelection({earnedCoins, setEarnedCoins, userCoins, setUserCoins}) {
    var minigames = [<Slingshot earnedCoins={earnedCoins} setEarnedCoins={setEarnedCoins} />, <SnakeMini />];

    const selectedGame = minigames[Math.floor(Math.random() * (minigames.length))]


    return selectedGame
    

}