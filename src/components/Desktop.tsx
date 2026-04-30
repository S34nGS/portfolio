import { useEffect, useState } from 'react'
import { apps as defaultApps } from '../data/apps'
import Application from './Application'

const STORAGE_KEY = 'desktop-app-positions'

interface DesktopProps{
    openApp: () => void;
}

export default function Desktop({openApp}: DesktopProps) {
  const [positions, setPositions] = useState<Record<string, {x:number,y:number}>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    // initialize from defaultApps using initialX/initialY
    return Object.fromEntries(defaultApps.map(a => [a.id, { x: a.x, y: a.y }]))
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
  }, [positions])

  function updateAppPosition(id: string, x: number, y: number) {
    setPositions(p => ({ ...p, [id]: { x, y } }))
  }

  return (
    <div className="relative min-h-screen">
      {defaultApps.map(a => (
        <Application
          key={a.id}
          name={a.name}
          image={a.image}
          initialX={positions[a.id]?.x ?? a.x}
          initialY={positions[a.id]?.y ?? a.y}
          onPositionChange={(_, x, y) => updateAppPosition(a.id, x, y)}
          onOpen={() => {openApp()}}
        />
      ))}
    </div>
  )
}