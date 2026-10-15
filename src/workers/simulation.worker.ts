import { process, validateSave } from '../simulation/engine';
import type { Command, GameState } from '../simulation/model';
export type WorkerRequest={version:1;id:number;state:GameState;command:Command};
export type WorkerResponse={version:1;id:number;state:GameState;error?:string;ms:number};
self.onmessage=(event:MessageEvent<WorkerRequest>)=>{const start=performance.now(),data=event.data;try{if(data.version!==1)throw Error('Versión de protocolo incompatible');const result=process(validateSave(data.state),data.command);self.postMessage({version:1,id:data.id,...result,ms:performance.now()-start} satisfies WorkerResponse);}catch(e){self.postMessage({version:1,id:data.id,state:data.state,error:e instanceof Error?e.message:'Error de simulación',ms:performance.now()-start} satisfies WorkerResponse);}};
