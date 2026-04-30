import { useState } from 'react';
import './App.css'
import HomeMenu from './components/HomeMenu'
import Taskbar from './components/Taskbar'
import ApplicationWindow from './components/ApplicationWindow';
import Desktop from './components/Desktop';

type AppInfo = {
  id: string;
  name: string;
};

function App() {
  const [homeMenuVisibility, setHomeMenuVisibility] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<AppInfo | null>(null);

  
  function handleOpenApp(app: AppInfo) {
    setActiveApp(app);
    if(!appOpen){
      setAppOpen(true)
    }
  }

  function handleCloseApp() {
    setActiveApp(null);
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
      <Desktop onOpenApp={handleOpenApp}/>

      {/* Application window */}
      {appOpen && (
        <ApplicationWindow
          name={activeApp?.name}
          initialX={50}
          initialY={40}
          closeWindow={handleCloseApp}
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
