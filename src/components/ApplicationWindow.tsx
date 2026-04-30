import { useEffect, useRef, useState, type ReactNode } from "react";

interface ApplicationWindowProps {
  name: string | undefined;
  initialX: number;
  initialY: number;
  closeWindow: () => void;
  content: ReactNode;
}

export default function ApplicationWindow({
  name,
  initialX,
  initialY,
  closeWindow,
  content,
}: ApplicationWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (!dragging.current) return;

      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    }

    function handlePointerUp() {
      if (!dragging.current) return;
      dragging.current = false;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [position.x, position.y]);

  return (
    // Full window
    <div
      className="absolute bg-slate-200 w-11/12 h-5/6"
      style={{ left: position.x, top: position.y }}
    >

      {/* Top bar of the window */}
      <div
        className="bg-slate-400 h-8 w-full cursor-move touch-none flex items-center px-2"
        onPointerDown={handlePointerDown}
      >

        {/* App title */}
        <h1 className="text-sm font-medium text-slate-900">{name}</h1>

        {/* Close button */}
        <button
            type="button"
            aria-label="Close window"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={closeWindow}
            className="ml-auto h-6 w-6 bg-red-500 text-white leading-none grid place-items-center hover:bg-red-600"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
          </svg>
        </button>

      </div>

      {/* Window content */}
      <div>
        {content}
      </div>

    </div>
  );
}