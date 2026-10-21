/* QUIRÓN · lógica de la tienda */
(function(){
  var root=document.getElementById('tienda'); if(!root) return;
  var reduce=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var Tg='translate(56,27) rotate(47) scale(0.694) translate(-50,-50)';
  var Tm='translate(16.5,66) rotate(40) scale(0.347) translate(-50,-50)';
  var Tp='translate(91,62) rotate(15) scale(0.316) translate(-50,-50)';
  // El destello CRECE de lo sutil a lo denso: Éter(pequeña) · Aire(mediana) · Agua(grande) · Tierra(2) · Fuego(3).
  // Cada estrella suelta conserva su posición original en la molécula.
  function destello(f){
    if(f==='fuego') return '<use href="#qmol"/>';                                                              // 3 estrellitas (molécula)
    if(f==='tierra') return '<use href="#qstar" transform="'+Tg+'"/><use href="#qstar" transform="'+Tm+'"/>';  // 2 (grande + mediana)
    if(f==='agua') return '<use href="#qstar" transform="'+Tg+'"/>';                                           // grande
    if(f==='aire') return '<use href="#qstar" transform="'+Tm+'"/>';                                           // mediana
    return '<use href="#qstar" transform="'+Tp+'"/>';                                                          // éter → pequeña (posición original)
  }
  var F={
    agua:{name:'Agua',sub:'la corriente',grad:'linear-gradient(150deg,#2c6e7f,#0b2620)',lab:'#bfe6ef',mark:'#eaf9fc',dot:'#2c6e7f'},
    tierra:{name:'Tierra',sub:'la raíz',grad:'linear-gradient(150deg,#9aa62f,#39430f)',lab:'#eaf3c0',mark:'#f2ffb0',dot:'#9aa62f'},
    fuego:{name:'Fuego',sub:'la llama',grad:'linear-gradient(150deg,#efff3d,#c2d400)',lab:'#2a3a0e',mark:'#19493d',dot:'#efff3d'},
    aire:{name:'Aire',sub:'el soplo',grad:'linear-gradient(150deg,#2f6a58,#0b2620)',lab:'#9fc7b7',mark:'#cfe7dd',dot:'#2f6a58'},
    eter:{name:'Éter',sub:'el astro',grad:'linear-gradient(150deg,#b5a2e6,#6e4595)',lab:'#efe9fb',mark:'#ffffff',dot:'#b5a2e6'}
  };
  // Selección curada · productos y precios reales del Catálogo Maestro (editables).
  var P=[
    {id:'plata-cobre',n:'Plata y Cobre Coloidal',f:'eter',cat:'Coloidales',ess:'los metales nobles',price:280,vol:'250 ml',d:'Plata y cobre en suspensión —los metales que los antiguos llamaban nobles—. Un símbolo de cuidado para tu botiquín ritual.'},
    {id:'oro',n:'Oro Coloidal',f:'eter',cat:'Coloidales',ess:'el sol hecho materia',price:340,vol:'250 ml',d:'El sol hecho materia. Oro coloidal como gesto de bienestar y tradición, para acompañar tus días con calma.'},
    {id:'ormus',n:'Ormus',f:'eter',cat:'Coloidales',ess:'materia estelar',price:500,vol:'150 ml',d:'Materia estelar, la quintaesencia celeste: el punto donde lo alquímico se une a lo astral.'},
    {id:'cafe',n:'Café Orgánico La 60',f:'aire',cat:'Café',ess:'el ritual que despierta',price:150,vol:'1 kg',d:'Café orgánico mexicano de La 60. El ritual que despierta, materia honesta de la tierra.'},
    {id:'espirulina',n:'Spirulina Kanan',f:'aire',cat:'Suplementos',ess:'la savia verde',price:400,vol:'300 cáps',d:'La savia verde, farmacopea viva. Espirulina para acompañar tu bienestar con lo que crece y alimenta.'},
    {id:'clorofila',n:'Clorofila',f:'aire',cat:'Suplementos',ess:'la luz que se bebe',price:95,vol:'frasco',d:'La luz que se bebe. Clorofila para acompañar tu día con lo vivo que respira.'},
    {id:'magnesio',n:'Cloruro de Magnesio',f:'aire',cat:'Suplementos',ess:'el mineral que sostiene',price:100,vol:'cápsulas',d:'El mineral que sostiene. Cloruro de magnesio en cápsula, de la farmacopea viva.'},
    {id:'aguamar1',n:'Agua de Mar Hipertónica',f:'agua',cat:'Agua de mar',ess:'el plasma primordial',price:100,vol:'1 L',d:'Agua de mar hipertónica de Costa Maya. El plasma primordial, el útero del que venimos.'},
    {id:'aguamar5',n:'Agua de Mar · garrafa',f:'agua',cat:'Agua de mar',ess:'el mar en casa',price:470,vol:'5 L',d:'Agua de mar hipertónica de Costa Maya, en garrafa. La corriente que engendra, para toda la casa.'},
    {id:'suero',n:'Suero Fisiológico',f:'agua',cat:'Sueros y soluciones',ess:'agua que repone',price:60,vol:'500 ml',d:'Suero fisiológico. Agua que repone y acompaña, nacida de la sal primordial.'},
    {id:'diatomeas',n:'Tierra de diatomeas',f:'tierra',cat:'Minerales y tierras',ess:'la matriz mineral',price:250,vol:'250 g',d:'La matriz mineral que absorbe y retiene. Tierra de diatomeas, la raíz que filtra.'},
    {id:'zeolita',n:'Zeolita Clinoptilolita',f:'tierra',cat:'Minerales y tierras',ess:'la piedra que filtra',price:300,vol:'250 g',d:'La piedra que filtra, milenaria y paciente. Zeolita para tu ritual de la tierra.'},
    {id:'epsom',n:'Sales de Epsom',f:'tierra',cat:'Minerales y tierras',ess:'el descanso del cuerpo',price:130,vol:'1 kg',d:'Sales de Epsom. El descanso del cuerpo, mineral de la tierra que sostiene.'},
    {id:'cds',n:'CDS',f:'fuego',cat:'Potabilización y desinfección',ess:'la llama que purifica',price:250,vol:'250 ml',d:'Solución de dióxido de cloro. La llama que purifica el agua y prepara el terreno, para tus ritos de limpieza diaria.'},
    {id:'clorito',n:'Clorito de sodio',f:'fuego',cat:'Potabilización y desinfección',ess:'el precursor',price:450,vol:'250 ml',d:'Clorito de sodio. El precursor de la llama que purifica y abre terreno para lo nuevo.'},
    {id:'dmso',n:'DMSO',f:'fuego',cat:'DMSO',ess:'el mensajero',price:350,vol:'125 ml',d:'Dimetilsulfóxido. El mensajero de la fuerza que prepara y transmuta.'},
    {id:'kit-precursores',n:'Kit Precursores',f:'fuego',cat:'Kits y protocolos',ess:'el rito de preparación',price:500,vol:'125 ml',d:'Kit de precursores. El rito de preparación de la llama, para tu proceso de limpieza.'}
  ];
  var forder={eter:0,aire:1,agua:2,tierra:3,fuego:4};
  P.sort(function(a,b){return forder[a.f]-forder[b.f]});
  function money(n){return n.toLocaleString('es-MX')}

  function cardHTML(p){
    var f=F[p.f];
    return '<article class="pcard" data-id="'+p.id+'">'
      +'<div class="ptop grain" style="background:'+f.grad+'">'
      +'<svg class="qmark pmark" viewBox="0 0 100.9 83.2" style="color:'+f.mark+'">'+destello(p.f)+'</svg>'
      +'<span class="pfz" style="color:'+f.lab+'">'+f.name+' · '+f.sub+'</span></div>'
      +'<div class="pbody"><h3 class="pname">'+p.n+'</h3><p class="pess">'+p.ess+'</p>'
      +'<div class="prow"><span class="pprice">'+money(p.price)+'</span><span class="pvol">'+p.vol+'</span></div></div></article>';
  }
  function mount(el,list){el.innerHTML=list.map(cardHTML).join('');el.querySelectorAll('.pcard').forEach(function(c){c.onclick=function(){openProduct(c.dataset.id)}})}

  // fuerzas strip
  var order=['eter','aire','agua','tierra','fuego'];
  document.getElementById('forcesStrip').innerHTML=order.map(function(k){var f=F[k];
    return '<button class="force grain" data-f="'+k+'" style="background:'+f.grad+'">'
      +'<svg class="fm qmark" viewBox="0 0 100.9 83.2" style="color:'+f.mark+'">'+destello(k)+'</svg>'
      +'<span class="fn" style="color:'+f.lab+'">'+f.name+'</span><span class="fs" style="color:'+f.lab+'">'+f.sub+'</span></button>';
  }).join('');
  document.querySelectorAll('.force').forEach(function(b){b.onclick=function(){go('catalogo',b.dataset.f)}});

  // featured
  mount(document.getElementById('featGrid'), P.filter(function(p){return ['oro','cafe','aguamar1','diatomeas','cds'].indexOf(p.id)>=0}));

  // filtros
  var curF='todas';
  var fchips=['todas'].concat(order);
  document.getElementById('filters').innerHTML=fchips.map(function(k){
    if(k==='todas') return '<button class="fchip on" data-f="todas">Todas</button>';
    var f=F[k];return '<button class="fchip" data-f="'+k+'"><span class="dot" style="background:'+f.dot+'"></span>'+f.name+'</button>';
  }).join('');
  function applyFilter(k){curF=k;
    document.querySelectorAll('#filters .fchip').forEach(function(c){c.classList.toggle('on',c.dataset.f===k)});
    mount(document.getElementById('catGrid'), k==='todas'?P:P.filter(function(p){return p.f===k}));
  }
  document.querySelectorAll('#filters .fchip').forEach(function(c){c.onclick=function(){applyFilter(c.dataset.f)}});
  applyFilter('todas');

  // producto detalle
  function openProduct(id){
    var p=P.find(function(x){return x.id===id}); if(!p)return; var f=F[p.f];
    document.getElementById('pdBox').innerHTML=
      '<div class="pd-vis grain" style="background:'+f.grad+'"><svg class="m qmark" viewBox="0 0 100.9 83.2" style="color:'+f.mark+'">'+destello(p.f)+'</svg></div>'
      +'<div class="pd-info"><button class="back" data-nav="catalogo">← Volver al catálogo</button>'
      +'<div class="pd-fz" style="color:'+f.dot+'">'+f.name+' · '+f.sub+'</div>'
      +'<h2>'+p.n+'</h2><p class="pd-ess">'+p.ess+'</p>'
      +'<p class="pd-desc">'+p.d+'</p>'
      +'<div class="pd-buy"><span class="pd-price">'+money(p.price)+'</span>'
      +'<button class="btn btn-verde" data-add="'+p.id+'">Añadir a la canasta</button></div>'
      +'<div class="pd-meta"><div class="r"><span class="k">Fuerza</span><span class="v">'+f.name+' · '+f.sub+'</span></div>'
      +(p.cat?'<div class="r"><span class="k">Categoría</span><span class="v">'+p.cat+'</span></div>':'')
      +'<div class="r"><span class="k">Presentación</span><span class="v">'+p.vol+'</span></div>'
      +'<div class="r" style="border-bottom:0"><span class="k">Materia</span><span class="v">honesta · natural</span></div></div>'
      +'<p class="legal">Ritual, símbolo y tradición. No sustituye atención médica ni constituye una afirmación de salud.</p></div>';
    mount(document.getElementById('relGrid'), P.filter(function(x){return x.f===p.f && x.id!==p.id}));
    bindNav(document.getElementById('view-producto'));
    document.querySelector('[data-add]').onclick=function(){addCart(p.id)};
    go('producto');
    window.scrollTo(0,0);
  }

  // navegación entre vistas
  function show(v){document.querySelectorAll('#tienda .view').forEach(function(x){x.classList.toggle('on',x.id==='view-'+v)});
    document.querySelectorAll('.links a').forEach(function(a){a.classList.toggle('on',a.dataset.nav===v)});}
  function go(v,filter){show(v);if(v==='catalogo'&&filter)applyFilter(filter);if(v!=='producto')window.scrollTo(0,0);}
  function bindNav(scope){(scope||root).querySelectorAll('[data-nav]').forEach(function(a){
    if(a._b)return;a._b=1;a.onclick=function(e){e.preventDefault();var v=a.dataset.nav;go(v,a.dataset.f);
      if(a.dataset.scroll){var t=document.getElementById(a.dataset.scroll);if(t)setTimeout(function(){t.scrollIntoView({behavior:reduce?'auto':'smooth'})},60);}};});}
  bindNav(root);

  // carrito
  var cart=[];
  var scrim=document.getElementById('scrim'),drawer=document.getElementById('drawer');
  function openCart(){scrim.classList.add('on');drawer.classList.add('on')}
  function closeCart(){scrim.classList.remove('on');drawer.classList.remove('on')}
  document.getElementById('openCart').onclick=openCart;
  document.getElementById('closeCart').onclick=closeCart;scrim.onclick=closeCart;
  function renderCart(){
    var body=document.getElementById('cartBody');
    if(!cart.length){body.innerHTML='<p class="cempty">Tu canasta está vacía.<br>La constelación te espera.</p>';}
    else{body.innerHTML=cart.map(function(it){var p=P.find(function(x){return x.id===it}),f=F[p.f];
      return '<div class="citem"><div class="cm grain" style="background:'+f.grad+'"><svg class="qmark" viewBox="0 0 100.9 83.2" style="width:30px;color:'+f.mark+'">'+destello(p.f)+'</svg></div>'
      +'<div><div class="cn">'+p.n+'</div><div class="cv">'+p.vol+'</div></div><div class="cp">$'+money(p.price)+'</div></div>';}).join('');}
    var sub=cart.reduce(function(s,it){return s+P.find(function(x){return x.id===it}).price},0);
    document.getElementById('cartSub').textContent='$'+money(sub);
    document.getElementById('cc').textContent=cart.length;
  }
  var toastT;
  function addCart(id){cart.push(id);renderCart();var p=P.find(function(x){return x.id===id});
    var t=document.getElementById('toast');document.getElementById('toastMsg').textContent=p.n+' · añadido';
    t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('on')},1800);}
  renderCart();

  // estrellas hero
  var cv=document.getElementById('stars');
  if(cv){var ctx=cv.getContext('2d'),st=[],W,H,DPR=Math.min(devicePixelRatio||1,2),raf;
    function sz(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
      var n=Math.round(W*H/9000);st=[];for(var i=0;i<n;i++)st.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.3,p:Math.random()*6.28,s:Math.random()*.9+.2});}
    var cols=['#efff3d','#b5a2e6','#f3f6f2'];
    function draw(t){ctx.clearRect(0,0,W,H);for(var i=0;i<st.length;i++){var s=st[i];var a=reduce?.5:(.35+.45*Math.sin(t*.001*s.s+s.p));ctx.globalAlpha=Math.max(0,a);ctx.fillStyle=cols[i%3];ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.28);ctx.fill();}ctx.globalAlpha=1;if(!reduce)raf=requestAnimationFrame(draw);}
    sz();reduce?draw(0):(raf=requestAnimationFrame(draw));var to;addEventListener('resize',function(){clearTimeout(to);to=setTimeout(function(){sz();if(reduce)draw(0)},180)});}
})();
