var mapCenter = [20.998128, 105.794390];

function initWindyMap(){

    var API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
    // var API_Openweathermap = '6cd5c4340fca7218c97d24293acf7918';
    // var Wind_Map = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5',{
    //     maxZoom: 11,
    //     minZoom: 3,
    // });
    var Wind_Map = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5',{
        maxZoom: 11,
        minZoom: 3,
    });

    var Wind_Map1 = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6271B7;1:86a3ab;2:7f97b9;3:6e90d0;5:0f94a7;8:39a239;10:c2863e;14:c8420d;17:d20032;21:af5088;25:754a92;29:45698d;33:c2fb78;43:f1ff6c',{
        maxZoom: 11,
        minZoom: 3,
    });
    var Wind_Map2 = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette=0:6a6583;1:6968ab;2:4a68b7;4:4795ae;7:50af7e;10:4abf48;12:ccd83f;14:dac13f;16:da9e47;18:d5774c;22:c74770;26:a3355a;30:921f52;34:651b1d;38:2b0001',{
        maxZoom: 11,
        minZoom: 3,
    });
    var Wind3 = "";
        Wind3 += "0:8398f7;"
        Wind3 += "1:5997f7;"
        Wind3 += "3:6cd6f5;"
        Wind3 += "5:85f2d4;"
        Wind3 += "7:7af57a;"
        Wind3 += "9:52f252;"
        Wind3 += "11:f5e676;"
        Wind3 += "13:f5c256;"
        Wind3 += "15:f5a289;"
        Wind3 += "17:f06c91;"
        Wind3 += "19:ed6db9;"
        Wind3 += "21:b874e8;"
        Wind3 += "24:9e8ced;"
        Wind3 += "27:71aeeb;"
        Wind3 += "29:90e3f0;"
        Wind3 += "36:b964f5;"
        Wind3 += "46:e7d7d7"
    var Wind_Map3 = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=1&fill_bound=true&palette='+Wind3,{
        maxZoom: 11,
        minZoom: 3,
    });
    var Temperature_Map = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=-70:734669;-55:CAACC3;-40:A24691;-25:8F59A9;-15:9DDBD9;-8:6ABFB5;-4:64A6BD;0:5D85C6;1:447D63;10:809318;21:F3B704;30:E85319;45:470E00',{
        maxZoom: 11,
        minZoom: 3,
    })
    var Temperature_Map2 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=-30:683091;-20:0c4d9f;-10:1081c5;0:009090;10:00a652;15:67bc45;20:fcf103;25:ffbd11;28:f68922;30:ef4c2d;35:ee2b31;40:c81688',{
        maxZoom: 11,
        minZoom: 3,
    })

    // Temperature map 3
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
    var Temperature_Map3 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette='+Temp3,{
        maxZoom: 11,
        minZoom: 3,
    })

    var Relative_Humidity	 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=0:ad5538;30:ad6e38;40:ad9238;50:69ad38;60:38ad79;70:38aead;75:38a0ad;80:389dad;83:3894ad;87:3887ad;90:3884ad;93:387bad;97:38629d;100:384672',{
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

    var PAC0 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/PAC0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var PR0 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var PA0 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/PA0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var PAS0 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/PAS0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var SD0 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/SD0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var WND = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var TD2 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TD2/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var TS0 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TS0/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })
    var TS10 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TS10/{z}/{x}/{y}?fill_bound=true&opacity=1&appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
    })

    var overlayLayer = {
        // "(PAC0) Convective precipitation" : PAC0,
        // "(PR0) Precipitation intensity" : PR0,
        // "(PA0) Accumulated precipitation" : PA0,
        // "(PAR0) Accumulated Precipitation Rain" : Accumulated_Precipitation_Rain,
        // "(PAS0) Accumulated precipitation - snow" : PAS0,
        // "(SD0) Depth of snow" : SD0,
        "(WS10) Wind Map" : Wind_Map1,
        "Wind_Map2" : Wind_Map2,
        "Wind_Map" : Wind_Map,
        "Wind_Map3" : Wind_Map3,
        // "(WND) Joint display of speed wind and wind direction" : WND,
        "(APM) Pressure" : Atmospheric_Pressure_Mean,
        "(TA2) Temperature Map" : Temperature_Map,
        "Temperature_Map2" : Temperature_Map2,
        "Temperature_Map3" : Temperature_Map3,
        // "(TD2) Temperature of a dew point" : TD2,
        // "(TS0) Soil temperature 0-10 сm" : TS0,
        // "(TS10) Soil temperature >10 сm" : TS10,
        "(HRD0) Relative Humidity" : Relative_Humidity,
        // "(CL) Cloudiness" : Cloudiness,
    }

    // var geojsonTileLayer = new L.LoadCityNameJSON('https://tiles.windy.com/labels/v1.3/en/{z}/{x}/{y}.json',{
    var geojsonTileLayer = new L.LoadCityNameJSON('../resource/json/{z}/{x}/{y}.json',{
        maxZoom: 11,
        minZoom: 3,
    });

    // var Windy_Map = L.tileLayer('https://tiles.windy.com/tiles/v9.0/darkmap/{z}/{x}/{y}.png',{
    var Windy_Map = L.tileLayer('../resource/images/{z}/{x}/{y}.png',{
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
            // Wind_Map, 
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

var mapStuff = initWindyMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

var markerGroup = L.layerGroup().addTo(map);
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

// Color Of Wind Speed 2
// 0:86a3ab
// 6:7f97b9
// 12:6e90d0
// 20:0f94a7
// 29:39a239
// 39:c2863e
// 50:c8420d
// 62:d20032
// 75:af5088
// 89:754a92
// 103:45698d
// 118:c2fb78
// 154:f1ff6c


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

// Atmospheric pressure on mean sea level	(hPa)
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