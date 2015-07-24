(function() {
	"use strict";

	define([
		"todo/app/listPageCtrl",
		"angular-mocks"
	], function(listPageCtrl) {

		describe("test suite for list page controller", function() {

			var scope = null;
			var controller = null;

			beforeEach(module("todo"));
			beforeEach(inject(function($rootScope, $controller) {
				scope = $rootScope.$new();
				controller = $controller;
			}));

			it ("should read items from local storage", function() {

				// set dummy data
				localStorage.setItem("todos", JSON.stringify([{task: "clean room", time: "19:00"}, {task: "sleep", time: "22:00"}]));
				controller(listPageCtrl, {$scope: scope });
				expect(scope.todos.length).to.equal(2);
				expect(scope.todos[1].task).to.equal("sleep");

				// clear data
				localStorage.removeItem("todos");
			});
		});
	});
}());