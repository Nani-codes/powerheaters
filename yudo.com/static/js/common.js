$(function(){
	window.Common = (function($){
		var init = function(){
			var urlLnag = _.split(window.location.pathname,'/', 2)[1];
			if(!_.isEmpty(urlLnag)) {
				if(urlLnag.length == 2) {
					util.setLocale(urlLnag);
				}
				_bindEvent();
				_getLangList();
				_getFooter();
				Popup.init();
			} else {
				location.href = contextPath+"/"+ util.getUserLanguage()+"/";
			}
		},
		_bindEvent = function(){
			$(".k-language").on("click", ".k-list a", function() {
				var prevLang = util.getLang();
				var lang = $(this).data("tmplItem").data.cd;
				Ajax.ajax(contextPath+"/locale/setLocale"
				, {language : lang}
				, function(data) {
					util.setLocale(data);

					if(_.includes(location.pathname, prevLang)) {
						location.href = _.replace(location.pathname, "/"+prevLang+"/", "/"+lang+"/") + location.search;
					} else {
						location.href = contextPath+"/"+lang+"/";
					}
				});
			});

			$(".k-header").on("click", ".k-left h1 a", function() {
				location.href = "/"+util.getLang()+"/";
			});

			//문의하기
			//지역 선택시
			$("#inquiryCountry").on("click", ".list-item", function() {
				$(this).parent().parent().parent().parent().removeClass('on');
				var cntyNm = $(this).data("cnty-nm");
				var cntyId = $(this).data("cnty-id");
				$("#inquiryCntrNm").val(cntyNm);
				$("#inquiryCntrNm").data("cnty-id", cntyId);
				_handleInquiryNextButton(1);
			});
			//다음 버튼 클릭시
			$("button[name='btnInquiryNext']").on("click", function(){
				var targetStep = $(this).data("step");
				_handleInquiryLayer(targetStep);
			});
			//문의 유형 버튼 클릭시
			$("#inquiryTypes").on("click", "button[name='btnInquiryType']", function(){
				$("#inquiryTypes > .img-item").removeClass("on");
				$(this).parent().addClass("on");
				var inquiryCatCd = $(this).data("type-code");
				var inquiryCatCdNm = $(this).data("type-code-name");
				$("#inquiryCatCd").val(inquiryCatCd);
				$("#inquiryCatCd").data("type-code-name", inquiryCatCdNm);
				_handleInquiryNextButton(2);
			});

			$("#inquiryStep6").on("click", "button[name='btnReply']", function(e){
				e.stopImmediatePropagation();
				if ($(this).parent().parent().parent().parent().parent().hasClass("on")) {
					$(this).parent().parent().parent().parent().parent().removeClass("on");
				} else {
					$(this).parent().parent().parent().parent().parent().addClass("on");
				}
			});

			$("#fileFileNm").on("change", function(){
				$("#txtInqFileNm").val($("#fileFileNm").val());
			});

			$("#inquiryForm").on("change", "input", function() {
				var result = false;
				var inputId = "";
				var inputType = "";
				$("#inquiryForm input").each(function(idx){
					inputType = $(this).attr("type");
					inputId = $(this).attr("id");
					if (inputId !== "txtInqFileNm" && inputId !== "fileFileNm") {
						if (inputType !== "checkbox") {
							if ($(this).val() == "") {
								result = true;
								return false;
							}
						} else {
							if (!$(this).is(':checked')) {
								result = true;
								return false;
							}
						}
					}
				});

				if (!result) {
					$("#divBtnInquiryNext3").removeClass("k-disable");
				} else {
					if (!$("#divBtnInquiryNext3").hasClass("k-disable")) {
						$("#divBtnInquiryNext3").addClass("k-disable");
					}
				}
			});

			$("#frmInqCheck").on("change", "input", function() {
				_handleInquiryNextButton(6);
			});

			$(".top-btn").on('click', function() {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
				return false;
			});
		}
		, _getLangList = function() {
			var urlLnag = _.split(window.location.pathname,'/', 2)[1];

			Ajax.ajax(contextPath+"/locale/getLangList"
			, {}
			, function(data) {
				var language = util.getLang();
				if(_.isEmpty(language)) {
					language = data.language;
				}
				_.forEach(data.langList, function(langData) {
					if(_.eq(langData.cd, language)) {
						langData.className = 'on';
					}
					$.tmpl(langTmpl, langData).appendTo(".k-language .k-list .list-inner");
				});
				if(_.eq(location.pathname,"/")) {
					$(".k-language .k-list .list-inner a.on").click();
				}
				_menuList();
				$("div.root").addClass("lang-"+util.getSearchLang());
				$("div.header-inner").addClass("lang-"+util.getSearchLang());
				if($("div.k-body").length>1) {
					_.forEach($("div.k-body"), function(obj) {
						if(!$(obj).hasClass("lang-"+util.getSearchLang())) {
							$(obj).remove();
						} else {
							$(obj).show();
						}
					});
				} else {
					$("div.k-body").addClass("lang-"+util.getSearchLang());
				}

				if(!_.includes(window.location.pathname, '/sustainability/')) {
					$('.floating-btn').show();
				}

				if(typeof(pageInit) == 'function') {
					pageInit();
				}
			});
		}
		, _getFooter =function() {
			Ajax.ajax(contextPath+"/"+util.getLang()+"/site/footer/getDetail"
			, {}
			, function(data) {
				var footerLang = _.filter(data.footerLangList, {lang:util.getSearchLang()})[0];
				if(!_.isEmpty(footerLang)){
					$.tmpl(footerTmpl, footerLang).appendTo(".k-footer .k-ft-bottom .k-inner .k-center div");
				}
				$(".fbUrl").attr("href", data.fbUrl);
				$(".linkedInUrl").attr("href", data.linkedInUrl);
				$(".youtubeUrl").attr("href", data.youtubeUrl);
			});
		}
		, _menuList = function() {
			var pathname = window.location.pathname;
			var path;
			Ajax.ajax(contextPath+"/"+util.getLang()+"/common/getMenuList"
			, {}
			, function(data) {
				//GNB
				var lang = util.getLang();
				var searchLang = util.getSearchLang();
				var menuDepth1List = _.filter(data.menuList, {"menuDepth": "1"});
				_.forEach(menuDepth1List, function(obj1, idx) {
					obj1.webMenuNm = _.map(_.filter(obj1.menuLangList, {lang:searchLang}),"webMenuNm")[0];
					obj1.moMenuNm = _.map(_.filter(obj1.menuLangList, {lang:searchLang}),"moMenuNm")[0];
					obj1.className = "depth1-"+_.padStart((idx+1)+'', 2, '0');
					obj1.menuDepth2List = _.filter(data.menuList, {"uprMenuCd" : obj1.menuCd,"menuDepth": "2"});
					obj1.idx = idx;

					if(obj1.menuDepth2List.length ===0) {
						obj1.className = obj1.className  + " no-sub";
					}

					if(_.eq(obj1.menuCd, "MENU05")) {
						obj1.menuUrl = obj1.menuUrl;
						obj1.menuTarget = "_blank";
					} else {
						obj1.menuUrl = makeUrl(obj1.menuUrl);
						obj1.menuTarget = "_self";
					}

					if(_.eq(pathname, obj1.menuUrl)) {
						path = _.map(_.filter(obj1.menuLangList, {lang:searchLang}),"webMenuNmPath")[0];
					}

					_.forEach(obj1.menuDepth2List, function(obj2, idx2) {
						if(_.eq(obj2.uprMenuCd, "MENU01")) {
							obj2.className = "depth2-"+idx2;
						}
						obj2.webMenuNm = _.map(_.filter(obj2.menuLangList, {lang:searchLang}),"webMenuNm")[0];
						obj2.moMenuNm = _.map(_.filter(obj2.menuLangList, {lang:searchLang}),"moMenuNm")[0];
						obj2.menuDepth3List = _.filter(data.menuList, {"uprMenuCd" : obj2.menuCd,"menuDepth": "3"});
						obj2.menuUrl = makeUrl(obj2.menuUrl);

						if(_.eq(pathname, obj2.menuUrl)) {
							path = _.map(_.filter(obj2.menuLangList, {lang:searchLang}),"webMenuNmPath")[0];
						}
						_.forEach(obj2.menuDepth3List, function(obj3) {
							obj3.webMenuNm = _.map(_.filter(obj3.menuLangList, {lang:searchLang}),"webMenuNm")[0];
							obj3.moMenuNm = _.map(_.filter(obj3.menuLangList, {lang:searchLang}),"moMenuNm")[0];
							obj3.menuUrl = makeUrl(obj3.menuUrl);

							if(_.eq(pathname, obj3.menuUrl)) {
								path = _.map(_.filter(obj3.menuLangList, {lang:searchLang}),"webMenuNmPath")[0];
							}
						});
					});

					obj1.lang = lang;
					$.tmpl(gnbPcTmpl, obj1).appendTo(".k-gnb.k-pc .gnb-inner");
					$.tmpl(gnbMoTmpl, obj1).appendTo(".k-gnb.k-mobile .gnb-inner");
					try {
						$.tmpl(footerGnbPcTmpl, obj1).appendTo(".k-footer-gnb.k-pc .gnb-inner");
						$.tmpl(footerGnbMoTmpl, obj1).appendTo(".k-footer-gnb.k-mobile .gnb-inner");
					} catch (c) { }
				});

				if(!_.isEmpty(path)) {
					path = util.getInterpreter('홈')+ ">"+path;
					$.tmpl(menuPathTmpl, {menus:_.split(path,">")}).appendTo(".menu-path");
				}
		});
		}
		, makeUrl = function(menuUrl) {
			if(_.includes(menuUrl, "javascript")) {
				return menuUrl;
			}
			return contextPath+"/"+util.getLang()+ menuUrl;
		}
		//문의하기
		,_handleInquiryNextButton = function (step) {
			if (step === 1) {
				$("#divBtnInquiryNext1").removeClass("k-disable");
			} else if (step === 2) {
				if ($("#inquiryCatCd").val() != "") {
					$("#divBtnInquiryNext2").removeClass("k-disable");
				}
			} else if (step === 3) {
				if ($("#inquiryCatCd").val() != "") {
					$("#divBtnInquiryNext3").removeClass("k-disable");
				}
			} else if (step === 6) {
				if ($("#txtInqAnsEmail").val() != "" && $("#txtInqAnsPwd").val()) {
					$("#divBtnInquiryNext6").removeClass("k-disable");
				} else {
					if (!$("#divBtnInquiryNext6").hasClass("k-disable")) {
						$("#divBtnInquiryNext6").addClass("k-disable");
					}
				}
			}
		}
		,_handleInquiryLayer = function (step) {
			$(".k-loading").addClass('on');
			if (step && _validateInquiryStep(step)) {
				if (step === 4) {
					_submitInquiry();
					return;
				} else if (step === 6) {
					_checkInquiry();
					return;
				}

				$(".k-layer-modal").removeClass("on");
				$("#inquiryStep"+step).addClass("on");
				_inquiryInitSetup(step);
				$(".k-loading").removeClass('on');
			}
			$(".k-loading").removeClass('on');
		}
		,_inquiryInitSetup = function (step) {
			if (step === 2) {
				_makeInquiryType();
			} else if (step === 3 ) {
				$("#setBindText").html("["+$("#inquiryCntrNm").val()+"]["+$("#inquiryCatCd").data("type-code-name")+"]")
			}
		}
		, _makeInquiryType = function () {
			$("#inquiryTypes").empty();
			Ajax.ajax(contextPath+"/"+util.getLang()+"/common/getCommonCode"
				, {grpCd : "CMP003"}
				, function(list) {
					_.forEach(list, function(obj, idx) {
						obj.cdNm = util.getInterpreter(obj.cdNm);
						$.tmpl(inquiryCategoryTmpl, obj).appendTo("#inquiryTypes");
					});
			});
		}
		,_submitInquiry = function() {
			var formData = new FormData($('#inquiryForm')[0]);
			formData.append("catCd", $("#inquiryCatCd").val());
			formData.append("cntyId", $("#inquiryCntrNm").data('cntyId'));
			formData.append("indviNfoAgreeYn", "Y");
			formData.append("tretStatCd", "001");
			Ajax.multipartAjax(contextPath+"/"+util.getLang()+"/inquiry/addInquiry"
				, formData
				, function(data) {
					_resetInquiry();
					$(".k-layer-modal").removeClass("on");
					$("#inquiryStep4").addClass("on");
					$(".k-loading").removeClass('on');
			});
		}
		, _resetInquiry = function() {
			$("#frmInquiryStep1")[0].reset();
			$("#inquiryCntrNm").data("cnty-id","");
			$("#inquiryGlobNtwkSeqNm").data("global-network-seq", "");
			$("#inquiryCatCd").val("");

			$("#inquiryForm")[0].reset();
			$("#inquiryForm .TextInput").removeClass("k-require");
		}
		, _validateInquiryStep = function (step) {
			if (step === 2) {
				if (!$("#inquiryCntrNm").data("cnty-id")) {
					alert(util.getInterpreter('국가를 선택해주세요.'));
					return false;
				}
			} else if (step === 3) {
				if (!$("#inquiryCatCd").val()) {
					alert(util.getInterpreter('문의하기 분류를 선택해주세요.'));
					return false;
				}
			} else if (step === 4) {
				var subResult = true;
				$("#inquiryForm .TextInput").removeClass("k-require");
				if (!$("#txtInqrrNm").val()) {
					$("#divTxtInqrrNm").addClass("k-require");
					subResult = false;
				}

				if (!$("#txtCoNm").val()) {
					$("#divTxtCoNm").addClass("k-require");
					subResult = false;
				}
				
				if (!$("#txtAddr").val()) {
					$("#divTxtAddr").addClass("k-require");
					subResult = false;
				}

				if (!$("#txtTelNo").val()) {
					$("#divTxtTelNo").addClass("k-require");
					subResult = false;
				}

				if (!$("#txtEmailAddr").val()) {
					$("#divTxtEmailAddr").addClass("k-require");
					subResult = false;
				}
				//add email patter check
				if (!$("#txtCont").val()) {
					$("#divTxtCont").addClass("k-require");
					subResult = false;
				}

				if (!$("#txtPwd").val()) {
					$("#divTxtPwd").addClass("k-require");
					subResult = false;
				}
				//add 개인정보 동의 체크
				if (!$("#chkAgree").is(':checked')) {
					subResult = false;
					alert(util.getInterpreter('개인정보 동의를 선택해주세요.'));
				}
				return subResult;

			} else if (step === 6) {
				if (!$("#txtInqAnsEmail").val()) {
					$("#divTxtInqAnsEmail").addClass("k-require");
					subResult = false;
				}
				if (!$("#txtInqAnsPwd").val()) {
					$("#divTxtInqAnsPwd").addClass("k-require");
					subResult = false;
				}
			}
			return true;
		}
		, _checkInquiry = function() {
			$(".k-loading").removeClass('on')
			Ajax.ajax(contextPath+"/"+util.getLang()+"/inquiry/getList"
				, {emailAddr : $("#txtInqAnsEmail").val(), pwd : $("#txtInqAnsPwd").val()}
				, function(list) {
					if (list != null && list.length > 0) {
						$(".k-layer-modal").removeClass("on");
						$("#inquiryStep6").addClass("on");
						_makeInquiryAnswer(list);
					} else {
						alert(util.getInterpreter('입력하신 정보로 등록된 문의 내역이 없습니다.'));
					}
			});
		}
		, _makeInquiryAnswer = function(list) {
			$("#divInquiryReply").empty();
			_.forEach(list, function(obj, idx) {
				var tmpTxt = util.getInterpreter('[CountyNm]에서 [catNm]에 관한 문의');
				tmpTxt =_.replace(tmpTxt, "CountyNm", obj.corpCountyNm);
				tmpTxt =_.replace(tmpTxt, "catNm", util.getInterpreter(obj.catNm));
				obj.tmpTxt = tmpTxt;
				obj.statusClass="";
				if(_.eq(obj.tretStatCd, "002")) {
					obj.statusClass="k-primary";
				}
				obj.statusNm = util.getInterpreter(obj.statusNm);
				$.tmpl(inquiryReplyTmpl, obj).appendTo("#divInquiryReply");
			});
		}
		//문의하기
		;
		init();
		return {
			_handleInquiryLayer: _handleInquiryLayer
		}
	})(jQuery);
});

