
function initDemoMap(){

    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        // 'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        maxZoom: 17,
        minZoom: 3
    });

    var Esri_DarkGreyCanvas = L.tileLayer(
        "http://{s}.sm.mapstack.stamen.com/" + "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" + "{z}/{x}/{y}.png",{
            // attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
            // 'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            maxZoom: 20,
            minZoom: 3
        }
    );

    var Windy_Map = L.tileLayer('https://tiles.windy.com/tiles/v9.0/darkmap/{z}/{x}/{y}.png',{
        maxZoom: 11,
        minZoom: 3
    });
    var Open_Street_Map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 19,
        minZoom: 3
    });
    var World_Dark_Gray = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',{
        maxZoom: 16,
        minZoom: 3
    });
    var Wind_Finder = L.tileLayer('https://bgcdn.windfinder.com/v1/{z}/{x}/{y}.png',{
        maxZoom: 11,
        minZoom: 3
    });
    var mapboxAccessToken = 'pk.eyJ1IjoidHJpbmhuayIsImEiOiJjazRjN3E5YTAwMDBjM2tvbmhldDZsNzRtIn0.MfQ6ZKAzZeAtQSomiOofeQ';
    var mapboxId = '';
        // mapboxId = 'mapbox/light-v9';
        mapboxId = 'mapbox/streets-v11';
    var Mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/'+mapboxId+'/tiles/{z}/{x}/{y}?access_token='+mapboxAccessToken,{
        maxZoom: 18,
        minZoom: 3
    });
    var Mapbox_Satellite = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token='+mapboxAccessToken,{
        maxZoom: 18,
        minZoom: 3
    });

    var baseLayers = {
        "Satellite": Esri_WorldImagery,
        "Grey Canvas": Esri_DarkGreyCanvas,
        "Windy Map" : Windy_Map,
        "Open Street Map" : Open_Street_Map,
        "World Dark Gray" : World_Dark_Gray,
        "Wind Finder" : Wind_Finder,
        "Mapbox" : Mapbox,
        "Mapbox Satellite" : Mapbox_Satellite
    };

    // var API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
    var API_Openweathermap = '98316091cc504d68bacff0c7a6f73e20';
    var Wind_Map_2 = L.tileLayer('https://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    });
    var Wind_Map = L.tileLayer('https://{s}.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid='+API_Openweathermap+'&opacity=0.9&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5',{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    });
    var Temperature_Map_2 = L.tileLayer('https://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid='+API_Openweathermap,{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    })
    var Temperature_Map = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=-70:734669;-55:CAACC3;-40:A24691;-25:8F59A9;-15:9DDBD9;-8:6ABFB5;-4:64A6BD;0:5D85C6;1:447D63;10:809318;21:F3B704;30:E85319;45:470E00',{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    })
    var Relative_Humidity	 = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/HRD0/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=1&palette=0:ad5538;30:ad6e38;40:ad9238;50:69ad38;60:38ad79;70:38aead;75:38a0ad;80:389dad;83:3894ad;87:3887ad;90:3884ad;93:387bad;97:38629d;100:384672',{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    })
    var overlayLayer = {
        "Wind Map" : Wind_Map,
        "Wind Map 2" : Wind_Map_2,
        "Temperature Map" : Temperature_Map,
        "Temperature Map 2" : Temperature_Map_2,
        "Relative Humidity" : Relative_Humidity
    }

    var map = L.map('map', {
        layers: [ Windy_Map ]
    });

    var layerControl = L.control.layers(baseLayers, overlayLayer);
    layerControl.addTo(map);
    map.setView([20.998029,105.7924504], 5);

    // var greenIcon = L.icon({
    //     iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    //     shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
    //     iconSize:     [38, 95], // size of the icon
    //     shadowSize:   [50, 64], // size of the shadow
    //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    //     shadowAnchor: [4, 62],  // the same for the shadow
    //     popupAnchor:  [-3, -76]
    // })
    // L.marker([20.998029,105.7924504], {icon: greenIcon}).addTo(map);

    return {
        map: map,
        layerControl: layerControl
    };
}

function temperatureToColor(degrees){
    return degrees < -20  ? 'rgb(149, 137, 211)' : degrees < -10  ? 'rgb(150, 209, 216)' : degrees < 	0  ? 'rgb(103, 180, 186)' : degrees <  10  ? 'rgb(80, 140, 62)' : degrees <  20  ? 'rgb(171, 161, 14)' : degrees <  30  ? 'rgb(243, 150, 6)' : degrees <  40  ? 'rgb(190, 65, 18)' : 'rgb(138, 43, 10)';
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

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
    // pingUrl: 'http://localhost:7000/alive',
    pingUrl: 'http://144.6.233.100:7000/alive/',
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