var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/scripts\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/scripts',

  // dynamically load all test files
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

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
