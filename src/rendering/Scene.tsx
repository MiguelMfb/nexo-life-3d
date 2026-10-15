import { useEffect,useRef,useState,type PointerEvent as ReactPointerEvent } from 'react';
import { Minus,Plus,RotateCcw } from 'lucide-react';
import { World,places,type WorldView } from './World';
import { useUI } from '../store';
import type { GameState } from '../simulation/model';
function Joystick({move}:{move:(x:number,y:number)=>void}){
 const [position,setPosition]=useState({x:0,y:0}),pointer=useRef<number|null>(null);
 const update=(e:ReactPointerEvent<HTMLButtonElement>)=>{const rect=e.currentTarget.getBoundingClientRect(),dx=e.clientX-rect.left-rect.width/2,dy=e.clientY-rect.top-rect.height/2,length=Math.hypot(dx,dy),scale=Math.max(1,length/36),x=dx/scale,y=dy/scale;setPosition({x,y});move(x/36,y/36);};
 const release=()=>{pointer.current=null;setPosition({x:0,y:0});move(0,0);};
 return <div className="joystick-wrap"><button className="joystick" aria-label="Mover personaje" onPointerDown={e=>{e.preventDefault();pointer.current=e.pointerId;e.currentTarget.setPointerCapture(e.pointerId);update(e);}} onPointerMove={e=>{if(pointer.current===e.pointerId)update(e);}} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onKeyDown={e=>{const key={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(key){e.preventDefault();move(key[0],key[1]);}}} onKeyUp={release} onBlur={release}><i className="joystick-cross"/><span className="joystick-knob" style={{transform:`translate(${position.x}px,${position.y}px)`}}/></button><span>CAMINAR</span></div>;
}
export function Scene({state,onInteract,onStats,started,suspended}:{state:GameState;onInteract:(place:string)=>void;onStats:(fps:number)=>void;started:boolean;suspended:boolean}){
 const canvas=useRef<HTMLCanvasElement>(null),world=useRef<World|null>(null),view=useRef<WorldView|null>(null),latest=useRef({onInteract,onStats});latest.current={onInteract,onStats};
 const [near,setNear]=useState<string|null>(null),[ready,setReady]=useState(false),[error,setError]=useState(''),[attempt,setAttempt]=useState(0);const {camera,quality,setPanel}=useUI();
 useEffect(()=>{if(!canvas.current)return;const engine=new World(canvas.current,state,{near:setNear,ready:()=>{setReady(true);setError('');},fail:message=>{setError(message);setReady(false);},interact:p=>latest.current.onInteract(p),stats:fps=>latest.current.onStats(fps)},view.current);world.current=engine;void engine.init();return()=>{engine.destroy();world.current=null;};},[attempt]);
 useEffect(()=>{let landscape=window.innerWidth>window.innerHeight,width=window.innerWidth;const rotate=()=>{const next=window.innerWidth>window.innerHeight,changed=next!==landscape&&Math.abs(window.innerWidth-width)>80;landscape=next;width=window.innerWidth;if(changed&&world.current?.mobile){view.current=world.current.captureView();setReady(false);setError('');setAttempt(n=>n+1);}};window.addEventListener('resize',rotate);return()=>window.removeEventListener('resize',rotate);},[]);
 useEffect(()=>{world.current?.setState(state);},[state,ready]);
 useEffect(()=>{world.current?.configure(camera,quality,suspended,started);},[camera,quality,suspended,started,ready]);
 const active=started&&ready&&!suspended&&!error;
 return <div className="scene"><canvas key={attempt} ref={canvas} tabIndex={0} aria-label="Ciudad 3D. Toca un destino o usa el joystick para caminar. Arrastra para girar; usa dos dedos para acercar."/>
 {!ready&&!error&&<div className="scene-loading"><span className="spinner"/>Construyendo Puerto Nexo…</div>}
 {error&&<div className="scene-error" role="alert"><strong>La vista 3D necesita un momento</strong><p>{error}</p><button className="primary" onClick={()=>{view.current=world.current?.captureView()??null;setError('');setReady(false);setAttempt(n=>n+1);}}>Reiniciar vista 3D</button>{started&&<button className="secondary" onClick={()=>setPanel('diario')}>Continuar en Historia</button>}</div>}
 {active&&near&&<button className="interaction" onClick={()=>onInteract(near)}><kbd>E</kbd><span><strong>{places.find(p=>p.id===near)?.name}</strong><small>{places.find(p=>p.id===near)?.hint}</small></span><b>↗</b></button>}
 {active&&<div className="touch-controls" aria-label="Controles táctiles"><Joystick move={(x,y)=>world.current?.setMovement(x,y)}/><div className="touch-camera"><button aria-label="Acercar cámara" onClick={()=>world.current?.zoom(-5)}><Plus size={22}/></button><button aria-label="Alejar cámara" onClick={()=>world.current?.zoom(5)}><Minus size={22}/></button><button aria-label="Girar cámara" onClick={()=>world.current?.rotate(Math.PI/6)}><RotateCcw size={20}/></button></div></div>}
 </div>;
}

