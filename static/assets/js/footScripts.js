initialGetViewportH();
/***Just like in headScripts File I like to merge multiple scripts in one file to minimize http requests. Its a bit less dev friendly, but with the rise of mobile as an important audience I try to minimize http requests***/

/* =============================================================================
   Minimal Popups
   I wrote this plugin to serve as a js view It creates popups
   ========================================================================== */
var dPop = {
	mask  : 'dPopMask',
	popup :	'dPopWin',
	hide   : function(replaceWith,callback,onlyHide){ 
		var prevWin = document.getElementById(this.popup);
		if(prevWin != null){
			var prevWinCSS   = prevWin.className,
				isPrevHidden = false;
				
			if(prevWinCSS.search(onlyHide) >= 0 || typeof onlyHide === "undefined"){
				if(prevWinCSS.search('bringDPopUpOut') >= 0)isPrevHidden = true;
				if(!isPrevHidden){
					prevWin.className = prevWinCSS.replace('bringDPopUpIn','bringDPopUpOut');
				}
				if(typeof replaceWith === "function")prevWin.parentNode.replaceChild(replaceWith(),prevWin);
				else {$('.dPopMask').fadeOut();}
				if(typeof callback === "function")callback();
			}
		}
	},
	create : function(tpl,params){
		var myObj = this;
		if(typeof params === "undefined")params = {};
		if(typeof params.css === "undefined")params.css = '';
		if(typeof params.noMask === "undefined")params.noMask = false;
		if(typeof params.XButton === "undefined")params.XButton = true;
		
		var mask = document.getElementsByClassName(this.mask)[0];
		if(!params.noMask)mask.style.display = 'block';
		
		if(params.XButton)tpl = '<a class="dPopClose" href="#"></a>' + tpl;
		
		var prevWin = document.getElementById(this.popup);
		
		function generateNewPopup(){
			var win = document.createElement('div');
			win.id = myObj.popup;
			win.className = params.css += ' bringDPopUpIn ';
			win.innerHTML = tpl;
			
			return win;
		}
		this.hide(generateNewPopup,null);
		scrollTop();
	},
	init : function(){
		if(document.getElementById('dPopWin') == null){
			var placeHolder = document.createElement('div');
			var requiredHtmlFrag = document.createDocumentFragment();
			var tpl = '<div class="dPopMask" style="display:none;"></div>\
			<div id="overlayRelativer">\
				<div id="dPopWin" class="welcomePop bringDPopUpIn" style="display:none;">\
				</div>\
			</div>';
			placeHolder.innerHTML = tpl;
			requiredHtmlFrag.appendChild(placeHolder);
			document.body.insertBefore(requiredHtmlFrag,document.body.firstChild);
		}
		
	}
}
dPop.init();
/*Commented out as IE8 does not support thisvar popUpObjReady = document.createEvent("Event");
popUpObjReady.initEvent("popupsReady",true,true);
document.dispatchEvent(popUpObjReady);*/

$(document).on('click','.dPopMask,.dPopClose',function(e){
	e.preventDefault();
	dPop.hide();
	window.location.hash = 'close';
});

function customPop(tpl){
	dPop.create(tpl,{css:'standardPopLook'});
}

function showLoadPop(){
	var tpl = '<span>LOADING...</span>';
	dPop.create(tpl,{css:'loaderPop smCenteredPop',noMask:true,XButton:false});
	setTimeout(function(){dPop.hide(null,null,'loaderPop');},9000);
}

//SHORTCUT TO POPUP DESCRIBING THIS CODE EXERCISE
mustacheTpls.aboutExercise = $.ajax({url : '/views/microViews/welcome.tpl',async : false});//
function showAboutExcercise(){
	var tpl = mustacheTpls.aboutExercise.responseText;
	//console.log(tpl);
	tpl = Mustache.render(tpl, {'txtHeader':'Welcome to my Coding Exercise for Marvel'});//This line is unecessary considering the template is completely static. Proof of concept
	dPop.create(tpl,{css:'standardPopLook'});
}

//SHORTCUT TO POPUP DESCRIBING THIS CODE EXERCISE
mustacheTpls.fileStruc = $.ajax({url : '/views/microViews/fileStructurePop.tpl',async : false});//
function showFileStrucPop(){
	var tpl = mustacheTpls.fileStruc.responseText;
	//console.log(tpl);
	tpl = Mustache.render(tpl, {'txtHeader':'Welcome to my Coding Exercise for Marvel'});//This line is unecessary considering the template is completely static. Proof of concept
	dPop.create(tpl,{css:'standardPopLook'});
}


