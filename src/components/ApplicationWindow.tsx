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
        className="bg-slate-400 h-8 w-full cursor-move touch-none"
        onPointerDown={handlePointerDown}
      >
        <button
            onPointerDown={(event) => event.stopPropagation()}
            onClick={closeWindow}
        >
            Close
        </button>
      </div>
    </div>
  );
}