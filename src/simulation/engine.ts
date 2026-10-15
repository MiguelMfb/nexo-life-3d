import { ageAt, districts, jobs, origins, stateSchema, type Action, type Command, type GameState, type LifeEvent } from './model';
import { stories } from './content';
const clamp=(n:number)=>Math.max(0,Math.min(100,n));
function rng(s:GameState){let x=s.rng|0;x^=x<<13;x^=x>>>17;x^=x<<5;s.rng=x>>>0;return s.rng/4294967296;}
function event(s:GameState,title:string,detail:string,category:LifeEvent['category'],reasons:string[],effects:string[]=[],parents:string[]=[]){const id=`e-${s.revision}-${s.tick}-${s.events.length}`;s.events.push({id,tick:s.tick,title,detail,category,reasons,effects,parents:parents.filter(Boolean)});return id;}
function transfer(s:GameState,from:string,to:string,amount:number,category:string,eventId:string){if(!Number.isSafeInteger(amount)||amount<=0)throw Error('Monto inválido');s.accounts[from]-=amount;s.accounts[to]+=amount;s.ledger.push({id:`tx-${s.ledger.length}`,tick:s.tick,from,to,amount,category,eventId});}
function expense(s:GameState,amount:number,category:string,id:string,credit=false){const cash=Math.min(s.accounts.player,amount);if(cash>0)transfer(s,'player','economy',cash,category,id);if(amount>cash&&credit){const debt=amount-cash;transfer(s,'bank','economy',debt,category,id);s.player.debt+=debt;}}
export function createGame(seed='NEXO-2026',origin=0,name='Alex Rivera',outfit='#e3aa59',skin='#b98159'):GameState{
 const o=origins[origin]??origins[0];let hash=2166136261;for(const c of seed)hash=Math.imul(hash^c.charCodeAt(0),16777619);
 const names=['Luz Salcedo','Mara Londoño','Nicolás Vega','Elena Duarte','Simón Ríos','Alma Pardo','Darío Sol','Irene Valle','Leo Montes','Clara Mar'];
 const s:GameState={schemaVersion:1,saveId:`nexo-${hash>>>0}-${origin}`,seed,rng:(hash>>>0)||1,tick:0,date:'2026-01-01T12:00:00.000Z',mode:'vida',origin,tutorial:0,revision:0,
 player:{id:'player',name,birth:`${2026-o.age}-01-01T12:00:00.000Z`,alive:true,deathAge:86+(hash>>>0)%9,outfit,skin,district:o.district,location:'plaza',energy:86,health:92,mood:76,stress:18,food:85,hygiene:85,grades:o.grades,skill:origin===3?30:12,education:origin===3?'tecnica':'secundaria',enrolled:false,attendance:0,scholarship:false,diploma:origin===3,job:null,workDays:0,performance:65,renting:false,debt:0,householdIncome:o.income,partner:null,lowHealthDays:0,studyParent:null,jobParent:null,homeParent:null},
 accounts:{player:o.money,economy:500000000,bank:500000000,employer:500000000,municipal:500000000},ledger:[],npcs:names.map((n,i)=>({id:`npc-${i}`,name:n,birth:`${1980+i*2}-04-12T12:00:00.000Z`,alive:true,occupation:['Bibliotecaria','Diseñadora','Comerciante','Docente','Mecánico','Estudiante','Enfermero','Urbanista','Cocinero','Artesana'][i],mood:60+i*2,trust:i<2?55:25,relation:i===9?'familia':'vecindad',skin:['#be8964','#e0b190','#855a42'][i%3],outfit:['#749c94','#c27e6c','#ac9dcd','#d4b572'][i%4]})),events:[],scheduled:[],seen:[],pending:null,city:{transport:68,education:76,health:72,population:12480,inflation:1,month:0}};
 event(s,'Toda historia empieza en algún lugar',`${name} llega a esta etapa en ${districts[o.district].name}. ${o.description}`,'vida',['Origen elegido',`Semilla ${seed}`],[`Ahorros iniciales: ${o.money/100}`]);return s;
}
export function freeHours(s:GameState){return Math.max(0,16-(s.player.job?jobs[s.player.job].hours+districts[s.player.district].commute*(100-s.city.transport)/35:0)-(s.player.enrolled?3:0));}
export function actionBlock(s:GameState,a:Action,target?:string):string|null{
 const p=s.player,age=ageAt(p.birth,s.date);if(!p.alive)return 'Esta vida ha terminado. Consulta su legado.';if(s.pending)return 'Resuelve primero la decisión pendiente.';
 const costs:Partial<Record<Action,number>>={enroll:p.scholarship?0:25000,course:10000,meal:600,clinic:4500,rent:districts[p.district].rent*2,move:18000};
 if((costs[a]??0)>s.accounts.player)return `Ahorros insuficientes: necesitas $${(costs[a]??0)/100}.`;
 if(['work','study','social','date','promise'].includes(a)&&p.energy<15)return 'Necesitas descansar antes de hacer esto.';
 if(['study','social','date','promise'].includes(a)&&freeHours(s)<2)return 'Tu jornada y el desplazamiento dejan menos de dos horas libres.';
 if(a==='scholarship'&&(p.grades<70||p.householdIncome>160000||s.city.education<65||p.scholarship))return 'Beca: notas ≥70, ingreso familiar ≤$1.600 y educación municipal ≥65; sólo una beca.';
 if(a==='enroll'&&(age<18||p.enrolled||p.diploma||p.grades<60))return 'Universidad: edad ≥18, notas ≥60 y no tener matrícula o diploma.';
 if(a==='course'&&(age<16||p.enrolled||p.diploma))return 'Formación técnica: edad ≥16, sin otra matrícula ni diploma.';
 if(a==='study'&&!p.enrolled&&age>=18)return 'Matricúlate en un programa primero.';
 if(a.startsWith('apply')){if(age<18)return 'El contrato de esta vacante requiere 18 años.';if(p.job)return 'Ya tienes un contrato. Renuncia antes de cambiar.';if(a==='apply-tech'&&(!p.diploma||p.education!=='universidad'||p.skill<45))return 'Requiere diploma universitario y habilidad ≥45.';if(a==='apply-public'&&(!p.diploma||p.skill<25))return 'Requiere diploma técnico o universitario y habilidad ≥25.';}
 if(a==='work'&&!p.job)return 'Postúlate y acepta un contrato primero.';if(a==='quit'&&!p.job)return 'No tienes contrato activo.';
 if(a==='rent'&&(p.renting||age<18||!p.job||jobs[p.job].salary<districts[p.district].rent*2))return 'Necesitas 18 años, empleo, ingreso ≥2 arriendos y no tener contrato de vivienda.';
 const npc=s.npcs.find(n=>n.id===target);if(['social','date','promise'].includes(a)&&(!npc||!npc.alive))return 'Selecciona una persona disponible.';
 if(a==='date'&&(age<18||!npc||ageAt(npc.birth,s.date)<18||npc.trust<70||npc.relation==='familia'||(p.partner!==null&&p.partner!==npc.id)))return 'Ambos deben ser adultos, sin parentesco y con confianza ≥70. Sólo una pareja activa.';
 if(a==='promise'&&s.scheduled.some(e=>e.kind==='promise'&&e.npc===target))return 'Ya tienes una promesa pendiente con esta persona.';
 return null;
}
function daily(s:GameState,auto=false){
 const p=s.player;if(!p.alive)return;
 const oldAge=ageAt(p.birth,s.date);s.tick++;s.date=new Date(Date.parse(s.date)+86400000).toISOString();
 const newAge=ageAt(p.birth,s.date);
 if(newAge!==oldAge)event(s,`${newAge} años. Un nuevo capítulo.`,`${p.name} cumple años. Tus vínculos y decisiones siguen contigo.`,'vida',['Cumpleaños en el calendario'],[`Etapa ${newAge<18?'adolescente':newAge<65?'adulta':'mayor'}`]);
 if(auto){p.energy+=12;p.food+=8;p.hygiene+=8;p.stress-=2;}
 p.energy=clamp(p.energy-6);p.food=clamp(p.food-8);p.hygiene=clamp(p.hygiene-5);p.stress=clamp(p.stress+(p.job?2:0)+(p.debt>0?2:0)-1);
 p.mood=clamp(p.mood+(p.stress>65?-2:1)+(p.food<20?-3:0));p.health=clamp(p.health+(p.food<10||p.energy<8?-3:1));p.lowHealthDays=p.health<=0?p.lowHealthDays+1:0;
 if(p.job){p.workDays++;p.energy=clamp(p.energy-3);p.stress=clamp(p.stress+districts[p.district].commute*.8);p.performance=clamp(p.performance+(p.energy<15?-.7:.15));}
 if(p.enrolled){if(p.energy>=12&&p.food>=12){p.attendance++;p.skill=clamp(p.skill+.55);p.grades=clamp(p.grades+.06);}const required=p.education==='tecnica'?30:120;if(p.attendance>=required&&p.grades>=60&&p.skill>=(p.education==='tecnica'?25:45)){p.enrolled=false;p.diploma=true;event(s,'Un diploma con tu nombre','La asistencia, las notas y las competencias completaron el programa. Ahora puedes postular a nuevas vacantes.','estudio',['Asistencia suficiente','Notas ≥60','Competencias verificadas'],[`Diploma ${p.education}`],p.studyParent?[p.studyParent]:[]);}}
 if(s.tick%30===0){
  const id=event(s,'Cierre de mes','Salarios, gastos y obligaciones se registran una sola vez por periodo.','dinero',['Fecha de vencimiento mensual'],[],[p.jobParent,p.homeParent].filter((x):x is string=>!!x));
  if(p.job&&p.workDays>0){const gross=Math.round(jobs[p.job].salary*Math.min(p.workDays,30)/30),tax=Math.round(gross*.12);if(s.accounts.employer>=gross){transfer(s,'employer','player',gross-tax,'salario',id);if(tax)transfer(s,'employer','municipal',tax,'impuestos',id);s.events.at(-1)!.effects.push(`Salario neto +$${(gross-tax)/100}`);}p.workDays=0;}
  const cost=Math.round((p.renting?districts[p.district].rent:18000)*s.city.inflation)+12000;expense(s,cost,'hogar y alimentación',id,true);s.events.at(-1)!.effects.push(`Gastos −$${cost/100}`);
  if(p.debt>0){p.debt+=Math.ceil(p.debt*.01);if(s.accounts.player>30000){const amount=Math.min(p.debt,s.accounts.player-30000);transfer(s,'player','bank',amount,'deuda',id);p.debt-=amount;}s.events.at(-1)!.effects.push(`Deuda pendiente $${p.debt/100}`);}
  s.city.month++;s.city.inflation=1+s.city.month*.001;s.city.transport=clamp(s.city.transport+(rng(s)>.5?1:-1));
  if(p.performance<30&&p.job){p.job=null;event(s,'Fin del contrato','El agotamiento sostenido redujo tu desempeño. Mantienes tu vivienda y tus obligaciones.','trabajo',['Desempeño <30','Energía insuficiente durante varias semanas'],['Sin salario futuro'],p.jobParent?[p.jobParent]:[]);}
  if(p.debt>districts[p.district].rent*3&&p.renting){p.renting=false;p.district=0;event(s,'Regresar a la casa familiar','Los atrasos superaron tres arriendos. Volviste a Alameda; la deuda permanece y el trayecto cambia.','dinero',['Atrasos de vivienda','Red familiar disponible'],['Contrato terminado','Distrito: Alameda'],p.homeParent?[p.homeParent]:[]);}
 }
 s.npcs.forEach(n=>{n.mood=clamp(n.mood+(rng(s)>.5?1:-1));if(n.relation==='pareja')n.trust=clamp(n.trust+(freeHours(s)<3?-.2:.04));if(ageAt(n.birth,s.date)>=94)n.alive=false;});
 for(const due of s.scheduled.filter(e=>e.due<=s.tick)){if(due.kind==='review')event(s,'Tu supervisor revisa tu progreso',`Tu desempeño es ${Math.round(p.performance)}. La energía y la regularidad del trabajo influyen en tu estabilidad.`,'trabajo',['Revisión a los 14 días'],[],[due.parent]);else{const n=s.npcs.find(n=>n.id===due.npc);if(n){n.trust=clamp(n.trust-8);event(s,'Una promesa sin cumplir',`${n.name} recuerda la visita que quedó pendiente. Puedes reparar el vínculo conversando.`,'social',['No hubo visita en los siete días siguientes'],['Confianza −8'],[due.parent]);}}}
 s.scheduled=s.scheduled.filter(e=>e.due>s.tick);
 if(newAge>=p.deathAge||p.lowHealthDays>=30){p.alive=false;p.job=null;p.enrolled=false;s.pending=null;event(s,'Una vida que deja huella',`${p.name} falleció a los ${newAge} años. Su historia, sus vínculos y su patrimonio quedan en este diario.`,'vida',[newAge>=p.deathAge?'Envejecimiento y final natural':'Salud crítica durante 30 días'],['Vida concluida']);return;}
 if(!s.pending){const story=stories.find(e=>!s.seen.includes(e.id)&&e.eligible(s));if(story)s.pending=story.id;}
}
export function process(s:GameState,c:Command):{state:GameState;error?:string}{
 if(c.type==='action'){const error=actionBlock(s,c.action,c.target);if(error)return {state:s,error};}
 if(!s.player.alive&&c.type!=='mode')return {state:s,error:'La vida ha concluido. El diario conserva su historia.'};
 if(s.pending&&['advance','action'].includes(c.type))return {state:s,error:'Resuelve la decisión pendiente antes de avanzar.'};
 const next=structuredClone(s),p=next.player;next.revision++;
 if(c.type==='mode'){next.mode=c.mode;return {state:next};}
 if(c.type==='travel'){if(!['plaza','casa','escuela','mercado','oficina','clinica','municipio','parque'].includes(c.location))return {state:s,error:'Lugar desconocido'};p.location=c.location;return {state:next};}
 if(c.type==='advance'){for(let i=0;i<c.days&&!next.pending&&p.alive;i++)daily(next,true);return {state:next};}
 if(c.type==='choose'){
  const story=stories.find(e=>e.id===next.pending),choice=story?.choices[c.choice];if(!story||!choice)return {state:s,error:'Decisión no disponible'};if(next.accounts.player<choice.cost)return {state:s,error:'Ahorros insuficientes para esta decisión.'};
  const id=event(next,story.title,choice.label,'vida',['Decisión personal',story.text],[choice.description]);if(choice.cost)expense(next,choice.cost,'decisión',id);
  const npc=next.npcs[1];switch(choice.effect){case 'mentor':p.grades=clamp(p.grades+8);next.npcs[0].trust=clamp(next.npcs[0].trust+5);break;case 'save':p.mood=clamp(p.mood+3);break;case 'repair':case 'support':npc.trust=clamp(npc.trust+12);p.stress=clamp(p.stress-10);break;case 'ignore':npc.trust=clamp(npc.trust-9);break;case 'volunteer':p.mood=clamp(p.mood+8);npc.trust=clamp(npc.trust+6);p.energy=clamp(p.energy-8);break;case 'rest':case 'bus':p.energy=clamp(p.energy+12);break;case 'decline':npc.trust=clamp(npc.trust-2);p.energy=clamp(p.energy+12);break;case 'celebrate':p.mood=clamp(p.mood+10);npc.trust=clamp(npc.trust+5);break;case 'study':p.grades=clamp(p.grades+8);p.skill=clamp(p.skill+5);p.energy=clamp(p.energy-10);break;case 'walk':p.mood=clamp(p.mood+8);p.energy=clamp(p.energy-8);break;}
  next.seen.push(story.id);next.pending=null;daily(next);return {state:next};
 }
 const a=c.action,npc=next.npcs.find(n=>n.id===c.target);const titles:Record<Action,string>={study:'Un paso más en tu formación',enroll:'Tu lugar en la universidad',scholarship:'Una beca abre el camino',course:'Aprender un oficio','apply-commerce':'Un contrato en el mercado','apply-tech':'Tu primer contrato tecnológico','apply-public':'Trabajar para la ciudad',work:'Una jornada de trabajo',quit:'Cambiar de rumbo',rest:'Recuperar el equilibrio',meal:'Comer también es cuidarse',shower:'Un momento de cuidado',park:'Respirar en el parque',clinic:'Una consulta a tiempo',social:'El valor de una conversación',date:'Un vínculo elegido',rent:'Un espacio propio',move:'Otro barrio, otra rutina',promise:'La palabra que das'};
 const id=event(next,titles[a],'Decisión aplicada; el tiempo y sus obligaciones continúan.',['study','enroll','course','scholarship'].includes(a)?'estudio':a.startsWith('apply')||['work','quit'].includes(a)?'trabajo':['social','date','promise'].includes(a)?'social':['rent','move'].includes(a)?'dinero':'vida',['Acción elegida',`Tiempo libre: ${freeHours(next).toFixed(1)} horas`]);const e=next.events.at(-1)!;
 switch(a){
 case 'study':p.grades=clamp(p.grades+4);p.skill=clamp(p.skill+3);p.energy=clamp(p.energy-12);p.stress=clamp(p.stress+3);e.effects=['Notas +4','Habilidad +3','Energía −12'];break;
 case 'scholarship':p.scholarship=true;e.reasons=['Notas ≥70','Ingreso familiar ≤$1.600','Capacidad educativa ≥65'];e.effects=['Matrícula cubierta por el municipio'];break;
 case 'enroll':case 'course':{const fee=a==='course'?10000:25000;if(a==='enroll'&&p.scholarship)transfer(next,'municipal','economy',fee,'beca',id);else expense(next,fee,'matrícula',id);p.enrolled=true;p.diploma=false;p.attendance=0;p.education=a==='course'?'tecnica':'universidad';p.studyParent=id;e.effects=[a==='course'?'Programa técnico: 30 días':'Programa universitario simplificado: 120 días'];break;}
 case 'apply-commerce':case 'apply-tech':case 'apply-public':p.job=a==='apply-commerce'?'comercio':a==='apply-tech'?'tecnologia':'publico';p.workDays=0;p.jobParent=id;p.performance=65;next.scheduled.push({due:next.tick+14,kind:'review',parent:id});e.reasons=['Vacante disponible','Edad y competencias verificadas'];if(p.studyParent)e.parents.push(p.studyParent);e.effects=[`Contrato: ${jobs[p.job].company}`,`Sueldo bruto mensual $${jobs[p.job].salary/100}`];break;
 case 'work':p.performance=clamp(p.performance+5);p.energy=clamp(p.energy-12);p.skill=clamp(p.skill+1);e.effects=['Desempeño +5','Energía −12','Salario liquidado al cierre mensual'];break;
 case 'quit':if(p.job&&p.workDays){const gross=Math.round(jobs[p.job].salary*Math.min(30,p.workDays)/30),tax=Math.round(gross*.12);transfer(next,'employer','player',gross-tax,'liquidación',id);if(tax)transfer(next,'employer','municipal',tax,'impuestos',id);}p.workDays=0;p.job=null;e.effects=['Contrato finalizado','Salario acumulado liquidado'];break;
 case 'rest':p.energy=clamp(p.energy+40);p.stress=clamp(p.stress-15);e.effects=['Energía +40','Estrés −15'];break;
 case 'meal':expense(next,600,'comida',id);p.food=clamp(p.food+55);p.health=clamp(p.health+3);e.effects=['$6 de comida','Alimentación +55'];break;
 case 'shower':p.hygiene=clamp(p.hygiene+65);p.mood=clamp(p.mood+4);e.effects=['Higiene +65','Ánimo +4'];break;
 case 'park':p.mood=clamp(p.mood+15);p.stress=clamp(p.stress-12);p.energy=clamp(p.energy-8);e.effects=['Ánimo +15','Estrés −12'];break;
 case 'clinic':expense(next,4500,'salud',id);p.health=clamp(p.health+30);e.effects=['Consulta $45','Salud +30'];break;
 case 'social':if(npc){npc.trust=clamp(npc.trust+10);p.mood=clamp(p.mood+8);p.energy=clamp(p.energy-6);const promises=next.scheduled.filter(d=>d.kind==='promise'&&d.npc===npc.id);e.parents.push(...promises.map(d=>d.parent));next.scheduled=next.scheduled.filter(d=>!(d.kind==='promise'&&d.npc===npc.id));e.detail=`Conversaste con ${npc.name}. El vínculo permanece al guardar.`;e.effects=['Confianza +10','Ánimo +8'];}break;
 case 'date':if(npc){if(rng(next)<npc.trust/100){p.partner=npc.id;npc.relation='pareja';npc.trust=clamp(npc.trust+5);e.detail=`${npc.name} también quiere construir esta relación.`;e.effects=['Relación de pareja iniciada'];}else{e.detail=`${npc.name} prefiere mantener la amistad por ahora.`;e.effects=['La respuesta del otro también importa'];}}break;
 case 'rent':expense(next,districts[p.district].rent*2,'depósito y primer arriendo',id);p.renting=true;p.homeParent=id;e.effects=['Contrato de vivienda activo',`Arriendo mensual $${districts[p.district].rent/100}`];if(p.jobParent)e.parents.push(p.jobParent);break;
 case 'move':expense(next,18000,'mudanza',id);p.district=(p.district+1)%3;e.effects=[`Distrito: ${districts[p.district].name}`,`Nuevo recorrido: ${districts[p.district].commute} horas base`];break;
 case 'promise':if(npc){next.scheduled.push({due:next.tick+7,kind:'promise',parent:id,npc:npc.id});e.detail=`Le prometiste a ${npc.name} una visita en los próximos siete días. Conversar cumple la promesa.`;e.effects=['Compromiso pendiente'];}break;
 }
 next.tutorial=Math.min(5,next.tutorial+1);daily(next);return {state:next};
}
export function validateSave(raw:unknown):GameState{
 const s=stateSchema.parse(raw),ids=s.npcs.map(n=>n.id);if(new Set(ids).size!==ids.length||ids.includes('player'))throw Error('IDs duplicados');
 if(!Number.isFinite(Date.parse(s.date))||!Number.isFinite(Date.parse(s.player.birth)))throw Error('Calendario inválido');
 if(Date.parse(s.player.birth)>Date.parse(s.date)||Date.parse(s.date)!==Date.parse('2026-01-01T12:00:00.000Z')+s.tick*86400000)throw Error('Reloj inconsistente');
 if(['player','economy','bank','employer','municipal'].some(id=>!(id in s.accounts))||Object.values(s.accounts).some(v=>!Number.isSafeInteger(v)||v<0))throw Error('Cuentas inválidas');
 if(s.accounts.player<0||s.player.partner&&!ids.includes(s.player.partner))throw Error('Saldo o vínculo inválido');
 const eventIds=new Set(s.events.map(e=>e.id));if(eventIds.size!==s.events.length||s.events.some(e=>e.tick>s.tick||e.parents.some(id=>!eventIds.has(id))))throw Error('Historial causal inválido');
 if(s.ledger.some(t=>!(t.from in s.accounts)||!(t.to in s.accounts))||new Set(s.ledger.map(t=>t.id)).size!==s.ledger.length)throw Error('Libro contable inválido');
 if(s.ledger.some(t=>!Number.isSafeInteger(t.amount)||!eventIds.has(t.eventId)||t.tick>s.tick)||s.scheduled.some(t=>!eventIds.has(t.parent)))throw Error('Transacción o compromiso sin causa');
 if(s.player.partner&&s.npcs.find(n=>n.id===s.player.partner)?.relation!=='pareja')throw Error('Pareja inconsistente');
 if(s.scheduled.some(t=>t.npc&&!ids.includes(t.npc))||s.pending&&!stories.some(e=>e.id===s.pending))throw Error('Referencias inválidas');
 return s;
}
