import React,{useEffect} from 'react';

import StatusBar from './StatusBars'
import BottomNav from './BottomNav';
import Scene from './Scene'
import API from '../../../utils/API'

export default function Dashboard({currentPage,handlePageChange,userId,myRascal,setMyRascal, rascalLimbArray,setRascalLimbArray,logOut}) {
  let newRascal
  useEffect(() => {
    console.log(myRascal)
    // Store the interval id in a const, so you can cleanup later
    const decayTimer = setInterval(() => {

      // setMyRascal(myRascal=>({...myRascal, happiness:(myRascal.happiness*.99)}));
      setMyRascal(myRascal=>{
        newRascal = {...myRascal, happiness:(myRascal.happiness*.99)}
        console.log(newRascal)
        return newRascal
      });
    
      
    }, 15000);

    const saveTimer = setInterval(()=> {
      // UNCOMMNET OUT FOR RASCAL AND LIMB UPLOADING
      // let newLimbArray = [...rascalLimbArray]
      // API.updateRascal(newRascal)
      // for (const limb of newLimbArray) {
      //   API.updateLimbs(limb.id,limb)
      // }
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

  return (
    <div>
      <div>
      <StatusBar currentPage={currentPage} handlePageChange={handlePageChange} userId={userId}  logOut={logOut} myRascal={myRascal}/>

      </div>
      <div>
        <Scene />
      </div>
      <div>
        <BottomNav />
      </div>
      
    </div>
  );
}