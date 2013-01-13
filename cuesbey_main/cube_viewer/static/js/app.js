'use strict';


// Declare app level module which depends on filters, and services
angular.module('cubeViewer', [
    'cubeViewer.controllers',
    'cubeViewer.services',
    'cubeViewer.directives'
])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });
