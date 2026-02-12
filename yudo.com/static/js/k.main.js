var _kglobal = {
	dev: true,
	sw: window.innerWidth,
	sh: window.innerHeight,
	swfix: window.innerWidth,
	shfix: window.innerHeight,
	scrollTop: 0,
	device_type: false,
	device_version: null,
	os_type: null,
	os_version: null,
	parallax: null,
	time: 10000,
	circleBool: false,
	glslBool:1,
	circleObj: {y: 700},
	prevScrollTop:0,
	wheelActive:false,
	stopWheel:false,
	currentState:null,
	prevState:null,
	view:null,
	animateScroll:false
}
// agent
var k_ua = window.navigator.userAgent.toLowerCase()
	, AgentDetect = {
		IS_WIN: /Windows/i.test(k_ua),
		IS_MAC: /Macintosh/i.test(k_ua),
		IS_OP: "undefined" != typeof window.opera || /Opera/i.test(k_ua),
		IS_IE: !this.IS_OP && !!k_ua.match(/(?:(MSIE) |(Trident)\/.+rv[ :])([\w.]+)/i),
		IS_EDGE: /Edge/i.test(k_ua),
		IS_FF: /Firefox/i.test(k_ua),
		IS_CR: /Chrome|CriOS/i.test(k_ua),
		IS_SF: !/Chrome|CriOS/i.test(k_ua) && (k_ua || "").indexOf("safari") > -1,
		IS_IOS: /iPhone|iPad|iPod/i.test(k_ua),
		IS_IPHONE: /iPhone;/i.test(k_ua),
		IS_IPAD: /iPad;/i.test(k_ua),
		IS_IPOD: /iPod;/i.test(k_ua),
		IS_ANDROID: /Android/i.test(k_ua),
		IS_WINDOWS_MOBILE: /Windows Phone|Windows CE/i.test(k_ua),
		IS_BLACKBERRY: /BlackBerry/i.test(k_ua),
		IS_SONYERICSSON: /SonyEricsson/i.test(k_ua),
		IS_SYMBIAN_OS: /SymbianOS/i.test(k_ua),
		IS_WEB_OS: /webOS/i.test(k_ua),
		IS_WEBKIT_MOBILE: /AppleWebKit/i.test(k_ua),
		IS_IE_MOBILE: /IEMobile/i.test(k_ua),
		IS_OPERA_MINI: /Opera Mini/i.test(k_ua),
		IS_DOLFIN: /Dolfin/i.test(k_ua),
		IS_SAMSUNG: /SamsungBrowser/i.test(k_ua),
		init: function () {
			this.IE = "IE",
				this.EDGE = "Edge",
				this.CR = "Chrome",
				this.SF = "Safari",
				this.OP = "Opera",
				this.FF = "Firefox",
				this.WEBKIT_MOBILE = "WebKit Mobile",
				this.IE_MOBILE = "IE Mobile",
				this.OPERA_MINI = "Opera Mini",
				this.DOLFIN = "Dolfin",
				this.WIN = "Windows",
				this.MAC = "Macintosh",
				this.IOS = "IOS",
				this.ANDROID = "Android",
				this.WINDOWS_MOBILE = "Windows Mobile",
				this.BLACKBERRY = "BlackBerry",
				this.SONYERICSSON = "SonyEricsson",
				this.SYMBIAN_OS = "SymbianOS",
				this.WEB_OS = "WebOS",
				this.UNKNOWN_OR_NOT_SUPPORTED_BROWSER = "an unknown or not supported browser",
				this.UNKNOWN_BROWSER_VERSION = "an unknown browser version",
				this.UNKNOWN_OS_VERSION = "an unknown OS version",
				this.UNKNOWN_OR_NOT_SUPPORTED_OS = "an unknown or not supported OS",
				this.BROWSER = this.searchBrowser() || this.UNKNOWN_OR_NOT_SUPPORTED_BROWSER,
				this.BROWSER_VERSION = this.searchBrowserVersion() || this.UNKNOWN_BROWSER_VERSION,
				this.OS_VERSION = this.searchOSVersion() || this.UNKNOWN_OS_VERSION,
				this.OS = this.searchOS() || this.UNKNOWN_OR_NOT_SUPPORTED_OS
		},
		isMobile: function () {
			return this.IS_IOS || this.IS_ANDROID || this.IS_WINDOWS_MOBILE || this.IS_BLACKBERRY || this.IS_SONYERICSSON || this.IS_SYMBIAN_OS || this.IS_WEB_OS || this.IS_OPERA_MINI || this.IS_DOLFIN
		},
		searchBrowser: function () {
			if (this.isMobile()) {
				if (this.IS_WEBKIT_MOBILE)
					return this.WEBKIT_MOBILE;
				if (this.IS_IE_MOBILE)
					return this.IE_MOBILE;
				if (this.IS_OPERA_MINI)
					return this.OPERA_MINI;
				if (this.IS_DOLFIN)
					return this.DOLFIN
			} else {
				if (this.IS_OP)
					return this.OP;
				if (this.IS_IE)
					return this.IE;
				if (this.IS_EDGE)
					return this.EDGE;
				if (this.IS_FF)
					return this.FF;
				if (this.IS_CR)
					return this.CR;
				if (this.IS_SF)
					return this.SF
			}
		},
		searchBrowserVersion: function () {
			if (this.isMobile()) {
				var a = {
					chrome: this.UNKNOWN_BROWSER_VERSION,
					samsung: this.UNKNOWN_BROWSER_VERSION,
					webview: this.UNKNOWN_BROWSER_VERSION,
				};
				return this.IS_CR && null != k_ua.match(/(Chrome|CriOS)\/([0-9\.]+)/i) && (a.chrome = parseFloat(k_ua.match(/(Chrome|CriOS)\/([0-9\.]+)/i)[2])),
					this.IS_SAMSUNG && null != k_ua.match(/SamsungBrowser\/([0-9\.]+)/i) && (a.samsung = parseFloat(k_ua.match(/SamsungBrowser\/([0-9\.]+)/i)[1])),
					this.IS_WEBKIT_MOBILE && null != k_ua.match(/Version\/([0-9\.]+)/i) && (a.webview = parseFloat(k_ua.match(/Version\/([0-9\.]+)/i)[1])),
					a
			}
			if (this.IS_IE) {
				if ("Microsoft Internet Explorer" == navigator.appName)
					return parseFloat(k_ua.match(/MSIE ([0-9\.]+)/i)[1]);
				if ("Netscape" == navigator.appName) {
					var b = new RegExp("trident/.*rv[ :]([0-9]{1,}[.0-9]{0,})");
					if (null != b.exec(k_ua))
						return parseFloat(RegExp.$1)
				}
				return -1
			}
			return this.IS_EDGE ? parseInt(k_ua.match(/Edge\/([0-9\.]+)/i)[1]) : this.IS_CR ? parseFloat(k_ua.match(/Chrome\/([0-9\.]+)/i)[1]) : this.IS_SF ? parseFloat(k_ua.match(/Version\/([0-9\.]+)/i)[1]) : this.IS_OP ? parseFloat(k_ua.match(/Version\/([0-9\.]+)/i)[1]) : this.IS_FF ? parseFloat(k_ua.match(/Firefox\/([0-9\.]+)/i)[1]) : void 0
		},
		searchOSVersion: function () {
			if (this.isMobile()) {
				if (this.IS_IOS)
					return parseFloat(k_ua.match(/OS ((\d+_?){2,3})\s/i)[1].replace(/_/g, "."));
				if (this.IS_ANDROID)
					return parseFloat(k_ua.match(/Android ([0-9\.]+)/i)[1]);
				if (/Windows Phone/i.test(k_ua))
					return parseFloat(k_ua.match(/Windows Phone ([0-9\.]+)|Windows Phone OS ([0-9\.]+)/i)[0].match(/[0-9\.]+/));
				if (this.IS_SYMBIAN_OS)
					return parseFloat(k_ua.match(/SymbianOS\/([0-9\.]+)/i)[1]);
				if (this.IS_WEB_OS)
					return parseFloat(k_ua.match(/webOS\/([0-9\.]+)/i)[1])
			} else if (this.IS_WIN)
				return parseFloat(k_ua.match(/Windows NT ([0-9\.]+)/i)[1])
		},
		searchOS: function () {
			if (this.isMobile()) {
				if (this.IS_IOS)
					return this.IOS;
				if (this.IS_ANDROID)
					return this.ANDROID;
				if (this.IS_WINDOWS_MOBILE)
					return this.WINDOWS_MOBILE;
				if (this.IS_BLACKBERRY)
					return this.BLACKBERRY;
				if (this.IS_SONYERICSSON)
					return this.SONYERICSSON;
				if (this.IS_SYMBIAN_OS)
					return this.SYMBIAN_OS;
				if (this.IS_WEB_OS)
					return this.WEB_OS
			} else {
				if (this.IS_WIN)
					return this.WIN;
				if (this.IS_MAC)
					return this.MAC
			}
		},
		checkAgent: function (a) {
			return 10 === a ? !(!this.IS_WIN || !this.IS_IE || 8 == this.searchBrowserVersion()) : 20 === a ? !(!this.IS_WIN || !this.IS_IE) : 30 === a ? !(!this.IS_WIN || !this.IS_IE && !this.IS_CR) : 40 === a ? !(!this.IS_WIN || !(this.IS_IE || this.IS_CR || this.IS_SF)) : 45 === a ? !(!this.IS_WIN || !(this.IS_IE || this.IS_SF || this.IS_OP)) : 50 === a ? !(!this.IS_WIN || !(this.IS_IE || this.IS_CR || this.IS_SF || this.IS_OP)) : 60 === a ? !(!this.IS_WIN || !(this.IS_IE || this.IS_CR || this.IS_SF || this.IS_FF)) : 80 === a ? !(!this.IS_WIN || !(this.IS_IE || this.IS_FF || this.IS_CR || this.IS_SF || this.IS_OP)) : 90 === a && !!(this.IS_IE || this.IS_FF || this.IS_CR || this.IS_SF || this.IS_OP)
		},
		hasFP: function () {
			if (navigator.plugins && navigator.mimeTypes.length) {
				var a = navigator.plugins["Shockwave Flash"];
				if (a && a.description)
					return !0
			} else
				try {
					var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (null != b)
						return !0
				} catch (c) { }
			return !1
		}
	};
