// Shared, testable catalog, rendering and storage helpers.
// This coursework-derived app is a front-end demo; its cart persists only in this browser.
export const CART_KEY = 'threadlab.cart.v1';
export const COLORS = [
  {id:'ink',name:'Midnight',hex:'#273044'},
  {id:'cream',name:'Oat',hex:'#dfd4be'},
  {id:'sage',name:'Sage',hex:'#859b8b'},
  {id:'clay',name:'Clay',hex:'#c8846e'},
  {id:'blue',name:'Sky',hex:'#85a9c8'},
  {id:'lavender',name:'Lilac',hex:'#b7a8cd'},
];
export const MOTIFS = [
  {id:'orbit',name:'Orbit'},
  {id:'bolt',name:'Bolt'},
  {id:'bloom',name:'Bloom'},
  {id:'none',name:'Minimal'},
];
export const CATALOG = [
  {id:'p1',name:'Orbit Tee',kind:'tee',color:'cream',motif:'orbit',price:32,tag:'Bestseller'},
  {id:'p2',name:'Sage Bloom Tee',kind:'tee',color:'sage',motif:'bloom',price:32,tag:'New'},
  {id:'p3',name:'Midnight Hoodie',kind:'hoodie',color:'ink',motif:'bolt',price:58,tag:'Bestseller'},
  {id:'p4',name:'Clay Essentials',kind:'hoodie',color:'clay',motif:'none',price:52,tag:'Limited palette'},
  {id:'p5',name:'Sky Bolt Tee',kind:'tee',color:'blue',motif:'bolt',price:32,tag:'New'},
  {id:'p6',name:'Lilac Orbit Hoodie',kind:'hoodie',color:'lavender',motif:'orbit',price:58,tag:'Studio pick'},
];
export const BASE_PRICE={tee:28,hoodie:52};
export const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(n)||0);
export const clamp=(n,min,max)=>Math.min(max,Math.max(min,Number.isFinite(Number(n))?Number(n):min));
export const colorOf=id=>COLORS.find(c=>c.id===id)||COLORS[0];
export const motifOf=id=>MOTIFS.find(m=>m.id===id)||MOTIFS[3];
export const escapeHTML=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const cleanText=t=>String(t||'').replace(/[\r\n\t]/g,' ').trim().slice(0,18);
export function normalizeItem(item) {
  if(!item || typeof item!=='object')return null;
  const kind=item.kind==='hoodie'?'hoodie':'tee';
  if(!COLORS.some(c=>c.id===item.color)) return null;
  if(!MOTIFS.some(m=>m.id===item.motif)) return null;
  const quantity=Math.round(clamp(item.quantity,1,10));
  const text=cleanText(item.text);
  const position={x:clamp(item.position?.x,105,215),y:clamp(item.position?.y,133,235)};
  const catalogMatch=CATALOG.find(p=>p.id===item.productId);
  const isCatalog=Boolean(catalogMatch && catalogMatch.kind===kind && catalogMatch.color===item.color && catalogMatch.motif===item.motif && !text);
  return {
    id:String(item.id||'').slice(0,80)||createId(),
    productId:isCatalog?catalogMatch.id:null,
    name:isCatalog?catalogMatch.name:`Custom ${kind==='tee'?'T-shirt':'Hoodie'}`,
    kind,color:item.color,motif:item.motif,text,position,quantity,
    price:isCatalog?catalogMatch.price:BASE_PRICE[kind]+(item.motif==='none'?0:4)+(text?6:0)
  };
}
export function readCart(store=globalThis.localStorage){
  try { const data=JSON.parse(store?.getItem(CART_KEY)||'[]');return Array.isArray(data)?data.slice(0,40).map(normalizeItem).filter(Boolean):[]; }
  catch {return []}
}
export function saveCart(items,store=globalThis.localStorage){
  const normalized=items.slice(0,40).map(normalizeItem).filter(Boolean);
  try { store?.setItem(CART_KEY,JSON.stringify(normalized));return true; }catch{return false;}
}
export function createId(){return globalThis.crypto?.randomUUID?.() || `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;}
export function makeCartItem({kind='tee',color='ink',motif='none',text='',position={x:160,y:188},quantity=1,productId=null}={}){
  return normalizeItem({id:createId(),kind,color,motif,text,position,quantity,productId});
}
export const itemCount=cart=>cart.reduce((sum,item)=>sum+item.quantity,0);
export const cartTotal=cart=>cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
export const isValidCart=cart=>Array.isArray(cart)&&cart.every(i=>normalizeItem(i)!==null);

function motifArt(id){
 switch(id){
  case 'orbit': return `<ellipse cx="0" cy="0" rx="24" ry="10" stroke="#f9f4e8" stroke-width="3.5" fill="none" transform="rotate(-26)"/><circle cx="0" cy="0" r="8" fill="#f9f4e8"/><circle cx="20" cy="-13" r="4" fill="#f6b36b"/>`;
  case 'bolt': return `<path d="M-7 -29 11 -29 -1 -5 14 -5 -15 31 -8 4 -20 4Z" fill="#fff6db"/>`;
  case 'bloom': return Array.from({length:8},(_,i)=>`<ellipse cx="0" cy="-16" rx="7" ry="13" transform="rotate(${i*45})" fill="#fff5df" opacity=".95"/>`).join('')+`<circle r="8" fill="#e9a06d"/>`;
  default:return '';
 }
}
export function garmentSVG({kind='tee',color='cream',motif='orbit',text='',position={x:160,y:188}}={}, {className='',ariaLabel='Apparel preview'}={}){
 const fill=colorOf(color).hex;
 const x=clamp(position?.x,105,215),y=clamp(position?.y,133,235);
 const name=escapeHTML(ariaLabel);
 const shirt=kind==='hoodie';
 const silhouette=shirt?`<path d="M118 50 Q102 27 123 14 Q160 -3 197 14 Q218 27 202 50 L239 72 L266 118 L244 138 L231 119 L235 307 Q160 325 85 307 L89 119 L76 138 L54 118 L81 72 Z" fill="${fill}" stroke="#3b3b3b" stroke-opacity=".15" stroke-width="2"/><path d="M118 50 Q160 89 202 50" fill="none" stroke="#1a2733" stroke-opacity=".26" stroke-width="2"/><path d="M119 60 Q160 13 201 60" fill="none" stroke="#1a2733" stroke-opacity=".18" stroke-width="5"/><path d="M130 252 Q160 265 190 252 L205 285 Q160 297 115 285Z" fill="#000" fill-opacity=".05" stroke="#000" stroke-opacity=".16" stroke-width="1"/>`:
  `<path d="M107 52 82 62 39 97 57 131 86 117 86 310 Q160 328 234 310 L234 117 263 131 281 97 238 62 213 52 Q196 78 160 78 Q124 78 107 52Z" fill="${fill}" stroke="#3b3b3b" stroke-opacity=".15" stroke-width="2"/><path d="M107 52 Q160 108 213 52" fill="none" stroke="#121b27" stroke-opacity=".26" stroke-width="3"/><path d="M87 117 71 125 M233 117 249 125" stroke="#121b27" stroke-opacity=".11" stroke-width="2"/>`;
 const monogram=text?`<text x="0" y="43" text-anchor="middle" font-weight="800" font-family="system-ui,Arial,sans-serif" font-size="${Math.max(10,22-Math.max(0,text.length-9)*.8)}" letter-spacing=".6" fill="#fff7e6" stroke="#172232" stroke-opacity=".15" stroke-width=".3">${escapeHTML(cleanText(text))}</text>`:'';
 const design=(motif!=='none'||text)?`<g data-drag-design="true" transform="translate(${x} ${y})" style="cursor:grab;touch-action:none"><circle r="45" fill="transparent"/>${motifArt(motif)}${monogram}</g>`:'';
 return `<svg class="${escapeHTML(className)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" role="img" aria-label="${name}"><ellipse cx="160" cy="334" rx="102" ry="11" fill="#23333f" opacity=".07"/>${silhouette}${design}</svg>`;
}
