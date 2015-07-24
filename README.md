Angular JS, Require JS and Karma
Initial project setup and unit test cases using Mocha and Chai

A TODO Application
We will be writing a sample TODO app which helps our users to remember important tasks. During the process of development we will go through various concepts of AngularJS and how it can be used with RequireJS for dependency management and lazy loading of javascript files. 

To keep our code in best possible quality, we will be relying on unit cases (and plenty of it) using Mocha and Chai which will run on Karma

Iteration 1 - Setup:
To start with any angular js application we need to create an HTML page with all the css and javascript depenendencies defined. We will include below dependencies on our HTML

1.  Bootstap CSS
2.  Angular JS
3.  Require JS
Our end result should look like below:
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <!-- bootstrap css for layout -->
    <link href="styles/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="container" ui-view></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.2/angular.min.js"></script>
    <script data-main="scripts/main" src="scripts/require.js"></script>
  </body>
</html>
You would have noticed that we have added ui-view attribute to our only div tag in HTML. This is done for angular JS to load TODO app inside this div. It will be achieved with help of ui-router

Also as part of require JS inclusion we have added an attribute data-main which refer to a script file main.js location under scripts folder. This file will help us initialize angular js application and load other dependencies. Let's have a look at this file

(function() {
  "use strict";
  define(["todo/initialize"], function() {
    angular.bootstrap(document, ["todo"]);
  });
}());
We have done two tasks in this file

1.  Initialized angular JS application using angular.bootstrap method for whole document.
2.  Defined a new dependency for our application initialize.js which resides under todo folder
define comes from require js world. It is used to load javascript file asynchronously before any code can start execution. As you can notice, define accepts two argument where first is an array and second is a callback function. For more details refer to require js documentation

Now lets have a look at initialize.js file
(function() {
  "use strict";
  define([], function() {
    window.module = angular.module("todo", []);
  });
}());
At this point our initial Angular JS setup is done and now we can run our application though there is nothing to see in UI. Go ahead and run the application. Make sure there are no errors in browser console.

Iteration 2 - UI Router:
Now lets begin with interesting part where we will finally start to see something in UI. To begin we need to download angular-ui-router from here. Once downloaded save this file under scripts folder.

For starters we will add two routes

