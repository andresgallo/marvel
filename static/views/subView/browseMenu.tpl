<div id="containAlpha">
    <div class="sectionPad">
        {{#alphabet}}     <!--This navigation is dependent on javascript interacting with the api, with that said, I can use hash based links -->
        	<a class="singleCharItem" href="#browsecharacters/startsWith={{.}}/byType=digital-comics/limit=500">    
         		{{.}}
            </a>
        {{/alphabet}}
    </div>
</div>

<script>
$(document).ready(function(){
	
	/*** CUSTOM ROUTER TO HAVE BROWSERCHARACTER LINKS OR NO LINKS RUN THE CORRECT JAVASCRIPT FOR THIS PAGE***/
	pageObj.init(function(lnk,params){//Router Expects this on this page
		var returnable = {};
		if(lnk === 'browsecharacters' || lnk === 'index'){
			returnable = {
				url : 'http://api.marvel.com/browse/characters',
				requestType : 'jsonp',//SINCE ITS CROSS DOMAIN
				jsonpCallBack : 'jsoncallback'
			}
			if( !('startsWith' in params) || params.startsWith.length !== 1 || params.startsWith.search('^[a-zA-Z]') < 0){//Force params if needed
				returnable.forceParams = {startsWith : 'a',byType:'digital-comics',limit:500};
			}
		}
		return returnable;
	});
});
</script>