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
        '<center><i class="fas fa-cloud-rain icons-font" id="rain-layout"></center>' : Accumulated_Precipitation_Rain,
        '<center><i class="fas fa-snowman icons-font" id="snow-layout"></i></center>' : PAS0,
        '<center><i class="fas fa-wind icons-font" id="windy-layout"></i></center>' : Wind_Map,
        '<center><i class="fas fa-arrow-circle-down icons-font" id="pressure-layout"></i></center>' : Atmospheric_Pressure_Mean,
        '<center><i class="fas fa-thermometer-three-quarters icons-font" id="temp-layout"></i></center>' : Temperature_Map,
        '<center><i class="fas fa-water icons-font" id="humidity-layout"></i></center>' : Relative_Humidity,
        '<center><i class="fas fa-cloud icons-font" id="cloudy-layout"></i></center>' : Cloudiness,
    }

    var geojsonTileLayer = new L.LoadCityNameJSON('http://resource.goweatherradar.com/resource/json/{z}/{x}/{y}.json',{
        maxZoom: 11,
        minZoom: 3,
    });

    var Windy_Map = L.tileLayer('http://resource.goweatherradar.com/resource/images/{z}/{x}/{y}.png',{
        maxZoom: 11,
        minZoom: 3
    });
    var baseLayers = {
        // "City" : geojsonTileLayer,
        "Windy Map" : Windy_Map,
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
            Windy_Map, 
            Layer, 
            geojsonTileLayer 
        ],
        closePopupOnClick: false,
        'worldCopyJump': true,
    });

    var layerControl = L.control.layers(overlayLayer, baseLayers);
    layerControl.addTo(map);

    map.setView(mapCenter, 5);

    return {
        map: map,
        layerControl: layerControl
    };
    
}

var WindJSLeaflet;
$.getJSON(wind_json_url, function(data) {
    WindJSLeaflet = L.windJSLeaflet({ data: data });
    map.addLayer(WindJSLeaflet);
    console.log(WindJSLeaflet)
});

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

// WindJSLeaflet.init({
//     wind: true,
//     localMode: true,
//     map: map,
//     layerControl: layerControl,
//     useNearest: false,
//     timeISO: null,
//     nearestDaysLimit: 7,
//     displayValues: true,
//     displayOptions: {
//         displayPosition: 'bottomleft',
//         displayEmptyString: 'No wind data'
//     },
//     // overlayName: 'Wind',

