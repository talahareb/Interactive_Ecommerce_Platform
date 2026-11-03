import {readCart,saveCart,itemCount,cartTotal,money,garmentSVG} from './core.js';
const list=document.querySelector('#cart-list');
const empty=document.querySelector('#cart-empty');
const summary=document.querySelector('#summary');
const notice=document.querySelector('#notice');
function updateCount(cart){document.querySelectorAll('[data-bag-count]').forEach(el=>el.textContent=String(itemCount(cart)));}
function render(){
 const cart=readCart();updateCount(cart);empty.hidden=cart.length>0;summary.hidden=cart.length===0;
 list.innerHTML=cart.map((item,i)=>`<article class="cart-line"><div class="cart-illustration">${garmentSVG(item,{ariaLabel:item.name})}</div><div class="line-description"><h3>${item.name}</h3><p>${item.kind==='tee'?'T-shirt':'Hoodie'} · ${item.color} · ${item.motif}</p>${item.text?`<p>Text: ${item.text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</p>`:''}<button class="text-button" type="button" data-remove="${i}">Remove</button></div><div class="line-price"><strong>${money(item.price*item.quantity)}</strong><label class="quantity-label">Qty <select data-quantity="${i}" aria-label="Quantity for ${item.name}">${Array.from({length:10},(_,n)=>`<option value="${n+1}" ${item.quantity===n+1?'selected':''}>${n+1}</option>`).join('')}</select></label></div></article>`).join('');
 document.querySelector('#subtotal').textContent=money(cartTotal(cart));
 document.querySelector('#total').textContent=money(cartTotal(cart));
}
list.addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');if(!remove)return;const cart=readCart();cart.splice(Number(remove.dataset.remove),1);saveCart(cart);render();});
list.addEventListener('change',e=>{const sel=e.target.closest('[data-quantity]');if(!sel)return;const cart=readCart();const index=Number(sel.dataset.quantity);if(!cart[index])return;cart[index].quantity=Number(sel.value);saveCart(cart);render();});
document.querySelector('#demo-order').addEventListener('click',()=>{
 const cart=readCart();if(!cart.length)return;
 saveCart([]);render();notice.hidden=false;notice.textContent='Demo order complete! This is only a portfolio simulation. No payment or personal information was collected.';
 window.scrollTo({top:0,behavior:'smooth'});
});
render();
