import { useState } from 'react';
import './App.css'
import HomeMenu from './components/HomeMenu'
import Taskbar from './components/Taskbar'
import ApplicationWindow from './components/ApplicationWindow';
import Desktop from './components/Desktop';


function App() {
  const [homeMenuVisibility, setHomeMenuVisibility] = useState(false);
  const [appOpen, setAppOpen] = useState(false);

  function openApp() {
    if(!appOpen){
      setAppOpen(true)
    }
  }

  function closeApp(){
    if(appOpen){
      setAppOpen(false)
    }
  }

  function toggleHomeMenu(){
      if (!homeMenuVisibility){
          setHomeMenuVisibility(true)
      } else{
          setHomeMenuVisibility(false)
      }
  }

  return (
    <>
      {/* Desktop */}
      <Desktop openApp={openApp}/>

      {/* Application window */}
      {appOpen && (
        <ApplicationWindow
          initialX={50}
          initialY={40}
          closeWindow={closeApp}
        />
      )}

      {/* Homemenu */}
      {homeMenuVisibility && (
      <div className="fixed left-0 bottom-10 z-40">
        <HomeMenu />
      </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-cyan-600">
        <Taskbar toggleMenu={toggleHomeMenu}/>
      </div>
    </>
  )
}

export default App
