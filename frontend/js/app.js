var app = angular.module('itemsApp', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'templates/main.html',
			controller: 'mainCtrl'
		})
		.when('/statistic', {
			templateUrl: 'templates/statistic.html',
			controller: 'statisticCtrl'
		})
		.otherwise({
      		redirectTo: '/'
    	});
});

app.controller('defaultCtrl', function($scope){
	
});

app.controller('mainCtrl', function($scope, $http){

	//add item	
	$scope.addItem = function(){				
		$http({
			method: 'POST',
			url: 'http://localhost:3000/items/add',
			data: $scope.items
		})
		.then(function successCallback(response){			
			$scope.addItemError = false;
			$scope.items = {};
			$scope.getList();
		}, function errorCallback(response){
			$scope.addItemError = response.data.error;
		});
	};

	//get paginated items list
	$scope.getList = function(page){
		$scope.page = page || 1;
		$http({
			method: 'GET',
			url: 'http://localhost:3000/items/' + $scope.page,
		})
		.then(function successCallback(response){			
			$scope.itemsList = response.data.events;
			console.log($scope.itemsList);
			console.log(response.data);
			$scope.page = response.data.page;
			$scope.pagesAmount = [];
			for(var i = 0; i < Math.ceil(response.data.pages); i++){
				$scope.pagesAmount.push(i);
			}
			console.log($scope.pagesAmount);			

		}, function errorCallback(response){

		});
	}
	$scope.getList();

	//edit item get
	$scope.editItem = function(_id, name, type){
		$scope.item = {};		
		$http({
			method: 'GET',
			url: 'http://localhost:3000/items/' + _id,
		})
		.then(function successCallback(response){
			$scope.itemDetails = response.data;			
			$scope.item.name = name;
			$scope.item.type = type;
			$scope.item.id = _id;
			$scope.editFormStatus = true;
			console.log($scope.item);
		}, function errorCallback(response){

		});
	}

	//post edited item
	$scope.submitEditItem = function(){		
		var data = {
			name: $scope.item.name, 
			type: $scope.item.type, 
			id: $scope.item.id,
		};
		$http({
			method: 'POST',
			url: 'http://localhost:3000/items/' + data.id,
			data: data,
		})
		.then(function successCallback(response){
			$scope.getList();
			$scope.editFormStatus = false;
		}, function errorCallback(response){
			$scope.editItemError = response.data.error;
		});
	};

	//delete item
	$scope.deleteItem = function(_id){
		$http({
			method: 'DELETE',
			url: 'http://localhost:3000/items/' + _id,
		})
		.then(function successCallback(response){
			$scope.getList();
		}, function errorCallback(response){

		});
	}

});




app.controller('statisticCtrl', function($scope, $http){
	//get statistics
	$scope.getStatistic = function(page){
		$scope.page = page || 1;
		$http({
			method: 'GET',
			url: 'http://localhost:3000/items/statistic/' + $scope.page,
		})
		.then(function successCallback(response){
			$scope.statisticList = response.data.events;

			$scope.page = response.data.page;
			$scope.pagesStatAmount = [];
			for(var i = 0; i < Math.ceil(response.data.pages); i++){
				$scope.pagesStatAmount.push(i);
			}		
		
			console.log($scope.statisticList);
		}, function errorCallback(response){

		});
	}
	$scope.getStatistic();	

});