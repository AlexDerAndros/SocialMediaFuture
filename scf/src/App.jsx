import "./App.css";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid, faExclamationTriangle, faX, faUser, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'
import { Link, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import {db} from "./firebase";

const QuizContext = createContext();

export default function App() {
  const[dtd, setDtd] = useState(false);
  const[currentUser, setCurrentUser] = useState("");
  const[theme, setTheme] = useState("England");
  const[sidebarUser, setSidebarUser] = useState(false);
  const alertRef = useRef(null);
  const UserRef = useRef(null);
  const location = useLocation();
  const themes = ["England", "Germany"];
  const pressDtd = () => {
    const newValue = !dtd;
    setDtd(newValue);
    localStorage.setItem("alert", newValue);
  };
  
  const pressSidebarUser = () => {
     gsap.fromTo(UserRef.current,{x:-100, opacity: 0}, {x:0, opacity: 1, duration: 0.5, ease: "power3.inOut" });
     const newsidebarUser = !sidebarUser;
     setSidebarUser(newsidebarUser);
     
  };
  const pressTheme = (th) => {
    setTheme(th);
  };

  const checkUser = () => {
   
    if(location.pathname == "/User1"){
      setCurrentUser("User 1");
    }
    else {
      setCurrentUser("User 2");
    }
  };

  const checkAlert = () => {
    if(localStorage.getItem("alert") == "true"){
       gsap.fromTo(alertRef.current, {xPercent:-40, yPercent: -10,  opacity: 0}, {xPercent: 40 , yPercent: -10,opacity: 1, duration: 1, ease: "power3.inOut"});
       setDtd(true);
    }else {
      setDtd(false);
    }
  };

  const User = ({luser, user, icon, press}) => {
    return (
        <Link to={`${luser}`}  onClick={press}>
           <div className={location.pathname == luser ? "text-white" : "text-user" }>
             <FontAwesomeIcon icon={icon} className={sidebarUser == true && "hidden"  }/> User {user}
           </div>
         </Link> 
    );
  }
  useEffect(() => {
    checkUser();
    checkAlert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ location, dtd]);

  return (
    <div className="flex flex-row w-full gap-0">
       
      <div className="w-1/5 h-screen p-5 flex flex-col  items-left
        justify-between  bg-sidebar text-white text-xl font-inter ">
        
        <div className="flex flex-col gap-y-5 cursor-pointer">
          {location.pathname == "/User1" ? <User luser={'/User1'}  user={"1"} icon={faUser} press={pressSidebarUser} />  :  <User luser={'/User2'}  user={"2"} icon={faUserAstronaut} press={pressSidebarUser}/> } 
        </div>
         
        <div className="h-20">
          <details>
           <summary>Themes</summary>
           {themes.map((item, index) => (
             <div className={theme ==  item ? "text-white" : "text-user"} key={index} onClick={() => pressTheme(item)}>
              <FontAwesomeIcon icon={theme == item ? faCircleSolid : faCircleRegular}/> 
              <span>{item}</span>
             </div>
           ))}

          </details>
        </div>
        <div className={dtd == true ? `text-white cursor-pointer`: `text-mainBg cursor-pointer`} onClick={pressDtd}>
          {dtd == true ? ( <FontAwesomeIcon icon={faCircleSolid}/>): (<FontAwesomeIcon icon={faCircleRegular}/>)}
           Data Tracker Detector {dtd == true ? (<span>activated</span>): (<span>deactivated</span>)}
        </div>
        <div className="font-poppins text-2xl font-bold mb-20">
          Learning App
         </div>
      </div>
       
      <div ref={UserRef} className={sidebarUser == true ? " absolute left-45 w-1/8 h-50 bg-sidebar p-5 flex flex-col justify-around rounded-br-lg text-xl " : "hidden"}>
          <div><User luser={'/User1'}  user={"1"} icon={faUser} press={() => {}}/></div>
          <div><User luser={'/User2'}  user={"2"} icon={faUserAstronaut} press={() => {}} /></div>
      </div>
      
      {dtd == true && (
        <div ref={alertRef} 
        className=" absolute top-25 z-1 w-175 h-150 bg-red-800 
        rounded-xl p-5  text-3xl text-white font-inter flex flex-col gap-5 items-center">
            <FontAwesomeIcon icon={faX} size="2x" onClick={() => pressDtd} className="absolute left-0"/>
            <FontAwesomeIcon icon={faExclamationTriangle} size="10x"/>
            <span className="text-6xl font-bold ">Attention!</span>
           Your data will be tracked on this website and shared with social media networks. Please leave this site immediately.
           
        </div>  
      )}
      <QuizContext.Provider value={{currentUser, theme}}>
       <Routes>
          <Route path="/User1" element={<Quiz/>}/>
          <Route path="/User2" element={<Quiz/>}/> 
         </Routes>
      </QuizContext.Provider>
    </div>
  );
  };


function Quiz() {
  const {currentUser, theme} = useContext(QuizContext);
  
  return (
    <div className="text-white font-inter p-10 flex flex-col items-left w-full ">
       <div className="text-3xl font-bold">
          {theme} {currentUser} 
       </div>
       <div className="w-3/4 h-140 flex flex-col items-left mt-10 p-3  ">
          <span className="font-bold">
            General information about {theme}
          </span>

       </div>
    </div>
  );
};