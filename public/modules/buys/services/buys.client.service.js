'use strict';

//Buys service used for communicating with the buys REST endpoints
angular.module('buys').factory('Buys', ['$resource', function($resource) {
    return $resource('buys/:buyId', {
        buyId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
