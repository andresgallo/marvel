<!DOCTYPE html>
    <!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->   
    <!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->   
    <!--[if IE 7]>    <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->   
    <!--[if IE 8]>    <html class="lt-ie9" lang="en"> <![endif]-->   
    <!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->   
    <!--[if gt IE 8]><!--> <html lang="en" class="modernBrowser"> <!--<![endif]-->
<head>    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />   
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />  
    <title>{{title}}-{{siteName}}</title>

 	<!-- Mobile viewport optimization http://goo.gl/b9SaQ -->

   	<meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="480"/>
    <meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;' name='viewport' />
    <meta name="apple-mobile-web-app-capable" content="yes">
    
    
    <link rel="shortcut icon" href="/assets/img/favicon.ico" /> 
   
   	<link rel="stylesheet" href="/assets/css/main.css">
	<link rel="stylesheet" media="only screen and (max-device-width: 540px)" href="/assets/css/screenSm.css" />
	<link rel="stylesheet" media="only screen and (min-device-width: 541px)" href="/assets/css/screenLg.css" />
    
    <script src="/assets/js/headScripts.js"></script>
 
</head>

<body>
	{{>header}}
    
    <!--Loaded from GOOGLES CDN This is most likely cached on the machine, I place most scrips after the content, but having this one early can come in handy-->
    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/assets/js/jq1.7Min.js"><\/script>')</script>
    
    {{>content}}

    {{>footer}}
</body>
</html>
