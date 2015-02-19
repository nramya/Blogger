angular.module('myApp.services', ['ngResource']).factory('Blog', function ($resource) {
    return $resource('/blogs/:id');
})