import { useEffect, useRef, useState } from "react";

interface ApplicationWindowProps {
  initialX: number;
  initialY: number;
  closeWindow: () => void;
}

export default function ApplicationWindow({
  initialX,
  initialY,
  closeWindow,
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
    <div
      className="absolute bg-slate-200 w-96 h-96"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="bg-slate-400 h-8 w-full cursor-move touch-none flex items-center justify-end px-2"
        onPointerDown={handlePointerDown}
      >
        <button
            type="button"
            aria-label="Close window"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={closeWindow}
            className="h-6 w-6 bg-red-500 text-white text-sm leading-none flex items-center justify-center hover:bg-red-600"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}