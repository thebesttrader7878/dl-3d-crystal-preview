/* D&L motion: reveals, stagger, parallax, shrinking header. Vanilla, respects reduced motion. */
(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var io=('IntersectionObserver' in window&&!reduce)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
function scan(root){(root||document).querySelectorAll('.reveal:not([data-r])').forEach(function(el){el.setAttribute('data-r','');
  var p=el.parentElement;if(p&&p.hasAttribute('data-stagger')){var i=[].indexOf.call(p.children,el);el.style.setProperty('--d',(Math.min(i,8)*0.08)+'s');}
  if(io)io.observe(el);else el.classList.add('in');});}
window.DLReveal=scan;scan();
new MutationObserver(function(){scan()}).observe(document.body,{childList:true,subtree:true});
var hdr=document.querySelector('.hdr');
function onScroll(){var y=window.scrollY;if(hdr)hdr.classList.toggle('is-small',y>24);
  if(!reduce)document.querySelectorAll('[data-parallax]').forEach(function(el){el.style.transform='translate3d(0,'+(y*parseFloat(el.dataset.parallax)).toFixed(1)+'px,0)';});}
addEventListener('scroll',onScroll,{passive:true});onScroll();

var pg=document.createElement('div');pg.className='prog';document.body.appendChild(pg);
addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-innerHeight;pg.style.transform='scaleX('+(h>0?scrollY/h:0)+')'},{passive:true});
var cio=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var el=e.target,n=+el.dataset.count,suf=el.dataset.suf||'';if(reduce){el.textContent=n+suf;return}var t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f)})(t0)})}):null;
var timer;
function car(){var c=document.querySelector('.car:not([data-on])');if(!c)return;c.setAttribute('data-on','');var tr=c.querySelector('.car__track'),ss=c.querySelectorAll('.car__s'),ds=c.querySelectorAll('.car__dots button'),i=0,x0=null,paused=false;
 function go(n){i=(n+ss.length)%ss.length;tr.style.transform='translateX('+(-100*i)+'%)';ss.forEach(function(s,k){s.classList.toggle('on',k==i)});ds.forEach(function(d,k){d.classList.toggle('on',k==i)})}
 ds.forEach(function(d,k){d.onclick=function(){go(k)}});
 c.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;paused=true},{passive:true});
 c.addEventListener('touchend',function(e){if(x0!==null){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1))}x0=null;setTimeout(function(){paused=false},4000)});
 c.onmouseenter=function(){paused=true};c.onmouseleave=function(){paused=false};
 clearInterval(timer);if(!reduce)timer=setInterval(function(){if(!paused&&document.contains(c))go(i+1)},5000)}
function extras(){car();if(cio)document.querySelectorAll('[data-count]:not([data-c])').forEach(function(el){el.setAttribute('data-c','');cio.observe(el)});}
new MutationObserver(extras).observe(document.body,{childList:true,subtree:true});extras();
})();
