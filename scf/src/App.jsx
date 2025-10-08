import "./App.css";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faCircleSolid, faExclamationTriangle, faX, faUser, faUserAstronaut, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'
import { Link, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { db } from "./firebase";
import { addDoc, collection, deleteDoc, getDocs, doc, query, where } from "firebase/firestore";

const QuizContext = createContext();

export default function App() {
  const[dtd, setDtd] = useState(false);
  const[currentUser, setCurrentUser] = useState("");
  const[theme, setTheme] = useState("England");
  const[sidebarUser, setSidebarUser] = useState(false);
  const alertRef = useRef(null);
  const UserRef = useRef(null);
  const location = useLocation();
  const themes = [
    {title:"England", information: "England is a country that forms part of the United Kingdom, located on the island of Great Britain. It shares borders with Scotland to the north and Wales to the west. The capital city, London, is one of the world’s leading financial and cultural centers. England is known for its long history, its monarchy, and its influence on global language, law, and culture",
     additionalInformation: "England has a population of around 56 million people. It is home to prestigious universities like Oxford and Cambridge, and landmarks such as Stonehenge, the Tower of London, and Buckingham Palace. The English countryside is famous for its green hills, villages, and castles. England’s government is a constitutional monarchy with a parliamentary system."}, 
    {title:"Germany", information: "Germany is a country in Central Europe and the most populous member of the European Union. Its capital is Berlin. The nation has a strong economy and is known for engineering, science, and innovation. Germany is also famous for its cultural contributions in philosophy, music, and literature."
    , additionalInformation: "Germany consists of 16 federal states (“Bundesländer”), each with its own government. The country is a leader in renewable energy and environmental policies. Landmarks include the Brandenburg Gate, Neuschwanstein Castle, and the Berlin Wall. Traditional festivals such as Oktoberfest in Munich attract millions of visitors every year."},
    {title:"World War II", information: "World War II was a global conflict that lasted from 1939 to 1945, involving most of the world’s nations. The war began when Germany invaded Poland, leading Britain and France to declare war on Germany. It was the deadliest conflict in human history, resulting in millions of military and civilian deaths."
      , additionalInformation: "The war was fought between the Allies (including the United Kingdom, the Soviet Union, the United States, and others) and the Axis Powers (led by Germany, Italy, and Japan). The Holocaust, atomic bombings of Hiroshima and Nagasaki, and the defeat of Nazi Germany in 1945 were major events of the war. The aftermath reshaped the global political landscape, leading to the Cold War."}, 
    {title:"New York", information: "New York is a state in the northeastern United States, with New York City as its largest and most famous city. Often called “the city that never sleeps,” NYC is a global center for finance, media, art, and culture. It is home to iconic landmarks such as the Statue of Liberty, Times Square, and Central Park.",
       additionalInformation: "New York City consists of five boroughs: Manhattan, Brooklyn, Queens, the Bronx, and Staten Island. It’s one of the most diverse cities in the world, with residents speaking hundreds of languages. The state of New York also features beautiful natural landscapes, including the Adirondack Mountains and Niagara Falls. The city’s skyline and energy symbolize the American dream."}];
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
             <div className={theme ==  item.title ? "text-white" : "text-user"} key={index} onClick={() => pressTheme(item.title)}>
              <FontAwesomeIcon icon={theme == item.title ? faCircleSolid : faCircleRegular}/> 
              <span>{item.title}</span>
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
            <FontAwesomeIcon icon={faX} size="2x" onClick={() => pressDtd()} className="absolute left-0 cursor-pointer"/>
            <FontAwesomeIcon icon={faExclamationTriangle} size="10x"/>
            <span className="text-6xl font-bold ">Attention!</span>
           Your data will be tracked on this website and shared with social media networks. Please leave this site immediately.
           
        </div>  
      )}
      <QuizContext.Provider value={{currentUser, theme, themes}}>
       <Routes>
          <Route path="/User1" element={<Quiz/>}/>
          <Route path="/User2" element={<Quiz/>}/> 
         </Routes>
      </QuizContext.Provider>
    </div>
  );
  };