AgentDetect.init();

_kglobal.device_type = AgentDetect.isMobile() ? "device-type-mobile" : "device-type-pc";
_kglobal.device_version = "device-version-" + AgentDetect.searchBrowserVersion();
_kglobal.os_type = "os-" + AgentDetect.searchOS();
_kglobal.os_version = "os-" + AgentDetect.searchOSVersion();
document.getElementsByTagName("html")[0].setAttribute("class", _kglobal.device_type + " " + _kglobal.device_version + "  " + _kglobal.os_type + " " + _kglobal.os_version);
//document.querySelector(".log").innerHTML = _kglobal.device_type + " " + _kglobal.device_version + " " + _kglobal.os_type + " " + _kglobal.os_version;

$(function (){
	// alert(AgentDetect.IS_IE);
	$("html").addClass(AgentDetect.searchBrowser())
})


// 이벤트 설정
$(function () {

	$(window).resize(resize);
	resize();

	$(window).scroll(scrollHandler);
	scrollHandler();

	// window.onmousewheel = document.onmousewheel = wheel;
	if( AgentDetect.searchOS() != "Macintosh" ){
		document.addEventListener("wheel", wheel, {passive: false});
	}else{

	}

});

function setState(){
	var state = null;
	if (window.innerWidth < 768) {
		state = "mobile";
	}else if (window.innerWidth < 1200) {
		state = "tablet";
	}else {
		state = "desktop";
	}
	changeState(state);
	_kglobal.prevState = state;
}

function changeState(state){
	if(_kglobal.prevState != state){
		_kglobal.currentState = state;
		try{
			changeSwipe();
		}catch(e){}
	}
}

/********************************************************************************************************************************
 * resize
*********************************************************************************************************************************/
function resize() {
	_kglobal.sw = window.innerWidth;
	_kglobal.sh = window.innerHeight;
	$("html").removeClass("k-pc k-tablet k-mobile");

	if (window.innerWidth <= 768) {
		$("html").addClass("k-mobile");
	}else if (window.innerWidth <= 1200) {
		$("html").addClass("k-tablet");
	}else {
		$("html").addClass("k-pc");
	}
	setState();
	setStateRolling();

	resizeDetailType();

	resizeVideo();

	resizeResponseImage();
}

function resizeVideo(){
	var sw = window.innerWidth;
	var sh = window.innerHeight;

	$(".esg-02-video").removeClass("horizon vertical gap-w gap-h");
		var videoWidth = 1920;
		var videoHeight = 1080;
		$(".esg-02-video").addClass("horizon");
		var rate = sh * 1 / videoHeight;
		var tw = Math.floor(videoWidth*rate);
		var th = Math.floor(videoHeight*rate);
		// console.log(sw, sh, videoWidth, videoHeight, tw, th);
		if(tw < sw){
			$(".esg-02-video").addClass("gap-w");
		}

}

function resizeDetailType(){
	var len = $(".prd-detail-type .k-cont").length;
	if(len == 0) return;
	for(var i = 0;i<len;i++){
		var tg = $(".prd-detail-type .k-cont").eq(i);
		var type = tg.attr("data-type").split("-");
		var pcType = type[0];
		var mobileType = type[1];
		var type = window.innerWidth <= 768 ? mobileType : pcType;
		tg.removeClass("left right bottom img-only txt-only")
		if(type == "A") tg.addClass("left");
		if(type == "B") tg.addClass("right");
		if(type == "C") tg.addClass("bottom");
		if(type == "D") tg.addClass("bottom").addClass("img-only");
		if(type == "E") tg.addClass("bottom").addClass("txt-only");
	}
}

function resizeResponseImage(){
	var devicetype = "data-image-pc"
	if (window.innerWidth <= 768) {
		devicetype = "data-image-m"
	}else if (window.innerWidth <= 1200) {
		devicetype = "data-image-t"
	}

	for(var i = 0;i<$(".k-response").length;i++){
		var tg = $(".k-response").eq(i);
		var name = tg.attr(devicetype);

		tg.css({"background-image":"url("+name+")"});
	}
}


function scrollHandler(e) {
	var scrollTop = $(window).scrollTop();
	if(!_kglobal.wheelActive) _kglobal.scrollTop = scrollTop;


	// html fixed .k-header.type-white
	if (scrollTop > 0) {
		$("html").addClass("fixed");
		if( $(".root").hasClass("main")) $(".k-header").removeClass("type-white");
	} else {
		$("html").removeClass("fixed");
		if( $(".root").hasClass("main")) $(".k-header").addClass("type-white");
	}

	// scroll footer
	if(scrollTop > document.body.scrollHeight - _kglobal.sh - _kglobal.sh*0.5 ) {
		$("html").addClass("bottom");
	}else{
		$("html").removeClass("bottom");
	}

	// scroll up down
	if(e != null) {
		if(_kglobal.prevScrollTop < scrollTop){
			$("html").removeClass("up").addClass("down");
		}else{
			$("html").removeClass("down").addClass("up");
		}
	}
	if(scrollTop == 0){
		$("html").removeClass("up").removeClass("down");
	}

	//
	_kglobal.prevScrollTop = scrollTop;
}



function wheel(e) {
	var deltaY = e.deltaY;
	var scrollRate = 100;

	if(_kglobal.stopWheel) return;
	_kglobal.wheelActive = true;
	e.preventDefault();



	if (deltaY < 0) {
		_kglobal.scrollTop -= scrollRate;
		if(_kglobal.scrollTop < 0) _kglobal.scrollTop = 0;
	} else {
		_kglobal.scrollTop += scrollRate;
		var scrollHeight = document.body.scrollHeight - window.innerHeight;
		if(_kglobal.scrollTop > scrollHeight) _kglobal.scrollTop = scrollHeight;
	}
	var os = AgentDetect.searchOS();
	var sp = os == "Macintosh" ? 0.0 : 0.5;

	// sp = 0;
	TweenMax.to($("html, body"), sp, {"scrollTop":_kglobal.scrollTop, ease: Sine.easeOut, onComplete:function (){
		_kglobal.wheelActive = false;
	}});
	return false;
}



