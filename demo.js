
var mapCenter = [20.998128, 105.794390];
function initWindyMap(){
    var API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2';
	
    var Wind_Map = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5',{
        maxZoom: 11,
        minZoom: 3,
    });
    var Temperature_Map = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=-70:734669;-55:CAACC3;-40:A24691;-25:8F59A9;-15:9DDBD9;-8:6ABFB5;-4:64A6BD;0:5D85C6;1:447D63;10:809318;21:F3B704;30:E85319;45:470E00',{
        maxZoom: 11,
        minZoom: 3,
    })
    var Relative_Humidity = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=http://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=0:ad5538;30:ad6e38;40:ad9238;50:69ad38;60:38ad79;70:38aead;75:38a0ad;80:389dad;83:3894ad;87:3887ad;90:3884ad;93:387bad;97:38629d;100:384672',{
        maxZoom: 11,
        minZoom: 3,
    })
    var Accumulated_Precipitation_Rain = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=http://maps.openweathermap.org/maps/2.0/weather/PAR0/{z}/{x}/{y}?fill_bound=true&opacity=1&palette=0:6f6f6f;0.6:3c74a0;6:3ba1a1;8:3ba13d;10:82a13b;15:a1a13b;20:a13b3b;31:a13ba1;50:a8a8a8&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Atmospheric_Pressure_Mean = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=http://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?fill_bound=true&opacity=1&pallette=990:8eb3b8;995:68b4b3;1000:45a7a6;1003:398393;1006:397693;1009:395b93;1015:3a7535;1019:9fa141;1022:ad8839;1025:aa5443;1030:5e3c51&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Cloudiness = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=http://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?fill_bound=true&opacity=1&pallette=0:928246;10:847746;30:747474;80:adb7b6;90:bec1c1;100:d5d5cd&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var overlayLayer = {
        "Wind Map" : Wind_Map,
        "Temperature Map" : Temperature_Map,
        "Relative Humidity" : Relative_Humidity,
        "Accumulated Precipitation Rain" : Accumulated_Precipitation_Rain,
        "Pressure" : Atmospheric_Pressure_Mean,
        "Cloudiness" : Cloudiness,
    }
	
    var Windy_Map = L.tileLayer('http://mylocal.com/cacheapi/getimage?url=https://tiles.windy.com/tiles/v9.0/darkmap/{z}/{x}/{y}.png',{
        maxZoom: 11,
        minZoom: 3
    });
	var baseLayers = {
        "Windy Map" : Windy_Map,
    };
	
	var geojsonTileLayer = new L.LoadCityNameJSON('http://mylocal.com/cacheapi/getimage?url=https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json',{
        maxZoom: 11,
        minZoom: 3,
    });
    
    var map = L.map('map', {
        layers: [ Windy_Map, Temperature_Map, geojsonTileLayer],
        closePopupOnClick: false,
		worldCopyJump: true,
    });
	
    var layerControl = L.control.layers(overlayLayer, baseLayers);
    layerControl.addTo(map);
    
    map.setView(mapCenter, 6);

    return {
        map: map,
        layerControl: layerControl,
    };
}

var mapStuff = initWindyMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

var newZoomLevel = null;
var markerGroup = L.layerGroup().addTo(map);
map.on('zoomstart', function(e){
	markerGroup.clearLayers();
});

WindJSLeaflet.init({
    wind: true,
	localMode: true,
	map: map,
	layerControl: layerControl,
	useNearest: false,
	timeISO: null,
	nearestDaysLimit: 7,
	displayValues: true,
	displayOptions: {
		displayPosition: 'bottomleft',
		displayEmptyString: 'No wind data'
	},
	overlayName: 'Wind',
	
    pingUrl: 'http://localhost:7000/alive',
	latestUrl: 'http://localhost:7000/latest',
	nearestUrl: 'http://localhost:7000/nearest',
	errorCallback: handleError
});