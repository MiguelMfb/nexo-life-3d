import Dexie, { type Table } from 'dexie';
import { validateSave } from './engine';
import type { GameState } from './model';
class NexoDB extends Dexie { saves!:Table<{id:string;state:GameState;updated:number}>; constructor(){super('nexo-life');this.version(1).stores({saves:'id,updated'});} }
const db=new NexoDB();
export async function saveGame(state:GameState){await db.saves.put({id:'current',state:validateSave(state),updated:Date.now()});}
export async function loadGame(){const saved=await db.saves.get('current');return saved?validateSave(saved.state):null;}
export function exportGame(state:GameState){const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`NEXO-${state.tick}-dias.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
export async function importGame(file:File){if(file.size>15000000)throw Error('La partida supera el límite de 15 MB.');return validateSave(JSON.parse(await file.text()));}
