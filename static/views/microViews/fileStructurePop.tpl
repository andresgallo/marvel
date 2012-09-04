<div class="sectionPad">
<h1>File structure</h1>
<p>This popup is here to explain a bit about why, and how regarding the file structure</p>
<h3>Some of the things to note in the exercise are </h3>
<ol>
	<li>This done in code igniter, however I have moved the views outside of the application folder now that these are static files as far as the backend is concerned</li>
    <li>Another reason to separate the static files tpl,html,js,css is because this allows them to be usable by the front end without exposing any of the "application" code. Application code still remains inaccessible to the front end</li>
    <li>The sparks folder is a sparks tool that speeds up adding plugins to code igniter. Im using mustache and curl to standarize and expedite the process</li>
    <li>The "static" folder is where all static files are as previously mentioned. In here I havd the views as wells as assets</li>
    <li>In the javascript I have jquery and mustache, and two custom scripts. I always put core global variables likely to be reused in the headScripts, and anything that can lazy load on the footScripts. </li>
    <li>On the css folder I have a main.css, a screenLG.css, and screenSM.css to cover teh main overall styling, but also allow me to do any modifications I need for smartphone devices</li>
    <li>On the views folder I have core layout pieces header,footer,and main. The Subviews are my main content pieces. </li>
    <li>The microviews are popups, and anything small in terms of templating</li>
</ol>
</div>
