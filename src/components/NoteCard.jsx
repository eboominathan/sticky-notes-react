import React, { useRef,useEffect, useState } from "react";
import Trash from "../assets/icons/Trash";

const NoteCard = ({ note }) => {
  const [position, setPositon] = useState(JSON.parse(note.position));  
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);
  const textAreaRef = useRef(null);
  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);
  

  useEffect(() => {
    autoGrow(textAreaRef);
}, []);

function autoGrow(textAreaRef) {
    const { current } = textAreaRef;
    current.style.height = "auto"; // Reset the height
    current.style.height = current.scrollHeight + "px"; // Set the new height
}


const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
 
    document.addEventListener("mousemove", mouseMove);
};

const mouseMove = (e) => {
    //1 - Calculate move direction
    let mouseMoveDir = {
        x: mouseStartPos.x - e.clientX,
        y: mouseStartPos.y - e.clientY,
    };
 
    //2 - Update start position for next move.
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;
 
    //3 - Update card top and left position.
    setPositon({
        x: cardRef.current.offsetLeft - mouseMoveDir.x,
        y: cardRef.current.offsetTop - mouseMoveDir.y,
    });
};

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"        
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown = { mouseDown }
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
         ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
       }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
