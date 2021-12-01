import React, { useState, useEffect } from "react";
// import Navigation from './Navigation';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Scene from './pages/Dashboard/Scene';
import MiniPlayground from './pages/Minigame/index';
import CreateRascal from './pages/CreateRascal/index'
import BottomNav from './pages/Dashboard/BottomNav'
// import StatusBars from './pages/Dashboard/StatusBars'
import Dashboard from './pages/Dashboard/Dashboard'
import API from '../utils/API'

export default function ContentContainer() {
  const [currentPage, setCurrentPage] = useState('Login');

  // State variable for current user and token for authentication
  const [userState, setUserState] = useState({
    email: "",
    id: 0
  })
  const [token, setToken] = useState("")
  const [myRascal, setMyRascal] = useState({
    name: '',
    color: '',
    level: 50,
    happiness:50,
    hunger: 50,
    love: 50,
    care: 50
  })
  const [rascalLimbArray, setRascalLimbArray] = useState([])

  function updateRascalStats(key, val) {
    console.log("called")
    setMyRascal({
      ...myRascal,
      [key]: val
    })
  }

  // useeffect on page load to check token in local storage for authenticity, then updating current user, rascal, limbs
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (myToken) {
      API.verify(myToken).then(async res => {
        setToken(myToken)
        setUserState({
          email: res.data.email,
          id: res.data.id
        })

        const rascalDat = await API.loadRascal(res.data.id)
        const limbDat = await API.loadLimbs(rascalDat.data.id)
        setMyRascal(rascalDat.data)
        setRascalLimbArray(limbDat.data)
        setCurrentPage("Dashboard")
        // const interval = setInterval(() => {
        //   console.log('This will run every 10 seconds!');
        //   console.log(myRascal)
        //   setMyRascal({...myRascal,happiness:myRascal.happiness-2})
        // }, 10000);
        // return () => clearInterval(interval);
        // rascalUpdate()


      }).catch(err => {
        console.log("BONK!")
        console.log(err)
        localStorage.removeItem('token')
        setCurrentPage('Login')
      })
    }

  }, [])
// updates rascal whenever userstate changes
  useEffect(async () => {
    if (userState.id) {
      const rascalDat = await API.loadRascal(userState.id)
      const limbDat = await API.loadLimbs(rascalDat.data.id)
      setMyRascal(rascalDat.data)
      setRascalLimbArray(limbDat.data)
      
    }
  }, [userState])

  // function for happiness decay TODO: add random effects
  // function decayTimer(){
  //   console.log("step2")
  //     console.log(myRascal.happiness)
  //     console.log(userState)
      

  //       if(myRascal.happiness > 75){
  //         updateRascalStats("happiness",myRascal.happiness-3)
  //         console.log("big sad")
  //       }else if(myRascal.happiness > 50){
  //         updateRascalStats("happiness",myRascal.happiness-2)
  //         console.log("mid sad")
  //       }else if(myRascal.happiness > 25){
  //         updateRascalStats("happiness",myRascal.happiness-1)
  //         console.log("smol sad")
  //       }
  // }
  // function rascalUpdate() {

  //   setInterval(decayTimer,15000)
  // }


// logout function being passed down into navbar
  const logOut = () => {
    localStorage.removeItem("token");
    setToken('');
    setUserState({
      email: '',
      userId: 0
    });
    setMyRascal({})
    setCurrentPage('Login')
  }
  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'SignUp') {
      return <SignUp token={token} setToken={setToken} userState={userState} setUserState={setUserState} currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'Login') {
      return <Login token={token} setToken={setToken} userState={userState} setUserState={setUserState} currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'CreateRascal') {
      return (
        <div>
          <CreateRascal />
          <Scene />
          <BottomNav />

        </div>
      )
    }
    if (currentPage === 'Dashboard') {
      return (
        <div>
          {myRascal.id&&<Dashboard currentPage={currentPage} handlePageChange={handlePageChange} userId={userState.id} logOut={logOut} myRascal={myRascal} setMyRascal={setMyRascal} rascalLimbArray={rascalLimbArray} setRascalLimbArray={setRascalLimbArray} />}
        </div>
      )
    }
    return (
      <div>
        <MiniPlayground />
      </div>
    )
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      {/* <Navigation currentPage={currentPage} handlePageChange={handlePageChange} userId={userState.id} logOut={logOut} /> */}
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </div>
  );
}