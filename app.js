(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems () {
	var ddo = {
		templateUrl : 'table.html',
	};
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', '$filter'];
function NarrowItDownController (MenuSearchService, $filter) {
	var NIDCon = this;
	NIDCon.searchTerm = "";
	NIDCon.v = "madhu";

	NIDCon.action = function (searchTerm) {
		
		var promise = MenuSearchService.getMatchedMenuItems();
		promise.then (function (response) {
		NIDCon.items = response.data;
		NIDCon.items = NIDCon.items.menu_items;

			
		// for (var i = 0 ; i < NIDCon.items.length ; i++)
		// {
		// 	if (NIDCon.items.name.indexOf(searchTerm))
		// 	{
		// 		NIDCon.list = {
		// 			name : NIDCon.items.name,
		// 			id : NIDCon.items.id
		// 		};

		// 	}
		// }

		console.log("Search Item",NIDCon.searchTerm);
		console.log("Item length",NIDCon.items.length);
		})
		.catch (function (error) {
			console.log("Something went terribly wrong.");
		});
		// for(var i = 0 ; i < )
	}	
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService ($http) {
	var service = this;

	service.getMatchedMenuItems = function () {
		var response = $http ( {
			method : 'GET',
			url : " https://davids-restaurant.herokuapp.com/menu_items.json",
		});

		return response;
	};
}

})();