function googleTranslate() {
	$('.goog-te-menu-frame:first').contents().find('.goog-te-menu2-item span.text').click();
	$('body').css("top", "0px");
}

function googleTranslateElementInit() {
	var TRANS_LANGS = [
		{"lang":"en", "glang":"en", "trans":false}
		, {"lang":"ko", "glang":"ko", "trans":false}
		, {"lang":"cn", "glang":"zh-CN", "trans":false}
		, {"lang":"ja", "glang":"ja", "trans":true}
		, {"lang":"pt", "glang":"pt", "trans":true}
		, {"lang":"es", "glang":"es", "trans":true}
		, {"lang":"fr", "glang":"fr", "trans":true}
		, {"lang":"it", "glang":"it", "trans":true}
		, {"lang":"de", "glang":"de", "trans":true}
	];

	var PAGE_LANG = util.getLang();
	var langObj = _.find(TRANS_LANGS, {lang : PAGE_LANG});

	if(langObj.trans) {
		new google.translate.TranslateElement({
			pageLanguage: 'en',
			autoDisplay: false,
			includedLanguages: langObj.glang,
			layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
		}, 'google_translate_element');
		setTimeout(googleTranslate, 3000);
	}
}

function openInquiry(){
	$(".k-loading").removeClass('on')
	$("#inquiryStep1").addClass("on");
	$("html").addClass("fixed-layer");
	_kglobal.stopWheel = true;
	_makeInquiryCountry();
}

function openInquiryAnswer() {
	window.Common._handleInquiryLayer(5);
}
function _makeInquiryCountry() {
	var cntnnCd = "";
	Ajax.ajax(contextPath+"/"+util.getLang()+"/support/contact-info/global-network/getCountryListByCntnnCd"
		, {cntnnCd : cntnnCd}
		, function(list) {
			$("#inquiryCountry").empty();
			_.forEach(list, function(obj) {
				$.tmpl(inquiryCountryTmpl, obj).appendTo("#inquiryCountry");
			});
	});
}