import "./App.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'

export default function App() {
  const[user, setUser] = useState(false);
  const[dtd, setDtd] = useState(false);
  
  const pressUser = () => {
    setUser(!user);
    localStorage.setItem("user", user);
  }
  const pressDtd = () => {
    setDtd(!dtd);
  }
  const checkUser = () => {
    if(localStorage.getItem("user") == "true") {
      setUser(true);
    }
    else {
      setUser(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <>
      <div className="w-1/5 h-screen p-5 flex flex-col items-left
       gap-y-20 bg-sidebar text-white text-xl font-inter ">
        <div className="font-poppins text-2xl font-bold ">
          Learning App
        </div>
        <div className="flex flex-col gap-y-5">
         <div className="" onClick={pressUser}>
           {user == true ? ( <FontAwesomeIcon icon={faCircleRegular}/>): (<FontAwesomeIcon icon={faCircleSolid}/>)}
           User 1
         </div>
         <div className="" onClick={pressUser}>
          {user == true ? ( <FontAwesomeIcon icon={faCircleSolid}/>): (<FontAwesomeIcon icon={faCircleRegular}/>)}
           User 2 {user} 
         </div>
        </div>
        <div className="" onClick={pressDtd}>
           Data Tracker Detector  {user.toString()} 
        </div>
      </div>
    </>
  );
}

