
L.LoadCityNameJSON = L.TileLayer.extend({
	createTile: function(coords, done) {
		var tile = document.createElement('div');
        var layer = this;
        this._loadJson(this.getTileUrl(coords), layer, tile, coords, done);
        return tile;
    },
	_loadJson: function (url, layer, tile, tilePoint, done) {
		var zoom_url = null;
		var find_str = '/en/';
		var first_zoom_pos = url.toString().indexOf(find_str);
		if(first_zoom_pos !== -1){
			second_zoom_pos = url.toString().indexOf('/', first_zoom_pos + find_str.length + 1);
			if(second_zoom_pos !== -1){
				var zoom_url = url.substr(first_zoom_pos + find_str.length, second_zoom_pos - first_zoom_pos - find_str.length);
			}
		}
		if(zoom_url != null){
			var waitMarkerGroupTimer = function(callback){
				if(WindJSLeaflet && WindJSLeaflet._windy && typeof markerGroup !== 'undefined' && typeof newZoomLevel !== 'undefined'){
					callback();
				}else{
					setTimeout(function(){
						waitMarkerGroupTimer(callback);
					}, 100);
				}
			}
			waitMarkerGroupTimer(function(){
				if(newZoomLevel == null){
					newZoomLevel = zoom_url;
				}else if(newZoomLevel != zoom_url){
					markerGroup.clearLayers();
					newZoomLevel = zoom_url;
				}
				$.getJSON(url, function(response) {
					if(response){
						tile.datum = response;
						layer._tileLoaded(tile, tilePoint, zoom_url);
					}else{
						layer._tileLoaded(tile, tilePoint, zoom_url);
					}
				}).fail(function( jqxhr) {});
			});
		}
    },
    _tileLoaded: function (tile, tilePoint, zoomLevel) {
		if(tile.datum && zoomLevel == newZoomLevel){
			var waitWindyTimer = function(lng, lat, counter, callback){
				if(WindJSLeaflet && WindJSLeaflet._windy){
					var interpolatePointResult = WindJSLeaflet._windy.interpolatePoint(lng, lat);
					if(interpolatePointResult){
						callback(interpolatePointResult);
					}else{
						if(counter >= 100){	
							callback(interpolatePointResult);
						}else{
							setTimeout(function(){
								waitWindyTimer(lng, lat, counter + 1, callback);
							}, 100);
						}
					}
				}else{
					setTimeout(function(){
						waitWindyTimer(lng, lat, counter + 1, callback);
					}, 100);
				}
            };
			tile.datum.forEach(function(city){
				var lng = city[3];
				var lat = city[4];
				var cityType = city[2];
				if( cityType == 'country-1' ){
					var cityName = L.divIcon({className: 'country-name-1', html: '<div>'+city[1]+'</div>'})
					markersCity = L.marker([lat, lng],{icon:cityName}).addTo(markerGroup);
				}else if( cityType == 'country-2' ){
					var cityName = L.divIcon({className: 'country-name-2', html: '<div>'+city[1]+'</div>'})
					markersCity = L.marker([lat, lng],{icon:cityName}).addTo(markerGroup);
				}else{
					waitWindyTimer(lng, lat, 0, function(interpolatePointLocalResult){
						if(interpolatePointLocalResult){
							var cityName = L.divIcon({className: 'city-name '+cityType, html: '<div data-label="'+city[1]+'" data-id="'+lat+'/'+lng+'" data-temp="'+Math.round(interpolatePointLocalResult[2]-273)+'°"><div>'+city[1]+'</div></div>'})
							markersCity = L.marker([lat, lng],{icon:cityName}).addTo(markerGroup);
						}
					});
				}
			});
		}   
    },
});

L.loadCityNameJSON = function() {
    return new L.LoadCityNameJSON();
}