1.  Todo List
2.  Add New Todo Item
We need to do below tasks to ensure routing is properly configured for our application:
1.  Add UI-Router as dependency for initialize.js
2.  Write a method to create JSON object as required by UI Router to define state
3.  Add one state each for every route using $stateProvider
After these changes initialize.js will look something like this
(function() {
  "use strict";
  define(["angular-ui-router"], function() {
    var routes = {
      "/app/add": "parent",
      "/app/list": "parent"
    };
    var paths = {
      "/app/add": {
        ctrlName: "addPageCtrl",
        view: "scripts/todo/app/addPage.html",
        ctrl: "scripts/todo/app/addPageCtrl.js"
      },
      "/app/list": {
        ctrlName: "listPageCtrl",
        view: "scripts/todo/app/listPage.html",
        ctrl: "scripts/todo/app/listPageCtrl.js"
      }
    };
    /**
     * function used to create a JSON object for route configuration
     * @param hash String
     * @return JSON
     */
    var resolve = function (hash) {
      var routeDef = {};
      routeDef.url = hash;
      routeDef.controller = paths[hash].ctrlName;
      routeDef.templateUrl = paths[hash].view;
      routeDef.resolve = {
        loadCtrl: ["$q", function($q) {
          var defer = $q.defer();
          require([paths[hash].ctrl], function() {
            defer.resolve();
          });
        }
      };
      return routeDef;
    };
    window.module = angular.module("todo", []);
    module.config(["$provide", "$controllerProvider", "$stateProvider", "$urlRouterProvider",
      function($provide, $controllerProvider, $stateProvider, $urlRouterProvider) {
        module.register = {
          service: $provide.service,
          controller: $controllerProvider.register
        };
        for (var route in routes) {
          if (routes.hasOwnProperty(route)) {
            var routeObject = null;
            if (routes[route] === "parent") {
              routeObject = resolve(route);
            } else {
              routeObject = routes[route];
            }
            $stateProvider.state(route, routeObject);
          }
        }
        $urlRouterProvider.otherwise("/app/list");
      }
    ]);
  });
}());
If you run application at its current state you will most probably get an error about missing file listPageCtrl.js. To resolve this we will create two dummy files "listPage.html" and listPageCtrl.js under path scripts/todo/app. It doesn't need to contain anything. For now we will create just an empty html file with Hello text. Also we need to create a listPageCtrl which will be empty too. Refer to below code

(function() {
  "use strict";
  define([], function() {
    var listPageCtrl = function($scope) {
    };
    if (typeof module !== "undefined" && module.register != null && typeof module.register.controller === "function") {
      module.register.controller("listPageCtrl", ["$scope", listPageCtrl]);
    }
    // for sake of AMD
    return listPageCtrl;
  });
}());
If we run the application now, we will see a blank page with Hello message on top of screen. Go ahead and give it a try.

Iteration 3 - Karma:
Now comes the most important part. Unit test cases are becoming a very important part of application development and writing good test cases during development phase helps in improving design and quality of application. There are many frameworks available to write unit test cases for Javascript code (Jasmine being one of the well known for Angular). For our TODO app we will be using Mocha along Chai.

For karma setup we need to follow below tasks:

1.  Open a command prompt at root folder
2.  Run command npm install karma
3.  Run command karma init my.conf.js
4.  It will ask for testing framework to use. Select Mocha there
5.  Next question will be about use of Require JS. Select Yes
6.  It will ask for browsers. We can choose multiple browsers but Chrome will work for now
7.  For next question specify scripts/*.js and then press enter. Add one more entry scripts/**/*.js and press enter to move to next question
8.  Select enter to skip the next question
9.  For question asking for generation of test-main.js. Select Yes
10.  Select Yes for question asking to watch all the files. This will help us get continous feedback on change of code in any file.
At end of above steps, we will have two files created at root folder namely my.conf.js and test-main.js For more info related to configuration refer to this link. Now you might have noticed that there is one more folder that is created with name node_modules. This folder basically holds all the node dependencies required to run Karma but what if we delete this folder? From where we will get back these dependencies? Don't worrry we have a solution for that :)

Create a file name package.json in same folder where node_modules exist. For now we will create a empty file as below

{
  "name": "todo",
  "description": "this is package json file to define node dependencies",
  "license": "MIT"
}
Now in the same command prompt we need to run below commands one by one

npm install karma --save-dev
npm install requirejs --save-dev
npm install karma-mocha --save-dev
npm install karma-chrome-launcher --save-dev
npm install karma-requirejs --save-dev
npm install angular --save-dev
npm install angular-mocks --save-dev
npm install karma-chai --save-dev
At end of these commands our package.json file will be updated to look like below. For more info on package.json file refer here

{
  "name": "todo",
  "description": "this is package json file to define node dependencies",
  "license": "MIT"
  "devDependencies": {
    "karma": "^0.13.2",
    "requirejs": "^2.1.19",
    "mocha": "^2.2.5",
    "karma-mocha": "^0.2.0",
    "karma-chrome-launcher": "^0.2.0",
    "karma-requirejs": "^0.2.2",
    "angular-mocks": "^1.4.3",
    "angular": "^1.4.3",
    "chai": "^3.2.0",
    "karma-chai": "^0.1.0"
  }
}
Now its time to test setup. Run karma start my.conf.js in command prompt. This should open a chrome browser instance with URL http://localhost:9876/. Also in our command prompt we can see message "Executed 0 of 0" which is fine since we haven't written a single test case till now.

Before we start writing any test case we need to do one final configuration in my.conf.js and test-main.js which will ensure our test files are loaded and executed. Open my.conf.js and under framework array add chai as an additional framework as shown below

frameworks: ['mocha', 'requirejs', 'chai']
Also under files array add two more entries to load all files for angular and angular-mocks. These files are downloaded using npm command and will be present under node_modules folder. End result will look as below:

files: [
  'test-main.js',
  {pattern: 'scripts/*.js', included: false},
  {pattern: 'scripts/**/*.js', included: false},
  {pattern: 'node_modules/angular/*.js', included: false},
  {pattern: 'node_modules/angular-mocks/*.js', included: false}
]
Since we are using RequireJs to all the dependencies we need to modify test-main.js which was generated for us earlier. We are doing two tasks in this file

1.  Iterating over all the files and finding which are ending with either "test" or "spec"
2.  Declaring default requireJs configuration
In require js configuration we setting baseUrl as /base which is a virtual folder created by Karma to host all the files under test. We need to change this to /base/scripts since all our source code is inside scripts folder.

baseUrl: '/base/scripts'
Also if we notice then we will find that in the loop above we are replace /base from string before adding to allTestFiles array. This code also need to be modified and should be as below

var normalizedTestModule = file.replace(/^\/base\/scripts\/|\.js$/g, '');
allTestFiles.push(normalizedTestModule);
All test cases that we will write from now on will need angular-mocks as dependency (to know why click here). Angular Mocks internally needs angularjs to be loaded as dependency. Also we will need to load main.js so that our angular application is bootstraped and todo module is created.

Let's change the require js configuartion to achieve this. We need to add paths and shim json object to configure this. Final result will look as below:

require.config({
  baseUrl: '/base/scripts',
  deps: allTestFiles,
  paths: {
    "main": "main",
    "angular": "../node_modules/angular/angular.min",
    "angular-mocks": "../node_modules/angular-mocks/angular-mocks"
  },
  shim: {
    "main": {exports: "main", deps: ["angular"]},
    "angular-mocks": {exports: "angular-mocks", deps: ["main"]}
  },
  callback: window.__karma__.start
});
Iteration 4 - TDD:
To begin we will create a folder named test under scripts. This folder will hold all our unit test cases.

We will create a new file name listPageCtrlSpec.js at this location. We need to include todo/app/listPageCtrl as dependency since we want to test that controller and also we will include angular-mocks. It will look as below:

(function() {
  "use strict";
  define(["todo/app/listPageCtrl", "angular-mocks"], function(listPageCtrl) {
    describe("test suite for list page controller", function() {
      var scope = null;
      var controller = null;
      beforeEach(module("todo"));
      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller;
      }));
    });
  });
}());
We have used beforeEach statement in the above code to perform two tasks

