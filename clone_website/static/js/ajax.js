window.Ajax = (function($){
	var default_opt = {
		method : "POST",
		loader : 'yes',
		error : function(jqXHR, textStatus, errorThrown ){
//			console.info(textStatus);
		},
		statusCode: {
			401: function(jqXHR) {
			},
			400: function(jqXHR) {
				if(jqXHR.responseJSON.errors && jqXHR.responseJSON.errors.length > 0) {
					goErrorPage();
				} else {
					goErrorPage();
				}
			},
			500: function(jqXHR) {
				if(jqXHR.responseJSON.errors && jqXHR.responseJSON.errors.length > 0) {
					goErrorPage();
				} else {
					goErrorPage();
				}
			},
			403: function(jqXHR) {
			},
		}
	};
	var _ajax = function(cbFn, opt){
		opt =  $.extend({
			success : function(data, resultTxt, req) {
				if(_validate(data) && $.isFunction(cbFn)){
					cbFn.call(this, data);
				}
			}}, default_opt, opt);
		$.ajax(opt);
	}
	, ajax = function(url, param, cbFn, opt){
		if($.isArray(param)){
			ajaxRequestBody(url, param, cbFn, opt);
			return;
		}
		_ajax(cbFn , $.extend({url : url, data : param}, opt));
	}
	, multipartAjax = function(url, param, cbFn, opt){
		_ajax(cbFn , $.extend({url : url, processData: false, contentType: false, enctype : 'multipart/form-data', data : param}, opt));
	}
	, ajaxRequestBody = function(url, param, cbFn, opt){
		_ajax(cbFn , $.extend({ contentType: "application/json", url : url, data : JSON.stringify(param) }, opt));
	}
	, _validate = function(result) {
		if($.isPlainObject(result) && result.hasOwnProperty('code')){
			if(result.code !== "000") {
				window.sfpAlert(result.message);
				return false;
			}
		}
		return true;
	}
	, goErrorPage = function() {
//		window.location.replace("error/error");
	}
	;
	return {
		ajax : ajax,
		ajaxRequestBody: ajaxRequestBody,
		multipartAjax : multipartAjax
	}
})(jQuery);