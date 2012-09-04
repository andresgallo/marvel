<div class="sectionPad">
<h1>{{txtHeader}}</h1>
<p>Im using this popup to give a consice and quick overview of this coding excercise.</p>
<h3>Some of the things to note in the exercise are </h3>
<ol><!--List counters are in css-->
	<li>I opened this popup on the second page because the first page requests that I show the characters list</li>
    <li>I have commented much of my code, therefore explaining through the code</li>
    <li>I am using mustache templating accross both backend and front end, I have usually used separate templating systems. Smarty on php, and doT.js on js. This is a first using an engine accross both back and front ends, and I like it.</li>
    <li>I wrote the script that makes these popups. It can take any css class allowing for infinite amounts of skins</li>
    <li>The assignable css for these popups can also control how the popup animates using css3 animations as it does with the skin I set as default</li>
    <li>Im using this popup as the main view along with mustache templates. This is also used for the "loading" popup, as well as for the error message in the front end controller router object pageObj</li>
    <li>As mentioned in the interview I had written a front end controller to fetch ajax data using hash links.  I have added a simplified/modified version here (pageObj) to accomodate for jsonp requests. </li>
    <li>The pageObj I setup to be globally available but has to be initialized on each page. It can take a router which gives each page extra versatility as to how to handle its hash links.  In static/views/subView this can be seen. My router makes sure that onload the letter A is triggered.</li>
    <li>The Mustache templates all live in the backend but become available in the front end. I like this as it allows me to keep getting new json data while allowing me to use template logic thats already available on the users memory.</li>
    <li>About the folder structure. <a href="#showFileStrucPop">click Here</a>(This link uses the router too, and has other reasons what I'm great to work with all of you  :) )</li>
</ol>
</div>
