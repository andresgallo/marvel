<div class="sectionPad bgLight">
	<h2>Find comics for your favorite characters</h2>
    <ol class="selectCharacter" id="updatableList">
        {{#APIDataForCharP.data.results}}
            <li><span class="putMeAtRight listDataRgt"><em>Issue #: {{issue_number}}</em> Released on {{release_date}}</span>{{id}} - <h4>{{title}}</h4></li>
        {{/APIDataForCharP.data.results}}
    </ol>
</div>


<script>
	var APIDataForChar = {{{APIDataForChar}}},
		charId = {{{charId}}};
	console.log(APIDataForChar.data.results);
	
	
	function scrollisAt() { //Cross browser support for detecting scroll offset
		var w = window,
			d = w.document;
		if (w.pageYOffset != null) return w.pageYOffset;
		if (document.compatMode == "CSS1Compat")return d.documentElement.scrollTop;
		return d.body.scrollTop; 
	}
	
	
	getHeroes = {
		limit : 20,
		offset : 0,//updated on use
		get : function(data){
			var data = {
				limit : this.limit,
				offset:this.offset,
				byId:charId,
				byType:'character',
			}
			return $.ajax({
				data : data,
				url : 'http://api.marvel.com/browse/digitalcomics/print',
				dataType : 'jsonp',
				jsonp : 'jsoncallback'
			});
		},
		start : function(offset,limit){
			this.offset = offset;
			this.limit = limit;
			
			$.when(this.get()).then(this.append);
		},
		append : function(data){
			if(data.data.results instanceof Array){
				var results = data.data.results,
					resultsLn = results.length,
					tpl = '';
				for(var i = 0;i<resultsLn;i++){
					tpl += '<li><span class="putMeAtRight listDataRgt"><em>Issue #: '+results[i]['issue_number']+'</em> Released on '+results[i]['release_date']+'</span>'+results[i]['id']+' - <h4>'+results[i]['title']+'}</h4></li>';
				}
				//console.log(tpl);
				$('#updatableList').append(tpl);
			}
		}
	}
	
	//Scrolling is a heavy operation so I want to pass the data to the handler to avoid extra lookup
	scrollData = {
		yPos : scrollisAt,
		doxH : window.innerHeight || screen.availHeight || screen.height,//Get appropriate for browser
		wholeDox : document.documentElement,
		extra : 100, //Im already executing function early by the amount of screenheight. This is for extra earliness
		more : function(){
			var increaseOffset = getHeroes.offset + getHeroes.limit;//Could have counted the li elements but thats not versatile in a layout where the user can remove list items
			
			getHeroes.start(increaseOffset,20);
		}
	}
	
	$(document).on('scroll',scrollData,function(e){
		var msg = e.data,//localize lookup further
			y = msg.yPos(),
			howEarly = msg.extra+msg.doxH;
			
		if(y >= (msg.wholeDox.scrollHeight - howEarly)){
			msg.more();	
		}
	});
</script>

<script>
$(document).ready(function(){
	pageObj.init();
});
</script>