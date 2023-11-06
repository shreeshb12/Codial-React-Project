// import {useEffect, useState} from "react";
import {Routes,Route, Navigate} from 'react-router-dom';
import {Loader,Navbar} from "./";
import { Home,Login,Signup,Settings,UserInfo } from "../pages";
import { useAuth } from "../hooks";
// import { LOCALSTORAGE_TOKEN_KEY, getItemFromLocalStorage } from "../utils";

const About=()=>{
  return(
    <h1>About</h1>
  )
}

const Error404=()=>{
  return(
    <h1>Error 404 Not Found</h1>
  )
}
function App() {
  const auth=useAuth();
  const PrivateRoute=({children})=>{
     return(auth.user?children:<Navigate to='/Login'/>)
  }
  if(auth.loading)
  {
    return( <Loader/> )
  }
  return (
    <div className="App">
    <Navbar />
    <Routes>
      <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route exact path="/About" element={<PrivateRoute><About/></PrivateRoute>}/>
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/Register" element={<Signup />} />
      <Route exact path="/Settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>
      <Route exact path="/Userinfo/:userid" element={<PrivateRoute><UserInfo/></PrivateRoute>}/>
      <Route path="*" element={<Error404 />} />
    </Routes>
  </div>
  );
}

export default App;
