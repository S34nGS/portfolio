interface TaskbarProps {
    toggleMenu: () => void;
}

export default function Taskbar({toggleMenu}: TaskbarProps){

    return (
        <>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={toggleMenu}>
                Start
            </button>
        </>
    )
}