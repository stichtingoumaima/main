"use client"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const SkilltreePage = () => {
    return (
<div className="absolute left-0 top-0">

      <TransformWrapper 
        initialScale={1}
        minScale={1}
        maxScale={3}
        limitToBounds={false}
        centerOnInit={true}
        alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
      >
        <TransformComponent>
        <button className="absolute top-[15rem] left-[9.5rem] w-44 h-44 rounded-full bg-slate-900 z-50">Mind Mastery Level 1</button>
        <button className="absolute top-[3.7rem] left-[22.5rem] w-44 h-44 rounded-full bg-slate-900 z-50">Physical prowess Level 1</button>
        <button className="absolute top-[27rem] left-[3.7rem] w-44 h-44 rounded-full bg-slate-900 z-50">Craftman's touch Level 1</button>
        <button className="absolute top-[15rem] right-[9.5rem] w-44 h-44 rounded-full bg-slate-900 z-50">Technologyical fluency Level 1</button>
        <button className="absolute top-[3.7rem] right-[23.5rem] w-44 h-44 rounded-full bg-slate-900 z-50">Social navigator Level 1</button>
        <button className="absolute top-[27rem] right-[3.7rem] w-44 h-44 rounded-full bg-slate-900 z-50">Truth seeker Level 1</button>
    <video
      autoPlay
      loop
      muted
      className="w-screen h-full object-cover"
      src="./assets/skilltree.mp4"
    >
      <source src="./assets/skilltree.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
        
        </TransformComponent>
      </TransformWrapper>
      </div>
    );
  };
  
  
  export default SkilltreePage;