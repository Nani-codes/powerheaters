window.Popup = (function($){
	var init = function(){
		_bindEvent();
		_getPopupList();
	}
	, _bindEvent = function() {
		$(".root").on("click", ".btn-clsConf", function(){
			$today = $(this).parents("div.inner").find("input[name^='today']");
			if($today.prop("checked")){
				util.setCookie("popup_"+$(this).parents("div#banner").find("input[name='popupSeq']").val(), $today.val(), $today.val()*1, false);
			}
			$(".root").removeClass("banner-top banner-center banner-bottom");
		});
	}
	, _getPopupList = function() {
		Ajax.ajax(contextPath+"/"+util.getLang()+"/site/popup/getList"
		, {}
		, function(data) {
			var uri = window.location.pathname;
			if(!$(".k-body .k-section").hasClass("error-01")){
				_.forEach(data, function(popup){
					var popupLang = _.filter(popup.popupLangList, {lang:util.getSearchLang()})[0];
					popup.more = true;
					if(_.isEqual(popup.expsTpCd, "002") && !_.isEqual(uri, "/"+util.getLang()+popup.expsPg)){
						return false;
					}

					if(_.isEqual(popup.expsTpCd, "003") && !$(".k-body .k-section").hasClass("main-01")){
						return false;
					}

					if(_.isEmpty(util.getCookie("popup_"+popup.popupSeq))){
						if(_.isEmpty(popupLang.url)){
							popup.tmpUrl = "javascript:void(0);";
							popup.more = false;
						}else{
							popup.tmpUrl = "javascript:util.goPage('"+popupLang.url+"', '"+popupLang.linkCd+"')";
						}
						popup.clsConfNm = util.getInterpreter(popup.clsConfCdNameCache);

						if(_.isEqual(popup.expsLocaCd, "003")){
							$.tmpl(centerBannerTmpl, popup).appendTo("#banner");
							$(".root").addClass("banner-center");
						}else{
							$.tmpl(topBottomBannerTmpl, popup).appendTo("#banner");
							if(_.isEqual(popup.expsLocaCd, "001")){
								$(".root").addClass("banner-top");
							}else {
								$(".root").addClass("banner-bottom");
							}
						}
					}
				});
			}
		});
	}
	;
	return {
		init : init
	}
})(jQuery);