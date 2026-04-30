import { useEffect, useRef, useState } from "react";

interface ApplicationProps {
  name: string;
  image: string;
  initialX: number;
  initialY: number;
  onPositionChange: (name: string, x: number, y: number) => void;
  onOpen: () => void;
}

export default function Application({
  name,
  image,
  initialX,
  initialY,
  onPositionChange,
  onOpen,
}: ApplicationProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
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
      onPositionChange(name, position.x, position.y);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [name, onPositionChange, position.x, position.y]);

  return (
    <button
      type="button"
      onDoubleClick={() => onOpen()}
      onPointerDown={handlePointerDown}
      className="absolute flex flex-col items-center touch-none select-none"
      style={{ left: position.x, top: position.y }}
    >
      <img src={image} alt={name} draggable={false} className="w-24 h-auto object-contain" />
      <h1>{name}</h1>
    </button>
  );
}