import { useState } from 'react';
import './App.css'
import HomeMenu from './components/HomeMenu'
import Taskbar from './components/Taskbar'
import ApplicationWindow from './components/ApplicationWindow';
import Desktop from './components/Desktop';
import type { AppMeta } from './data/apps';


function App() {
  const [homeMenuVisibility, setHomeMenuVisibility] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<AppMeta | null>(null);
  
  function handleOpenApp(app: AppMeta) {
    setActiveApp(app);
    setAppOpen(true)
  }

  function handleCloseApp() {
    setActiveApp(null);
    setAppOpen(false)
  }

  function toggleHomeMenu(){
    setHomeMenuVisibility((current) => !current)
  }

  return (
    <>
      {/* Desktop */}
      <Desktop onOpenApp={handleOpenApp}/>

      {/* Application window */}
      {appOpen && activeApp &&(
        <ApplicationWindow
          name={activeApp?.name}
          initialX={50}
          initialY={40}
          closeWindow={handleCloseApp}
          content={activeApp?.content}
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
