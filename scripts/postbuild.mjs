import { readdir,writeFile,readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
async function walk(dir){const files=[];for(const f of await readdir(dir,{withFileTypes:true})){if(f.isDirectory())files.push(...await walk(`${dir}/${f.name}`));else files.push(`${dir}/${f.name}`);}return files;}
const files=(await walk('dist')).filter(f=>!f.endsWith('sw.js')),hash=createHash('sha256');for(const file of files)hash.update(await readFile(file));const version=hash.digest('hex').slice(0,12),assets=files.map(f=>'/'+f.slice(5));
await writeFile('dist/sw.js',`const CACHE='nexo-${version}',ASSETS=${JSON.stringify(assets)};
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('nexo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
async function navigate(request){try{const response=await fetch(request);if(response.ok){try{await(await caches.open(CACHE)).put('/index.html',response.clone());}catch{}}return response;}catch{return(await caches.match('/index.html',{ignoreVary:true}))||Response.error();}}
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(e.request.mode==='navigate'?navigate(e.request):caches.match(e.request,{ignoreVary:true}).then(r=>r||fetch(e.request)));});`);
console.log(`Offline cache ${version}: ${assets.length} assets`);

