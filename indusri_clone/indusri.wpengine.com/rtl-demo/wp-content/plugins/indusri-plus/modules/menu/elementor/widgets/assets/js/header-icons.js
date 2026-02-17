(function ($) {

    var dtHeaderIconsWidgetHandler = function($scope, $){

        $search = $scope.find("div.search-overlay");
        if( $search.length ) {
            if($search.parents('elementor-element').hasClass('sticky-header-active')) {
                $search.find(".wdt-search-form-container").remove();
            } else {
                $form = $search.find(".wdt-search-form-container").clone();
                $search.find(".wdt-search-form-container").remove();
                $form.appendTo( $("body") );
            }
        }

        $(document).on('click', '.wdt-search-form-close', function(e){
            if ($(this).parents('.wdt-search-form-container').length) {
                $(this).parents('.wdt-search-form-container').removeClass('show');
            } else {
                $('.wdt-search-form-container').removeClass('show').hide();
            }
        });

        $(document).on('click', '.wdt-search-icon', function(e) {
            e.preventDefault();

            var $searchItem;
            if ($(this).parents('.wdt-header-icons-list-item').hasClass('search-expand')) {
                $searchItem = $(this).closest('.wdt-header-icons-list-item').find('.wdt-search-form-container');
            } else {
                $searchItem = $('body').find('.wdt-search-form-container');
            }

            if ($searchItem.length) {
                $('.wdt-search-form-container.show').not($searchItem).removeClass('show').hide();

                if ($searchItem.hasClass('show')) {
                    $searchItem.removeClass('show').hide();
                } else {
                    $searchItem.addClass('show').show();
                }
            }
        });

        $(document).on('click', '.sticky-header-active .wdt-search-icon', function(e) {
            e.preventDefault();
            var $searchItem = $(this).closest('.sticky-header-active').find('.wdt-search-form-container');
            
            if ($searchItem.length) {
                $('.sticky-header-active .wdt-search-form-container.show').not($searchItem).removeClass('show').hide();
                
                if (!$searchItem.hasClass('show')) {
                    $searchItem.addClass('show').show();
                }
            }
        });

        $(document).on('click', '.sticky-header-active .wdt-search-form-close', function(e) {
            e.preventDefault();
            
            var $searchFormContainer = $(this).closest('.wdt-search-form-container');
            
            if ($searchFormContainer.length) {
                $searchFormContainer.removeClass('show').hide();
            }
        });

        $scope.find('.wdt-shop-menu-cart-icon').on('click', function(e) {

            if($('.wdt-shop-cart-widget').hasClass('activate-sidebar-widget')) {

                $('.wdt-shop-cart-widget').addClass('wdt-shop-cart-widget-active');
                $('.wdt-shop-cart-widget-overlay').addClass('wdt-shop-cart-widget-active');

                // Nice scroll script

                var winHeight = $(window).height();
                var headerHeight = $('.wdt-shop-cart-widget-header').height();
                var footerHeight = $('.woocommerce-mini-cart-footer').height();

                var height = parseInt((winHeight-headerHeight-footerHeight), 10);

                $('.wdt-shop-cart-widget-content').height(height).niceScroll({ cursorcolor:"#000", cursorwidth: "5px", background:"rgba(20,20,20,0.3)", cursorborder:"none" });

                e.preventDefault();
            }

        });

        // Wishlist count update
        $(document).on( 'added_to_wishlist removed_from_wishlist', function(){

            var html = $('.wdt-wishlist-count');
            $.ajax({
                url: yith_wcwl_l10n.ajax_url,
                data: {
                    action: 'yith_wcwl_update_wishlist_count'
                },
                dataType: 'json',
                success: function( data ){
                    html.html( data.count );
                }
            })
        } );
    };

    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-header-icons.default', dtHeaderIconsWidgetHandler);

    });

})(jQuery);