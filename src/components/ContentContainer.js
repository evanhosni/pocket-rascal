import React, { useState, useEffect, useContext } from "react";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Scene from './pages/Dashboard/Scene';
import MiniPlayground from './pages/Minigame/index';
import CreateRascal from './pages/CreateRascal/index'
import Dashboard from './pages/Dashboard/Dashboard'
import API from '../utils/API'
import AppContext from "./AppContext";

export default function ContentContainer() {

  //////////////////////////////////////setting all use state variables/functions to save in global context

  //update content being displayed
  const [currentPage, setCurrentPage] = useState('Login');
  const toggleCurrentPage = (value) => {
    setCurrentPage(value)
  }

  //current user and token for authentication
  const [userState, setUserState] = useState({
    email: "",
    id: 0
  })
  const toggleUserState = (email,id) => {
    setUserState({
      email: email,
      id: id
    })
  }

  const [token, setToken] = useState("")
  const toggleToken = (value) => {
    setToken(value)

  }

  //update users rascal settings
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
    coins: 1000
  })
  const [rascalBodySave,setRascalBodySave]= useState({})
  const toggleRascal = (value) => {
    setMyRascal(value)
  }

  //unlocked items -- items in the carousel that can be equipped
  const [unlockedItems, setUnlockedItems] = useState([])
  const toggleUnlockedItems = (value) => {
    setUnlockedItems(value)
  }

  //items currently equipped on the rascal
  const [equippedItems, setEquippedItems] = useState([])
  const toggleEquippedItems = (value) => {
    setEquippedItems(value)
  }

  //user level - based on xp points from interacting/minigames
  const [userLevel, setUserLevel] = useState(0);
  //user level is only set in content container - doesn't need to be set anywhere

  //xp impacts level -- increases from interactions/minigames
  const [userXP, setUserXP] = useState(0)
  const toggleUserXP = (value) => {
    setUserXP(value)
  }

  //coins to unlock items/buy interactions -- increase via minigames
  const [userCoins, setUserCoins] = useState(0);
  const toggleUserCoins = (value) => {
    setUserCoins(value)
  }

  //coins earned during current minigame sesh -- persistent if you keep playing games, added to user coins once you leave the minigame page -- not actually connected to the rascal at all 
  const [earnedCoins, setEarnedCoins] = useState(2)
  const toggleEarnedCoins = (value) => {
    setEarnedCoins(value)
  }


  //////////////////////////////////////////////////////////////// end set state variables 

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
        toggleUserCoins(rascalDat.data.coins)
        if (currentPage !== "Dashboard") { setCurrentPage("Dashboard") }
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

  //////////////////////////////saving all useState variables and const functions to the global context

  const userSettings = {
    currentPage: currentPage,
    setCurrentPage: toggleCurrentPage,
    user: userState,
    setUser: toggleUserState,
    userToken: token,
    setUserToken: toggleToken,
    userRascal: myRascal,
    setUserRascal: setMyRascal,
    equipItems: equippedItems,
    setEquipItems: toggleEquippedItems,
    unlockItems: unlockedItems,
    setUnlockItems: toggleUnlockedItems,
    coins: userCoins,
    setCoins: toggleUserCoins,
    level: userLevel,
    xp: userXP,
    setXP:toggleUserXP,
    logOut: logOut,
    earnings: earnedCoins,
    setEarnings: toggleEarnedCoins,
    rascalBodySave:rascalBodySave,
    setRascalBodySave:setRascalBodySave
  }

///////////////////////////////////////end context save


//use effect for rascal level - runs anytime XP is updated
  useEffect(() => {
    let level = myRascal.level;
    let xp = myRascal.xp;
    let xpToLevelUp = myRascal.xpToLevelUp;

    if (xp > xpToLevelUp) {
      ++level;
      console.log(level)
      xpToLevelUp = xpToLevelUp + (50 * level)
      setMyRascal({...myRascal,level:level,xpToLevelUp:xpToLevelUp})
      
      setUserLevel(level);
    } else { return }
  }, [userXP])
  useEffect(()=>{
    setMyRascal({...myRascal,...rascalBodySave})
  },[rascalBodySave])
  useEffect(()=>{
    if(myRascal.coins!=userCoins){
      setUserCoins(myRascal.coins)
    }
    if(myRascal.level!=userLevel){
      setUserLevel(myRascal.level)
    }
    API.updateRascal(userState.id,myRascal)
    
  },[myRascal])


//render correct content for page 
  const renderPage = () => {
    if (currentPage === 'SignUp') {
      return <SignUp />;
    }
    if (currentPage === 'Login') {
      return <Login />;
    }
    if (currentPage === 'CreateRascal') {
      return (
        <div>
          <CreateRascal />
          <Scene />


        </div>
      )
    }
    if (currentPage === 'Dashboard') {
      return (
        <div>
          {myRascal.color && unlockedItems[0] && <Dashboard myRascal={myRascal} setMyRascal={setMyRascal} />}
        </div>
      )
    }
    return (
      <div>
        <MiniPlayground />
      </div>
    )
  };


  ///////////////
  //returning the rendering function wrapped in the context provider. Allows all children to access the global context variables 
  return (
    <div>
      <AppContext.Provider value={userSettings}>
        {renderPage()}
      </AppContext.Provider>
    </div>
  );
}