/* =============================================================================
   Ajax Main Controller
*The construction of this controller was originally created with the intention of allowing front end caching.  
*I have left the structure here however, though its overkill considering the sample has only one api call. 
   ========================================================================== */
var pageObj = {
	apiRoute : {
		customRoute : null,//Expect Router
		init : function(lnk,params){
			var returnable = {};
			
			/*Define Global Routes Here*/
			if(lnk === 'close')return false;
			if(lnk === 'showFileStrucPop'){showFileStrucPop();return false;}//This should not be here but provides an idea of how this router works. Im gonna use this to open a popup
			if(lnk === 'aboutExcercise'){showAboutExcercise();return false;}//This should not be here but provides an idea of how this router works. Im gonna use this to open a popup
			
			//Override page specific where needed
			if(typeof pageObj.apiRoute.customRoute === 'function')return pageObj.apiRoute.customRoute(lnk,params);
			if(lnk === 'index')return false;
		}
	},
	getPage   : function(pathObj){//Here well get the page contents, but first well analyze how to make the request
		var lnk = pathObj.val,
			params = pathObj.params;

		//Stop or get ROUTE DATA
		var routeInfo = this.apiRoute.init(lnk,params);
		if(routeInfo){
			if('forceParams' in routeInfo)params = jQuery.extend(params,routeInfo.forceParams);
			
			//APPEND EXTRA AJAX PROPERTIES
			var objForAjax = {
				url : routeInfo.url,
				data : params,
				dataType: routeInfo.requestType
			};
			if('jsonpCallBack' in routeInfo)objForAjax['jsonp'] = routeInfo.jsonpCallBack;
			
			//RETURN THE DATA
			function grabJson(){
				
				return $.ajax(objForAjax)
			}	
			return $.when(grabJson()).then(function(data){
				if(typeof data == "object")pageObj.updateDOM.success(data);
				else pageObj.updateDOM.error(data);
			});
		}else {
			dPop.hide(null,null,'loaderPop');
		}
	},
	updateDOM : {
		draw : function(smartTpl){
			customPop(smartTpl);
		},
		success : function(pgData){//THIS IS WHERE THE SUCCESS VIEW SCRIPTS CAN LIVE. JUST LIKE THE ROUTER PIECE IT CAN BE MADE DETACHABLE SO EACH PAGE COULD USE A DIFFERENT VIEW SCRIPT.  For this demo Im using mustache, and my popup script globally as it serves most purposes
			var mergedPgData = pgData;
			//console.log(pgData.data);
			
			smartTpl = Mustache.render(mustacheTpls.comicList.responseText, mergedPgData.data.results);
			
			//console.log(mustacheTpls);
			pageObj.updateDOM.draw(smartTpl);
		},
		error : function(pgErrData){
			if(typeof pgErrData === 'object' && 'status' in pgErrData && pgErrData.status == 200){//JSONP BEHAVES DIFFERENT SO THIS MAKES UP FOR SUCH
				pageObj.success(pgErrData);
			}else if(lnk in pageObj.tplsRendered){
				this.draw( pageObj.tplsRendered[lnk] );
				dPop.create('It appears there is a connection problem. This content could be outdated. On the meantime you can play some practice games to gain an edge.',{css:'warnPop smCenteredPop'});
			}else {
				dPop.create('OOOooops.. We can\' find the page you are looking for',{css:'warnPop smCenteredPop'});
			}
			setTimeout(function(){dPop.hide(null,null,'loaderPop');},600);
		},
		start : function(pathObj){
			if(typeof pathObj !== "object")pathObj = getHashVal();	
			
			showLoadPop();//Uses my popup script to let user know application is loading
			
			pageObj.getPage(pathObj);//Received 
		}	
	},
	tpls : {},//Store templates
	tplsRendered : {},
	init : function(customRoutes){
		//Assign override
		if(typeof customRoutes !== "undefined")pageObj.apiRoute.customRoute = customRoutes;
		
		var dHashVal = getHashVal();
		
		if(dHashVal.val !== "close")pageObj.updateDOM.start();
		$(window).on('hashchange', function(){
			
			if(dHashVal.val !== "close"){
				pageObj.updateDOM.start();
			}
		});
	}
}