$(function (){
	$(".tooltip-btn").click(function (e){
		//
		closeLayer();
		$(".k-tooltip-wrap").removeClass("on");
		$(this).parent().addClass("on");
		e.stopPropagation();
	});
	$(document).click(function (e){
		closeLayer(e);
	});
	$(window).resize(function (){
		if($(".tooltip-btn.on").length > 0){
			var tx = $(".tooltip-btn.on").offset().left;
			var ty = $(".tooltip-btn.on").offset().top;
			$(".Tooltip.on").css({"left":tx, "top":ty});
		}
	});
});
function closeLayer(e){
	$(".k-tooltip-wrap").removeClass("on");
	$(".Tooltip").removeClass("on");
	$(".tooltip-btn").removeClass("on");
	$(".tooltip-btn + .k-tooltip").removeClass("on");
	$(".MultiSelect").removeClass("on");
	$(".Search").removeClass("on");
	$(".option-list").removeClass("on");
	$(".k-language.k-tooltip").removeClass("on");
//    $(".TextInput").removeClass("active");
}

$(function (){
	setTimeout(delays, 1000);
	function delays(){
		$(".MultiSelect .k-display").click(function (e){
			// 2021-12-02 열렸을때 닫기
			if($(this).parent().parent().hasClass("on")){
				closeLayer();
				return;
			}

			closeLayer();
			var targetClass = $(this).attr("data-target")
			$(".MultiSelect").removeClass("on");
			$(this).parent().parent().addClass("on");
			e.stopPropagation();
			$("." + targetClass).addClass("on");
			//position add
			var tx = $(this).offset().left;
			var ty = $(this).offset().top + 60;
			$(".option-list.on").css({"left":tx, "top":ty});
			$(".option-list").unbind("click");
			$(".option-list").click(function(e){
				e.stopPropagation();
			});
			return false;
		});
		// resize position add
		$(window).resize(function (){
			if($(".option-list.on").length > 0){
				var tx = $(".MultiSelect.on").offset().left;
				var ty = $(".MultiSelect.on").offset().top + 60;
				$(".option-list.on").css({"left":tx, "top":ty});
			}
		});

		$(".MultiSelect .k-list").click(function (e){
			e.stopPropagation();
		});
		$(".MultiSelect .k-list .list-inner").mouseenter(function (e){
			_kglobal.stopWheel = true;
		}).mouseleave(function (){
			_kglobal.stopWheel = false;
		});

		$(".MultiSelect .k-display .k-btn").click(function (e){
			if(window.innerWidth > 1024){
				e.stopPropagation();
			}
		})




		//
		$(".Search .k-display input").keyup(function (e){
			var tg = $(this).parent().parent().parent().parent().parent();
			var value = $(this).val();
			tg.addClass("on");
			e.stopPropagation();
			tg.attr({"data-value":value});

			if(value.length > 0){
				tg.addClass("active");
			}else{
				tg.removeClass("active on");
			}
		});

		$(".Search .k-list").click(function (e){
			e.stopPropagation();
		});
		$(".Search .k-right .k-btn").click(function (e){
			$(".Search").removeClass("on");
			$(".Search .k-display input").val("");

		});
		$(".Search .k-list .list-inner").mouseenter(function (e){
			_kglobal.stopWheel = true;
		}).mouseleave(function (){
			if( $(".modal-inquiry").hasClass("on")) return;
			_kglobal.stopWheel = false;
		});

		$(".Search.form").click(function (e){
			if($(this).hasClass("toggle")) return;
			if( $(this).hasClass("on")){
				$(this).removeClass("on");
			}else{
				$(".Search.form").removeClass("on");
				$(this).addClass("on");
			}
			e.stopPropagation();

		});
		// 2021-12-06
		$(".Search.form .k-right .k-btn button").click(function (e){
			e.stopImmediatePropagation();
			var tg = $(this).parent().parent().parent().parent().parent();
			if( tg.hasClass("on")){
				tg.removeClass("on");
			}else{
				$(".Search.form").removeClass("on");
				tg.addClass("on");
			}
		});
	}

	// $(".Search .k-list .list-item").on("click", function (){
	//     var parent = $(this).parent().parent().parent().parent();
	//     var input = parent.find("input");
	//     var val = $(this).find(".k-text").text();
	//     input[0].value = val.replace(/(^\s*)|(\s*$)/g, "");
	//     parent.removeClass("on");
	// })
	$(".TextInput .k-right button").on("click", function (e){
		var tg = $(this).parent().parent().parent();
		tg.removeClass("active");
		tg.find("input").val("");
	})

	$(".TextInput input").on("keyup", function (e){
		var tg = $(this).parent().parent().parent();
		var value = $(this).val();
		e.stopPropagation();
		if(value.length > 0){
			tg.addClass("active");
		}else{
			tg.removeClass("active on");
		}
	})
	$(".TextInput input").on("focusin", function (e){
		var tg = $(this).parent().parent().parent();
		tg.addClass("focus");

		var tg2 = $(this).parent().parent();
		tg2.addClass("focus");

		var value = $(this).val();
		if(value.length > 0){
			tg.addClass("active");
		}else{
			tg.removeClass("active on");
		}
	});
	$(".TextInput input").on("focusout", function (e){
		var tg = $(this).parent().parent().parent();
		tg.removeClass("focus");

		var tg2 = $(this).parent().parent();
		tg2.removeClass("focus");

		$(".TextInput").removeClass("active");
	});

	$(".TextArea textarea").on("focusin", function (e){
		var tg = $(this).parent().parent();
		tg.addClass("focus");
	});
	$(".TextArea textarea").on("focusout", function (e){
		var tg = $(this).parent().parent();
		tg.removeClass("focus");
	});
});

function openModal(){
	$(".modal-family").addClass("on");
	$("html").addClass("fixed-layer");
	_kglobal.stopWheel = true;
}

function closeModal(){
	$(".k-layer-modal").removeClass("on");
	$("html").removeClass("fixed-layer");
	_kglobal.stopWheel = false;
}

function closeModalAll(){
	$(".k-layer-modal").removeClass("on");
	$("html").removeClass("fixed-layer");
	_kglobal.stopWheel = false;
}
////////////////////////////////////////////////////////////


$(function (){
	$(".k-tooltip .k-btn").mouseenter(function (){
		$(this).parent().addClass("on");
	});
	$(".k-tooltip").mouseleave(function (){
		$(this).removeClass("on");
	});
})














