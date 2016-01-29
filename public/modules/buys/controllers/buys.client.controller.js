'use strict';

angular.module('buys').controller('BuysController', ['$scope', '$stateParams', '$location', 'Authentication', 'Buys',
	function($scope, $stateParams, $location, Authentication, Buys) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var buy = new Buys({
				merchant: this.merchant,
				item: this.item,
				type: this.type,
				retail: this.retail,
				paid: this.paid,
				netCost: this.netCost,
				discounts: this.discounts,
				ebay: this.ebay,
				potentialProfit: this.potentialProfit
			});
			buy.$save(function(response) {
				$location.path('buys/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.merchant = '';
			this.item = '';
			this.type = '';
			this.retail = '';
			this.paid = '';
			this.netCost = '';
			this.discounts = '';
			this.ebay = '';
			this.potentialProfit = '';

		};

		$scope.remove = function(buy) {
			if (buy) {
				buy.$remove();

				for (var i in $scope.buys) {
					if ($scope.buys[i] === buy) {
						$scope.buys.splice(i, 1);
					}
				}
			} else {
				$scope.buy.$remove(function() {
					$location.path('buys');
				});
			}
		};

		$scope.update = function() {
			var buy = $scope.buy;

			buy.$update(function() {
				$location.path('buys/' + buy._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.buys = Buys.query();
		};

		$scope.findOne = function() {
			$scope.buy = Buys.get({
				buyId: $stateParams.buyId
			});
		};

		$scope.updateNet = function(discountType) {
			switch(discountType) {
				case 'percent':
					$scope.netCost = $scope.paid * (1 - ($scope.discount / 100));
					break;
				case 'nominal':
					$scope.netCost = $scope.paid - $scope.discount;
			}
		};
	}
]);
