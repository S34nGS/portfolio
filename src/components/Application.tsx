import { useEffect, useRef, useState } from "react";

interface ApplicationProps {
  id: string;
  name: string;
  image: string;
  initialX: number;
  initialY: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeselect: () => void;
  onPositionChange: (name: string, x: number, y: number) => void;
  onOpen: () => void;
}

export default function Application({
  id,
  name,
  image,
  initialX,
  initialY,
  isSelected,
  onSelect,
  onDeselect,
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
    onSelect(id);
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
      data-app-icon="true"
      onPointerDown={handlePointerDown}
      onDoubleClick={() => {
        onDeselect();
        onOpen();
      }}
      className={`absolute flex flex-col items-center touch-none select-none rounded-md p-1 ${
        isSelected ? "bg-black/25 ring-2 ring-black/70" : ""
      }`}
      style={{ left: position.x, top: position.y }}
    >
      <img src={image} alt={name} draggable={false} className="w-24 h-auto object-contain" />
      <h1>{name}</h1>
    </button>
  );
}