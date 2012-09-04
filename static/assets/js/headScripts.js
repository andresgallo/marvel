/*****I ADDED EXTRA COMMENTS FOR THIS TEST.  I ALWAYS LIKE TO HAVE A js at the head with a few global items that the document can use as its being parsed.  
 I try to put as much as I can on the footer
 ******************************/

/**************************************
CREATE SPECIAL EVENT VARS
*I use these to make sure I make the most out of different platforms. My onreadytype variable does the same as DOMContentLoaded, but in the scenario cordova/phonegap is available it will automatically use the better event.
*The next three touch events are used where I want to take advantage of the improved response touch events have in touch devices. With that said, in some ocations using a touchstart event is not a good idea. Judging how the user uses the application I decide whether to use the variable or just a click event
*********************************************/
var onreadytype;
'cordova' in window ? onreadytype = 'deviceReady' : onreadytype = 'DOMContentLoaded';
var clkType;
"ontouchstart" in document.documentElement ? clkType = "touchstart" : clkType = "click";
var clkDownType;
"ontouchstart" in document.documentElement ? clkDownType = "touchstart" : clkDownType = "mousedown";
var clkUpType;
"ontouchend" in document.documentElement ? clkUpType = "touchend" : clkUpType = "mouseup";

/**************************************
//DeviceType
* I use front end device detection where I need information that is very front end/behavior specific.  For Example old androids may not support 3d transformations, and this allows my javascript to adapt if necessary. I avoid using device specific stuff, but it always comes in handy
**************************************/
var deviceType = {
	isMobile       : false,
	isTablet       : false,
	isDesktop      : false,
	isTouch        : false,
	isIos          : false,
	isAndroid      : false,
	is3dSupporting : false,
	isOldAndroid   : false,
	isModernAndroid: false,
	isHTC          : false,
	isSamsung      : false,
	isHomeScreen   : false,
	set            : function(){
		var uagnt = navigator.userAgent;
		if( (uagnt.match(/android/i)) && !(uagnt.match(/Mobile/i)) ||
			(uagnt.match(/iPad/i))
		){
			this.isTablet = true;
		}
		else if( (uagnt.match(/iPhone/i)) ||
			(uagnt.match(/iPod/i)) ||
			(uagnt.match(/Android/i)) ||
			(uagnt.match(/android/i)) ||
			(uagnt.match(/webOS/i)) ||
			(uagnt.match(/BlackBerry/i)) ||
			(uagnt.match(/Opera Mobi/i)) ||
			(uagnt.match(/MOT/i)) ||
			screen.height < 600
		){
			this.isMobile = true;
		}
		else {
			this.isDesktop = true;
		}
		
		if(uagnt.search('Android') != -1){
			this.isAndroid = true;
			var androidVer = parseFloat(uagnt.slice(uagnt.indexOf("Android")+8)); 

			if (androidVer >= 3.2)this.isModernAndroid = true;			
			if (androidVer >= 2.1)this.is3dSupporting = true;
			else this.isOldAndroid = true; 
		}else if( (uagnt.match(/iPhone/i)) ||
			(uagnt.match(/iPod/i)) ||
			(uagnt.match(/iPad/i))
		){
			this.isIos = true;
			this.is3dSupporting = true;
			if( ("standalone" in window.navigator ) && navigator.standalone)this.isHomeScreen = true;
		}
		
		if( (uagnt.match(/HTC/i)) )this.isHTC = true;
		if( (uagnt.match(/SG/i)) )this.isSamsung = true;
		
		if("ontouchstart" in document.documentElement)this.isTouch = true;
	}
}
deviceType.set();

function scrollTop(){//Because android does not follow the rules for scrolling up
	if(!deviceType.isAndroid)scrollTo(0,1);
	else scrollTo(0,0);	
}

function imgPreloader(imgs){//Simple image preloader that works in new devices
	var imgsLn = imgs.length;
	for(var i=0;i<imgsLn;i++){
		var imgElem = document.createElement('img');
		imgElem.src = src = imgs[i];
		imgElem.setAttribute('style','position:absolute;left:-100px;bottom:-100px;');
		document.documentElement.appendChild(imgElem);
		document.documentElement.removeChild(imgElem);
	}
}


/* =============================================================================
   hash link handling
   I wrote this to be able to pass parameters through ajax links.  This makes these ajax links shareable
   I wrote about it at http://andresgallo.com/2012/06/08/ajaxifying-the-web-the-easy-way/
   ========================================================================== */
function getHashVal(hashString){
	if(typeof hashString === "undefined")hashString = window.location.hash;
	hashString = hashString.substr(1);

	hashStringArr = hashString.split('/');
	lnk = hashStringArr.shift();
	params = hashStringArr.splice(0,hashStringArr.length);

	var pair = {};
	var paramsLn = params.length;
	if(paramsLn > 0){
		for(var i = 0;i<paramsLn;i++){
			var keyVal = params[i].split('=');
			pair[keyVal[0]] = keyVal[1];
		}
	}else pair = {};

	if(lnk === '' || lnk === 'home')lnk = 'index';
	return {val : lnk,params : pair};
}



/* =============================================================================
	History back cross platform
	Phonegap requires a special back event. Overriding the original history.back() function could have worked too.
	===========================================================================*/
function historyBack(){
	if('cordova' in window && typeof navigator.app !== "undefined")navigator.app.backHistory();
	else history.back();	
}




/*****RESIZE MIN HEIGHT ON MOBILE******/
var dHeight = {
	doc  : '',
	view : '',
	osDifferential : '',
	getTallerH : function(){
		if(this.doc > this.view)return this.doc;
		else return this.view;	
	},
	get  : function(){
		if(deviceType.isHomeScreen || typeof window.cordova == 'object')this.osDifferential = 0;
		else {
			if(deviceType.isIos || deviceType.isSamsung)this.osDifferential = 60;
			else this.osDifferential = 50;
		}
		var wh = window.innerHeight,
		dh = document.height,
		vh = wh+this.osDifferential;
	
		this.doc = dh;
		this.view = vh;
		return {doc  : dh,view : vh};
	}
}

function updateViewPortH(){	
	document.body.setAttribute('style','min-height:'+dHeight.view+'px !important;');	
	setTimeout(scrollTop,50);
}
function initialGetViewportH(){
	setTimeout(function(){//This timeout is necessary for ios4/5 to get accurate measurement
		dHeight.get(); //Update view
		updateViewPortH();
	},700);
}
