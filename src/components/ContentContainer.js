import React, { useState, useEffect } from "react";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Scene from './pages/Dashboard/Scene';
import MiniPlayground from './pages/Minigame/index';
import CreateRascal from './pages/CreateRascal/index'
import BottomNav from './pages/Dashboard/BottomNav'
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
    level: 1,
    xp: 0,
    xpToLevelUp: 100,
    happiness: 50,
    hunger: 50,
    love: 50,
    care: 50,
    coins:500
  })
  const [unlockedItems, setUnlockedItems] = useState([])
  const [equippedItems, setEquippedItems] = useState([])

  function updateRascalStats(key, val) {
    console.log("called")
    setMyRascal({
      ...myRascal,
      [key]: val
    })
  }

  // useeffect on page load to check token in local storage for authenticity, then updating current user, rascal, items
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    API.testRoute({ test: "hello" }, myToken).then(res => console.log(res))
    if (myToken) {
      API.verify(myToken).then(async res => {
        setToken(myToken)
        setUserState({
          email: res.data.email,
          id: res.data.id
        })

        const rascalDat = await API.loadRascal(res.data.id)
        const equipDat = await API.loadEquippedItems(rascalDat.data.id)
        const unlockDat = await API.loadUnlockedItems(rascalDat.data.id)
        setMyRascal(rascalDat.data)
        setEquippedItems(equipDat.data)
        setUnlockedItems(unlockDat.data)
        if(currentPage!=="Dashboard"){setCurrentPage("Dashboard")}
        // const interval = setInterval(() => {
        //   console.log('This will run every 10 seconds!');
        //   console.log(myRascal)
        //   setMyRascal({...myRascal,happiness:myRascal.happiness-2})
        // }, 10000);
        // return () => clearInterval(interval);
        // rascalUpdate()


      }).catch(err => {
        logOut()
      })
    }

  }, [])


  // logout function being passed down into navbar
  const logOut = () => {
    localStorage.removeItem("token");
    setToken('');
    setUserState({
      email: '',
      userId: 0
    });
    setMyRascal({})
    setEquippedItems([])
    setUnlockedItems([])
    setCurrentPage('Login')
  }
  
  const [userLevel, setUserLevel] = useState(myRascal.level);
  const [userXP, setUserXP] = useState(myRascal.xp)
  const levelSystem = () => {
    // const userLevel = myRascal.level;
    let level = myRascal.level;
    let xp = myRascal.xp;
    var xpToLevelUp = myRascal.xpToLevelUp;
  
    if (xp > xpToLevelUp) {
      level++;
      xpToLevelUp = xpToLevelUp + (50*level)
    }
  
  }

  useEffect(() => {
    let level = myRascal.level;
    let xp = myRascal.xp;
    let xpToLevelUp = myRascal.xpToLevelUp;
    console.log('hi working')
  
    if (xp > xpToLevelUp) {
      level++;
      console.log(level)
      xpToLevelUp = xpToLevelUp + (50*level)
      myRascal.level = level;
      myRascal.xpToLevelUp = xpToLevelUp;
      setUserLevel(myRascal.level);
    } else {return}
  },[userXP])



  //starting location for the users coins
  const [userCoins, setUserCoins] = useState(myRascal.coins);
  //starting location for users level


  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'SignUp') {
      return <SignUp token={token} setToken={setToken} userState={userState} setUserState={setUserState} currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'Login') {
      return <Login token={token} setToken={setToken} setMyRascal={setMyRascal} userState={userState} setUserState={setUserState} currentPage={currentPage} handlePageChange={handlePageChange} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />;
    }
    if (currentPage === 'CreateRascal') {
      return (
        <div>
          <CreateRascal setMyRascal={setMyRascal} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} userState={userState} handlePageChange={handlePageChange} />
          <Scene currentPage={currentPage} handlePageChange={handlePageChange} userId={userState.id} logOut={logOut} myRascal={myRascal} setMyRascal={setMyRascal} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} />
          

        </div>
      )
    }
    if (currentPage === 'Dashboard') {
      return (
        <div>
          {myRascal.color && unlockedItems[0] && <Dashboard 
          currentPage={currentPage} handlePageChange={handlePageChange} userId={userState.id} logOut={logOut} myRascal={myRascal} setMyRascal={setMyRascal} equippedItems={equippedItems} unlockedItems={unlockedItems} setEquippedItems={setEquippedItems} setUnlockedItems={setUnlockedItems} userCoins={userCoins} setUserCoins={setUserCoins} userLevel={userLevel} setUserLevel={setUserLevel} userXP={userXP} setUserXP={setUserXP}
          />}
        </div>
      )
    }
    return (
      <div>
        <MiniPlayground currentPage={currentPage} handlePageChange={handlePageChange} userId={userState.id} logOut={logOut} myRascal={myRascal} userCoins={userCoins} setUserCoins={setUserCoins} userXP={userXP} setUserXP={setUserXP} currentPage={currentPage} handlePageChange={handlePageChange} userLevel={userLevel} setUserLevel={setUserLevel} />
      </div>
    )
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {renderPage()}
    </div>
  );
}