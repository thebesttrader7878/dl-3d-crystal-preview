/* v10 pop sections: announcement bar, sale banner, before/after, occasions, reviews. Original copy. */
(function(){
var bar=document.createElement('div');bar.className='ann';
var best=0;D.forEach(function(p){p.v.forEach(function(v){if(v.p&&v.c)best=Math.max(best,Math.round((1-v.p/v.c)*100))})});
bar.innerHTML='&#10022; Save up to '+best+'% off regular prices &middot; Free shipping option &middot; <a href="#/shop">Shop now</a>';
document.body.insertBefore(bar,document.body.firstChild);
var I=function(h){return (IMG[h]||[''])[0]};
var hd=function(eb,h,l){return '<div class=center><span class="eyebrow reveal">'+eb+'</span><h2 class=reveal>'+h+'</h2>'+(l?'<p class="lead reveal" style="margin:0 auto">'+l+'</p>':'')+'</div>'};
var sec=function(x,c){return '<section class="section'+(c?' '+c:'')+'"><div class=wrap>'+x+'</div></section>'};
var SALE=sec('<div class="sale reveal"><span class=eyebrow>Gift season pricing</span><h2><span class=shimmer>Up to '+best+'% off regular prices</span></h2><p>Every crystal is made to order from your photo. Order early for the holidays.</p><a class=btn href="#/shop">Shop the sale</a></div>');
var BA=sec(hd('Photo to crystal','See the transformation','Send us a favorite photo. We laser-engrave it inside solid crystal.')+'<div class=ba><figure class=reveal><img src="brand/products/ba-photo.jpg" alt="Example photo before engraving" width=600 height=450 loading=lazy><figcaption>Your photo<small>Any clear, well lit picture</small></figcaption></figure><div class=ba__arrow aria-hidden=true>&rarr;</div><figure class=reveal><div class=ba__after><img src="'+I('3d-crystal-rectangle')+'" alt="The same photo engraved in a 3D crystal rectangle" width=600 height=600 loading=lazy></div><figcaption>Your crystal<small>Laser-engraved, made to order</small></figcaption></figure></div><p class=center style="margin-top:22px"><a class=btn style="display:inline-flex;width:auto;padding:0 28px" href="#/p/3d-crystal-rectangle">Make mine</a></p>');
var occ=[["Mother's Day",'For the mom who has everything','3d-crystal-wide-heart','#/p/3d-crystal-wide-heart'],['Memorial','Keep their smile close','3d-crystal-prestige','#/p/3d-crystal-prestige'],['Pets','For the furry family','3d-crystal-dog-bone-tag','#/shop/Pet%20lovers'],['Weddings','Your day, forever clear','3d-notched-tall','#/p/3d-notched-tall']];
var OCC=sec(hd('Shop by occasion','A gift for every moment','')+'<div class=occ2 data-stagger>'+occ.map(function(o){return '<a class="occ2__c reveal" href="'+o[3]+'"><span class=occ2__tag>Gift idea</span><img src="'+I(o[2])+'" alt="'+o[0]+' crystal gift" width=400 height=533 loading=lazy><span>'+o[0]+'<small>'+o[1]+' &rarr;</small></span></a>'}).join('')+'</div>');
var REV=sec(hd('Reviews','What customers say','')+'<div class="revsum reveal"><span class=stars>&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>[Placeholder: real review count and rating go here once reviews come in]</span></div><div class=revs data-stagger>'+[1,2,3].map(function(n){return '<div class="rev reveal"><span class=stars>&#9733;&#9733;&#9733;&#9733;&#9733;</span><p>[Placeholder: real customer review '+n+'. Connect a reviews app like Judge.me in Shopify.]</p><b>[Customer name]</b><br><small>Verified buyer</small></div>'}).join('')+'</div>');
var H=window.HOME;window.HOME=function(){var s=H();var i=s.indexOf('<section class=section><div class=wrap><div class=center><span class="eyebrow reveal">Shop by category');
 if(i<0)i=s.indexOf('<section class=section>');s=s.slice(0,i)+SALE+s.slice(i);
 var j=s.indexOf('<section class=section><div class=wrap><div class=gift>');if(j>-1){var k=s.indexOf('</section>',j)+10;s=s.slice(0,j)+OCC+BA+s.slice(k)}else s+=OCC+BA;
 var f=s.indexOf('<section class="section proof"');s=f>-1?s.slice(0,f)+REV+s.slice(f):s+REV;return s};
if(typeof route==='function')route();
})();