//     // https://github.com/danwild/wind-js-server
//     pingUrl: '',
//     latestUrl: '',
//     nearestUrl: '',
//     errorCallback: handleError
// });

 /*
// var API_Openweathermap = '6cd5c4340fca7218c97d24293acf7918';
var API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
var Temp3 = "";
	Temp3 += "-65:821692;"
	Temp3 += "-55:821692;"
	Temp3 += "-45:821692;"
	Temp3 += "-40:821692;"
	Temp3 += "-30:8257db;"
	Temp3 += "-20:208cec;"
	Temp3 += "-10:20c4e8;"
	Temp3 += "0:4eb095;"
	Temp3 += "5:5bc84c;"
	Temp3 += "10:b8db41;"
	Temp3 += "15:e0ce38;"
	Temp3 += "20:df9f41;"
	Temp3 += "25:dc6d55;"
	Temp3 += "30:b73466;"
	Temp3 += "40:6b1527;"
	Temp3 += "50:2b0001"

var Wind_Map_url = 'https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5';
var Temperature_Map_url = 'https://{s}.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette='+Temp3;
var Relative_Humidity_url = 'https://{s}.sat.owm.io/vane/2.0/weather/HRD0/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=0:ad5538;30:ad6e38;40:ad9238;50:69ad38;60:38ad79;70:38aead;75:38a0ad;80:389dad;83:3894ad;87:3887ad;90:3884ad;93:387bad;97:38629d;100:384672';
var Accumulated_Precipitation_Rain_url = 'https://{s}.sat.owm.io/vane/2.0/weather/PAR0/{z}/{x}/{y}?fill_bound=true&opacity=1&palette=0:6f6f6f;0.6:3c74a0;6:3ba1a1;8:3ba13d;10:82a13b;15:a1a13b;20:a13b3b;31:a13ba1;50:a8a8a8&appid='+API_Openweathermap;
var Atmospheric_Pressure_Mean_url = 'https://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}?fill_bound=true&opacity=1&pallette=990:8eb3b8;995:68b4b3;1000:45a7a6;1003:398393;1006:397693;1009:395b93;1015:3a7535;1019:9fa141;1022:ad8839;1025:aa5443;1030:5e3c51&appid='+API_Openweathermap;
var Cloudiness_url = 'https://{s}.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=0:928246;10:847746;30:747474;80:adb7b6;95:bec1c1;100:d5d5cd';

var PAC0_url = 'https://{s}.sat.owm.io/vane/2.0/weather/PAC0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
var PR0_url = 'https://{s}.sat.owm.io/vane/2.0/weather/PR0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
var PA0_url = 'https://{s}.sat.owm.io/vane/2.0/weather/PA0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
var PAS0_url = 'https://{s}.sat.owm.io/vane/2.0/weather/PAS0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap+'&palette=0:616161;1:455298;10:41a5a7;20:418d41;50:a8a841;80:aa7e3f;120:a74141;200:a841a8';
var SD0_url = 'https://{s}.sat.owm.io/vane/2.0/weather/SD0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap+'&palette=0:616161;1:455298;10:41a5a7;20:418d41;50:a8a841;80:aa7e3f;120:a74141;200:a841a8';
var WND_url = 'https://{s}.sat.owm.io/vane/2.0/weather/WND/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
var TD2_url = 'https://{s}.sat.owm.io/vane/2.0/weather/TD2/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
var TS0_url = 'https://{s}.sat.owm.io/vane/2.0/weather/TS0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
var TS10_url = 'https://{s}.sat.owm.io/vane/2.0/weather/TS10/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap;
*/

// Color Of Temperature
// -70:734669;
// -55:CAACC3;
// -40:A24691;
// -25:8F59A9;
// -15:9DDBD9;
// -8:6ABFB5;
// -4:64A6BD
// 0:5D85C6
// 1:447D63
// 10:809318
// 21:F3B704
// 30:E85319
// 47:470E00

// Color Of Wind Speed 
// 0:6271B7
// 4:39619F
// 11:4A94A9
// 18:4D8D7B
// 25:53A553
// 32:359F35
// 40:A79D51
// 47:9F7F3A
// 54:A16C5C
// 61:813A4E
// 68:AF5088
// 76:755088
// 86:6D61A3
// 97:44698D
// 104:5C9098
// 130:7D44A5
// 166:
// 184:
// 277:
// 374:

// Relative_humidity
// 0:ad5538
// 30:ad6e38
// 40:ad9238
// 50:69ad38
// 60:38ad79
// 70:38aead
// 75:38a0ad
// 80:389dad
// 83:3894ad
// 87:3887ad
// 90:3884ad
// 93:387bad
// 97:38629d
// 100:384672

// Accumulated_Precipitation_Rain
// 0:6f6f6f
// 0.6:3c74a0
// 6:3ba1a1
// 8:3ba13d
// 10:82a13b
// 15:a1a13b
// 20:a13b3b
// 31:a13ba1
// 50:a8a8a8

// Atmospheric pressure on mean sea level   (hPa)
// 990:8eb3b8
// 995:68b4b3
// 1000:45a7a6
// 1003:398393
// 1006:397693
// 1009:395b93
// 1015:3a7535
// 1019:9fa141
// 1022:ad8839
// 1025:aa5443
// 1030:5e3c51

// Cloudiness
// 0:928246
// 10:847746
// 30:747474
// 80:adb7b6
// 90:bec1c1
// 100:d5d5cd