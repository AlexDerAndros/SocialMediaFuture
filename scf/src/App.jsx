import "./App.css";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid, faExclamationTriangle, faX } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'
import { Link, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";

const QuizContext = createContext();

export default function App() {
  const[user1, setUser1] = useState(false);
  const[user2, setUser2] = useState(false);
  const[dtd, setDtd] = useState(false);
  const[currentUser, setCurrentUser] = useState("");
  const alertRef = useRef(null);
  const location = useLocation();

  const pressUser1 = () => {
    const newUser1 = true;
    const newUser2 = false;
    setUser1(newUser1);
    setUser2(newUser2);
    localStorage.setItem("user1", newUser1);
    localStorage.setItem("user2", newUser2);
   

  };
  const pressUser2 = () => {
    const newUser1 = false;
    const newUser2 = true;
    setUser1(newUser1);
    setUser2(newUser2);
    localStorage.setItem("user1", newUser1);
    localStorage.setItem("user2", newUser2);

  };
  const pressDtd = () => {
    const newValue = !dtd;
    setDtd(newValue);
    localStorage.setItem("alert", newValue);
  };
  const checkUser = () => {
    if(localStorage.getItem("user1") == "true" && localStorage.getItem("user2") == "false") {
      setUser1(true);
      setUser2(false);
    }
    else {
      setUser1(false);
      setUser2(true);
    }
    if(location.pathname == "/User1"){
      setCurrentUser("User 1");
    }
    else {
      setCurrentUser("User 2");
    }
  };
  const checkAlert = () => {
    if(localStorage.getItem("alert") == "true"){
       gsap.fromTo(alertRef.current, {x:-200, opacity: 0}, {x: 350, opacity: 1, duration: 1, ease: "power3.inOut"});
       setDtd(true);
    }else {
      setDtd(false);
    }
  };

  useEffect(() => {
    checkUser();
    checkAlert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user1, user2, location, dtd]);

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/5 h-screen p-5 flex flex-col  items-left
       gap-y-20 bg-sidebar text-white text-xl font-inter ">
        <Link to="/">
         <div className="font-poppins text-2xl font-bold ">
          Learning App
         </div>
        </Link>
        <div className="flex flex-col gap-y-5 cursor-pointer">
        <Link to="/User1">
           <div className={user1 == true && user2 == false ? `text-white` : `text-mainBg`} onClick={pressUser1}>
             {user1 == true && user2 == false ? ( <FontAwesomeIcon icon={faCircleSolid}/>): (<FontAwesomeIcon icon={faCircleRegular}/>)}
             User 1
           </div>
         </Link> 
         <Link to="/User2">
           <div className={user1 == false && user2 == true ? `text-white`: `text-mainBg`} onClick={pressUser2}>
             {user1 == false && user2 == true  ? ( <FontAwesomeIcon icon={faCircleSolid}/>): (<FontAwesomeIcon icon={faCircleRegular}/>)}
             User 2 
          </div>
         </Link>
        </div>
        <div className={dtd == true ? `text-white cursor-pointer`: `text-mainBg cursor-pointer`} onClick={pressDtd}>
          {dtd == true ? ( <FontAwesomeIcon icon={faCircleSolid}/>): (<FontAwesomeIcon icon={faCircleRegular}/>)}
           Data Tracker Detector {dtd == true ? (<span>activated</span>): (<span>deactivated</span>)}
        </div>
      </div>
      {dtd == true && (
        <div ref={alertRef} 
        className="absolute top-25 z-1 w-175 h-150 bg-red-800 
        rounded-xl p-5  text-3xl text-white font-inter flex flex-col gap-5 items-center">
            <FontAwesomeIcon icon={faX} size="2x" onClick={pressDtd} className="absolute left-0"/>
            <FontAwesomeIcon icon={faExclamationTriangle} size="10x"/>
            <span className="text-6xl font-bold ">Attention!</span>
           Your data will be tracked on this website and shared with social media networks. Please leave this site immediately.
           
        </div>  
      )}
      <QuizContext.Provider value={{currentUser}}>
       <Routes>
          <Route path="/User1" element={<Quiz/>}/>
          <Route path="/User2" element={<Quiz/>}/> 
         </Routes>
      </QuizContext.Provider>
    </div>
  );
  };

function Home() {
  return(
    <>
    </>
  );
};
function Quiz() {
  const {currentUser} = useContext(QuizContext);
  return (
    <div className="text-white font-inter p-10 flex flex-col items-left w-full ">
       <div className="text-3xl font-bold">
         Quiz {currentUser}
       </div>
    </div>
  );
};