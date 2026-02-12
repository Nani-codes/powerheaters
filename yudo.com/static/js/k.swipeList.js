$(function (){
    try{
        new Swiper($str, {
            slidesPerView: "auto",
            on: {
                init: function (swiper) {
                    // _tabSwiper = swiper;
                    $($str).addClass("on");
                    setTimeout(swiper.update(), 100);
                }
            },
            pagination: {
                 el: ".qommand-pagination"
            }
        });
    }catch(e){}
})

