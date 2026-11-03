import {CATALOG,garmentSVG,money,makeCartItem,readCart,saveCart,itemCount} from './core.js';
const grid=document.querySelector('#products');
const filters=document.querySelectorAll('[data-filter]');
const search=document.querySelector('#search');
const notice=document.querySelector('#notice');
let active='all';
function updateBag(){document.querySelectorAll('[data-bag-count]').forEach(el=>el.textContent=String(itemCount(readCart())));}
function card(product){
  return `<article class="product-card"><div class="card-art">${garmentSVG(product,{ariaLabel:product.name})}<span class="pill card-tag">${product.tag}</span></div><div class="card-details"><div><h3>${product.name}</h3><p>${product.kind==='tee'?'Premium cotton tee':'Relaxed-fit hoodie'}</p></div><strong>${money(product.price)}</strong></div><button class="small-button" type="button" data-add="${product.id}">Add to bag <span aria-hidden="true">↗</span></button></article>`;
}
function render(){
 const q=(search?.value||'').toLowerCase().trim();
 const list=CATALOG.filter(p=>(active==='all'||p.kind===active)&&(!q||`${p.name} ${p.kind} ${p.tag}`.toLowerCase().includes(q)));
 grid.innerHTML=list.length?list.map(card).join(''):'<p class="empty-state">No matches. Try a different search.</p>';
}
filters.forEach(el=>el.addEventListener('click',()=>{active=el.dataset.filter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===el)));render()}));
search?.addEventListener('input',render);
grid.addEventListener('click',e=>{
 const btn=e.target.closest('[data-add]');if(!btn)return;
 const p=CATALOG.find(p=>p.id===btn.dataset.add);if(!p)return;
 const cart=readCart();cart.push(makeCartItem({...p,productId:p.id,position:{x:160,y:188}}));
 if(!saveCart(cart)){notice.textContent='Unable to save the bag in this browser.';return;}
 updateBag();notice.textContent=`${p.name} added to your demo bag.`;notice.hidden=false;
 window.setTimeout(()=>{notice.hidden=true;},3500);
});
document.querySelector('#hero-tee').innerHTML=garmentSVG({kind:'tee',color:'cream',motif:'orbit'},{ariaLabel:'Cream T-shirt with orbit artwork'});
document.querySelector('#hero-hoodie').innerHTML=garmentSVG({kind:'hoodie',color:'clay',motif:'bloom'},{ariaLabel:'Clay hoodie with flower artwork'});
render();updateBag();
