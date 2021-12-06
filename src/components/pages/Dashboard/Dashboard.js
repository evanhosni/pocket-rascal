import React,{useState, useEffect, useContext } from 'react';
import StatusBar from './StatusBars'
import BottomNav from './BottomNav';
import Scene from './Scene'
import API from '../../../utils/API'
import AppContext from "./../../AppContext";
import "./style.css"

export default function Dashboard({ myRascal,setMyRascal }) {

  const myContext = useContext(AppContext);

  let newRascal
  useEffect(() => {
    // console.log(myRascal)
    // Store the interval id in a const, so you can cleanup later
    const decayTimer = setInterval(() => {

      // setMyRascal(myRascal=>({...myRascal, happiness:(myRascal.happiness*.99)}));
      setMyRascal(myRascal=>{
        newRascal = {...myRascal, happiness:(myRascal.happiness*.98)}
        // console.log(newRascal)
        return newRascal
      });
    
      
    }, 60000);


    
    return () => {
      // Since useEffect dependency array is empty, this will be called only on unmount

      clearInterval(decayTimer);
    };
  }, []);
  const rascalSave=()=>{
    let copy = {...myRascal}
    console.log(copy)
  }

  ////triggers not enough coins snackbar for feeding/washing
  const [openFail, setOpenFail] = useState(false);


  return (
    <div>
      <div>
      <StatusBar />
      </div>
      <div>
        <Scene openFail={openFail} setOpenFail={setOpenFail}
        />
      </div>
      <div>
        <BottomNav openFail={openFail} setOpenFail={setOpenFail}
        />
      </div>
      
    </div>
  );
}