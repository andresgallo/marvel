<script>
var mustacheTpls = {//Fetch blank templates.  I can use these, merging them with the json data to make fast views
	comicList : $.ajax({
		url : '/views/microViews/comicList.tpl', 
	})
}
</script>

<script src="/assets/js/mustache.js"></script>
<!--[if lte IE 8]>
<script src="/assets/js/bensHashFixForIE.js"></script>
<![endif]-->
<script src="/assets/js/footScripts.js"></script>
