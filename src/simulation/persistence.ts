import Dexie, { type Table } from 'dexie';
import { validateSave } from './engine';
import type { GameState } from './model';
class NexoDB extends Dexie { saves!:Table<{id:string;state:GameState;updated:number}>; constructor(){super('nexo-life');this.version(1).stores({saves:'id,updated'});} }
const db=new NexoDB();
export async function saveGame(state:GameState){await db.saves.put({id:'current',state:validateSave(state),updated:Date.now()});}
export async function loadGame(){const saved=await db.saves.get('current');return saved?validateSave(saved.state):null;}
export function exportGame(state:GameState){const name=`NEXO-${state.tick}-dias.json`,blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const download=()=>{const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);};const file=new File([blob],name,{type:'application/json'});if(window.matchMedia('(pointer: coarse)').matches&&navigator.share&&navigator.canShare?.({files:[file]})){void navigator.share({files:[file],title:'Respaldo de NEXO LIFE 3D'}).catch(error=>{if(!(error instanceof DOMException&&error.name==='AbortError'))download();});}else download();}
export async function importGame(file:File){if(file.size>15000000)throw Error('La partida supera el límite de 15 MB.');return validateSave(JSON.parse(await file.text()));}
