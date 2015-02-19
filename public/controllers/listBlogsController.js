angular.module('myApp.controllers', ['myApp.services']).controller('ListController', function (Blog) {
    var lc = this;
    Blog.query(function (data) {
        lc.blogs = data ;
    });
});