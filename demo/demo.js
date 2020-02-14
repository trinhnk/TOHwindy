// var geojsonTileLayer = new L.LoadCityNameJSON('https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json',
//     {
//         maxZoom: 11,
//         minZoom: 3,
//     }
// );
var mapCenter = [20.998128, 105.794390];
// var mapCenter = [82.894, 105.794390];

function initWindyMap(){

    var API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
    // var API_Openweathermap = '6cd5c4340fca7218c97d24293acf7918';
    // var Wind_Map_2 = L.tileLayer('https://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid='+API_Openweathermap,{
    //     maxZoom: 11,
    //     minZoom: 3,
    //     opacity: 0.7
    // });
    var Wind_Map = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5',{
        maxZoom: 11,
        minZoom: 3,
    });
    // var Temperature_Map_2 = L.tileLayer('https://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid='+API_Openweathermap,{
    //     maxZoom: 11,
    //     minZoom: 3,
    //     opacity: 1
    // })
    var Temperature_Map = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=-70:734669;-55:CAACC3;-40:A24691;-25:8F59A9;-15:9DDBD9;-8:6ABFB5;-4:64A6BD;0:5D85C6;1:447D63;10:809318;21:F3B704;30:E85319;45:470E00',{
        maxZoom: 11,
        minZoom: 3,
    })
    var Relative_Humidity    = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=0:ad5538;30:ad6e38;40:ad9238;50:69ad38;60:38ad79;70:38aead;75:38a0ad;80:389dad;83:3894ad;87:3887ad;90:3884ad;93:387bad;97:38629d;100:384672',{
        maxZoom: 11,
        minZoom: 3,
    })
    var Accumulated_Precipitation_Rain = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/PAR0/{z}/{x}/{y}?fill_bound=true&opacity=1&palette=0:6f6f6f;0.6:3c74a0;6:3ba1a1;8:3ba13d;10:82a13b;15:a1a13b;20:a13b3b;31:a13ba1;50:a8a8a8&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Atmospheric_Pressure_Mean = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/APM/{z}/{x}/{y}?fill_bound=true&opacity=1&pallette=990:8eb3b8;995:68b4b3;1000:45a7a6;1003:398393;1006:397693;1009:395b93;1015:3a7535;1019:9fa141;1022:ad8839;1025:aa5443;1030:5e3c51&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var Cloudiness = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/CL/{z}/{x}/{y}?fill_bound=true&opacity=1&pallette=0:928246;10:847746;30:747474;80:adb7b6;90:bec1c1;100:d5d5cd&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var overlayLayer = {
        '<center><i class="fas fa-wind icons-font" id="wind_map"><span class="tooltiptext">Bản đồ Gió</span></i></center> ' : Wind_Map,
        '<center><i class="fas fa-thermometer-three-quarters icons-font"  id="temperature_map"><span class="tooltiptext">Bản đồ Nhiệt</span></i></center> ' : Temperature_Map,
        '<center><i class="fas fa-user-alt icons-font"  id="relative_humidity"><span class="tooltiptext">Bản đồ Dân Cư</span></i></center>' : Relative_Humidity,
        '<center><i class="fas fa-cloud-sun-rain icons-font"  id="accumulated_precipitation_rain"><span class="tooltiptext">Bản đồ Lượng Mưa</span></i></center>' : Accumulated_Precipitation_Rain,
        '<center><i class="fas fa-angle-double-down icons-font"  id="atmospheric_Pressure_Mean"><span class="tooltiptext">Bản đồ Áp Suất</span></i></center>' : Atmospheric_Pressure_Mean,
        '<center><i class="fas fa-cloud icons-font"  id="cloudiness" ><span class="tooltiptext">Bản đồ Mây</span></i></center>' : Cloudiness,
    }

    // var jsonCityURL = 'https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json';
    // var geojsonTileLayer = new L.TileLayer.GeoJSON(jsonCityURL);
    // map.addLayer(geojsonTileLayer);
    // var jsonCityURL = 'https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json';
    var geojsonTileLayer = new L.LoadCityNameJSON('https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json',{
        maxZoom: 11,
        minZoom: 3,
    });

    // var tempByCity = new L.LoadTempByCity('https://ims-s.windy.com/forecast/citytile/v1.3/gfs/{z}/{x}/{y}',{
    //     maxZoom: 11,
    //     minZoom: 3,
    // })

    var Windy_Map = L.tileLayer('https://tiles.windy.com/tiles/v9.0/darkmap/{z}/{x}/{y}.png',{
        maxZoom: 11,
        minZoom: 3
    });
    var baseLayers = {
        // "City" : geojsonTileLayer,
        "Windy Map" : Windy_Map,
    };

    var map = L.map('map', {
        layers: [ 
            Windy_Map, 
            Temperature_Map, 
            geojsonTileLayer 
        ],
        closePopupOnClick: false
    });

    var layerControl = L.control.layers(overlayLayer, baseLayers);
    layerControl.addTo(map);
    // geojsonTileLayer.addTo(map);
    // tempByCity.addTo(map);

    map.setView([56.450,113.027], 3);
    // map.setView(mapCenter, 3);

    // var d =new Date();
    // var now = d.getTime();
    // console.log(now);

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
// var tempMarker = L.layerGroup().addTo(map);
// setTimeout(function(){ markerGroup = L.layerGroup().addTo(map)}, 3000);

map.on('zoomend',function(e){
    map.removeLayer(markerGroup);
    markerGroup = L.layerGroup().addTo(map);
    // map.removeLayer(tempMarker);
    // tempMarker = L.layerGroup().addTo(map);
});
// map.on('drag', function(e){
//     // console.log(map.getCenter().lat)
//     mapCenter = [map.getCenter().lat, map.getCenter().lng]
// });
// map._onResize(5); 
// map.setView(mapCenter, 5);
// map.addLayer(geojsonTileLayer);
// map.removeLayer(geojsonTileLayer);
// map.on('zoomend',function(e){
//     map.removeLayer(geojsonTileLayer);
//     geojsonTileLayer = new L.LoadCityNameJSON('https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json',{
//             maxZoom: 11,
//             minZoom: 3,
//     });
//     geojsonTileLayer.addTo(map);
// });


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

    // https://github.com/danwild/wind-js-server
    pingUrl: 'http://localhost:7000/alive',
    latestUrl: 'http://localhost:7000/latest',
    nearestUrl: 'http://localhost:7000/nearest',
    errorCallback: handleError
});

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