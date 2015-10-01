/**
 * Created by isean_000 on 9/30/2015.
 */




var app = angular.module('myApp', ['ngMap']);
app.controller('BasicCtrl1', function($scope, $compile, $http) {
    var TILE_SIZE = 256;

    console.log("initialize app");
    
	$http({
		method: 'GET',
		url: '/bigwebapp/restws/incidents/'
	}).success(function(data, status) {
		console.log(data);
		$scope.incidents = data;
	}).error(function(data, status) {
		// Some error occurred
		console.log('error '+ status);
	});

    
    $scope.stores = {
        foo: { position:[41, -87], items: [1,2,3,4]},
        bar:{ position:[41, -83], items: [5,6,7,8]}
    };
    $scope.showStore = function(evt, id) {
        $scope.store = $scope.stores[id];
        $scope.showInfoWindow.apply(this, [evt, 'foo']);
    };

    $scope.showIncident = function(evt, infomation) {
        $scope.showInfoWindow.apply(this, [evt, 'incidentWindow']);
    };

    function bound(value, opt_min, opt_max) {
        if (opt_min != null) value = Math.max(value, opt_min);
        if (opt_max != null) value = Math.min(value, opt_max);
        return value;
    }

    function degreesToRadians(deg) {
        return deg * (Math.PI / 180);
    }

    function radiansToDegrees(rad) {
        return rad / (Math.PI / 180);
    }

    function MercatorProjection() {
        this.pixelOrigin_ = new google.maps.Point(TILE_SIZE / 2, TILE_SIZE / 2);
        this.pixelsPerLonDegree_ = TILE_SIZE / 360;
        this.pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);
    }

    MercatorProjection.prototype.fromLatLngToPoint = function(latLng,
                                                              opt_point) {
        var me = this;
        var point = opt_point || new google.maps.Point(0, 0);
        var origin = me.pixelOrigin_;

        point.x = origin.x + latLng.lng() * me.pixelsPerLonDegree_;

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is
        // about a third of a tile past the edge of the world tile.
        var siny = bound(Math.sin(degreesToRadians(latLng.lat())), -0.9999,
            0.9999);
        point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *
        -me.pixelsPerLonRadian_;
        return point;
    };

    MercatorProjection.prototype.fromPointToLatLng = function(point) {
        var me = this;
        var origin = me.pixelOrigin_;
        var lng = (point.x - origin.x) / me.pixelsPerLonDegree_;
        var latRadians = (point.y - origin.y) / -me.pixelsPerLonRadian_;
        var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) -
        Math.PI / 2);
        return new google.maps.LatLng(lat, lng);
    };

    $scope.$on('mapInitialized', function(event, map) {
    	console.log("map initialized");
        var numTiles = 1 << map.getZoom();
        var projection = new MercatorProjection();
        $scope.chicago = map.getCenter();
        $scope.map = map;
        $scope.worldCoordinate = projection.fromLatLngToPoint($scope.chicago);
        $scope.pixelCoordinate = new google.maps.Point(
            $scope.worldCoordinate.x * numTiles,
            $scope.worldCoordinate.y * numTiles);
        $scope.tileCoordinate = new google.maps.Point(
            Math.floor($scope.pixelCoordinate.x / TILE_SIZE),
            Math.floor($scope.pixelCoordinate.y / TILE_SIZE));
    });
});