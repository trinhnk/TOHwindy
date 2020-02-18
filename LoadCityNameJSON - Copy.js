
L.TileLayer.Ajax = L.TileLayer.extend({
    _requests: [],
    _addTile: function (tilePoint) {
        var tile = { datum: null, processed: false };
        this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;
        this._loadTile(tile, tilePoint);
    },
    _xhrHandler: function (req, layer, tile, tilePoint) {
        return function () {
            if (req.readyState !== 4) {
                return;
            }
            var s = req.status;
            if ((s >= 200 && s < 300 && s != 204) || s === 304) {
                tile.datum = JSON.parse(req.responseText);
                layer._tileLoaded(tile, tilePoint);
            } else {
                layer._tileLoaded(tile, tilePoint);
            }
        };
    },
    _loadTile: function (tile, tilePoint) {
        this._adjustTilePoint(tilePoint);
        var layer = this;
        var req = new XMLHttpRequest();
        this._requests.push(req);
        req.onreadystatechange = this._xhrHandler(req, layer, tile, tilePoint);
        req.open('GET', this.getTileUrl(tilePoint), true);
        req.send();
    },
});

L.LoadCityNameJSON = L.TileLayer.Ajax.extend({
    _keyLayers: {},
	
    initialize: function (url, options, geojsonOptions) {
        L.TileLayer.Ajax.prototype.initialize.call(this, url, options);
        this.geojsonLayer = new L.GeoJSON(null, geojsonOptions);
    },
    
    _tileLoaded: function (tile, tilePoint) {
		if(tile.datum){
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
					windy_init_timeout(lng, lat, 0, function(interpolatePointLocalResult){
						if(interpolatePointLocalResult){
							var cityName = L.divIcon({className: 'city-name '+cityType, html: '<div data-label="'+city[1]+'" data-id="'+lat+'/'+lng+'" data-temp="'+Math.round(interpolatePointLocalResult[2]-273)+'°"><div>'+city[1]+'</div></div>'})
								markersCity = L.marker([lat, lng],{icon:cityName}).addTo(markerGroup);
						}
					});
				}
			})
		    L.TileLayer.Ajax.prototype._tileLoaded.apply(this, arguments);
		    if (tile.datum === null) { return null; }
        }   
    }
});