var _paticle_alpha = 0;
function commonParticle(){
	var _canvas = null;
	var _context = null;
	var _global = {
		sw: 680,
		sh: 680
	}
	var _data = {
		total: 400,
		array: []
	}


	_canvas = $(".canvasCircle")[0];
	if(_canvas == null) return;
	_context = _canvas.getContext('2d');
	$(".canvasCircle").attr({ "width": 680, "height": 680 });
	for (var i = 0; i < _data.total; i++) {
		var ball = new Ball();
		ball.angle = i * 360 / _data.total;
		ball.count = i * 360 / _data.total;
		ball.count2 = i * 360 / _data.total;
		_data.array.push(ball);
		if(Math.floor(Math.random()*10) == 0){
		// ball.lineBool = true;
		}
	}


	var container = $(".esg-one-01");
	if($(".esg-one-01").length > 0){
		container = $(".esg-one-01");
	}
	if($(".main-03").length > 0){
		container = $(".main-03");
	}

	function drawFrame() {
		window.requestAnimationFrame(drawFrame);
		_context.clearRect(0, 0, 680, 680);
		_context.fillStyle = "rgba(0,0,0,0.05)";
		if(!container.hasClass("section-start")) return;

		for (var i = 0; i < _data.total; i++) {
			var ball = _data.array[i];
			ball.angle += 0.00101;
			ball.count += 0.00855;
			ball.count2 *= 0.001;
			var tan = Math.atan(ball.count)*3.1;
			ball.value = Math.cos( ball.count  + Math.cos(ball.count2) + tan  ) * ((Math.atan(ball.count2)*100) + 300 );
			var radian = ball.angle * Math.PI / 180 * 1.5;
			var tx = Math.cos(radian) * ball.value;
			var ty = Math.sin(radian) * ball.value;
			ball.x = tx + _global.sw/2;
			ball.y = ty + _global.sh/2;

			var cx = 340;
			var cy = 340;
			var distx = ball.x - cx;
			var disty = ball.y - cy;
			var dist = Math.sqrt(distx*distx + disty*disty);
			_paticle_alpha = dist*0.004;
			if(ball.currentDist > dist){
				ball.color = "rgba(255,255,255, 0.0)";
			}else{
				if(dist > 250){
					_paticle_alpha =  ((300 - dist)*1/50);
				}
				ball.color = "rgba(255,255,255, "+ _paticle_alpha +")";
				ball.draw(_context);
			}
			ball.currentDist = dist;

		}

		loop();
	};

	var _h_arrays = [];
	var _arrays = [];
	var _fishbodys = 6;
	function init() {
		for (var i = 0; i < _data.total; i++) {
			var _h_mc = _data.array[i];
			_h_arrays[i] = _h_mc;
			_arrays[i] = [];
			for (var j = 0; j < _fishbodys; j++) {
				var mc = new BallChild(2);
				_arrays[i][j] = mc;
				mc.scaleX = mc.scaleY = 1 - 0.155 * j;
			}
		}

	}
	function setFish($h, $index) {
		var _h_mc = $h;
		_h_mc.tx = _h_mc.x;
		_h_mc.ty = _h_mc.y;

		// console.log(_h_mc.lineBool)
		var t_mc = null;
		for (var i = 0; i < _fishbodys; i++) {
			var mc = _arrays[$index][i];
			if (i == 0) {
				t_mc = _h_mc;
			} else {
				t_mc = _arrays[$index][i - 1];
			}
			mc.tx = mc.x;
			mc.ty = mc.y;
			mc.x = t_mc.tx;
			mc.y = t_mc.ty;

			var cx = 340;
			var cy = 340;
			var distx = mc.x - cx;
			var disty = mc.y - cy;
			var dist = Math.sqrt(distx*distx + disty*disty);
			var alpha = dist*0.002;

			if(mc.currentDist > dist){
				mc.color = "rgba(255,255,255,0.0)";
			}else{
				if(dist > 250){
					alpha =  ((300 - dist)*1/50);
				}
				mc.color = "rgba(255,255,255, " + alpha + ")";
			}
			mc.currentDist = dist;
		}
	}
	function loop(){
		if(_h_arrays == null) return;
		for (var i = 0; i < _h_arrays.length; i++) {
			setFish(_h_arrays[i], i)
			_arrays[i].forEach(draw);
		}
	}
	function draw(point) {
		point.draw(_context);
	}

	drawFrame();
	init();
}
function Ball() {
	this.x = 0;
	this.y = 0;
	this.tx = 0;
	this.ty = 0;
	this.v = 0;
	this.angle = 0;
	this.count = 0;
	this.count2 = 0;
	this.value = 0;
	this.size = 100;
	this.stop = false;
	this.radius = 2;
	this.vx = 0;
	this.vy = 0;
	this.mass = 1;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = "rgba(255,255,255,1.0)";
	this.lineWidth = 1;
	this.down = false;
	this.lineBool = false;
}
Ball.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.globalAlpha = this.alpha;
	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();
	context.restore();
};

function BallChild(radius) {
	this.x = 0;
	this.y = 0;
	this.tx = 0;
	this.ty = 0;
	this.v = 0;
	this.size = 100;
	this.stop = false;
	this.radius = radius;
	this.vx = 0;
	this.vy = 0;
	this.mass = 1;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = "rgba(255,255,255,1.0)";
	this.lineWidth = 1;
	this.down = false;
	this.lineBool = false;
}
BallChild.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);

	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	//x, y, radius, start_angle, end_angle, anti-clockwise
	context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();
	if (this.lineWidth > 0) {
		//context.stroke();
	}
	context.restore();
};
/***************************
 *
*/
var _stepIndex = 0;
var _prevStepIndex = -1;
function step3ParticleAnimation(){
	var _canvas = null;
	var _context = null;
	var _size = 534;
	var _global = {
		sw: 534,
		sh: 534
	}
	var _data = {
		total: 400,
		array: []
	}


	_canvas = $(".canvas2")[0];
	if(_canvas == null) return;
	_context = _canvas.getContext('2d');
	$(".canvas2").attr({ "width": _size, "height": _size });
	for (var i = 0; i < _data.total; i++) {
		var ball = new Ball();
		ball.angle = i * 360 / _data.total;
		ball.count = i * 360 / _data.total;
		ball.count2 = i * 360 / _data.total;
		_data.array.push(ball);

		if( Math.floor(Math.random() * 20) == 1){
			ball.lineBool = true;
		}
	}
	var colors = [
		{

				r:206,
				g:206,
				b:206,
				scrokeAlpha:0
		},
		{

				r:187,
				g:30,
				b:77,
				scrokeAlpha:0.2

		},
		{

				r:31,
				g:149,
				b:89,
				scrokeAlpha:0

		},
	]

	var color = {
		r:206,
		g:206,
		b:206,
		scrokeAlpha:0
	}
	var container = $(".esg-one-06");
	function drawFrame() {
		window.requestAnimationFrame(drawFrame);
		_context.clearRect(0, 0, _size, _size);
		_context.fillStyle = "rgba(0,0,0,0.05)";
		if(!container.hasClass("section-start")) return;

		if(_stepIndex != _prevStepIndex){
			TweenMax.to(color, 2, {r:colors[_stepIndex].r, g:colors[_stepIndex].g, b:colors[_stepIndex].b, scrokeAlpha:colors[_stepIndex].scrokeAlpha });
		}

		if(_stepIndex == 0) step1();
		if(_stepIndex == 1) step2();
		if(_stepIndex == 2) step3();



		loop();
		_prevStepIndex = _stepIndex;
	};

	function step1(){
		$(".canvasDiv").removeClass("on");
		$(".canvasDivGlSl").removeClass("on");
		for (var i = 0; i < _data.total/2; i++) {
			var ball = _data.array[i];
			ball.draw(_context);
		}
	}
	function step2(){
		$(".canvasDiv").removeClass("on");
		$(".canvasDivGlSl").addClass("on");
		for (var i = 0; i < 10; i++) {
			var ball = _data.array[i];
			ball.color = "rgba("+color.r+", "+color.g+", "+color.b+", 0.0)"
			ball.draw(_context);
		}

	}

	function step3(){
		$(".canvasDiv").addClass("on");
		$(".canvasDivGlSl").removeClass("on");

		for (var i = 0; i < _data.total; i++) {
			var ball = _data.array[i];
			ball.angle += 0.00101;
			ball.count += 0.00855;
			ball.count2 *= 0.001;
			var tan = Math.atan(ball.count)*3.1;
			ball.value = Math.cos( ball.count  + Math.cos(ball.count2) + tan  ) * ((Math.atan(ball.count2)*100) + 300 );
			var radian = ball.angle * Math.PI / 180 * 1.5;
			var tx = Math.cos(radian) * ball.value + _global.sw/2;
			var ty = Math.sin(radian) * ball.value + _global.sh/2;

			ball.x += ((tx - ball.x) * 0.05);
			ball.y += ((ty - ball.y) * 0.05);



			var cx = _size/2;
			var cy = _size/2;
			var distx = ball.x - cx;
			var disty = ball.y - cy;
			var dist = Math.sqrt(distx*distx + disty*disty);
			var alpha = dist*0.004;
			if(ball.currentDist > dist){
				ball.color = "rgba("+color.r+", "+color.g+", "+color.b+", 0.0)"
			}else{
				if(dist > 200){
					alpha =  ((250 - dist)*1/50);
				}
				// if(i == 0) console.log(dist, alpha);
				ball.color = "rgb("+color.r+", "+color.g+", "+color.b+", "+alpha+")"
				ball.draw(_context);
			}
			ball.currentDist = dist;
		}
	}
	var _h_arrays = [];
	var _m_arrays = [];
	var _b_arrays = [];
	var _t_arrays = [];
	var _arrays = [];
	var _fishbodys = 3;
	var _speed = 0.001;
	function init() {

		for (var i = 0; i < _data.total; i++) {

			var _bb = {
				x: 0,
				y: 0
			};
			var _target = {
				x: Math.floor(Math.random() * _size),
				y: Math.floor(Math.random() * _size)
			}

			var _h_mc = _data.array[i];
			_h_mc.x = Math.floor(Math.random() * _size);
			_h_mc.y = Math.floor(Math.random() * _size);
			_h_mc.tx = Math.floor(Math.random() * _size);
			_h_mc.ty = Math.floor(Math.random() * _size);

			var _m_mc = new BallChild(2);
			_m_mc.x = Math.floor(Math.random() * _size);
			_m_mc.y = Math.floor(Math.random() * _size);

			_h_arrays[i] = _h_mc;
			_m_arrays[i] = _m_mc;
			_b_arrays[i] = _bb;
			_t_arrays[i] = _target;

			_arrays[i] = [];
			for (var j = 0; j < _fishbodys; j++) {
				var mc = new BallChild(2);
				mc.tx = Math.floor(Math.random() * _size) + 2 * j;
				mc.ty = Math.floor(Math.random() * _size);
				mc.x = Math.floor(Math.random() * _size) + 2 * j;
				mc.y = Math.floor(Math.random() * _size);
				mc.scaleX = mc.scaleY = 1 - 0.155 * j;
				_arrays[i][j] = mc;
				mc.lineBool = _h_mc.lineBool;

			}
		}

	}
	function setFish($b, $m, $h, $t, $index) {

		var _bb = $b;
		var _m_mc = $m;
		var _h_mc = $h;
		var index = $index;
		var _target = $t;

		_bb.x += (_target.x - _bb.x) * 0.1;
		_bb.y += (_target.y - _bb.y) * 0.1;

		var gap = Math.abs((_target.x - _bb.x));

		if (gap < 0.2 ) {
			var t = {
				x: 0,
				y: 0
			}
			t.x = Math.floor(Math.random() * (_size + 400)) - 200;
			t.y = Math.floor(Math.random() * (_size + 400)) - 200;
			_t_arrays[$index] = t;
		}

		_m_mc.x += (_bb.x - _m_mc.x) * 0.1;
		_m_mc.y += (_bb.y - _m_mc.y) * 0.1;

		_h_mc.tx = _h_mc.x;
		_h_mc.ty = _h_mc.y;

		_h_mc.x += (_m_mc.x - _h_mc.x) * _speed;
		_h_mc.y += (_m_mc.y - _h_mc.y) * _speed;

		_h_mc.rotation = Math.atan2(_m_mc.y - _h_mc.y, _m_mc.x - _h_mc.x) * 180 / Math.PI;


		var t_mc = null;

		for (var i = 0; i < _fishbodys; i++) {
			var mc = _arrays[index][i];

			if (i == 0) {
				t_mc = _h_mc;
			} else {
				t_mc = _arrays[index][i - 1];
			}
			var cx = _size/2;
			var cy = _size/2;
			var distx = mc.x - cx;
			var disty = mc.y - cy;
			var dist = Math.sqrt(distx*distx + disty*disty);
			var alpha = dist*0.004;



			if(_stepIndex == 0){
				mc.color = "rgba("+color.r+", "+color.g+", "+color.b+", 0.5)"
				if(!_h_mc.lineBool){
					mc.color = "rgba(206,206,206,0.5)";
				}
			}
			if(_stepIndex == 1){
				mc.color = "rgba("+color.r+", "+color.g+", "+color.b+", 0.5)"
				if(!_h_mc.lineBool){
					mc.color = "rgba(206,206,206,0.5)";
				}
			}
			if(_stepIndex == 2){
				if(dist > 200){
					alpha =  ((270 - dist)*1/50);
				}
				mc.color = "rgba("+color.r+", "+color.g+", "+color.b+", "+alpha+")"
				if(mc.currentDist > dist){
					mc.color = "rgba(255,255,255,0.0)";
				}
			}


			mc.currentDist = dist;

			mc.tx = mc.x;
			mc.ty = mc.y;
			mc.x = t_mc.tx;
			mc.y = t_mc.ty;
		}
	}
	function loop(){
		if(_h_arrays == null) return;

		for (var i = 0; i < _h_arrays.length; i++) {
			var h = _h_arrays[i];
			var m = _m_arrays[i];
			var b = _b_arrays[i];
			var t = _t_arrays[i];
			setFish(b, m, h, t, i)
		}
		_h_arrays.forEach(move);

		for (var i = 0; i < _h_arrays.length; i++) {
			try {
				_arrays[i].forEach(draw);
			} catch (e) { }
		}
	}
	function draw(point) {
		point.draw(_context);
	}

	var minDist = 100;
	function draw(point) {
		point.draw(_context);
	}

	function spring(partA, partB, no) {

		var dx = partB.x - partA.x,
			dy = partB.y - partA.y,
			dist = Math.sqrt(dx * dx + dy * dy);

		if (dist < minDist) {
			var alpha = 1 - dist / minDist;
			if(_stepIndex == 0){
				_context.strokeStyle = "rgba("+color.r+", "+color.g+", "+color.b+", "+color.scrokeAlpha+")"
				if(!partA.lineBool || !partB.lineBool){
					_context.strokeStyle = "rgba(255,255,255,0.0)";
				}
			}
			if(_stepIndex == 1){
				_context.strokeStyle = "rgba("+color.r+", "+color.g+", "+color.b+", "+alpha+")"
				if(!partA.lineBool || !partB.lineBool){
					_context.strokeStyle = "rgba(255,255,255,0.0)";
				}
			}
			if(_stepIndex == 2){
				_context.strokeStyle = "rgba("+color.r+", "+color.g+", "+color.b+", "+color.scrokeAlpha+")"
			}

			//

			_context.beginPath();
			_context.moveTo(partA.x, partA.y);
			_context.lineTo(partB.x, partB.y);
			_context.stroke();

		}
	}

	function move(partA, i) {
		for (var partB, j = i + 1; j < _h_arrays.length; j++) {
			partB = _h_arrays[j];
			if(_stepIndex == 1 && partB.lineBool) spring(partA, partB, i);
		}
	}

	drawFrame();
	init();
}







