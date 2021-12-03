import React from 'react';
import Slingshot from './Slingshot/Slingshot'
import SnakeMini from './Snake/Snake';

export default function MiniSelection({earnedCoins, setEarnedCoins, userCoins, setUserCoins, handlePageChange, myRascal, userXP, setUserXP}) {
    var minigames = [
        <Slingshot 
        earnedCoins={earnedCoins} 
        setEarnedCoins={setEarnedCoins}
        userCoins={userCoins}
        setUserCoins={setUserCoins} 
        myRascal={myRascal}
        userXP={userXP}
        setUserXP={setUserXP}
        />,
        <SnakeMini color1="#248ec2"
        color2="#1d355e"
        backgroundColor="#ebebeb" 
        earnedCoins={earnedCoins}
        setEarnedCoins={setEarnedCoins}
        userCoins={userCoins}
        setUserCoins={setUserCoins} 
        myRascal={myRascal}
        userXP={userXP}
        setUserXP={setUserXP}
        handlePageChange={handlePageChange}
        />,
    ];

    const selectedGame = minigames[Math.floor(Math.random() * (minigames.length))]


    return selectedGame
    

}