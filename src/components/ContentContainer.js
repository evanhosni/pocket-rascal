import React, { useState, useEffect } from "react";
import Navigation from './Navigation';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Scene from './Scene';
import Minigame from './pages/Minigame';
import CreateRascal from './pages/CreateRascal/index'
import Dashboard from './pages/Dashboard/Dashboard'

export default function ContentContainer() {
  const [currentPage, setCurrentPage] = useState('Login');

  // State variable for current user and token for authentication
  const [userState, setUserState] = useState({
    email: "",
    id: 0
  })
  const [token, setToken] = useState("")

  // useeffect on page load to check token in local storage for authenticity, then updating current user
  useEffect(()=>{
    const myToken = localStorage.getItem("token");
    if(myToken){
      API.verify(myToken).then(res=>{
        setToken(myToken)
        setUserState({
          email:res.data.email,
          id:res.data.id
        })
        setCurrentPage('Scene')
      }).catch(err=>{
        console.log("Weird token dude!")
        console.log(err)
        localStorage.removeItem('token')
        setCurrentPage('Login')
      })
    }
  },[])
  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'SignUp') {
      return <SignUp />;
    }
    if (currentPage === 'Login') {
      return <Login token={token} setToken={setToken} userState={userState} setUserState={setUserState} currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === 'Scene') {
      return <Scene />;
    }
    if (currentPage === 'CreateRascal'){
      return (
      <div>
        <CreateRascal />
        <Scene />
      </div>
      )}
    return <Minigame />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <Navigation currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
    </div>
  );
}