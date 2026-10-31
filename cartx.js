/* v16 cart drawer (localStorage). Add-ons are linked to their crystal by bid/parent and follow it. */
(function(){
const $=s=>document.querySelector(s),money=n=>'$'+(+n).toFixed(2).replace(/\.00$/,'');
const el=document.createElement('div');el.innerHTML='<div class=cd-ov data-cd-close></div><aside class=cd role=dialog aria-modal=true aria-label="Your cart" aria-hidden=true><div class=cd__h><h2>Your cart</h2><button class=cd__x data-cd-close aria-label="Close cart">&times;</button></div><div class=cd__b id=cdb></div><div class=cd__f id=cdf></div></aside>';
document.body.append(...el.children);
function norm(c){const ids=new Set(c.filter(i=>i.bid).map(i=>i.bid));c=c.filter(i=>!i.parent||ids.has(i.parent));c.forEach(i=>{i.q=i.q||1;if(i.parent&&i.per){const pa=c.find(x=>x.bid===i.parent);if(pa)i.q=pa.q}});return c}
const get=()=>norm(JSON.parse(localStorage.cart||'[]')),put=c=>{c=norm(c);localStorage.cart=JSON.stringify(c);window.cart=c;count()};
function count(){const n=get().filter(i=>!i.parent).reduce((s,i)=>s+i.q,0),l=$('#cartlink');if(l){var b=document.getElementById('cartn');if(b){b.textContent=n;b.hidden=!n}l.setAttribute('aria-label','Cart, '+n+(n===1?' item':' items'))}}
const sub=c=>c.reduce((s,i)=>s+i.p*i.q,0);
function remove(k){const c=get(),i=c[k];if(!i)return;put(c.filter((x,j)=>j!==k&&!(i.bid&&x.parent===i.bid)))}
function step(k,d){const c=get(),i=c[k];if(!i)return;i.q=Math.max(0,i.q+d);if(!i.q){remove(k);return}put(c)}
function lineHTML(c,i,k,cls){const kids=i.bid?c.map((x,j)=>[x,j]).filter(([x])=>x.parent===i.bid):[];
 const ksum=kids.reduce((s,[x])=>s+x.p*x.q,0);
 return '<div class="'+cls+'"><img src="'+(i.img||'brand/logo-gem-160.png')+'" alt="" width=72 height=72 loading=lazy><div><div class=cd__t>'+i.t+'</div><small>'+i.o+'</small>'+Object.entries(i.props||{}).map(([a,v])=>'<small>'+a+': '+String(v).replace(/</g,'&lt;')+'</small>').join('')
 +(kids.length?'<ul class=kids>'+kids.map(([x,j])=>'<li><span>'+x.t+(x.q>1?' &times; '+x.q:'')+'</span><span>'+(x.p?money(x.p*x.q):'Included')+(x.per?'':' <button class=lnk data-rm="'+j+'" aria-label="Remove '+x.t+'">&times;</button>')+'</span></li>').join('')+'</ul>':'')
 +'<div class=qty><button data-q="'+k+'" data-d=-1 aria-label="Decrease quantity">&minus;</button><span aria-live=polite>'+i.q+'</span><button data-q="'+k+'" data-d=1 aria-label="Increase quantity">+</button></div> <button class=cd__rm data-rm="'+k+'">Remove</button></div><div><b>'+money(i.p*i.q+ksum)+'</b></div></div>'}
function linesHTML(c,cls){return c.map((i,k)=>i.parent?'':lineHTML(c,i,k,cls)).join('')}
function ups(c){const have=new Set(c.map(i=>i.t));return (typeof D!=='undefined'?D:[]).filter(p=>!have.has(p.t)&&p.v[0].p>0&&/keychain|necklace|ornament/i.test(p.t)).slice(0,4)}
function render(added){const c=get(),b=$('#cdb'),f=$('#cdf');
 if(!c.length){b.innerHTML='<div class=cd__empty><p>Your cart is empty.</p><a class=btn href="#/shop" data-cd-close>Shop crystals</a></div>';f.innerHTML='';return}
 b.innerHTML=(added?'<p class=cd__ok role=status>&#10003; Added: '+added+'</p>':'')+'<div class=cd__ship><b>&#10003; Free shipping option</b> on every order. Faster speeds at checkout.</div>'+linesHTML(c,'cd__it')
  +(ups(c).length?'<div class=cd__up><h3>Add a little extra</h3><div class=cd__ups>'+ups(c).map(p=>'<a href="#/p/'+p.h+'" data-cd-close><img src="'+(typeof IMG!=='undefined'&&IMG[p.h]?IMG[p.h][0]:'brand/logo-gem-160.png')+'" alt="" width=160 height=160 loading=lazy>'+p.t+'<br><b>'+money(p.v[0].p)+'</b></a>').join('')+'</div></div>':'');
 f.innerHTML='<div class=cd__sub><span>Subtotal</span><strong>'+money(sub(c))+'</strong></div>'+(window.PROMO?'<small>Use code <b>'+PROMO.code+'</b> at checkout for '+PROMO.pct+'% off.</small>':'')+'<small>or 4 interest-free payments of '+money(Math.round(sub(c)/4*100)/100)+' with Afterpay or Klarna</small><button class=btn id=cdco>Checkout</button><a class="buynow btn" href="#/cart" data-cd-close style="display:flex;align-items:center;justify-content:center;text-decoration:none">View cart</a>';
}
function open(added){render(added);document.documentElement.classList.add('cd-open');$('.cd').setAttribute('aria-hidden','false');setTimeout(()=>$('.cd__x').focus(),50)}
function close(){document.documentElement.classList.remove('cd-open');$('.cd').setAttribute('aria-hidden','true')}
const refresh=()=>{if(document.documentElement.classList.contains('cd-open'))render();if(location.hash==='#/cart')dispatchEvent(new HashChangeEvent('hashchange'))};
document.addEventListener('click',e=>{const t=e.target.closest('[data-cd-close],[data-q],[data-rm],#cdco,#cartlink');if(!t)return;
 if(t.id==='cartlink'){e.preventDefault();open();return}
 if(t.id==='cdco'){close();location.hash='#/checkout';return}
 if(t.dataset.q){step(+t.dataset.q,+t.dataset.d);refresh();return}
 if(t.dataset.rm){remove(+t.dataset.rm);refresh();return}
 close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
window.CD={open,close,get,put,count,money,remove,linesHTML,sub};count();
})();
