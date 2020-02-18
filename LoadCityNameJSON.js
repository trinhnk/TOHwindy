
L.LoadCityNameJSON = L.TileLayer.extend({
	createTile: function (coords, done) {
		var url = this.getTileUrl(coords);
		var windy_init_timeout = function(lng, lat, counter, callback){
			if(WindJSLeaflet && WindJSLeaflet._windy){
				var interpolatePointResult = WindJSLeaflet._windy.interpolatePoint(lng, lat);
				if(interpolatePointResult){
					callback(interpolatePointResult);
				}else{
					if(counter >= 100){	
						callback(interpolatePointResult);
					}else{
						setTimeout(function(){
							windy_init_timeout(lng, lat, counter + 1, callback);
						}, 100);
					}
				}
			}else{
				setTimeout(function(){
					windy_init_timeout(lng, lat, counter + 1, callback);
				}, 100);
			}
		};
		$.getJSON(url, function(response) {
			if(response){
				response.forEach(function(city){
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
						windy_init_timeout(lng, lat, 0, function(interpolatePointLocalResult){
							if(interpolatePointLocalResult){
								var cityName = L.divIcon({className: 'city-name '+cityType, html: '<div data-label="'+city[1]+'" data-id="'+lat+'/'+lng+'" data-temp="'+Math.round(interpolatePointLocalResult[2]-273)+'°"><div>'+city[1]+'</div></div>'})
								markersCity = L.marker([lat, lng],{icon:cityName}).addTo(markerGroup);
							}
						});
					}
				});
			}
		}).fail(function( jqxhr) {});
		return document.createElement('img');
	},
});

L.loadCityNameJSON = function() {
    return new L.LoadCityNameJSON();
}