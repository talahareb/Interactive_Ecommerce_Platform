import test from 'node:test';import assert from 'node:assert/strict';
import {CATALOG,COLORS,MOTIFS,money,normalizeItem,makeCartItem,readCart,saveCart,cartTotal,itemCount,garmentSVG,cleanText,escapeHTML} from '../src/core.js';
const store={v:new Map(),getItem(k){return this.v.get(k)??null},setItem(k,v){this.v.set(k,v)}};
test('catalog has six unique valid entries',()=>{
 assert.equal(CATALOG.length,6);assert.equal(new Set(CATALOG.map(p=>p.id)).size,6);
 for(const p of CATALOG){assert.ok(COLORS.some(c=>c.id===p.color));assert.ok(MOTIFS.some(m=>m.id===p.motif));assert.ok(p.price>0);}
});
test('price formatting uses USD',()=>assert.equal(money(32),'$32.00'));
test('custom item computes from trusted options',()=>{let x=makeCartItem({kind:'hoodie',color:'sage',motif:'bolt',text:'Hello',quantity:2});assert.equal(x.price,62);assert.equal(x.quantity,2);});
test('catalog items retain catalog prices, custom items ignore injected price',()=>{
 let p=CATALOG[0],x=makeCartItem({...p,productId:p.id,price:0});assert.equal(x.price,p.price);
 assert.equal(makeCartItem({kind:'tee',color:'cream',motif:'none',price:0}).price,28);
});
test('invalid data does not enter the cart',()=>{assert.equal(normalizeItem({color:'javascript:alert(1)',motif:'orbit'}),null);assert.equal(normalizeItem(null),null);});
test('quantities and positions are clamped',()=>{const x=makeCartItem({kind:'tee',color:'ink',motif:'bolt',quantity:100,position:{x:999,y:-10}});assert.equal(x.quantity,10);assert.deepEqual(x.position,{x:215,y:133});});
test('HTML escaping protects user-provided text',()=>{assert.equal(escapeHTML('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;');assert.equal(cleanText('a\nb'),'a b');});
test('SVG art contains label and safe text',()=>{const s=garmentSVG({kind:'tee',color:'clay',motif:'bloom',text:'<hi>'});assert.match(s,/&lt;hi&gt;/);assert.doesNotMatch(s,/<hi>/);assert.match(s,/<svg/);});
test('cart stores and reloads custom pieces',()=>{const cart=[makeCartItem({kind:'tee',color:'ink',motif:'bolt',quantity:2})];assert.equal(saveCart(cart,store),true);assert.equal(readCart(store).length,1);assert.equal(itemCount(readCart(store)),2);assert.equal(cartTotal(readCart(store)),64);});
test('malformed storage is handled gracefully',()=>{store.setItem('threadlab.cart.v1','{bad');assert.deepEqual(readCart(store),[]);});
test('number of stored items is limited',()=>{const items=Array.from({length:41},()=>makeCartItem({color:'ink',motif:'none'}));saveCart(items,store);assert.equal(readCart(store).length,40);});