1.  Mock our "todo" module
2.  Inject $rootScope and $controller method to initialize controller
Now let's write our first test case. For our list page we need to fetch items from local storage and display it in UI as list view. Let's write a unit test case to read items from local storage. Test case will look like below:

it ("should read items from local storage", function() {
  // set dummy data
  localStorage.setItem("todos", JSON.stringify([{task: "clean room", time: "19:00"}, {task: "sleep", time: "22:00"}]));
  controller(listPageCtrl, {$scope: scope });
  expect(scope.todos.length).to.equal(2);
  expect(scope.todos[1].task).to.equal("sleep");
  // clear data
  localStorage.removeItem("todos");
});
If we run test case now, it will give error "TypeError: Cannot read property 'length' of undefined" which is fine since we haven't implemented anything in our controller. Now lets go and implement a method in our controller to create this list.

In our previously created empty controller we will now create a method init and will write code to read the JSON array from local storage. Final result will look like below:

(function() {
  "use strict";
  define([], function() {
    var listPageCtrl = function($scope) {
      var init = function() {
        var items = localStorage.getItem("todos");
        if (items != null) {
          try {
            $scope.todos = JSON.parse(items);
          } catch (e) {
            $scope.todos = [];
          }
        }
      }
      init();
    };
    if (typeof module !== "undefined" && module.register != null && typeof module.register.controller === "function") {
      module.register.controller("listPageCtrl", ["$scope", listPageCtrl]);
    }
    // for sake of AMD
    return listPageCtrl;
  });
}());
Now if we run the test case then we will see "Executed 1 of 1 SUCCESS". Congratulations we have successfully executed our first test case and implemented a method to read list of todo items

We should also write some HTML code in our listPage.html to print todo items in UI. It should look as below:

<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="javascript:void(0);">To Do</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav"></ul>
    </div>
  </div>
</nav>
<div style="margin-top: 70px">
  <ul class="list-group" ng-if="todos != null && todos.length > 0">
    <li class="list-group-item" ng-repeat="todo in todos">{{ todo.task }}</li>
  </ul>
  <div class="alert alert-info" role="alert" ng-if="todos == null || todos.length === 0">Hurray!!! There are no pending items in To Do list</div>
  <a type="button" class="btn btn-default" style="color:white;width:100%;background-color: #000000;border-color: #000000;" href="#/app/add">Add New</a>