function Quiz() {
  const { currentUser, theme, themes } = useContext(QuizContext);
  const activeTheme = themes?.find(t => t.title === theme);
  const[addtionalInformation, setAdditionalInformation] = useState(false);
  const[listUser1, setListUser1] = useState([]);
  const[listUser2, setListUser2] = useState([]);

  const pressAdditionalInformation = async() => {
    try {
      const newAdditionalInformation = !addtionalInformation;
      setAdditionalInformation(newAdditionalInformation);
      if (currentUser === "User 1") {
         await addDoc(collection(db, "User1"), {
           interest: theme
         });
         checkData();
      } else if (currentUser === "User 2") {
         await addDoc(collection(db, "User2"), {
           interest: theme
         });
         checkData();
      } else {
        alert("Error");
      }
    }catch(e) {
      alert(e);
    }
  } 
 const checkData = async () => {
  // Beide Sammlungen abrufen
  const snapshot1 = await getDocs(collection(db, "User1"));
  const snapshot2 = await getDocs(collection(db, "User2"));

  // Duplikate entfernen
  const seen1 = new Set();
  const seen2 = new Set();
  const list1 = [];
  const list2 = [];

  for (const d of snapshot1.docs) {
    const data = d.data();
    const key = data.interest;
    if (!seen1.has(key)) {
      seen1.add(key);
      list1.push(data);
    } else {
      await deleteDoc(doc(db, "User1", d.id));
    }
  }

  for (const d of snapshot2.docs) {
    const data = d.data();
    const key = data.interest;
    if (!seen2.has(key)) {
      seen2.add(key);
      list2.push(data);
    } else {
      await deleteDoc(doc(db, "User2", d.id));
    }
  }

  // Gemeinsame Interessen finden
  const common = list1.filter(item1 => list2.some(item2 => item2.interest === item1.interest));

  if (common.length > 0) {
    console.log("Gemeinsame Interessen:", common.map(c => c.interest));

    // Hilfsfunktion, um zufällig ein Element zu wählen, das noch nicht in der Liste ist
    const getRandomInterest = (sourceList, excludeList) => {
      // Nur Interessen wählen, die nicht bereits vorhanden sind
      const available = sourceList
        .map(item => item.interest)
        .filter(interest => !excludeList.some(e => e.interest === interest));

      if (available.length === 0) return null; // keine passenden mehr vorhanden
      return available[Math.floor(Math.random() * available.length)];
    };

    // Zufällige Themen auswählen, die der andere User noch nicht hat
    const randomForUser1 = getRandomInterest(list2, list1);
    const randomForUser2 = getRandomInterest(list1, list2);

    // Nur hinzufügen, wenn es auch wirklich neue sind
    if (randomForUser1) {
      await addDoc(collection(db, "User1"), { interest: randomForUser1 });
      list1.push({ interest: randomForUser1 });
    }

    if (randomForUser2) {
      await addDoc(collection(db, "User2"), { interest: randomForUser2 });
      list2.push({ interest: randomForUser2 });
    }
  }

  // States aktualisieren
  setListUser1(list1);
  setListUser2(list2);
};


  useEffect(() => {
    checkData();
  }, [])
  return (
    <div className="text-white font-inter p-10 flex flex-col items-start w-full">
      <div className="text-3xl font-bold">
        {theme}
      </div>
      <div className="flex flex-row w-full">
       <div className="w-3/4 h-[35rem] flex flex-col items-start mt-10 p-3 gap-5">
        <span className="font-bold text-xl">
          General information about {theme}
        </span>
        <div className=" text-lg ">
          {activeTheme ? activeTheme.information : "Error"}
        </div>
        <div className="font-bold text-xl ">
          Do you want to know more about {theme}? 
          <span onClick={() => pressAdditionalInformation()} className="text-blue-500 underline decoration-blue-500"> Click here!</span>
          <br/>
          <div className="font-normal text-lg">
            {addtionalInformation && activeTheme.additionalInformation}
           </div>
        </div>         
       </div>
       <div className=" w-1/4 h-[30vw] bg-sidebar p-5 rounded-lg flex flex-col gap-5 ">
         <code>
           Data {currentUser}:
         </code>  
         <ul>
            {currentUser === "User 1" ? (
              <li>
                {listUser1.map((item, index) => (
                  <code key={index}>
                    Interested in: {item.interest} 
                     <FontAwesomeIcon icon={faTrash} onClick={ async() => {
                       try {
                        const q = query(collection(db, "User1"), where('interest', '==', item.interest));
                        const querySnapshot = await getDocs(q);
                  
                        querySnapshot.forEach(async (docSnapshot) => {
                          const docRef = doc(db, "User1", docSnapshot.id);
                          await deleteDoc(docRef);
                        });
                        checkData();
                      } catch(error) {
                        console.log(error);
                      }
                      
                   }} /><br/>
                  </code>
                ))}
              </li>
            ): (
              <li>
                {listUser2.map((item, index) => (
                  <code key={index}>
                    Interested in: {item.interest} 
                    <FontAwesomeIcon icon={faTrash} onClick={ async() => {
                       try {
                        const q = query(collection(db, "User2"), where('interest', '==', item.interest));
                        const querySnapshot = await getDocs(q);
                  
                        querySnapshot.forEach(async (docSnapshot) => {
                          const docRef = doc(db, "User2", docSnapshot.id);
                          await deleteDoc(docRef);
                        });
                        checkData();
                      } catch(error) {
                        console.log(error);
                      }
                      
                   }} />  <br/>
                  </code>
                ))}
              </li>
            )}
         </ul>
       </div>
      </div>
    </div>
  );
}
