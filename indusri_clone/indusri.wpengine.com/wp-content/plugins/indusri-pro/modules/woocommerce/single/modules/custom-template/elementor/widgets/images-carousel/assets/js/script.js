( function( $ ) {

	var wdtShopProductSingleImagesCarousel = function($scope, $){

        var swiperGallery = [];
		var swiperGalleryOptions = [];
		var swiperIterator = 1;

		$scope.find('.wdt-product-image-gallery-container.swiper-container').each(function() {

			var $swiperItem = jQuery(this);
			const $productmoduleid = $swiperItem.data('moduleid');
			const $productcarouseleffect = $swiperItem.data('carouseleffect');
			const $productcarouselslidesperview = $swiperItem.data('carouselslidesperview');
			const $productcarouselloopmode = $swiperItem.data('carouselloopmode');
			const $productcarouselmousewheelcontrol = $swiperItem.data('carouselmousewheelcontrol');
			const $productcarouselverticaldirection = $swiperItem.data('carouselverticaldirection');
			const $productcarouselbulletpagination = $swiperItem.data('carouselbulletpagination');
			const $productcarouselthumbnailpagination = $swiperItem.data('carouselthumbnailpagination');
			const $productcarouselthumbnailposition = $swiperItem.data('carouselthumbnailposition');
			const $productcarouselslidesperviewthumbnail = $swiperItem.data('carouselslidesperviewthumbnail');
			const $productcarouselarrowpagination = $swiperItem.data('carouselarrowpagination');
			const $productcarouselscrollbar = $swiperItem.data('carouselscrollbar');
			const $productcarouselspacebetween = $swiperItem.data('carouselspacebetween');
			const $carouselresponsive = $swiperItem.data('carouselresponsive');
			
			// Thumb carousel auto height
			var carouselautoheight = false;
			var thumbdirection = '';
			if($productcarouselthumbnailposition == 'left' || $productcarouselthumbnailposition == 'right') {
				thumbdirection = 'vertical';
				carouselautoheight = true;
			} else {
				thumbdirection = 'horizontal';
			}

			if(thumbdirection == 'vertical') {
				jQuery('.wdt-product-image-gallery').parents('.wdt-product-image-gallery-holder').find('.wdt-product-image-gallery-thumb-container').height(jQuery('.wdt-product-image-gallery').parents('.wdt-product-image-gallery-holder').find('.wdt-product-image-gallery').height());
			}

			// Thumb slider

			const productimagegallerythumb = {
				direction: thumbdirection,
				initialSlide: 0,
				spaceBetween: 10,
				centeredSlides: true,
				slidesPerView: $productcarouselslidesperviewthumbnail,
				touchRatio: 0.2,
				slideToClickedSlide: true

			}

		 	const swiperproductThumbGallery = new Swiper('.wdt-product-image-gallery-thumb-container', productimagegallerythumb);


			var direction = 'horizontal';
			if($productcarouselverticaldirection == true) {
				direction = 'vertical';
			}

			var pagination_class = '';
			var pagination_type = '';

			// Bullets pagination
			if($productcarouselbulletpagination == true ) {
				var pagination_class = '.wdt-product-image-gallery-bullet-pagination';
				var pagination_type = 'bullets';
				var watch_state = true;
			}

			// scrollbar pagination
			var scrollbar_class =  '';
		
			var	scrollbar_hide = true;
			if($productcarouselscrollbar == true ) {
				scrollbar_class = ".wdt-product-image-gallery-scrollbar";
				scrollbar_hide = false;
				
			}

			// Create swiper

			const productimagegallery = {
				initialSlide: 0,
				simulateTouch: true,
				// roundLengths: true,
				spaceBetween: $productcarouselspacebetween,
				keyboardControl: true,
				paginationClickable: true,
				autoHeight: carouselautoheight,
				grabCursor: true,

				slidesPerView: $productcarouselslidesperview,
				loop: $productcarouselloopmode,
				loopFillGroupWithBlank: $productcarouselloopmode,
				mousewheel: $productcarouselmousewheelcontrol,
				direction: direction,

				scrollbar: {
					el: scrollbar_class,
					hide: scrollbar_hide,
					draggable: true,
				},

				effect: $productcarouseleffect,

				pagination: {
					el: pagination_class,
					type: pagination_type,
					clickable: true,
				},

				on: {
					resize: function () {
						if($productcarouselthumbnailposition == 'left' || $productcarouselthumbnailposition == 'right') {
							// Update vertical thumbnail pagination height on resize
							$swiperItem.parents('.wdt-product-image-gallery-holder').find('.wdt-product-image-gallery-thumb-container').height($swiperItem.parents('.wdt-product-image-gallery-holder').find('.wdt-product-image-gallery').height());
						}
					},
				},
			}

			// Update breakpoints
			const $responsiveSettings = $carouselresponsive['responsive'];
			const $responsiveData = {};
			jQuery.each($responsiveSettings, function (index, value) {
			$responsiveData[value.breakpoint] = {
				slidesPerView: value.toshow,
			};
			});
			productimagegallery['breakpoints'] = $responsiveData;

			// Arrow pagination
			if ($productcarouselarrowpagination == true) {
				productimagegallery.navigation = {
					prevEl: '.wdt-product-image-gallery-arrow-prev',
					nextEl: '.wdt-product-image-gallery-arrow-next',
				};
			}

			// thumbnail pagination
			if ($productcarouselthumbnailpagination == true) {
				productimagegallery.thumbs = {
					swiper: swiperproductThumbGallery,
				};
			}

			const productimagegalleryslider = new Swiper('.wdt-product-image-gallery-'+$productmoduleid, productimagegallery);

		});

		// Image gallery thumb image enlarger

		$('body').on('click', '.wdt-product-image-gallery-thumb-enlarger', function (e) {

			var pswpElement = document.querySelectorAll('.pswp')[0];

			// collect all images
			var items = [];
			var image_gallery = $(this).parents('.wdt-product-image-gallery-container').find('.wdt-product-image');

			if ( image_gallery.length ) {

				image_gallery.each( function( i, el ) {

					var image_tag = $(el).find( 'img' );

					if ( image_tag.length ) {

						var large_image_src = image_tag.attr( 'data-large_image' ),
							large_image_w   = image_tag.attr( 'data-large_image_width' ),
							large_image_h   = image_tag.attr( 'data-large_image_height' ),
							item            = {
								src  : large_image_src,
								w    : large_image_w,
								h    : large_image_h,
								title: image_tag.attr( 'data-caption' ) ? image_tag.attr( 'data-caption' ) : image_tag.attr( 'title' )
							};
						items.push( item );

					}

				} );

			}

			var index = $(this).parents('.wdt-product-image-gallery-container').find('.swiper-slide.swiper-slide-active').index();

			// define options (if needed)
			var options = {
				// optionName: 'option value'
				// for example:
				index: index // start at first slide
			};

			// Initializes and opens PhotoSwipe
			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();

			e.preventDefault();

		});

	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-images-carousel.default', wdtShopProductSingleImagesCarousel);
    });

} )( jQuery );