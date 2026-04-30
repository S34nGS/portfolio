import { useEffect, useRef, useState } from 'react'
import { apps as defaultApps, type AppMeta } from '../data/apps'
import Application from './Application'

const STORAGE_KEY = 'desktop-app-positions'

interface DesktopProps{
    onOpenApp: (app: AppMeta) => void;
}

export default function Desktop({onOpenApp}: DesktopProps) {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const [positions, setPositions] = useState<Record<string, {x:number,y:number}>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    return Object.fromEntries(defaultApps.map(a => [a.id, { x: a.x, y: a.y }]))
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
  }, [positions])

  useEffect(() => {
    function handleGlobalPointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      const clickedAppIcon = !!target?.closest('[data-app-icon="true"]');
      if (!clickedAppIcon) setSelectedAppId(null); // click elsewhere -> clear
    }

    window.addEventListener("pointerdown", handleGlobalPointerDown);
    return () => window.removeEventListener("pointerdown", handleGlobalPointerDown);
  }, []);

  function updateAppPosition(id: string, x: number, y: number) {
    setPositions(p => ({ ...p, [id]: { x, y } }))
  }

  return (
    <div ref={desktopRef} className="relative min-h-screen">
      {defaultApps.map(a => (
        <Application
          key={a.id}
          id={a.id}
          name={a.name}
          image={a.image}
          initialX={positions[a.id]?.x ?? a.x}
          initialY={positions[a.id]?.y ?? a.y}
          isSelected={selectedAppId === a.id}
          onSelect={setSelectedAppId}
          onDeselect={() => setSelectedAppId(null)}
          onPositionChange={(_, x, y) => updateAppPosition(a.id, x, y)}
          onOpen={() => onOpenApp(a)}
        />
      ))}
    </div>
  )
}