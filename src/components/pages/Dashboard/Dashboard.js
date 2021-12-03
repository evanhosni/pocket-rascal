import React,{useState, useEffect} from 'react';

import StatusBar from './StatusBars'
import BottomNav from './BottomNav';
import Scene from './Scene'
import API from '../../../utils/API'

export default function Dashboard({currentPage,handlePageChange,userId,myRascal,setMyRascal, unlockedItems,equippedItems,setUnlockedItems,setEquippedItems,logOut,userCoins, setUserCoins, userLevel, setUserLevel}) {
  let newRascal
  useEffect(() => {
    // console.log(myRascal)
    // Store the interval id in a const, so you can cleanup later
    const decayTimer = setInterval(() => {

      // setMyRascal(myRascal=>({...myRascal, happiness:(myRascal.happiness*.99)}));
      setMyRascal(myRascal=>{
        newRascal = {...myRascal, happiness:(myRascal.happiness*.99)}
        // console.log(newRascal)
        return newRascal
      });
    
      
    }, 15000);

    const saveTimer = setInterval(()=> {
      console.log(newRascal)
      // UNCOMMNET OUT FOR RASCAL AND ITEM UPLOADING
      // let newItemArray = [...rascalItemArray]
      // API.updateRascal(newRascal)
      // API.updateItems(rascalItemArray,myRascal.id)
    },60000)
    
    return () => {
      // Since useEffect dependency array is empty, this will be called only on unmount
      clearInterval(saveTimer)
      clearInterval(decayTimer);
    };
  }, []);
  const rascalSave=()=>{
    let copy = {...myRascal}
    console.log(copy)
  }

  const [rascalHunger, setRascalHunger] = useState(false)

  return (
    <div>
      <div>
      <StatusBar currentPage={currentPage} handlePageChange={handlePageChange} userId={userId}  logOut={logOut} myRascal={myRascal}/>

      </div>
      <div>
        <Scene myRascal={myRascal} setMyRascal={setMyRascal} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems}/>
      </div>
      <div>
        <BottomNav currentPage={currentPage} handlePageChange={handlePageChange} myRascal={myRascal} setMyRascal={setMyRascal} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} setUserLevel={setUserLevel} rascalHunger={rascalHunger} setRascalHunger={setRascalHunger} />
      </div>
      
    </div>
  );
}