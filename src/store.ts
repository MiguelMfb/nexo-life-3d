import { create } from 'zustand';
import { isCompactDevice } from './device';
export type Panel='vida'|'estudios'|'trabajo'|'vinculos'|'finanzas'|'ciudad'|'diario'|'ajustes';
export type CameraMode='follow'|'orbit'|'city';
type UI={panel:Panel|null;menu:boolean;camera:CameraMode;quality:'bajo'|'medio'|'alto';muted:boolean;volume:number;setPanel:(p:Panel|null)=>void;setMenu:(v:boolean)=>void;setCamera:(v:CameraMode)=>void;setQuality:(v:UI['quality'])=>void;setAudio:(muted:boolean,volume?:number)=>void};
export const useUI=create<UI>(set=>({panel:null,menu:false,camera:isCompactDevice()?'follow':'orbit',quality:isCompactDevice()?'bajo':'alto',muted:true,volume:.2,setPanel:panel=>set({panel}),setMenu:menu=>set({menu}),setCamera:camera=>set({camera}),setQuality:quality=>set({quality}),setAudio:(muted,volume)=>set(volume===undefined?{muted}:{muted,volume})}));
