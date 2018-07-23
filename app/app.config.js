'use strict';

angular.
  module('roverApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/rover', {
          template: '<sitter-list></sitter-list>'
        }).
        otherwise('/rover');
    }
  ]);