var scene = null;
var renderer = null;
var camera = null;
var points = null;
function step1ParticleAnimation(){
	if($(".canvasDiv").length == 0) return;
	init2();
	animate();
}

function init2() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 10, 1000 / 1000, 1, 4000 );

	var geometry = new THREE.SphereGeometry( 16, 50, 100 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	// scene.add( cube );
	camera.position.z = 200;
	renderer = new THREE.WebGLRenderer({alpha:true});
	renderer.setSize( 534, 534 );
	$(renderer.domElement).appendTo( $(".canvasDiv") );


	var array = []
	var len = geometry.attributes.position.array.length
	for(var i = 0;i<geometry.attributes.position.array.length;i+=3){
		var x = geometry.attributes.position.array[i];
		var y = geometry.attributes.position.array[i+1];
		var z = geometry.attributes.position.array[i+2];
		array.push({x:x, y:y, z:z});
	}

	var particles = geometry.attributes.position.array.length;
	var particles = array.length;
	var geometry = new THREE.BufferGeometry();
	var arrayBuffer = new ArrayBuffer( particles * 16 );
	var interleavedFloat32Buffer = new Float32Array( arrayBuffer );
	var interleavedUint8Buffer = new Uint8Array( arrayBuffer );
	//
	var color = new THREE.Color();
	var n = 100, n2 = n / 2;
	for ( let i = 0; i < array.length; i += 4 ) {
		var tg = array[i]
		var x = tg.x;
		var y = tg.y
		var z = tg.z
		interleavedFloat32Buffer[ i + 0 ] = x;
		interleavedFloat32Buffer[ i + 1 ] = y;
		interleavedFloat32Buffer[ i + 2 ] = z;
		var vx = ( x / n ) + 0.5;
		var vy = ( y / n ) + 0.5;
		var vz = ( z / n ) + 0.5;
		color.setRGB( vx, vy, vz );
		var j = ( i + 3 ) * 4;
		interleavedUint8Buffer[ j + 0 ] = 220;
		interleavedUint8Buffer[ j + 1 ] = 220;
		interleavedUint8Buffer[ j + 2 ] = 220;
		interleavedUint8Buffer[ j + 3 ] = 0;
	}
	var interleavedBuffer32 = new THREE.InterleavedBuffer( interleavedFloat32Buffer, 4 );
	var interleavedBuffer8 = new THREE.InterleavedBuffer( interleavedUint8Buffer, 16 );
	geometry.setAttribute( 'position', new THREE.InterleavedBufferAttribute( interleavedBuffer32, 3, 0, false ) );
	geometry.setAttribute( 'color', new THREE.InterleavedBufferAttribute( interleavedBuffer8, 3, 12, true ) );
	//
	var material = new THREE.PointsMaterial( { size: 2, vertexColors: true } );
	points = new THREE.Points( geometry, material );
	scene.add( points );
}

//
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	points.rotation.y += 0.005;
}



