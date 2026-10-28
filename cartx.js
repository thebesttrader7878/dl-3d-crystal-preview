/* v8 static cart drawer (localStorage). Real checkout runs on Shopify. */
(function(){
const $=s=>document.querySelector(s),money=n=>'$'+(+n).toFixed(2).replace(/\.00$/,'');
const el=document.createElement('div');el.innerHTML='<div class=cd-ov data-cd-close></div><aside class=cd role=dialog aria-modal=true aria-label="Your cart" aria-hidden=true><div class=cd__h><h2>Your cart</h2><button class=cd__x data-cd-close aria-label="Close cart">&times;</button></div><div class=cd__b id=cdb></div><div class=cd__f id=cdf></div></aside>';
document.body.append(...el.children);
const get=()=>{const c=JSON.parse(localStorage.cart||'[]');c.forEach(i=>i.q=i.q||1);return c},put=c=>{localStorage.cart=JSON.stringify(c);window.cart=c;count()};
function count(){const n=get().reduce((s,i)=>s+i.q,0),l=$('#cartlink');if(l)l.textContent='Cart ('+n+')'}
function ups(c){const have=new Set(c.map(i=>i.t));return (typeof D!=='undefined'?D:[]).filter(p=>!have.has(p.t)&&p.v[0].p>0&&/keychain|necklace|tag/i.test(p.t)).slice(0,4)}
function render(added){const c=get(),sub=c.reduce((s,i)=>s+i.p*i.q,0),b=$('#cdb'),f=$('#cdf');
 if(!c.length){b.innerHTML='<div class=cd__empty><p>Your cart is empty.</p><a class=btn href="#/shop" data-cd-close>Shop crystals</a></div>';f.innerHTML='';return}
 b.innerHTML=(added?'<p class=cd__ok role=status>Added to your cart: '+added+'</p>':'')+c.map((i,k)=>'<div class=cd__it><img src="'+(i.img||'brand/logo-mark.png')+'" alt="" width=72 height=72 loading=lazy><div><div class=cd__t>'+i.t+'</div><small>'+i.o+'</small>'+Object.entries(i.props||{}).map(([a,v])=>'<small>'+a+': '+v+'</small>').join('')+'<div class=qty><button data-q="'+k+'" data-d=-1 aria-label="Decrease quantity">&minus;</button><span aria-live=polite>'+i.q+'</span><button data-q="'+k+'" data-d=1 aria-label="Increase quantity">+</button></div> <button class=cd__rm data-rm="'+k+'">Remove</button></div><div>'+money(i.p*i.q)+'</div></div>').join('')
  +(ups(c).length?'<div class=cd__up><h3>Add a little extra</h3><div class=cd__ups>'+ups(c).map(p=>'<a href="#/p/'+p.h+'" data-cd-close><img src="'+(typeof IMG!=='undefined'&&IMG[p.h]?IMG[p.h][0]:'')+'" alt="" width=160 height=160 loading=lazy>'+p.t+'<br><b>'+money(p.v[0].p)+'</b></a>').join('')+'</div></div>':'');
 f.innerHTML='<div class=cd__sub><span>Subtotal</span><strong>'+money(sub)+'</strong></div><small>Shipping speed and taxes are picked at checkout. Free shipping option available.</small><button class=btn id=cdco>Checkout</button><a class="buynow btn" href="#/cart" data-cd-close style="display:flex;align-items:center;justify-content:center;text-decoration:none">View cart</a><p class=cd__note id=cdn hidden>This is an offline preview. Real checkout runs on Shopify.</p>';
}
function open(added){render(added);document.documentElement.classList.add('cd-open');$('.cd').setAttribute('aria-hidden','false');setTimeout(()=>$('.cd__x').focus(),50)}
function close(){document.documentElement.classList.remove('cd-open');$('.cd').setAttribute('aria-hidden','true')}
document.addEventListener('click',e=>{const t=e.target.closest('[data-cd-close],[data-q],[data-rm],#cdco,#cartlink');if(!t)return;
 if(t.id==='cartlink'){e.preventDefault();open();return}
 if(t.id==='cdco'){$('#cdn').hidden=false;setTimeout(()=>{close();location.hash='#/checkout'},1400);return}
 if(t.dataset.q){const c=get(),i=c[+t.dataset.q];i.q=Math.max(0,i.q+ +t.dataset.d);if(!i.q)c.splice(+t.dataset.q,1);put(c);render();if(location.hash==='#/cart')dispatchEvent(new HashChangeEvent('hashchange'));return}
 if(t.dataset.rm){const c=get();c.splice(+t.dataset.rm,1);put(c);render();if(location.hash==='#/cart')dispatchEvent(new HashChangeEvent('hashchange'));return}
 close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
window.CD={open,close,get,put,count,money};count();
})();
