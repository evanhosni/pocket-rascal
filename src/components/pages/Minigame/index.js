import React, { useState } from 'react';
import MiniSelection from './Games/MiniSelection'
import MiniNav from './MiniNav';
import MiniTopBar from './MiniTopBar';

export default function MiniPlayground({userId, logOut, myRascal, userCoins, setUserCoins, userXP, setUserXP, userLevel, currentPage, handlePageChange}) {

  const [earnedCoins, setEarnedCoins] = useState(2)

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <MiniTopBar 
        currentPage={currentPage} handlePageChange={handlePageChange} userId={userId} logOut={logOut} myRascal={myRascal} earnedCoins={earnedCoins} setEarnedCoins={setEarnedCoins} 
        />
        <MiniSelection 
        earnedCoins={earnedCoins} setEarnedCoins={setEarnedCoins} userCoins={userCoins} setUserCoins={setUserCoins} handlePageChange={handlePageChange} myRascal={myRascal} userXP={userXP} setUserXP={setUserXP}
        />
        <MiniNav 
        userCoins={userCoins} userLevel={userLevel} handlePageChange={handlePageChange}
        />
    </div>
  );
}