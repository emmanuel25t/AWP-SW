self.addEventListener('install', e=>{
  caches.open('cache-v1')
  .then(cache =>{
      cache.addAll([
          './',
          'css/style.css',
          'img/bb.jpg',
          'img/bb2.jpg',
          'img/dua.png',
          'img/fb.png',
          'img/tw.jpg',
          'img/y2mate.com - BAD BUNNY  120  EL ÚLTIMO TOUR DEL MUNDO Visualizer_v144P',
          'img/y2mate.com - Minecraft en 1 minuto_v240P',
          'img/y2mate.com - BAD BUNNY EN 1 MINUTO_v240P',
          'main.js'
      ])
  });
  e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
  //cache with network fallback
  const respuesta = caches.match( e.request )
      .then ( res => {
          if ( res ) return res;
          //no existe el archivo
          //tengo que ir a la web
          console.log('No existe', e.request.url);
          return fetch( e.request ).then ( newResp => {
              caches.open('cache-v1')
                  .then( cache => {
                      cache.put( e.request, newResp);
                  }

                  )
              return newResp.clone;
          });
      });
      e.respondWith(respuesta);
  //only cache
  //e.respondWith( caches.match(e.request));
});