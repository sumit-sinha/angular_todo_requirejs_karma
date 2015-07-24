(function() {
	"use strict";

	define([], function() {

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
				$scope.message = "Task: " + $scope.task + " added to todos list";
			};
		};

		if (typeof module !== "undefined" 
			&& module.register != null 
			&& typeof module.register.controller === "function") {
			module.register.controller("addPageCtrl", ["$scope", addPageCtrl]);
		}

		return addPageCtrl;
	});
}());