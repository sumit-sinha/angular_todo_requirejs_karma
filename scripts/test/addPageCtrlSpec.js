(function() {
	"use strict";

	define(["todo/app/addPageCtrl", "angular-mocks"], function(addPageCtrl) {

		describe("test suite for add page controller", function() {

			var scope = null;

			beforeEach(module("todo"));
			beforeEach(inject(function($rootScope, $controller) {
				scope = $rootScope.$new();
				$controller(addPageCtrl, {$scope: scope });
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

			it ("should print a success message in UI", function() {

				scope.task = "sleep";
				scope.time = "21:00";
				localStorage.removeItem("todos");

				scope.onAddClick({});
				expect(scope.message).to.equal("Task: " + scope.task + " added to todos list");
			});
		});
	});
}());