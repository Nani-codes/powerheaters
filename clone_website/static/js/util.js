var util = (function(){
	getLang = function() {
		var lang = getLocale();
		if(_.isEmpty(lang)) {
			if($(".k-language .k-list a.on").length > 0) {
				lang = $(".k-language .k-list a.on").data("tmplItem").data.cd
			}
		}
		return lang;
	}
	, getSearchLang = function() {
		var lang = getLang();
		if(_.includes(["ko", "cn", "de"], lang)) {
			return lang;
		}
		return "en";
	}
	, dateFormat = function(date, fromcat) {
		return moment(date).format(fromcat);
	}
	, numberWithCommas = function(val){
		if( val == undefined || val == null || val == "" ) {
			val = 0;
		}
		val = parseFloat(val)
		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	, nl2br = function(content){
		content = _.replace(_.unescape(_.unescape(content)),new RegExp("<(\/script|script)([^>]*)>","g"),"");
		if(_.includes(_.unescape(content), "<script")) {
			return content;
		}
		return _.unescape(_.replace(content, /(?:\r\n|\r|\n)/g, "<br/>"));
	}
	, unescapehtml = function(content){
		content = _.replace(_.unescape(_.unescape(content)),new RegExp("<(\/script|script)([^>]*)>","g"),"");
		if(_.includes(_.unescape(content), "<script") && !_.includes(_.unescape(content), "data-oembed-url")) {
			return content;
		}
		return _.unescape(content);
	}
	, setCookie = function(cookie_name, value, days, isByLang) {
		var path = isByLang ? _.join(_.split(window.location.pathname,"/", 2),"/") : "/";
		$.cookie(cookie_name, _.escape(value), { expires: days, path: path })
	}
	, getCookie = function(cookie_name) {
		return $.cookie(cookie_name);
	}
	, removeCookie = function(cookie_name, isByLang) {
		var path = isByLang ? _.join(_.split(window.location.pathname,"/", 2),"/") : "/";
		return $.removeCookie(cookie_name, { path: path });
	}
	, getParameterByName = function (name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	, getLocale = function() {
		if(localStorage){
			return localStorage.getItem('APPLICATION_LOCALE');
		}
		return $.cookie('APPLICATION_LOCALE');
	}
	, setLocale = function(locale){
		if(locale){
			if(localStorage){
				localStorage.setItem('APPLICATION_LOCALE', locale);
			}else{
				$.cookie('APPLICATION_LOCALE', locale, { path:'/' });
			}
		}
	}
	, s3Download = function(url, params, cbFn){
		if($.fileDownload){
			$.fileDownload(url, {
				httpMethod :"GET",
				data: params,
				successCallback: function() {
					if($.isFunction(cbFn)){
						cbFn.call(this);
					}
				},
				failCallback: function(responseHtml,url,error) {
					if(_.includes(responseHtml, 'message')) {
						var error = JSON.parse(responseHtml.substring(_.indexOf(responseHtml,"{"), _.lastIndexOf(responseHtml,"}")+1))
						alert(error.message);
					} else {
						alert("Download failed!!");
					}
				}
			});
		}
	}
	, goPage = function(url, target) {
		target = _.trim(target);
		if(!_.includes(url, "http")) {
			if(_.includes(url, "www.")) {
				url = "https://"+url;
			} else {
				if(!_.eq(url.substring(0,1),"/")) {
					url = "/"+url;
				}
				url = contextPath+"/"+getLang()+url;
			}
		}

		if(_.eq(target, "_blank")) {
			window.open(url);
		} else {
			window.location.href=url;
		}
	}
	, getInterpreter = function(key, abbr, domain){
		var domainKey = key;
		if(!(domain == undefined || domain == null)) {
			domainKey = domain + "." + domainKey
		}

		var row = Interpreter[domainKey];
		if(row == undefined || row  == null) {
			return key;
		}

		var lang = getSearchLang();
		var suffix = "full";
		if(abbr != undefined) {

			if(abbr == "*") {
				suffix = "short";
			}
			else{
				var abbrArray = abbr.split(",");

				for(var k=0; k<abbrArray.length; k++) {
					if(lang == abbrArray[k].trim() ) {
						suffix = "short";
						break;
					}
				}
			}
		}
		lang = lang + "." + suffix;
		var value = row[lang];
		if(value == undefined || value == "") {
			return key;
		}
		else{
			return row[lang];
		}
	}
	, getUserLanguage = function() {
		var language = navigator.language || navigator.userLanguage;
		language = language.toLowerCase();
		if(['ko','ko-kr'].includes(language)) {
			return "ko";
		} else if(['cn','zh-cn', 'zh-tw'].includes(language)) {
			return "cn";
		} else if(['de','de-de'].includes(language)){
			return "de";
		}

		return "en";
	}
	;
	return {
		getLang : getLang
		, getSearchLang: getSearchLang
		, dateFormat: dateFormat
		, numberWithCommas: numberWithCommas
		, nl2br: nl2br
		, unescapehtml: unescapehtml
		, setCookie: setCookie
		, getCookie: getCookie
		, removeCookie: removeCookie
		, getParameterByName: getParameterByName
		, getLocale: getLocale
		, setLocale:setLocale
		, s3Download:s3Download
		, goPage:goPage
		, getInterpreter: getInterpreter
		, getUserLanguage: getUserLanguage
	}
})();