import FixedSVG from "./../assets/fixedHor.svg"
import PinnedSVG from "./../assets/pinned.svg"
import RollerSVG from "./../assets/roller.svg"

export default function Sidebar(props){
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return(
    <div className="h-1/2 p-5  absolute w-[10px] z-[1000] text-center">
      <div className="w-fit min-h-fit min-w-max h-full p-5 bg-white sidebar rounded-lg flex flex-col ">
      <div className="dndnode py-4" onDragStart={(event) => onDragStart(event, 'fixed')} draggable>
        Fixed
      </div>
      <div className="dndnode py-4" onDragStart={(event) => onDragStart(event, 'pinned')} draggable>
        Pinned
      </div>
      <div className="dndnode py-4" onDragStart={(event) => onDragStart(event, 'roller')} draggable>
        Roller
      </div>

      </div>
    </div>
  )
}