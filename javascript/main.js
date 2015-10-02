
  // slick carousel loader
  $('.carousel-slick').slick({
  	arrows: true,
  	infinite: true,
  	speed: 500,
  	fade: true,
  	cssEase: 'linear',
  	autoplay: false,
  });

 
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'johnandrenee2015',
        clientId: '1e7f72a528b649d5b9d0ef17c5e3855a'
       });
      feed.run();
