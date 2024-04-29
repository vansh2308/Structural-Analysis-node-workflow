import { useCallback, useEffect } from "react";
import { Position, Handle } from "reactflow";
import FixedSVG from "./../assets/fixed.svg"
import PinnedSVG from "./../assets/pinned.svg"
import RollerSVG from "./../assets/roller.svg"




export default function CustomNode({ id, data }) {

  function supportImg(supportType) {
    switch (supportType) {
      case "fixed":
        return <img src={FixedSVG}/>
      case "pinned":
        return <img src={PinnedSVG}/>
      case "roller":
        return <img src={RollerSVG}/>
      default:
        return <img src={RollerSVG}/>
    }
  }


  return (

   
        <div className="custom-node flex flex-col">
          <span className="text-[8px] bg-slate-200 aspect-square min-w-fit px-1 flex justify-center items-center rounded-full absolute">
            {id}
          </span>
          {
            supportImg(data.label)
          }

          <Handle
            type="default"
            position={data.label == "fixed" ? Position.Right : Position.Top}
            isConnectable={true}
            style={data.label == "fixed" ? {top: '46%', background:"green"} : { left: '46%', background: "green" }}
          />
          <Handle
            type="target"
            position={data.label == "fixed" ? Position.Right : Position.Top}
            isConnectable={true}
            style={data.label == "fixed" ? {top: '54%', background:"red"} : { left: '54%', background: "red" }}
          />
        </div>


  );

}