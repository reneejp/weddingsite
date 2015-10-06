(function() {

	function initSlider() {
		// slick carousel loader
		$('.carousel-slick').slick({
			arrows: true,
			infinite: true,
			speed: 500,
			fade: true,
			cssEase: 'linear',
			autoplay: true,
			adaptiveHeight: true,
		});
	}

	initSlider();

	var TAG = 'johnandrenee2015';
	var TIMEOUT = 10000;

	var tumblrList = {};

	var accessToken = '176660221.1677ed0.d77c4ad8215047bc8ad1d25b127404d8';
	var tumblrApiKey = 'JjkhlJZ4yKQ5jI1dt45S1goEce40RA9Bvk2trjlieiL5xiTUws';

	var instagramURL = 'https://api.instagram.com/v1/tags/'+TAG+'/media/recent';
	var instagramDataObj = {
		access_token: accessToken
	};

	var tumblrURL = "https://api.tumblr.com/v2/tagged";
	var tumblrDataObj = {
		api_key: tumblrApiKey,
		tag: TAG
	};

	var MAX_ID = new Date().getTime();
	function instagramReq( max_id ) {
		return $.ajax({
			url: instagramURL,
			data: instagramDataObj,
			dataType: 'jsonp',
			min_tag_id: max_id
		});
	}

	function tumblrReq() {
		return $.ajax({
			url: tumblrURL,
			data: tumblrDataObj,
			dataType: 'jsonp'
		});
	}

	$.when( instagramReq( MAX_ID ), tumblrReq() ).done( onPhotosBack );

	setInterval(function() {
		$.when( instagramReq( MAX_ID ), tumblrReq() ).done( onPhotosBack );
	}, TIMEOUT);

	function onPhotosBack( iResp, tResp ) {
		// console.log( iResp, tResp );

		var photos_final = [];
		var instagramData = iResp[ 0 ].data;
		var tumblrData = tResp[ 0 ].response;

		MAX_ID = new Date().getTime();
		for (i = 0; i < instagramData.length; i++){
			
			instagramLink = instagramData[i].images.standard_resolution.url;

			photos_final.push(instagramLink);
		}

		// console.log( tResp );
		var tumblrData = tResp [ 0 ].response;
		for (x = 0; x < tumblrData.length; x++){

			if ( typeof tumblrData[ x ].photos === "undefined" ) {
				continue;
			}
			tumblrLink = tumblrData[x].photos[ 0 ].original_size.url;
			if ( typeof tumblrList[ tumblrLink ] === "undefined" ) {
				tumblrList[ tumblrLink ] = 1;	
			}
			else {
				tumblrList[ tumblrLink ]++;
			}
			
			if ( tumblrList[ tumblrLink ] === 1 ) {
				photos_final.push(tumblrLink);
			}
		}

		console.log( tumblrList );

		tumblrList = Object.keys( tumblrList ).reduce(function( currentList, link ) {
			if ( tumblrList[ link ] === 2 ) {
				return currentList;
			}
			else {
				currentList[ link ] = 1;
				return currentList;
			}
		}, {});

		console.log( tumblrList );

		console.log(photos_final);
		$('.grid').masonry({
		  itemSelector: '.grid-item'
		  // columnWidth: 200
		});

		photos_final.forEach(function(photo){
			var img = new Image();
			img.onload = function() {
				var $img = $('<div class="grid-item"><img src="'+photo+'"></div>');
				$('.grid').prepend( $img ).masonry( 'prepended',  $img );
			}	
			img.src = photo; 
			
		});
	}	

})();
  





// $.ajax({
//     url: ,
//     dataType: 'jsonp',
//     type: 'GET',
//     data: {
//     	access_token: accessToken
//     },
//     success: function(data){
//         console.log(data);
//     },
//     error: function(data){
//         console.log(data);
//     }
// });

// // console.log(API);

// $.ajax({
// 	url: 
// 	dataType: "jsonp"
// }).done(function(data) { 

// 		console.log(data);	
	 
// 		var posts = data.response;
// 		console.log (posts);

// 		var photos_final = [];

// 		for (i=0; i<posts.length; i++){
// 			var photos = posts[i].photos
// 			for (x=0; x<photos.length; x++){
// 				 photos_final.push(photos[x].original_size);
// 			}
// 		}

// 		console.log (photos_final);
// 		for (i=0; i<photos_final.length; i++){
// 			$('.tumblr').prepend("<img src='" +  photos_final[i].url + "'/>");

// 		}
// 	 });


