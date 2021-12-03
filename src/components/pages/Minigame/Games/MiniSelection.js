import React from 'react';
import Slingshot from './Slingshot/Slingshot'
import SnakeMini from './Snake/Snake';

export default function MiniSelection({earnedCoins, setEarnedCoins, userCoins, setUserCoins, handlePageChange}) {
    var minigames = [
        <Slingshot 
        earnedCoins={earnedCoins} 
        setEarnedCoins={setEarnedCoins} 
        />,
        <SnakeMini color1="#248ec2"
        color2="#1d355e"
        backgroundColor="#ebebeb" 
        earnedCoins={earnedCoins}
        setEarnedCoins={setEarnedCoins}
        userCoins={userCoins}
        setUserCoins={setUserCoins} 
        handlePageChange={handlePageChange}
        />,
    ];

    const selectedGame = minigames[Math.floor(Math.random() * (minigames.length))]


    return selectedGame
    

}