//////////////////////////////////////////////////////////////////////////////////////////////////
var itemIndex = 0;
var itemArr = [];
var imageCount = 0;
var imageTotal = 100;
var progresStop = false;
var kvItemLength = 0;
function mainLoad(){
	if( $(".main-01").length == 0 ) return;
	kvItemLength = $(".kv-item").length;
	for(var i = 0;i<kvItemLength;i++){
		var item = $(".kv-item").eq(i);
		var obj = {}

		if(item.find(".k-video").length == 1){
			obj.type = "video";
			obj.video = item.find("video");
			obj.videoEl = item.find("video")[0];
			obj.duration = 0;
		}
		if(item.find(".k-img").length == 1){
			obj.type = "image";
		}
		itemArr.push(obj);
	}
}

//setTimeout(mainLoad, 1000)



function progressVideo (no, obj){
	if(itemIndex == no){
		var videoEl = obj.videoEl;
		var currentTime = videoEl.currentTime;
		// console.log(currentTime);

		if(currentTime < videoEl.duration - 0.1 && currentTime > 0.05 ){
			$(videoEl).addClass("view")
		}else{

		}

		if(currentTime >= videoEl.duration){
			imageCount = 0;
			itemIndex++;
			if(itemIndex > itemArr.length -1) itemIndex = 0;
			// videoEl.currentTime = 0;
			$(".main-01 .k-progress .inner .p-item span").removeAttr("style");
			return;
		}
		videoEl.play();
		var tg = $(".main-01 .k-progress .inner .p-item").eq(no).find("span");
		var width = currentTime * 100 / obj.duration;
		var alpha = 0;
		alpha = currentTime * 0.8;
		if(alpha > 1) alpha = 1;
		tg.css({"width":width+"%"});

	}else{
		var videoEl = obj.videoEl;
		videoEl.currentTime = 0;
		$(videoEl).removeClass("view")
	}
}


function progressImage (no, obj){
	if(itemIndex == no){
		var tg = $(".main-01 .k-progress .inner .p-item").eq(no).find("span");
		var width = imageCount * 100 / imageTotal;
		tg.css({"width":width+"%"});
		if(width == imageTotal){
			itemIndex++;
			if(itemIndex > itemArr.length -1) itemIndex = 0;
		}
		imageCount++;


	}
}

function progressPause(){
	progresStop = !progresStop;
	if(progresStop){
		$(".main-01 .k-progress .inner button").addClass("stop");
		$(".main-01").addClass("stop");
		for(var i=0;i<itemArr.length;i++){
			var obj = itemArr[i];
			var type = obj.type;
			var videoEl = obj.videoEl;
			if(type == "video" && itemIndex == i){
				videoEl.pause();
			}
			if(type == "image" && itemIndex == i){
				imageCount = imageTotal;
			}
		}

	}else{
		$(".main-01").removeClass("stop");
		$(".main-01 .k-progress .inner button").removeClass("stop");

	}


}

function mainKvLeft(){
	itemIndex--
	if(itemIndex < 0){
		itemIndex = kvItemLength - 1;
	}
	imageCount = 0;
	$(".main-01 .kv-item").removeClass("on");
	$(".main-01 .kv-item").eq(itemIndex).addClass("on");
	$(".main-01 .k-progress .inner .p-item").removeClass("on");
	$(".main-01 .k-progress .inner .p-item").eq(itemIndex).addClass("on");
	for(var i=0;i<itemArr.length;i++){
		var obj = itemArr[i];
		var type = obj.type;
		var videoEl = obj.videoEl;
		if(type == "video" && itemIndex == i){
			videoEl.pause();
		}
	}
}
function mainKvRight(){
	itemIndex++
	if(itemIndex > kvItemLength - 1){
		itemIndex = 0;
	}
	imageCount = 0;
	$(".main-01 .kv-item").removeClass("on");
	$(".main-01 .kv-item").eq(itemIndex).addClass("on");
	$(".main-01 .k-progress .inner .p-item").removeClass("on");
	$(".main-01 .k-progress .inner .p-item").eq(itemIndex).addClass("on");


	for(var i=0;i<itemArr.length;i++){
		var obj = itemArr[i];
		var type = obj.type;
		var videoEl = obj.videoEl;
		if(type == "video" && itemIndex == i){
			videoEl.pause();
		}
	}
}

$(function (){
	var _prevIndex = -1;
	var container = $(".main-01");
	function loop(){
		window.requestAnimationFrame(loop);

		if(progresStop) return;
		if(!container.hasClass("section-out")) {
			for(var i=0;i<itemArr.length;i++){
				var obj = itemArr[i];
				var type = obj.type;
				var videoEl = obj.videoEl;
				if(type == "video"){
					obj.duration = videoEl.duration;
					progressVideo(i, obj);
					initialVideo(videoEl);
					setVideo(videoEl)
				}
				if(type == "image"){
					progressImage(i, obj);
				}
			}
			if(itemIndex != _prevIndex){
				$(".main-01 .kv-item").removeClass("on");
				$(".main-01 .kv-item").eq(itemIndex).addClass("on");
				$(".main-01 .k-progress .inner .p-item").removeClass("on");
				$(".main-01 .k-progress .inner .p-item").eq(itemIndex).addClass("on");
			}
			_prevIndex = itemIndex;
		}
	}
	window.requestAnimationFrame(loop);

	$(window).resize(videoResize);
	function videoResize(){
		for(var i=0;i<itemArr.length;i++){
			var obj = itemArr[i];
			var type = obj.type;
			var videoEl = obj.videoEl;
			if(type == "video"){
				obj.duration = videoEl.duration;
				initialVideo(videoEl);
				setVideo(videoEl)
			}
		}
	}

})

function initialVideo(videoEl){
	var parent = $(videoEl).parent();
	if(parent.attr("data-width") == null){
		$(videoEl).parent().attr({"data-width":videoEl.videoWidth,"data-height":videoEl.videoHeight});
	}
}
function setVideo(videoEl){
	var parent = $(videoEl).parent();
	$("html").removeClass("vertical horizon");
	var videoWidth = Number(parent.attr("data-width"));
	var videoHeight = Number(parent.attr("data-height"));
	if(videoWidth == 0) return;
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var ghost_h = videoHeight * windowWidth / videoWidth;
	parent.removeClass("min max");
	if(ghost_h < window.innerHeight){
		parent.addClass("min");
	}else{
		parent.addClass("max");
	}
}

















$(function (){
	var no = 0;
	function inter(){
		no++;
		if(no > 6){
			no = 0;
		}
		$(".main-02 .k-cont .k-left .k-txt .k-desc2 ul li").removeClass("on");
		$(".main-02 .k-cont .k-left .k-txt .k-desc2 ul li").eq(no).addClass("on");
	}

	setInterval(inter, 3000);
})





