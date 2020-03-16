function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            // return pair[1];
            variable = pair[1];
            return variable;
        }
    }
}
var lat = 20.998128;
var lng = 105.794390;
var overlay = 'temp';

const queryString = window.location.search;
if (queryString){
    lat = getQueryVariable('lat');
    lng = getQueryVariable('lng');
    overlay = getQueryVariable('overlay');
}

var mapCenter = [lat, lng];

function initWindyMap(){
	var Wind_Map_url = main_cache_url + 'Wind_Map/{s}/{z}/{x}/{y}' + '/cache.png';
	var Temperature_Map_url = main_cache_url + 'Temperature_Map/{s}/{z}/{x}/{y}' + '/cache.png';
	var Relative_Humidity_url = main_cache_url + 'Relative_Humidity/{s}/{z}/{x}/{y}' + '/cache.png';
	var Accumulated_Precipitation_Rain_url = main_cache_url + 'Accumulated_Precipitation_Rain/{s}/{z}/{x}/{y}' + '/cache.png';
	var Atmospheric_Pressure_Mean_url = main_cache_url + 'Atmospheric_Pressure_Mean/{s}/{z}/{x}/{y}' + '/cache.png';
	var Cloudiness_url = main_cache_url + 'Cloudiness/{s}/{z}/{x}/{y}' + '/cache.png';
	
	var PAC0_url = main_cache_url + 'PAC0/{s}/{z}/{x}/{y}' + '/cache.png';
	var PR0_url = main_cache_url + 'PR0/{s}/{z}/{x}/{y}' + '/cache.png';
	var PA0_url = main_cache_url + 'PA0/{s}/{z}/{x}/{y}' + '/cache.png';
	var PAS0_url = main_cache_url + 'PAS0/{s}/{z}/{x}/{y}' + '/cache.png';
	var SD0_url = main_cache_url + 'SD0/{s}/{z}/{x}/{y}' + '/cache.png';
	var WND_url = main_cache_url + 'WND/{s}/{z}/{x}/{y}' + '/cache.png';
	var TD2_url = main_cache_url + 'TD2/{s}/{z}/{x}/{y}' + '/cache.png';
	var TS0_url = main_cache_url + 'TS0/{s}/{z}/{x}/{y}' + '/cache.png';
	var TS10_url = main_cache_url + 'TS10/{s}/{z}/{x}/{y}' + '/cache.png';
	
	var Wind_Map = L.tileLayer(Wind_Map_url,{
        maxZoom: 11,
        minZoom: 3,
    });
	var Temperature_Map = L.tileLayer(Temperature_Map_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Relative_Humidity = L.tileLayer(Relative_Humidity_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Accumulated_Precipitation_Rain = L.tileLayer(Accumulated_Precipitation_Rain_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Atmospheric_Pressure_Mean = L.tileLayer(Atmospheric_Pressure_Mean_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Cloudiness = L.tileLayer(Cloudiness_url,{
        maxZoom: 11,
        minZoom: 3,
    })

    var PAC0 = L.tileLayer(PAC0_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var PR0 = L.tileLayer(PR0_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var PA0 = L.tileLayer(PA0_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var PAS0 = L.tileLayer(PAS0_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var SD0 = L.tileLayer(SD0_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var WND = L.tileLayer(WND_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var TD2 = L.tileLayer(TD2_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var TS0 = L.tileLayer(TS0_url,{
        maxZoom: 11,
        minZoom: 3,
    })
    var TS10 = L.tileLayer(TS10_url,{
        maxZoom: 11,
        minZoom: 3,
    })

    var overlayLayer = {
        '<center><i title="Rain" class="fas fa-cloud-rain icons-font" id="rain-layout"></center>' : Accumulated_Precipitation_Rain,
        '<center><i title="Snow" class="fas fa-snowman icons-font" id="snow-layout"></i></center>' : SD0,
        '<center><i title="Wind" class="fas fa-wind icons-font" id="windy-layout"></i></center>' : Wind_Map,
        '<center><i title="Pressure" class="fas fa-arrow-circle-down icons-font" id="pressure-layout"></i></center>' : Atmospheric_Pressure_Mean,
        '<center><i title="Temperature" class="fas fa-thermometer-three-quarters icons-font" id="temp-layout"></i></center>' : Temperature_Map,
        '<center><i title="Humidity" class="fas fa-water icons-font" id="humidity-layout"></i></center>' : Relative_Humidity,
        '<center><i title="Cloudiness" class="fas fa-cloud icons-font" id="cloudy-layout"></i></center>' : Cloudiness,
    }

    var geojsonTileLayer = new L.LoadCityNameJSON('http://resource.goweatherradar.com/resource/json/{z}/{x}/{y}.json',{
        maxZoom: 11,
        minZoom: 3,
    });

    var Toh_Map = L.tileLayer('http://resource.goweatherradar.com/resource/images/{z}/{x}/{y}.png',{
        maxZoom: 11,
        minZoom: 3
    });
    var baseLayers = {
        // "City" : geojsonTileLayer,
        "Map" : Toh_Map,
    };
	
    var Layer = Temperature_Map;
    switch (overlay) {
        case 'wind':
            Layer = Wind_Map;
            break;
        case 'pressure':
            Layer = Atmospheric_Pressure_Mean;
            break;
        case 'rain':
            Layer = Accumulated_Precipitation_Rain;
            break;
        case 'clouds':
            Layer = Cloudiness;
            break;
        default: Layer = Temperature_Map;
            break;
    }
    var map = L.map('map', {
        layers: [ 
            Toh_Map, 
            Layer, 
            geojsonTileLayer 
        ],
        'closePopupOnClick': false,
        'worldCopyJump': true,
		'attributionControl': false,
    });
	
    var layerControl = L.control.layers(overlayLayer, baseLayers, {'collapsed': false});
    layerControl.addTo(map);

    map.setView(mapCenter, 5);

    return {
        map: map,
        layerControl: layerControl
    };
}

var mapStuff = initWindyMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

var markerGroup = L.layerGroup().addTo(map);
map.on('zoomstart',function(e){
    map.removeLayer(markerGroup);
});
map.on('zoomend',function(e){
	map.removeLayer(markerGroup);
    markerGroup = L.layerGroup().addTo(map);
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

    //https://github.com/danwild/wind-js-server
    pingUrl: '',
    latestUrl: '',
    nearestUrl: '',
    errorCallback: handleError
});