</div>
In this HTML we are iterating over our list to print each todo task. If list is not available or there are no items in it then we are printing a message with some help from ng-if. Also there is a button in bottom of the page which will allow us to add new todo item.

Go ahead and run the application at its current state. We will notice a nice UI with a header on top and a message along with button.
When we click on the button, currently nothing will happen though we can notice that the hash tag appended to URL changes to #/app/add

Its time for us to create a new controller (addPageCtrl.js) and html (addPage.html). We will create these files at path scripts/todo/app. For now we will keep our controller as empty file with code as below:

(function() {
  "use strict";
  define([], function() {
    var addPageCtrl = function($scope) {
    };
    if (typeof module !== "undefined" && module.register != null && typeof module.register.controller === "function") {
      module.register.controller("addPageCtrl", ["$scope", addPageCtrl]);
    }
    // for sake of AMD
    return addPageCtrl;
  });
}());
As per requirement we need to ensure that when used click on a button "Add To Do" in UI then we should add a new To Do Item. Let's first write a test case for that in our new file addPageCtrlSpec.js. Final result will be as below:

(function() {
  "use strict";
  define(["todo/app/addPageCtrl", "angular-mocks"], function(addPageCtrl) {
    describe("test suite for add page controller", function() {
      var scope = null;
      beforeEach(module("todo"));
      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller(addPageCtrl, {$scope: scope});
      }));
      it ("should add an item to todos list", function() {
        scope.task = "sleep";
        scope.time = "21:00";
        localStorage.removeItem("todos");
        scope.onAddClick({});
        var todos = [];
        var items = localStorage.getItem("todos");
        if (items != null) {
          try {
            todos = JSON.parse(items);
          } catch (e) {}
        }
        expect(todos.length).to.equal(1);
        expect(todos[0].task).to.equal("sleep");
      });
    });
  });
}());
At this point we will have a failing test case. To fix it we need to implement onAddClick method in addPageCtrl.js Lets write the code for that. End result will be like below

var addPageCtrl = function($scope) {
  $scope.onAddClick = function($event) {
    var todos = [];
    var items = localStorage.getItem("todos");
    if (items != null) {
      try {
        todos = JSON.parse(items);
      } catch (e) {}
    }
    todos.push({
      task: $scope.task,
      time: $scope.time
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};
With this all our test case should pass. We now need to write HTML for addPage.html to render UI. Final output will look like below. In this HTML we are ng-model directive to bind the value of HTML element with request scope variable. For e.g. ng-model="time" will bind the value of text box with $scope.time variable. We are also using ng-click directive which is used to bind the click event on any DOM element. In the below case when user clicks on "Add To Do" button, onAddClick method as defined in $scope will be triggered.

<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="javascript:void(0);">To Do</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav"></ul>
    </div>
  </div>
</nav>
<div style="margin-top: 70px">
  <div class="input-group" style="margin-bottom: 10px">
    <span class="input-group-addon" id="basic-addon1">Task</span>
    <input type="text" class="form-control" placeholder="Task" ng-model="task">
  </divl>
  <div class="input-group">
    <span class="input-group-addon" id="basic-addon1">Time</span>
    <input type="text" class="form-control" placeholder="Time" ng-model="time">
  </divl>
  <div style="margin-top: 10px">
    <a type="button" class="btn btn-default" style="color:white;width:48%;background-color: #000000;border-color: #000000;margin-right:2%;" href="#/app/list">Show List</a>
    <a type="button" class="btn btn-default" style="color:white;width:48%;background-color: #000000;border-color: #000000;" href="javascript:void(0);" ng-click="onAddClick($event);">Add To Do</a>
  </div>
</divl>
With this our application is finished. In the course of this development we learned how to create an application using angular js and manage page routing using ui-router. We also learned to manage dependencies using RequireJS and most importantly we learned to write test cases (for stability of application) which runs on Karma. Go ahead and run the application and enjoy benefits of home made To Do app. For complete source code click here