var rolling1;
var rolling2;
$(function () {


	rolling1 = new Rolling($(".rolling-list.left .list-inner"), "n");
	rolling1.resize();

	rolling2 = new Rolling($(".rolling-list.right .list-inner"), "s");
	rolling2.resize();;
	setStateRolling();

	function tween(){
		window.requestAnimationFrame(tween);
		if(window.innerWidth > 850){
			rolling1.tweenTop();
			rolling2.tweenBottom();
		}else{
			rolling1.tweenLeft();
			rolling2.tweenRight();
		}
	}
	window.requestAnimationFrame(tween);
});
function setStateRolling(){
	var state = null;
	if (window.innerWidth < 850) {
		state = "mobile";
	}else if (window.innerWidth < 1200) {
		state = "tablet";
	}else {
		state = "desktop";
	}
	changeStateRolling(state);
	_kglobal.prevStateR = state;
}
function changeStateRolling(state){
	if(_kglobal.prevStateR != state){
		_kglobal.currentStateR = state;
		// console.log("current : " + _kglobal.currentStateR, "prev : " + _kglobal.prevStateR);
		changeRolling();
	}
}
function changeRolling(){
	if(rolling1 != null) rolling1.resize();
	if(rolling2 != null) rolling2.resize();
}
function Rolling(tg, dirType) {
	this._array = [];
	this._tx = 0;
	this._dir = -1;
	this._size = 380;
	this._gap = 24
	this._no = 0;
	this._container = tg;
	this.item = tg.find(".img-item");
	this._total = this.item.length;
}
Rolling.prototype.resize = function (){
	this._no = 0;
	this._tx = 0;
	if(_kglobal.currentStateR == "desktop"){
		this._size = 380;
		this._gap = 24;
		this.init();
	}
	if(_kglobal.currentStateR == "tablet"){
		this._size = 302;
		this._gap = 20;
		this.init();
	}
	if(_kglobal.currentStateR == "mobile"){
		this._size = 152;
		this._gap = 16;
		this.initMobile();
	}
}
Rolling.prototype.init = function (){
	for (var i = 0; i < this._total; i++) {
		var box = this.item.eq(i);
		var top = (this._size  + this._gap) * i;
		box.attr({ index: i }).css({"top":top + "px"}).attr({"tx":top});
		this._array[i] = box;
	}
}
Rolling.prototype.initMobile = function (){
	for (var i = 0; i < this._total; i++) {
		var box = this.item.eq(i);
		var top = (this._size  + this._gap) * i;
		box.attr({ index: i }).css({"left":top + "px"}).attr({"tx":top});
		this._array[i] = box;
	}
}
Rolling.prototype.tweenLeft = function (){
	this._no +=1;
	this._tx = this._dir * (this._no);
	this._container.css({"left":this._tx}).attr({ tx: this._tx });
	for (var i = 0; i < this._total; i++) {
		if (Number(this._container.attr("tx")) + Number(this._array[i].attr("tx")) <= -(this._size  + this._gap)) {
			var tx = Number(this._array[i].attr("tx")) + (this._size  + this._gap) * this._total;
			this._array[i].css({ "left": tx }).attr({ tx: tx });
		}
		this._array[i].css({"top":0});
	}
	this._container.css({"top":0});
}
Rolling.prototype.tweenRight = function (){
	this._no -=1;
	this._tx = this._dir * (this._no);
	this._container.css({"left":this._tx}).attr({ tx: this._tx });
	for(var i=0;i<this._total;i++){
		if( Number(this._container.attr("tx"))  + Number(this._array[i].attr("tx")) > (this._size  + this._gap) * (this._total - 1)){
			var tx = Number(this._array[i].attr("tx"))  - (this._size  + this._gap) * this._total;
			this._array[i].css({"left":tx}).attr({tx:tx});
		}
		this._array[i].css({"top":0});
	}
	this._container.css({"top":0});
}
Rolling.prototype.tweenTop = function (){
	this._no +=1;
	this._tx = this._dir * (this._no);
	this._container.css({"top":this._tx}).attr({ tx: this._tx });
	for (var i = 0; i < this._total; i++) {
		if (Number(this._container.attr("tx")) + Number(this._array[i].attr("tx")) <= -(this._size  + this._gap)) {
			var tx = Number(this._array[i].attr("tx")) + (this._size  + this._gap) * this._total;
			this._array[i].css({ "top": tx }).attr({ tx: tx });
		}
		this._array[i].css({"left":0});
	}
	this._container.css({"left":0});
}
Rolling.prototype.tweenBottom = function (){
	this._no -=1;
	this._tx = this._dir * (this._no);
	this._container.css({"top":this._tx}).attr({ tx: this._tx });
	for(var i=0;i<this._total;i++){
		if( Number(this._container.attr("tx"))  + Number(this._array[i].attr("tx")) > (this._size  + this._gap) * (this._total - 1)){
			var tx = Number(this._array[i].attr("tx"))  - (this._size  + this._gap) * this._total;
			this._array[i].css({"top":tx}).attr({tx:tx});
		}
		this._array[i].css({"left":0});
	}
	this._container.css({"left":0});
}






$(function (){
	var canvas;
	var context;
	var _balls = [];

	function initCircle(){
		canvas = $('circleTween')[0];
		if(canvas == null) return;
		context = canvas.getContext('2d');

		for(var i = 0;i<10;i++) addBall();
		(function drawFrame () {
			window.requestAnimationFrame(drawFrame, canvas);
			context.clearRect(0, 0, canvas.width, canvas.height);

			for(var i=0;i<_balls.length;i++){
				var ball = _balls[i];
				ball.angle += 0.4;
				var radian = ball.angle*Math.PI/180;
				ball.x = Math.cos(radian)*100 + 200;
				ball.y = Math.sin(radian)*100 + 200;
				ball.draw(context);
			}
		}());
	}

	function addBall(){
		var len = _balls.length;
		var ball = new Ball();
		_balls.push(ball);
		if(len == 0) ball.angle = 0;
		else {
			var startBall = _balls[0];
			for(var i=1;i<=len;i++){
				var ball = _balls[i];
			ball.angle = startBall.angle + ((360/len)*i);
			}
		}

	}

	function Ball () {
		this.x = 0;
		this.y = 0;
		this.radius = 8;
		this.angle = 0;
		this.rotation = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.color = "rgba(251, 243, 246,1.0)";
		this.lineWidth = 1;
	}

	Ball.prototype.draw = function (context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.scale(this.scaleX, this.scaleY);

		context.lineWidth = this.lineWidth;
		context.fillStyle = this.color;
		context.beginPath();

		context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.fill();

		context.restore();
	};

	initCircle();

})





function glslAnimation(){
	var container;
	var camera,
		scene,
		renderer;
	var uniforms;
	var mouse = {
		x: 0,
		y: 0
	}
	var ext = 0;
	var c1obj = {x:0, y:0,rotation:0};
	var mouse = {x:0, y:0}


	var vShader =
				"varying vec2 vUv;"+
				"varying vec4 vertTexCoord;"+
				"void main()	{"+
				"    vUv = uv;"+
				"    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );"+
				"    gl_Position = projectionMatrix * mvPosition;"+
				"}"


	var fShader =
				"varying vec2 vUv;"+
				"uniform float time;"+
				"uniform vec2 resolution;"+
				"varying vec2 surfacePosition;"+
				"void main(){"+
				"    vec2 pos = - 1.0 + 2.0 * vUv;"+
				"    pos.x += sin(time+pos.y*5.)*.1;"+
				"    pos.y += cos(time*.5+pos.x*5.)*.1;"+
				"    const float pi = 3.14159;"+
				"    const float n = 20.0;"+
				"    float radius = length(pos)*2.2 - 1.6;"+
				"    float t = atan(pos.y, pos.x)/pi*3.;"+
				"    float color = 0.0;"+
				"    for (float i = 0.0; i < n; i++){"+
				"        color += 0.002/abs(0.25*sin(pi*(t+time*.1 + i/n))+sin(i*.1-time)*.1 - radius);"+
				"    }"+
				"    gl_FragColor = vec4(vec3(187. * 1. / 255., 30. * 1. / 255., 77. * 1. / 255.) , color*0.1);"+
				"}"



	if($(".canvasDivGlSl").length > 0){
		initAnimation3D();
		animate3();
	}


	function initAnimation3D() {

		container = $(".canvasDivGlSl")[0];
		camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
		scene = new THREE.Scene();
		var geometry = new THREE.PlaneBufferGeometry(2, 2);

		uniforms = {
			time: { type: "f", value: 1.0 },
			glslBool: { type: "f", value: 1.0 },
			mouse: { type: "v2", value: new THREE.Vector2() },
		};

		var material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vShader,
			fragmentShader: fShader,
			transparent: true,
		});

		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize( 534, 534 );
		renderer.setClearColor(  0xffffff , 0 );
		renderer.autoClear = false;
		container.appendChild(renderer.domElement);
	}

	//
	function animate3(timestamp) {
		requestAnimationFrame(animate3);
		uniforms["time"].value = timestamp / 1000;
		renderer.clear();
		renderer.render(scene, camera);
		renderer.clearDepth();
	}
}





var _sphere = null;
var _mesh = null;
var _material = null;
var _textureArr = [
	contextPath+'/static/images/esg_01/earth_1.jpg',
	contextPath+'/static/images/esg_01/earth_2.jpg',
	contextPath+'/static/images/esg_01/earth_3.jpg',
	contextPath+'/static/images/esg_01/earth_4.jpg'
];
var _loaderArr = []
function loadEarth(){
	var webglEl = $(".earthCanvas")[0];
	if(webglEl == null) return;
	var width  = 500,
		height = 504;
	var radius   = 0.5,
		segments = 32,
		rotation = 6;
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;
	renderer2 = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
	renderer2.setSize(width, height);
	renderer2.setPixelRatio(window.devicePixelRatio);
	renderer2.setClearColor(  0xffffff , 0 );
	renderer2.autoClear = false;
	scene.add(new THREE.AmbientLight(0x333333));
	var light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(3,3,3);
	scene.add(light);

	_material = new THREE.MeshPhongMaterial({
		map:         THREE.ImageUtils.loadTexture(_textureArr[0]),
		bumpMap:     THREE.ImageUtils.loadTexture(_textureArr[0]),
		bumpScale:   0.005,
		specularMap: THREE.ImageUtils.loadTexture(_textureArr[0]),
		specular:    new THREE.Color('grey')
	})
	_sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), _material);

	_sphere.rotation.y = rotation;
	scene.add(_sphere)
	// var controls = new THREE.TrackballControls(camera);
	webglEl.appendChild(renderer2.domElement);
	function render2() {
		// controls.update();
		_sphere.rotation.y += 0.0015;
		requestAnimationFrame(render2);
		renderer2.render(scene, camera);
	}

	render2();

	for(var i = 0;i<_textureArr.length;i++){
		var loader = THREE.ImageUtils.loadTexture(_textureArr[i])
		_loaderArr.push(loader);
	}
}

