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
			};

			init();
		};

		if (typeof module !== "undefined" && module.register != null  && typeof module.register.controller === "function") {
			module.register.controller("listPageCtrl", ["$scope", listPageCtrl]);
		}

		return listPageCtrl;
	});
}());