import { useEffect,useState } from 'react';
export const compactQuery='(max-width: 760px), (pointer: coarse) and (max-width: 1100px)';
export const isCompactDevice=()=>typeof window!=='undefined'&&window.matchMedia(compactQuery).matches;
export function useCompactDevice(){const [compact,setCompact]=useState(isCompactDevice);useEffect(()=>{const query=window.matchMedia(compactQuery),change=()=>setCompact(query.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);return compact;}