function changeEarth(index){
	if(_loaderArr[index] == null) return;
	_material.map = _loaderArr[index];
}

setTimeout(changeEarth, 1000, 1);


$(function (){
	function loadMap(){
		if( $(".root").hasClass("map")){
			$("body").addClass("overflow-hidden")
		}
	}
	loadMap();
	setTimeout(loadMap, 1000);
});

function globalTopAnimation(leftValue, rightValue){
	$(".global-01").addClass("on");
	var leftTg = $(".global-01 .k-div .k-left .k-no");
	var rightTg = $(".global-01 .k-div .k-right .k-no");
	var leftData = {
		value:0,
		total:leftValue
	}
	var rightData = {
		value:0,
		total:rightValue
	}
	TweenMax.to(leftData, 1, {value:leftData.total, onUpdate:function (){
		leftTg.text(Math.floor(leftData.value))
	}});
	TweenMax.to(rightData, 1.2, {value:rightData.total, onUpdate:function (){
		rightTg.text(Math.floor(rightData.value))
	}})
}

function sqAnimation(){
	var count = 0;
	var no = 0;
	function drawSqFrame(){
		window.requestAnimationFrame(drawSqFrame);
		count += 0.2;
		if(count > 50){
			count = 0
		}
		no = Math.ceil(count);
		if(count > 18){
			no = 18
		}
		$(".esg-04-06 .k-img").removeClass("on");
		$(".esg-04-06 .k-img").eq(no).addClass("on");

	}
	window.requestAnimationFrame(drawSqFrame);
}



function esg04Animation(){
	var canvas = $('.esg04Canvas')[0];
	if(canvas == null) return;
	var context = canvas.getContext('2d');
	var changeIndex = 0;
	var changeTotal = 4;
	var array = [
		{start:1.19, angle:104},
		{start:1.81, angle:63},
		{start:2.19, angle:104},
		{start:2.81, angle:63}
	]
	var redBallline = new BallLine("rgba(187,30,77,1.0)");
	function drawFrame () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawBg(context);
		redBallline.draw(context);
	};

	function loop(){


		tweencircle();
	}

	function tweencircle(){




		redBallline.round = 0;
		redBallline.startPoint = 0;
		redBallline.start = array[changeIndex].start;
		TweenMax.to(redBallline, 1, {round: array[changeIndex].angle* 2 / (670/2), ease:Power1.easeInOut , onComplete:function (){
			changeIndex++;
			if(changeIndex > changeTotal - 1){
				changeIndex = 0;
			}

			$(".esg-04-05 .k-cont .dot-list .dot").removeClass("on");
			$(".esg-04-05 .k-cont .dot-list .dot").eq(changeIndex).addClass("on");
			$(".esg-04-05 .k-cont .k-list .k-item").removeClass("on");
			$(".esg-04-05 .k-cont .k-list .k-item").eq(changeIndex).addClass("on");

			$(".esg-04-05 .k-cont .img-list .k-img").removeClass("on");
			$(".esg-04-05 .k-cont .img-list .k-img").eq(changeIndex).addClass("on");


		}, onUpdate:function (){
			drawFrame();
		}});

		var start = array[changeIndex].angle* 2 / (670/2);
		TweenMax.to(redBallline, 1, {delay:1, startPoint: start, ease:Power1.easeInOut , onComplete:function (){
			tweencircle();
		}, onUpdate:function (){
			drawFrame();
		}});
	}
	loop();


}




function BallLine (color) {
	this.x = 0;
	this.y = 0;
	this.radius = 4;
	this.angle = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = color;
	this.lineWidth = 2;
	this.round = 0;
	this.start = -0.5;
	this.startPoint = 0;
}

BallLine.prototype.draw = function (context) {
	var r = 670/2;
	context.save();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.color;
	context.beginPath();
	context.arc(r + 2, r + 2, r, (this.start + this.startPoint) * Math.PI , (this.start + this.round) * Math.PI);
	context.stroke();
	context.restore();
};
function drawBg(context){
	var r = 670/2;
	context.save();
	context.lineWidth = 1;
	context.strokeStyle = "rgba(208,208,208,1)";
	context.beginPath();
	context.arc(r + 2, r + 2, r, 0, 2 * Math.PI);
	context.closePath();
	context.stroke();
	context.restore();
};



function EsgBall (radius, color) {
	if (radius === undefined) { radius = 2; }
	if (color === undefined) { color = "#ff0000"; }
	this.x = 0;
	this.y = 0;
	this.radius = radius;
	this.angle = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.color = utils.parseColor(color);
	this.lineWidth = 1;
	this.remove = false;
}

EsgBall.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);

	if(this.remove){
	context.globalCompositeOperation = 'destination-out'
	}

	context.lineWidth = this.lineWidth;
	context.fillStyle = this.color;
	context.beginPath();
	//x, y, radius, start_angle, end_angle, anti-clockwise
	context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();
	if (this.lineWidth > 0) {
	//context.stroke();
	}
	context.restore();
};
window.utils = {};
window.utils.parseColor = function (color, toNumber) {
	if (toNumber === true) {
	if (typeof color === 'number') {
		return (color | 0); //chop off decimal
	}
	if (typeof color === 'string' && color[0] === '#') {
		color = color.slice(1);
	}
	return window.parseInt(color, 16);
	} else {
	if (typeof color === 'number') {
		color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
	}
	return color;
	}
};

// 저전력모드 알림;
$(function (){
	try{
		ckVideo();
	}catch(e){}
})

function ckVideo() {
	$(".main-01 .type-video").eq(0).find("video")[0].play().then(() => {
	}).catch((error) => {
		$("body").addClass("low-battery");
//		alert(util.getInterpreter('저전력 모드에서는 동영상이 재생되지 않습니다. 저전력 모드를 해제해 주세요.'));
	});

}

/**
 * 23.04.25 추가
 */
// 글로벌 네트워크 kv arrow 버튼 이벤트 추가
function autoDownGlobalBtn() {
    $("html, body").animate({"scrollTop":$(".global-02").offset().top}, 500)
}
// 글로벌 네트워크 지도 이벤트
// str : load, tab, btn
//function goMoveTab(no, str){ 
//    $(".global-02 .k-tab .tab-inner .swiper-slide").removeClass("active");
//    $(".global-02 .k-tab .tab-inner .swiper-slide").eq(no).addClass("active");
//    $(".global-02 .k-map .map-inner .map-list .map-item").removeClass("on");
//    $(".global-02 .k-map .map-inner .map-list .map-item").eq(no).addClass("on");
//    $(".global-02 .button-list .k-area").removeClass("on");
//    $(".global-02 .button-list .k-area").eq(no).addClass("on");
//    $(".global-02 .k-map .map-inner .map-list .map-item").removeClass("hover");
//    $(".global-02 .button-list .k-area").removeClass("hover");
//
//    // 기존 코드에 스크롤 에니메이션 코드 추가
//    try{
//        if(str == "btn"){
//            $("html, body").animate({"scrollTop":$(".global-02 .k-controll").offset().top - 82}, 500);
//        }
//    }catch(e){}
//}
// 코드(이동), 변경 없음
function goHoverMap(no){
    $(".global-02 .k-map .map-inner .map-list .map-item").removeClass("hover");
    $(".global-02 .k-map .map-inner .map-list .map-item").eq(no).addClass("hover");
    
    $(".global-02 .button-list .k-area").removeClass("hover");
    $(".global-02 .button-list .k-area").eq(no).addClass("hover");
}

//// 제품 찾기 태그 클릭 load complete 후에 이동요청
//function searchTagScrollMove(){
//    $("html, body").animate({"scrollTop":$(".k-prd-list-wrap").offset().top - 82 - 50}, 500);
//}