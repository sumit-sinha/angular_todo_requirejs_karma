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
                    })

                    return defer.promise;
                }]
            };

            return routeDef;
        };

        // create angular js application module
		window.module = angular.module("todo", ["ui.router"]);

		module.config(["$provide", "$controllerProvider", "$stateProvider", "$urlRouterProvider",
			function($provide, $controllerProvider, $stateProvider, $urlRouterProvider) {

				module.register = {
					service: $provide.service,
					controller: $controllerProvider.register
				}

				for (var route in routes) {
                    if (routes.hasOwnProperty(route)) {

                        // check if new route or child
                        var routeObject = null;
                        if (routes[route] === "parent") {
                            routeObject = resolve(route);
                        } else {
                            routeObject = routes[route];
                        }

                        // register a new state here
                        $stateProvider.state(route, routeObject);
                    }
                }

                $urlRouterProvider.otherwise("/app/list");
			}
		]);
	});
}());