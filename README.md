<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="format-detection" content="telephone=no">
		<link rel="apple-touch-icon" href="images/favicon.png">
		<link rel="icon" type="image/png" href="images/favicon.png">
		<link rel="apple-touch-icon-precomposed" href="images/favicon.png">

		<meta name="description" content="">
		<meta name="author" content="">

		<title>Sumit Blogs</title>
		<!-- Bootstrap core CSS -->
		<link href="styles/bootstrap.min.css" rel="stylesheet">
		<!-- Custom styles for this template -->
		<link href="styles/starter-template.css" rel="stylesheet">
	</head>
	<body>
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="javascript:void(0);">Sumit's Blog</a>
				</div>
				<div id="navbar" class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a href="javascript:void(0);">Home</a></li>
						<li><a href="javascript:void(0);">About</a></li>
						<li><a href="javascript:void(0);">Contact</a></li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</nav>
		<div class="container">
			<div class="page-header">
				<h1>Angular JS, Require JS and Karma</h1>
				<p class="lead">Initial project setup and unit test cases using Mocha and Chai</p>
			</div>

			<h3>A TODO Application</h3>
			<p>We will be writing a sample TODO app which helps our users to remember important tasks. During the process of development we will go through various concepts of <a href="https://angularjs.org/" target="_blank">AngularJS</a> and how it can be used with <a href="http://requirejs.org/" target="_blank">RequireJS</a> for dependency management and lazy loading of javascript files. <br/><br/>To keep our code in best possible quality, we will be relying on unit cases (and plenty of it) using <a href="http://mochajs.org/" target="_blank">Mocha</a> and <a href="http://chaijs.com/" target="_blank">Chai</a> which will run on <a href="http://karma-runner.github.io/0.12/index.html" target="_blank">Karma</a></p>

			<h3>Iteration 1 - Setup:</h3>
			<p>
				<span>
					To start with any angular js application we need to create an HTML page with all the css and javascript depenendencies defined. We will include below dependencies on our HTML
				</span>
				<ul class="no-list-style">
					<li>1.&nbsp;&nbsp;<a href="http://getbootstrap.com/" target="_blank">Bootstap CSS</a></li>
					<li>2.&nbsp;&nbsp;Angular JS</li>
					<li>3.&nbsp;&nbsp;Require JS</li>
				</ul>
				<span>
					Our end result should look like below:
				</span>
			</p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">&lt;html&gt;</span></li>
						<li><span class="tag">&nbsp;&nbsp;&lt;head&gt;</span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta charset="utf-8"&gt;</span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;</span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta name="format-detection" content="telephone=no"&gt;</span></li>
						<li><span class="atv"></span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- bootstrap css for layout --&gt;</span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;link href="styles/bootstrap.min.css" rel="stylesheet"&gt;</span></li>
						<li><span class="tag">&nbsp;&nbsp;&lt;/head&gt;</span></li>
						<li><span class="tag">&nbsp;&nbsp;&lt;body&gt;</span></li>
						<li><span class="atv">&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="container" ui-view&gt;&lt;/div&gt;</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"&gt;&lt;/script&gt;</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&lt;script data-main="scripts/main" src="scripts/require.js"&gt;&lt;/script&gt;</span></li>
						<li><span class="tag">&nbsp;&nbsp;&lt;/body&gt;</span></li>
						<li><span class="tag">&lt;/html&gt;</span></li>
					</ol>
				</code>
			</div>
			<p>
				<span>You would have noticed that we have added <i>ui-view</i> attribute to our only <i>div</i> tag in HTML. This is done for angular JS to load TODO app inside this div. It will be achieved with help of <a href="https://github.com/angular-ui/ui-router" target="_blank">ui-router</a></span><br/><br/>
				<span>
					Also as part of require JS inclusion we have added an attribute <i>data-main</i> which refer to a script file <i>main.js</i> location under scripts folder. This file will help us initialize angular js application and load other dependencies. Let's have a look at this file
				</span>
			</p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">(function() {</span></li>
						<li><span>&nbsp;&nbsp;"use strict";</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;define(["todo/initialize"], function() {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;angular.bootstrap(document, ["todo"]);</span></li>
						<li><span>&nbsp;&nbsp;});</span></li>
						<li><span>}());</span></li>
					</ol>
				</code>
			</div>
			<p>
				<span>We have done two tasks in this file</span>
				<ul class="no-list-style">
					<li>1.&nbsp;&nbsp;Initialized angular JS application using <i>angular.bootstrap</i> method for whole document.</li>
					<li>2.&nbsp;&nbsp;Defined a new dependency for our application <i>initialize.js</i> which resides under todo folder</li>
				</ul>
				<span><i>define</i> comes from require js world. It is used to load javascript file asynchronously before any code can start execution. As you can notice, define accepts two argument where first is an array and second is a callback function. For more details refer to require js <a href="http://requirejs.org/docs/api.html" target="_blank">documentation</a></span><br/><br/>
				<span>Now lets have a look at <i>initialize.js</i> file</span>
			</p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">(function() {</span></li>
						<li><span>&nbsp;&nbsp;"use strict";</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;define([], function() {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;window.module = angular.module("todo", []);</span></li>
						<li><span>&nbsp;&nbsp;});</span></li>
						<li><span>}());</span></li>
					</ol>
				</code>
			</div>
			<p>
				<span>At this point our initial Angular JS setup is done and now we can run our application though there is nothing to see in UI. Go ahead and run the application. Make sure there are no errors in browser console.</span><br/><br/>
			</p>

			<h3>Iteration 2 - UI Router:</h3>
			<p>
				Now lets begin with interesting part where we will finally start to see something in UI. To begin we need to download angular-ui-router from <a href="https://raw.githubusercontent.com/angular-ui/ui-router/master/release/angular-ui-router.js" target="_blank">here</a>. Once downloaded save this file under scripts folder.
			</p>
			<p>
				<span>For starters we will add two routes</span>
				<ul class="no-list-style">
					<li>1.&nbsp;&nbsp;Todo List</li>
					<li>2.&nbsp;&nbsp;Add New Todo Item</li>
				</ul>
				<span>We need to do below tasks to ensure routing is properly configured for our application:</span>
				<ul class="no-list-style">
					<li>1.&nbsp;&nbsp;Add UI-Router as dependency for initialize.js</li>
					<li>2.&nbsp;&nbsp;Write a method to create JSON object as required by UI Router to define state</li>
					<li>3.&nbsp;&nbsp;Add one state each for every route using <i>$stateProvider</i></li>
				</ul>
				<span>After these changes <i>initialize.js</i> will look something like this</span>
			</p>

			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">(function() {</span></li>
						<li><span>&nbsp;&nbsp;"use strict";</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;define(["angular-ui-router"], function() {</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;var routes = {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/app/add": "parent",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/app/list": "parent"</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;var paths = {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/app/add": {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ctrlName: "addPageCtrl",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view: "scripts/todo/app/addPage.html",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ctrl: "scripts/todo/app/addPageCtrl.js"</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/app/list": {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ctrlName: "listPageCtrl",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view: "scripts/todo/app/listPage.html",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ctrl: "scripts/todo/app/listPageCtrl.js"</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;/**</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp; * function used to create a JSON object for route configuration</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp; * @param hash String</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp; * @return JSON</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp; */</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;var resolve = function (hash) {</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var routeDef = {};</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeDef.url = hash;</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeDef.controller = paths[hash].ctrlName;</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeDef.templateUrl = paths[hash].view;</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeDef.resolve = {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loadCtrl: ["$q", function($q) {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var defer = $q.defer();</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;require([paths[hash].ctrl], function() {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defer.resolve();</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return routeDef;</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;window.module = angular.module("todo", []);</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;module.config(["$provide", "$controllerProvider", "$stateProvider", "$urlRouterProvider",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;function($provide, $controllerProvider, $stateProvider, $urlRouterProvider) {</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;module.register = {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service: $provide.service,</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;controller: $controllerProvider.register</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (var route in routes) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (routes.hasOwnProperty(route)) {</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var routeObject = null;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (routes[route] === "parent") {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeObject = resolve(route);</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routeObject = routes[route];</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$stateProvider.state(route, routeObject);</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$urlRouterProvider.otherwise("/app/list");</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;]);</span></li>
						<li><span>&nbsp;&nbsp;});</span></li>
						<li><span>}());</span></li>
					</ol>
				</code>
			</div>
			<p>
				If you run application at its current state you will most probably get an error about missing file <a href="http://requirejs.org/docs/errors.html#scripterror" target="_blank">listPageCtrl.js</a>. To resolve this we will create two dummy files <i>"listPage.html"</i> and <i>listPageCtrl.js</i> under path <i>scripts/todo/app</i>. It doesn't need to contain anything. For now we will create just an empty html file with <i>Hello</i> text. Also we need to create a <i>listPageCtrl</i> which will be empty too. Refer to below code
			</p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">(function() {</span></li>
						<li><span>&nbsp;&nbsp;"use strict";</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;define([], function() {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;var listPageCtrl = function($scope) {</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;if (typeof module !== "undefined" && module.register != null  && typeof module.register.controller === "function") {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;module.register.controller("listPageCtrl", ["$scope", listPageCtrl]);</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;// for sake of <a href="http://requirejs.org/docs/whyamd.html" target="_blank">AMD</a></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;return listPageCtrl;</span></li>
						<li><span>&nbsp;&nbsp;});</span></li>
						<li><span>}());</span></li>
					</ol>
				</code>
			</div>
			<p>If we run the application now, we will see a blank page with Hello message on top of screen. Go ahead and give it a try.</p>

			<h3>Iteration 3 - Karma:</h3>
			<p>Now comes the most important part. Unit test cases are becoming a very important part of application development and writing good test cases during development phase helps in improving design and quality of application. There are many frameworks available to write unit test cases for Javascript code (Jasmine being one of the well known for Angular). For our TODO app we will be using Mocha along Chai.</p>
			<p>For karma setup we need to follow below tasks: </p>
			<ul class="no-list-style">
				<li>1.&nbsp;&nbsp;Open a command prompt at root folder</li>
				<li>2.&nbsp;&nbsp;Run command <i>npm install karma</i></li>
				<li>3.&nbsp;&nbsp;Run command <i>karma init my.conf.js</i></li>
				<li>4.&nbsp;&nbsp;It will ask for testing framework to use. Select Mocha there</li>
				<li>5.&nbsp;&nbsp;Next question will be about use of Require JS. Select Yes</li>
				<li>6.&nbsp;&nbsp;It will ask for browsers. We can choose multiple browsers but Chrome will work for now</li>
				<li>7.&nbsp;&nbsp;For next question specify scripts/*.js and then press enter. Add one more entry scripts/**/*.js and press enter to move to next question</li>
				<li>8.&nbsp;&nbsp;Select enter to skip the next question</li>
				<li>9.&nbsp;&nbsp;For question asking for generation of test-main.js. Select Yes</li>
				<li>10.&nbsp;&nbsp;Select Yes for question asking to watch all the files. This will help us get continous feedback on change of code in any file.</li>
			</ul>
			<p>At end of above steps, we will have two files created at root folder namely my.conf.js and test-main.js For more info related to configuration refer to this <a href="http://karma-runner.github.io/0.8/intro/configuration.html" target="_blank">link</a>. Now you might have noticed that there is one more folder that is created with name <i>node_modules</i>. This folder basically holds all the node dependencies required to run Karma but what if we delete this folder? From where we will get back these dependencies? Don't worrry we have a solution for that :)</p>
			<p>Create a file name <i>package.json</i> in same folder where node_modules exist. For now we will create a empty file as below</p>

			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">{</span></li>
						<li><span>&nbsp;&nbsp;"name": "todo",</span></li>
						<li><span>&nbsp;&nbsp;"description": "this is package json file to define node dependencies",</span></li>
						<li><span>&nbsp;&nbsp;"license": "MIT"</span></li>
						<li><span class="tag">}</span></li>
					</ol>
				</code>
			</div>

			<p>Now in the same command prompt we need to run below commands one by one</p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">npm install karma --save-dev</span></li>
						<li><span class="tag">npm install requirejs --save-dev</span></li>
						<li><span class="tag">npm install karma-mocha --save-dev</span></li>
						<li><span class="tag">npm install karma-chrome-launcher --save-dev</span></li>
						<li><span class="tag">npm install karma-requirejs --save-dev</span></li>
						<li><span class="tag">npm install angular --save-dev</span></li>
						<li><span class="tag">npm install angular-mocks --save-dev</span></li>
						<li><span class="tag">npm install karma-chai --save-dev</span></li>
					</ol>
				</code>
			</div>

			<p>At end of these commands our package.json file will be updated to look like below. For more info on package.json file refer <a href="https://docs.npmjs.com/files/package.json" target="_blank">here</a></p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">{</span></li>
						<li><span>&nbsp;&nbsp;"name": "todo",</span></li>
						<li><span>&nbsp;&nbsp;"description": "this is package json file to define node dependencies",</span></li>
						<li><span>&nbsp;&nbsp;"license": "MIT"</span></li>
						<li><span>&nbsp;&nbsp;"devDependencies": {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"karma": "^0.13.2",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"requirejs": "^2.1.19",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"mocha": "^2.2.5",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"karma-mocha": "^0.2.0",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"karma-chrome-launcher": "^0.2.0",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"karma-requirejs": "^0.2.2",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"angular-mocks": "^1.4.3",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"angular": "^1.4.3",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"chai": "^3.2.0",</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;"karma-chai": "^0.1.0"</span></li>
						<li><span>&nbsp;&nbsp;}</span></li>
						<li><span class="tag">}</span></li>
					</ol>
				</code>
			</div>

			<p>Now its time to test setup. Run <i>karma start my.conf.js</i> in command prompt. This should open a chrome browser instance with URL <a href="http://localhost:9876/" target="_blank">http://localhost:9876/</a>. Also in our command prompt we can see message <i>"Executed 0 of 0"</i> which is fine since we haven't written a single test case till now.</p>

			<p>Before we start writing any test case we need to do one final configuration in <i>my.conf.js</i> and <i>test-main.js</i> which will ensure our test files are loaded and executed. Open my.conf.js and under framework array add <i>chai</i> as an additional framework as shown below</p>

			<div>
				<code>
					<ol class="linenums"><li>frameworks: ['mocha', 'requirejs', 'chai']</li></ol>
				</code>
			</div>

			<p>Also under files array add two more entries to load all files for angular and angular-mocks. These files are downloaded using npm command and will be present under node_modules folder. End result will look as below:</p>
			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">files: [</span></li>
						<li><span>&nbsp;&nbsp;'test-main.js',</span></li>
						<li><span>&nbsp;&nbsp;{pattern: 'scripts/*.js', included: false},</span></li>
						<li><span>&nbsp;&nbsp;{pattern: 'scripts/**/*.js', included: false},</span></li>
						<li><span>&nbsp;&nbsp;{pattern: 'node_modules/angular/*.js', included: false},</span></li>
						<li><span>&nbsp;&nbsp;{pattern: 'node_modules/angular-mocks/*.js', included: false}</span></li>
						<li><span class="tag">]</span></li>
					</ol>
				</code>
			</div>

			<p>Since we are using RequireJs to all the dependencies we need to modify test-main.js which was generated for us earlier. We are doing two tasks in this file</p>
			<ul class="no-list-style">
				<li>1.&nbsp;&nbsp;Iterating over all the files and finding which are ending with either "test" or "spec"</li>
				<li>2.&nbsp;&nbsp;Declaring default requireJs configuration</i></li>
			</ul>
			<p>In require js configuration we setting <i>baseUrl</i> as <i>/base</i> which is a virtual folder created by Karma to host all the files under test. We need to change this to <i>/base/scripts</i> since all our source code is inside scripts folder.</p>

			<div>
				<code>
					<ol class="linenums"><li>baseUrl: '/base/scripts'</li></ol>
				</code>
			</div>

			<p>Also if we notice then we will find that in the loop above we are replace <i>/base</i> from string before adding to allTestFiles array. This code also need to be modified and should be as below</p>

			<div>
				<code>
					<ol class="linenums">
						<li>var normalizedTestModule = file.replace(/^\/base\/scripts\/|\.js$/g, '');</li>
						<li>allTestFiles.push(normalizedTestModule);</li>
					</ol>
				</code>
			</div>

			<p>All test cases that we will write from now on will need angular-mocks as dependency (to know why click <a href="https://docs.angularjs.org/api/ngMock" target="_blank">here</a>). Angular Mocks internally needs angularjs to be loaded as dependency. Also we will need to load main.js so that our angular application is bootstraped and todo module is created.</p>
			<p>Let's change the require js configuartion to achieve this. We need to add <i>paths</i> and <i>shim</i> json object to configure this. Final result will look as below: </p>

			<div>
				<code>
					<ol class="linenums">
						<li>require.config({</li>
						<li>&nbsp;&nbsp;baseUrl: '/base/scripts',</li>
						<li>&nbsp;&nbsp;deps: allTestFiles,</li>
						<li>&nbsp;&nbsp;paths: {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;"main": "main",</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;"angular": "../node_modules/angular/angular.min",</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;"angular-mocks": "../node_modules/angular-mocks/angular-mocks"</li>
						<li>&nbsp;&nbsp;},</li>
						<li>&nbsp;&nbsp;shim: {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;"main": {exports: "main", deps: ["angular"]},</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;"angular-mocks": {exports: "angular-mocks", deps: ["main"]}</li>
						<li>&nbsp;&nbsp;},</li>
						<li>&nbsp;&nbsp;callback: window.__karma__.start</li>
						<li>});</li>
					</ol>
				</code>
			</div>

			<h3>Iteration 4 - TDD:</h3>
			<p>To begin we will create a folder named <i>test</i> under <i>scripts</i>. This folder will hold all our unit test cases.</p>
			<p>We will create a new file name <i>listPageCtrlSpec.js</i> at this location. We need to include <i>todo/app/listPageCtrl</i> as dependency since we want to test that controller and also we will include <i>angular-mocks</i>. It will look as below: </p>

			<div>
				<code>
					<ol class="linenums">
						<li>(function() {</li>
						<li>&nbsp;&nbsp;"use strict";</li>
						<li></li>
						<li>&nbsp;&nbsp;define(["todo/app/listPageCtrl", "angular-mocks"], function(listPageCtrl) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;describe("test suite for list page controller", function() {</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var scope = null;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var controller = null;</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beforeEach(module("todo"));</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beforeEach(inject(function($rootScope, $controller) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope = $rootScope.$new();</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;controller = $controller;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}));</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;});</li>
						<li>&nbsp;&nbsp;});</li>
						<li>}());</li>
					</ol>
				</code>
			</div>

			<p>We have used beforeEach statement in the above code to perform two tasks</p>
			<ul class="no-list-style">
				<li>1.&nbsp;&nbsp;Mock our "todo" module</li>
				<li>2.&nbsp;&nbsp;Inject $rootScope and $controller method to initialize controller</i></li>
			</ul>

			<p>Now let's write our first test case. For our list page we need to fetch items from local storage and display it in UI as list view. Let's write a unit test case to read items from local storage. Test case will look like below: </p>

			<div>
				<code>
					<ol class="linenums">
						<li>it ("should read items from local storage", function() {</li>
						<li></li>
						<li>&nbsp;&nbsp;// set dummy data</li>
						<li>&nbsp;&nbsp;localStorage.setItem("todos", JSON.stringify([{task: "clean room", time: "19:00"}, {task: "sleep", time: "22:00"}]));</li>
						<li>&nbsp;&nbsp;controller(listPageCtrl, {$scope: scope });</li>
						<li>&nbsp;&nbsp;expect(scope.todos.length).to.equal(2);</li>
						<li>&nbsp;&nbsp;expect(scope.todos[1].task).to.equal("sleep");</li>
						<li></li>
						<li>&nbsp;&nbsp;// clear data</li>
						<li>&nbsp;&nbsp;localStorage.removeItem("todos");</li>
						<li></li>
						<li>});</li>
					</ol>
				</code>
			</div>
			<p>If we run test case now, it will give error "TypeError: Cannot read property 'length' of undefined" which is fine since we haven't implemented anything in our controller. Now lets go and implement a method in our controller to create this list.</p>

			<p>In our previously created empty controller we will now create a method <i>init</i> and will write code to read the JSON array from local storage. Final result will look like below: </p>

			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">(function() {</span></li>
						<li><span>&nbsp;&nbsp;"use strict";</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;define([], function() {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;var listPageCtrl = function($scope) {</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var init = function() {</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var items = localStorage.getItem("todos");</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (items != null) {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope.todos = JSON.parse(items);</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} catch (e) {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$scope.todos = [];</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;init();</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;if (typeof module !== "undefined" && module.register != null  && typeof module.register.controller === "function") {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;module.register.controller("listPageCtrl", ["$scope", listPageCtrl]);</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;// for sake of <a href="http://requirejs.org/docs/whyamd.html" target="_blank">AMD</a></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;return listPageCtrl;</span></li>
						<li><span>&nbsp;&nbsp;});</span></li>
						<li><span>}());</span></li>
					</ol>
				</code>
			</div>

			<p>Now if we run the test case then we will see "Executed 1 of 1 SUCCESS". Congratulations we have successfully executed our first test case and implemented a method to read list of todo items</p>
			<p>We should also write some HTML code in our listPage.html to print todo items in UI. It should look as below: </p>
			<div>
				<code>
					<ol class="linenums">
						<li>&lt;nav class="navbar navbar-inverse navbar-fixed-top"&gt;</li>
						<li>&nbsp;&nbsp;&lt;div class="container"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="navbar-header"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;a class="navbar-brand" href="javascript:void(0);"&gt;To Do&lt;/a&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="collapse navbar-collapse"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul class="nav navbar-nav"&gt;&lt;/ul&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&lt;/nav&gt;</li>
						<li>&lt;div style="margin-top: 70px"&gt;</li>
						<li>&nbsp;&nbsp;&lt;ul class="list-group" ng-if="todos != null && todos.length > 0"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;li class="list-group-item" ng-repeat="todo in todos"&gt;{{ todo.task }}&lt;/li&gt;</li>
						<li>&nbsp;&nbsp;&lt;/ul&gt;</li>
						<li>&nbsp;&nbsp;&lt;div class="alert alert-info" role="alert" ng-if="todos == null || todos.length === 0"&gt;Hurray!!! There are no pending items in To Do list&lt;/div&gt;</li>
						<li>&nbsp;&nbsp;&lt;a type="button" class="btn btn-default" style="color:white;width:100%;background-color: #000000;border-color: #000000;" href="#/app/add"&gt;Add New&lt;/a&gt;</li>
						<li>&lt;/div&gt;</li>
					</ol>
				</code>
			</div>

			<p>In this HTML we are iterating over our list to print each todo task. If list is not available or there are no items in it then we are printing a message with some help from <i>ng-if</i>. Also there is a button in bottom of the page which will allow us to add new todo item.</p>

			<p><span>Go ahead and run the application at its current state. We will notice a nice UI with a header on top and a message along with button.</span><br/><span>When we click on the button, currently nothing will happen though we can notice that the hash tag appended to URL changes to <i>#/app/add</i></span></p>

			<p>Its time for us to create a new controller (addPageCtrl.js) and html (addPage.html). We will create these files at path <i>scripts/todo/app</i>. For now we will keep our controller as empty file with code as below: </p>

			<div>
				<code>
					<ol class="linenums">
						<li><span class="tag">(function() {</span></li>
						<li><span>&nbsp;&nbsp;"use strict";</span></li>
						<li><span></span></li>
						<li><span>&nbsp;&nbsp;define([], function() {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;var addPageCtrl = function($scope) {</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;};</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;if (typeof module !== "undefined" && module.register != null  && typeof module.register.controller === "function") {</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;module.register.controller("addPageCtrl", ["$scope", addPageCtrl]);</span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;}</span></li>
						<li></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;// for sake of <a href="http://requirejs.org/docs/whyamd.html" target="_blank">AMD</a></span></li>
						<li><span>&nbsp;&nbsp;&nbsp;&nbsp;return addPageCtrl;</span></li>
						<li><span>&nbsp;&nbsp;});</span></li>
						<li><span>}());</span></li>
					</ol>
				</code>
			</div>

			<p>As per requirement we need to ensure that when used click on a button "Add To Do" in UI then we should add a new To Do Item. Let's first write a test case for that in our new file <i>addPageCtrlSpec.js</i>. Final result will be as below: </p>

			<div>
				<code>
					<ol class="linenums">
						<li>(function() {</li>
						<li>&nbsp;&nbsp;"use strict";</li>
						<li></li>
						<li>&nbsp;&nbsp;define(["todo/app/addPageCtrl", "angular-mocks"], function(addPageCtrl) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;describe("test suite for add page controller", function() {</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var scope = null;</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beforeEach(module("todo"));</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beforeEach(inject(function($rootScope, $controller) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope = $rootScope.$new();</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$controller(addPageCtrl, {$scope: scope});</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}));</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;it ("should add an item to todos list", function() {</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope.task = "sleep";</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope.time = "21:00";</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;localStorage.removeItem("todos");</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope.onAddClick({});</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var todos = [];</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var items = localStorage.getItem("todos");</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (items != null) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;todos = JSON.parse(items);</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} catch (e) {}</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expect(todos.length).to.equal(1);</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expect(todos[0].task).to.equal("sleep");</li>
						
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;});</li>
						<li>&nbsp;&nbsp;});</li>
						<li>}());</li>
					</ol>
				</code>
			</div>

			<p>At this point we will have a failing test case. To fix it we need to implement <i>onAddClick</i> method in addPageCtrl.js Lets write the code for that. End result will be like below</p>

			<div>
				<code>
					<ol class="linenums">
						<li><span>var addPageCtrl = function($scope) {</span></li>
						<li>&nbsp;&nbsp;$scope.onAddClick = function($event) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;var todos = [];</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;var items = localStorage.getItem("todos");</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;if (items != null) {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try {</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;todos = JSON.parse(items);</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} catch (e) {}</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;}</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;todos.push({</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;task: $scope.task,</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time: $scope.time</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;});</li>
						<li></li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;localStorage.setItem("todos", JSON.stringify(todos));</li>
						<li>&nbsp;&nbsp;}</li>
						<li><span>};</span></li>
					</ol>
				</code>
			</div>

			<p>With this all our test case should pass. We now need to write HTML for addPage.html to render UI. Final output will look like below. In this HTML we are <i>ng-model</i> directive to bind the value of HTML element with request scope variable. For e.g. ng-model="time" will bind the value of text box with $scope.time variable. We are also using ng-click directive which is used to bind the click event on any DOM element. In the below case when user clicks on "Add To Do" button, onAddClick method as defined in $scope will be triggered.</p>
			<div>
				<code>
					<ol class="linenums">
						<li>&lt;nav class="navbar navbar-inverse navbar-fixed-top"&gt;</li>
						<li>&nbsp;&nbsp;&lt;div class="container"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="navbar-header"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;a class="navbar-brand" href="javascript:void(0);"&gt;To Do&lt;/a&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="collapse navbar-collapse"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul class="nav navbar-nav"&gt;&lt;/ul&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&lt;/nav&gt;</li>
						<li>&lt;div style="margin-top: 70px"&gt;</li>
						<li>&nbsp;&nbsp;&lt;div class="input-group" style="margin-bottom: 10px"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class="input-group-addon" id="basic-addon1"&gt;Task&lt;/span&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="text" class="form-control" placeholder="Task" ng-model="task"&gt;</li>
						<li>&nbsp;&nbsp;&lt;/divl&gt;</li>
						<li>&nbsp;&nbsp;&lt;div class="input-group"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class="input-group-addon" id="basic-addon1"&gt;Time&lt;/span&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type="text" class="form-control" placeholder="Time" ng-model="time"&gt;</li>
						<li>&nbsp;&nbsp;&lt;/divl&gt;</li>
						<li>&nbsp;&nbsp;&lt;div style="margin-top: 10px"&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;a type="button" class="btn btn-default" style="color:white;width:48%;background-color: #000000;border-color: #000000;margin-right:2%;" href="#/app/list"&gt;Show List&lt;/a&gt;</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;&lt;a type="button" class="btn btn-default" style="color:white;width:48%;background-color: #000000;border-color: #000000;" href="javascript:void(0);" ng-click="onAddClick($event);"&gt;Add To Do&lt;/a&gt;</li>
						<li>&nbsp;&nbsp;&lt;/div&gt;</li>
						<li>&lt;/divl&gt;</li>
					</ol>
				</code>
			</div>
			<p>With this our application is finished. In the course of this development we learned how to create an application using angular js and manage page routing using ui-router. We also learned to manage dependencies using RequireJS and most importantly we learned to write test cases (for stability of application) which runs on Karma. Go ahead and run the application and enjoy benefits of home made To Do app. For complete source code click <a href="" target="_blank">here</a></p>
		</div>

		<script src="scripts/jquery.min.js"></script>
		<script src="scripts/bootstrap.min.js"></script>
	</body>
</html>