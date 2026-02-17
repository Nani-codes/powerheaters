$(function (){
	_kglobal.parallax = new ParallaxTween();
	$(window).scroll(function(){
		if(_kglobal.parallax != null) _kglobal.parallax.scrollHandler();
	});
	$(window).resize(function(){
		if(_kglobal.parallax != null) {
			_kglobal.parallax.initParallax("resize");
		}
	});

	var no = 0;
	function delayLoadParallax(){
		no++;

		if(no > 5){
			return;
		}
		var bool = false;
		for (var i = 0; i < $(".k-section").length; i++) {
			var section = $(".k-section").eq(i);
			var offsettop = Number(section.attr("offsettop"));
			var dataHeight = Number(section.attr("data-height"));
			if(offsettop != null && dataHeight != null){
				if(offsettop == 0 && dataHeight == 0){
					//console.log(offsettop, dataHeight);
					bool = true;
				}
			}
		}
		if(bool) {
			_kglobal.parallax.scrollHandler();
			requestAnimationFrame(delayLoadParallax);

			// console.log("scrollHandler");
		}
	}

	delayLoadParallax();
});

function ParallaxTween(){
	this.scrollTop = 0;
	this.delay = false;
	this.init();
}

ParallaxTween.prototype.init = function (){
	this.initParallax();
	this.scrollHandler();
}

ParallaxTween.prototype.initParallax = function (str){
	var cont = $(".k-section");
	var len = cont.find(".parallax").length;
	function loadinit() {
		for (var i = 0; i < $(".k-section").length; i++) {
			var section = $(".k-section").eq(i);
			section.attr({"tween":"false"});
			var inner = section.find(".k-section-inner");
			var oTop = Math.floor(section.offset().top);
			section.attr({ "offsetTop": oTop });
			section.attr({ "data-height": section.height() });
			section.attr({"tween":"false"});
			var scrollCont = section[0].querySelector(".k-horizon-scroll");
			if (scrollCont != null) {
				$(scrollCont).attr({ "data-width": scrollCont.scrollWidth });
				var w = scrollCont.scrollWidth
				var sw = _kglobal.sw;
				var sh = _kglobal.sh;
				var maxw = Math.ceil((w - sw) / 250);
				var scrollHeight = (maxw * 100) + sh;
				inner.height(scrollHeight + 500);
			}
		}
		for(var i = 0;i<len;i++){
			var tg = cont.find(".parallax").eq(i);
			var oTop = Math.floor(tg.offset().top);
			tg.attr({"offsetTop":oTop}).removeAttr("style").removeAttr("tgIndex");
		}
	}

	loadinit();
	if(str == "resize") setTimeout(loadinit, 100);
}
ParallaxTween.prototype.resetParallaxItemProp = function () {
	var len = $(".parallax").length;
	for(var i = 0;i<len;i++){
		var tg = $(".parallax").eq(i);
		var oTop = Math.floor(tg.offset().top);
		if(Number(tg.attr("offsetTop")) != oTop) {
			tg.attr({"offsetTop":oTop});
		}
	}
}

ParallaxTween.prototype.scrollHandler = function () {
	this.initParallax();
	this.resetParallaxItemProp();
	this.scrollTop = $(window).scrollTop();
	this.parallax();
}

ParallaxTween.prototype.delayCall = function () {
	var _this = this;
	_this.delay = true;
	setTimeout(function (){
		_this.delay = false;
	}, 100)
}

