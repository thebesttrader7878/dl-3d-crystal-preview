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
})();
