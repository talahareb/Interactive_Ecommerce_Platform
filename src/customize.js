import {COLORS,MOTIFS,BASE_PRICE,garmentSVG,readCart,saveCart,makeCartItem,itemCount,money,cleanText} from './core.js';
let state={kind:'tee',color:'cream',motif:'orbit',text:'',position:{x:160,y:188},quantity:1};
const preview=document.querySelector('#preview');
const swatches=document.querySelector('#swatches');
const motifs=document.querySelector('#motifs');
const notify=document.querySelector('#notice');
function renderControls(){
 swatches.innerHTML=COLORS.map(c=>`<button class="swatch ${state.color===c.id?'selected':''}" type="button" data-color="${c.id}" aria-pressed="${state.color===c.id}" title="${c.name}"><span style="background:${c.hex}"></span><small>${c.name}</small></button>`).join('');
 motifs.innerHTML=MOTIFS.map(m=>`<button class="motif-button ${state.motif===m.id?'selected':''}" type="button" data-motif="${m.id}" aria-pressed="${state.motif===m.id}">${m.name}</button>`).join('');
 document.querySelectorAll('[data-kind]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.kind===state.kind)));
 document.querySelector('#color-label').textContent=COLORS.find(c=>c.id===state.color)?.name || '';
 document.querySelector('#price').textContent=money(BASE_PRICE[state.kind]+(state.motif==='none'?0:4)+(state.text?6:0));
}
function renderPreview(){preview.innerHTML=garmentSVG(state,{className:'studio-garment',ariaLabel:'Your customizable apparel'});renderControls();}
function rerender(){renderPreview();notify.hidden=true;}
document.querySelectorAll('[data-kind]').forEach(b=>b.addEventListener('click',()=>{state.kind=b.dataset.kind;rerender()}));
swatches.addEventListener('click',e=>{const b=e.target.closest('[data-color]');if(b){state.color=b.dataset.color;rerender();}});
motifs.addEventListener('click',e=>{const b=e.target.closest('[data-motif]');if(b){state.motif=b.dataset.motif;rerender();}});
document.querySelector('#personalize').addEventListener('input',e=>{state.text=cleanText(e.target.value);if(e.target.value!==state.text)e.target.value=state.text;rerender();});
document.querySelector('#reset').addEventListener('click',()=>{state={kind:'tee',color:'cream',motif:'orbit',text:'',position:{x:160,y:188},quantity:1};document.querySelector('#personalize').value='';document.querySelector('#quantity').value='1';rerender()});
document.querySelector('#quantity').addEventListener('change',e=>{state.quantity=Math.max(1,Math.min(10,Math.round(Number(e.target.value)||1)));e.target.value=String(state.quantity);});
let dragging=false;
preview.addEventListener('pointerdown',e=>{
 if(!e.target.closest('[data-drag-design]'))return;
 dragging=true;preview.setPointerCapture(e.pointerId);updateDrag(e);
});
function updateDrag(e){
 const svg=preview.querySelector('svg');if(!svg)return;
 const rect=svg.getBoundingClientRect();
 const scale=Math.min(rect.width/320,rect.height/360);
 const viewW=320*scale,viewH=360*scale;
 const left=rect.left+(rect.width-viewW)/2,top=rect.top+(rect.height-viewH)/2;
 state.position.x=Math.max(105,Math.min(215,Math.round((e.clientX-left)/scale)));
 state.position.y=Math.max(133,Math.min(235,Math.round((e.clientY-top)/scale)));
 // Only redraw SVG while dragging; don't remove the capture target.
 const g=svg.querySelector('[data-drag-design]');if(g)g.setAttribute('transform',`translate(${state.position.x} ${state.position.y})`);
}
preview.addEventListener('pointermove',e=>{if(dragging)updateDrag(e)});
preview.addEventListener('pointerup',()=>{dragging=false});
preview.addEventListener('pointercancel',()=>{dragging=false});
preview.addEventListener('keydown',e=>{
 if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
 e.preventDefault();
 const delta= e.shiftKey?8:2;
 state.position.x=Math.max(105,Math.min(215,state.position.x+(e.key==='ArrowLeft'?-delta:e.key==='ArrowRight'?delta:0)));
 state.position.y=Math.max(133,Math.min(235,state.position.y+(e.key==='ArrowUp'?-delta:e.key==='ArrowDown'?delta:0)));
 renderPreview();
});
document.querySelector('#add-custom').addEventListener('click',()=>{
 const cart=readCart();cart.push(makeCartItem(state));
 if(!saveCart(cart)){notify.textContent='Could not save the bag. Please check browser storage settings.';notify.hidden=false;return;}
 document.querySelectorAll('[data-bag-count]').forEach(el=>el.textContent=String(itemCount(cart)));
 notify.textContent='Your custom piece was added to your demo bag.';notify.hidden=false;
});
renderPreview();document.querySelectorAll('[data-bag-count]').forEach(el=>el.textContent=String(itemCount(readCart())));