ParallaxTween.prototype.parallax = function () {
	$(".k-progress").removeClass("on");
	var cont = $(".k-section");
	var tweenSpeed = AgentDetect.isMobile() ? 0.5 : 0.5;
	var tweenEase = AgentDetect.isMobile() ? Linear.easeNone : Sine.easeOut;
	for(var i = 0;i<cont.length;i++){
		var jlen = cont.eq(i).find(".parallax").length;
		var section = cont.eq(i);
		var contHeight = section.height();
		var contoffsetTop = section.offset().top;
		var sectionOffsetTop = Number(section.attr("offsetTop"));
		var topScrollValue = sectionOffsetTop - this.scrollTop;
		var startScrollValue = sectionOffsetTop - this.scrollTop - _kglobal.sh;
		var topIndex = Math.ceil(topScrollValue / 100);
		var startIndex = -Math.ceil(startScrollValue / 100);
		//
		var scrollTotal = Math.ceil(contHeight / 100);
		//
		var offsetstart = contoffsetTop - _kglobal.sh;
		var offsetmid = contoffsetTop - _kglobal.sh/2;
		var offsetBottom = contoffsetTop + section.height() - _kglobal.sh;
		var offsetOut = contoffsetTop + contHeight;
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		// 시작지점이 화면에서 보일때
		var view = this.scrollTop >= offsetstart ? true : false;
		this.scrollTop >= offsetstart ? section.addClass("section-start") : section.removeClass("section-start");
		// section 중간 지점이 화면에서 보일때;
		this.scrollTop >= offsetmid ? section.addClass("section-mid") : section.removeClass("section-mid");
		// section top 이 화면에서 사라지기 시작할때
		this.scrollTop >= contoffsetTop ? section.addClass("section-top") : section.removeClass("section-top");
		// section bottom이 화면 밑에서 나타날때
		this.scrollTop > offsetBottom ? section.addClass("section-end") : section.removeClass("section-end");
		// 화면위로 완전히 올라갔을때
		if(this.scrollTop > offsetOut){
			section.addClass("section-out").removeClass("section-end").removeClass("section-start").removeClass("section-top");
			view = false
		}else{
			section.removeClass("section-out");
		}
		section.attr({ "data-height": contHeight, "data-index": topIndex, "data-start": startIndex, "data-total":scrollTotal, "value":view });
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		//
		if(section.hasClass("esg-one-04")) this.esg04(topIndex);
		if(section.hasClass("esg-one-06")) this.esg06(topIndex);
		if(section.hasClass("esg-one-03")) this.TweenLeft($(".esg-one-03 .k-cont .k-left"), startIndex);
		if(section.hasClass("esg-one-05")) this.TweenLeft($(".esg-one-05 .k-cont .k-right"), startIndex);
		if(section.hasClass("esg-one-07")) this.TweenLeft($(".esg-one-07 .k-cont .k-right"), startIndex);
		if(section.hasClass("esg-one-08")) this.TweenLeft($(".esg-one-08 .k-cont .k-left"), startIndex);

		if(section.hasClass("esg-02-08")) this.TweenLeft($(".esg-02-08 .k-cont .k-right"), startIndex);
		if(section.hasClass("esg-02-09")) this.TweenLeft($(".esg-02-09 .k-cont .k-left"), startIndex);

		if(section.hasClass("history-section")) this.TweenHistoryLeft(section, section.find(".k-left"), topIndex, topIndex);
		if(section.hasClass("global-01") && topIndex < -3 ){
			section.addClass("down")
		}else{
			section.removeClass("down")
		}

		if(section.hasClass("esg-02-03") && topIndex < -3 ){
			section.addClass("change")
		}else{
			section.removeClass("change")
		}

		if(section.hasClass("esg-02-05") && topIndex < -5 ){
			section.removeClass("step0 step1 step2 step3 step4")
			section.addClass("step0")
		}else{
			section.removeClass("step0")
		}
		if(section.hasClass("esg-02-05") && topIndex < -10 ){
			section.removeClass("step1 step2 step3 step4")
			section.addClass("step1")
		}else{
			section.removeClass("step1")
		}
		if(section.hasClass("esg-02-05") && topIndex < -15 ){
			section.removeClass("step2 step3 step4")
			section.addClass("step2")
		}else{
			section.removeClass("step2")
		}
		if(section.hasClass("esg-02-05") && topIndex < -20 ){
			section.removeClass("step3 step4")
			section.addClass("step3")
		}else{
			section.removeClass("step3")
		}
		if(section.hasClass("esg-02-05") && topIndex < -25 ){
			section.removeClass("step4")
			section.addClass("step4")
		}else{
			section.removeClass("step4")
		}




		if(section.hasClass("esg-02-06") ){
			var tx = (topIndex - 3) * 100;
			var max = _kglobal.sw/2

			if(tx > 0) tx = 0;
			if(tx < -max) tx = -max;

			if(_kglobal.sw < 1200){
				tx = (topIndex - 5) * 100;
				max = (_kglobal.sw*1.5)  - _kglobal.sw;

				if(tx > 0) tx = 0;
				if(tx < -max) tx = -max;
			}

			TweenMax.to( section.find(".k-img"), 0.5, {x:tx} )
		}else{

		}

		//
		if(!view) continue;
		if( jlen == 0) continue;
		//if(section.hasClass("section-fixed-out")) jlen = 0;
		if(!section.hasClass("section-start")) jlen = 0;
		if(section.hasClass("prd-index-02")) this.indexMask(startIndex);

		//if(this.delay) continue;;
		//this.delayCall();

		//////////////////////////////////////////////////////////////////////////////////////////////////////
		for(var j = 0;j<jlen;j++){

			var tg = cont.eq(i).find(".parallax").eq(j);
			var oFirstTop = tg.hasClass("parent") ? contoffsetTop : Number(tg.attr("offsetTop"));
			var rate = Number(tg.attr("rate"));
			var rate2 = tg.attr("rate2") != null ? Number(tg.attr("rate2")) : 0.75;
			var scaleRate = tg.attr("scale-rate") != null ? Number(tg.attr("scale-rate")) : 0.01;
			var delay = tg.attr("delay") != null ? Number(tg.attr("delay")) : 0;
			var top = oFirstTop - this.scrollTop - (_kglobal.sh * 0.0);
			var mid = oFirstTop - this.scrollTop - (_kglobal.sh * rate2);
			var tgIndex = Math.ceil(mid/100) + delay;
			var tgTopIndex = Math.ceil(top/100) + delay;
			var posValue = tg.hasClass("scale")  ? 0 : tgIndex*rate;
			tg.attr({"data-index":tgIndex, "data-startIndex":tgTopIndex});

			if(tg.hasClass("only-pc")){
			   if(_kglobal.sw <= 1024) return;
			}

			if(section.hasClass("esg-02-02") && tg.hasClass("k-inner") && tgIndex < 1 ){
				if(!tg.hasClass("on")){
					var data = {value:1, total:9}
					TweenMax.to( data, 0.5, {value:data.total , onUpdate:function (){
						$(".esg-02-02 .k-txt .k-text.st2").text( Math.floor(data.value )+ "%")
					}} )
				}
				tg.addClass("on");
			}else{
				tg.removeClass("on");
			}

			TweenMax.to(tg, tweenSpeed, {
				x:this.position(tg, posValue, rate).x,
				y:this.position(tg, posValue, rate).y,
				scaleX:this.scale(tg, tgIndex, scaleRate),
				scaleY:this.scale(tg, tgIndex, scaleRate),
				ease: tweenEase
			});
			this.alphas(tg, tgIndex);
		}
	}
}
//
ParallaxTween.prototype.TweenHistoryLeft = function (section, tg, topIndex) {

	var windowWidth = $(window).width();
	var sw =  windowWidth + (topIndex*100);

	if(windowWidth > 768){
		if(sw < windowWidth/2) sw = windowWidth/2;
	}else{
		if(sw < 40) sw = 40;
	}


	if(topIndex > 0){
		sw = windowWidth
	}else{

	}

	tg.width(sw);
	tg.find(".k-img").width(sw);
	section.find(".k-left .k-year").width(sw);

	var height = _kglobal.sh + (windowWidth/2);
	section.css({"min-height":height +"px"})
}
//
ParallaxTween.prototype.TweenLeft = function (tg, startIndex) {
	var sw =  startIndex*100;
	if(sw > _kglobal.sw/2) sw = _kglobal.sw/2;
	if(_kglobal.sw <= 1024) {
		tg.removeAttr("width")
	}else{
		tg.width(sw);
	}
}

