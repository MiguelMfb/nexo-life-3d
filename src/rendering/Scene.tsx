import { useEffect,useRef,useState } from 'react';
import { World,places } from './World';
import { useUI } from '../store';
import type { GameState } from '../simulation/model';
export function Scene({state,onInteract,onStats}:{state:GameState;onInteract:(place:string)=>void;onStats:(fps:number)=>void}){
 const canvas=useRef<HTMLCanvasElement>(null),world=useRef<World|null>(null),latest=useRef({onInteract,onStats});latest.current={onInteract,onStats};const [near,setNear]=useState<string|null>(null),[ready,setReady]=useState(false),[error,setError]=useState('');const {camera,quality,panel,menu}=useUI();
 useEffect(()=>{if(!canvas.current)return;const engine=new World(canvas.current,state,{near:setNear,ready:()=>setReady(true),fail:setError,interact:p=>latest.current.onInteract(p),stats:fps=>latest.current.onStats(fps)});world.current=engine;void engine.init();return()=>engine.destroy();},[]);
 useEffect(()=>{world.current?.setState(state);},[state]);
 useEffect(()=>{world.current?.configure(camera,quality,!!panel||menu);},[camera,quality,panel,menu,ready]);
 return <div className="scene"><canvas ref={canvas} tabIndex={0} aria-label="Ciudad 3D. Usa WASD o flechas para caminar, clic para elegir destino y E para interactuar."/>{!ready&&!error&&<div className="scene-loading"><span className="spinner"/>Construyendo Puerto Nexo…</div>}{error&&<div className="scene-error"><strong>El modo 3D no está disponible</strong><p>{error}</p><p>Puedes continuar jugando desde Historia y los paneles. El motor requiere WebGL2.</p></div>}{ready&&near&&<button className="interaction" onClick={()=>onInteract(near)}><kbd>E</kbd><span><strong>{places.find(p=>p.id===near)?.name}</strong><small>{places.find(p=>p.id===near)?.hint}</small></span><b>↗</b></button>}</div>;
}
