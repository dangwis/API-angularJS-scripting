var app = angular.module('493Search', []);

app.controller('searchResult',[ '$scope', '$http', function($scope, $http) {
    
    $scope.totalNum = 0;
    $scope.counter = 0;
    $scope.checkIfEnter = function (event) {
        if (event.which == 13) {
            var url = "https://api.spotify.com/v1/search?q=" + $scope.artistName + "&type=artist";
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                console.log(response);
                $scope.artistList = response.data.artists.items;
                $scope.totalNum = response.data.artists.total;
                if ($scope.totalNum == 0) alert("No results where returned for " + $scope.artistName);
                if ($scope.totalNum > 20) $scope.totalNum = 20;
            }, function errorCallback(response) {
                
            });
            $scope.counter = 0;
        }
    }

    $scope.getGenres = function (artist) {
        var genres = "";
        for (i = 0; i < artist.genres.length; i++) {
            genres = genres + artist.genres[i] + ", ";
        }
        genres = genres.substr(0, genres.length - 2);
        return genres;
    }

    $scope.isHot = function (artist) {
        if (artist.popularity > 50) return true;
        else return false;
    }

    $scope.artistOneLineName = function (artist) {
        var name = artist.name;
        if (name.length > 25) {
            name = name.substr(0, 25);
            name = name + "...";
        }
        return name;
    }

    $scope.getImageUrl = function (artist) {
        if (artist.images[0] != null) return artist.images[0].url;
        return "noimage.jpg";
    }

    $scope.openArtistInSpotify = function (artist) {
        var url = "https://open.spotify.com/" + artist.type + "/" + artist.id;
        return url;
    }
}]);

app.controller('similarArtistsCtrl',['$scope', '$http', function($scope, $http) {
    
    $scope.showRelated = false;

    $scope.getSimilarArtists = function (artist) {
        var url = "https://api.spotify.com/v1/artists/" + artist.id + "/related-artists";
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response);
            $scope.relatedArtists = response.data.artists;
            $scope.showRelated = true;
        }, function errorCallback(response) {

        });
    }

    $scope.artist15Char = function (artist) {
        var name = artist.name;
        if (name.length > 15) {
            name = name.substr(0, 15);
            name = name + "...";
        }
        return name;
    }
}]);