ParallaxTween.prototype.position = function (tg, posValue, rate) {
	var position = {}
	var limit = Number(tg.attr("limit"));
	var direction = tg.attr("direction");
	var originValue = posValue;

	//console.log(direction, posValue);
	var directionNo = tg.attr("directionNo") != null ? Number(tg.attr("directionNo")) : -1;
	if(limit > 0){
		if(rate < 0){
			if(posValue > 0) posValue = 0;
		}else{
			if(posValue < 0) posValue = 0;
		}
	}

	if(direction == "x"){
		position.x = posValue;
		if( tg.hasClass("kv-img")){
			// console.log(originValue);
			position.x = originValue > 1400 ? 1400 : originValue;
		}
		if( tg.hasClass("k-horizon-scroll") ){
			var dataWidth = Number($(tg).attr("data-width"))
			if(originValue < -(dataWidth/2)) {
				originValue = -dataWidth/2
			}
			position.x = originValue;
		}
	}else if(direction == "xy"){
		position.x = posValue*directionNo;
		position.y = posValue;
	}else{//default y;
		position.y = posValue;
	}

	return position;
}
ParallaxTween.prototype.scale = function (tg, tgIndex, rate) {
	var scaleTween = tg.hasClass("scale") ? true : false;
	var scale = 1;
	if(scaleTween && tgIndex < 0){
		scale = 1+ Math.abs(tgIndex)*rate;
		if(scale < 1) scale = 1;
		tg.attr({"data-rate":scale});
	}
	return scale;
}
ParallaxTween.prototype.alphas = function (tg, tgIndex) {
	var alphaBool = tg.hasClass("alpha") ? true : false;
	var alphaRate = tg.attr("alpha-rate") != null ? Number(tg.attr("alpha-rate")) : 0.5;
	var fadeout = tg.hasClass("fadeout") ? true : false;

	if(!alphaBool){
		return alphaNo = 1;
	}else{
		alphaNo = 1-tgIndex*alphaRate;
		if(fadeout && alphaNo > 1.7){
			alphaNo = 2.7 - alphaNo
		}
		if(alphaNo < 0 ) alphaNo = 0;
		if(alphaNo > 1 ) alphaNo = 1;
		tg.attr({"data-opacity":alphaNo});
		// return alphaNo;
	}
}
// 인덱스 mask view
ParallaxTween.prototype.indexMask = function (startIndex) {
	if(_kglobal.sw <= 1024) return;
	var sw = startIndex * 300 > _kglobal.sw ? _kglobal.sw : startIndex * 300;
	$(".prd-index-02 .k-mask").width(sw)
}
var _yearNo = 500;
var _prevYearNo = 0;
var yearNo = {value:500};
ParallaxTween.prototype.esg04 = function (topIndex) {
	var index = 0;
	if(topIndex > -4) index = 0;
	if(topIndex < -8) index = 1;
	if(topIndex < -12) index = 2;
	if(topIndex < -16) index = 3;
	$(".esg-one-04 .img-wrap .img-item").removeClass("on");
	$(".esg-one-04 .img-wrap .img-item").eq(index).addClass("on");

	$(".esg-one-04 .k-cont .k-right .txt-item").removeClass("on");
	$(".esg-one-04 .k-cont .k-right .txt-item").eq(index).addClass("on");

	// $(".esg-one-04 .k-cont .k-center .k-movie").removeClass("on");
	// $(".esg-one-04 .k-cont .k-center .k-movie").eq(index).addClass("on");

	if(_prevYearNo != index){
		var no = 500;
		if(index == 0) no = 500;
		if(index == 1) no = 50;
		if(index == 2) no = 10;
		if(index == 3) no = 1;

		TweenMax.to(yearNo, 0.5, {value:no, onUpdate:function (){
			$(".esg-one-04 .k-cont .k-right .k-txt .k-year").text(Math.floor(yearNo.value));
			$(".esg-one-04 .txt-item").removeClass("tween");
		}, onComplete:function (){
			$(".esg-one-04 .txt-item").addClass("tween");
		}});

		changeEarth(index);
	}

	_prevYearNo = index;


}
ParallaxTween.prototype.esg06 = function (topIndex) {
	var index = 0;
	if(topIndex > -1) index = 0;
	if(topIndex < -5) index = 1;
	if(topIndex < -15) index = 2;
	$(".esg-one-06 .txt-item").removeClass("on");
	$(".esg-one-06 .txt-item").eq(index).addClass("on");
	_stepIndex = index;


}
