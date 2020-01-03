
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
    // var mapboxId = '';
        // mapboxId = 'mapbox/light-v9';
        // mapboxId = 'mapbox/streets-v11';
    // var Mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/'+mapboxId+'/tiles/{z}/{x}/{y}?access_token='+mapboxAccessToken,{
    //     maxZoom: 18,
    //     minZoom: 3
    // });
    // var Mapbox_Satellite = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token='+mapboxAccessToken,{
    //     maxZoom: 18,
    //     minZoom: 3
    // });
    
    var baseLayers = {
        // "Satellite": Esri_WorldImagery,
        // "Grey Canvas": Esri_DarkGreyCanvas,
        "Windy Map" : Windy_Map,
        // "Open Street Map" : Open_Street_Map,
        // "World Dark Gray" : World_Dark_Gray,
        // "Wind Finder" : Wind_Finder,
        // "Mapbox" : Mapbox,
        // "Mapbox Satellite" : Mapbox_Satellite
    };

    var API_Openweathermap = '542ffd081e67f4512b705f89d2a611b2';
    var Wind_Map = L.tileLayer('http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid='+API_Openweathermap+'&fill_bound=true&opacity=0.6&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014',{
        maxZoom: 11,
        minZoom: 3,
        opacity: 1
    });
    var overlayLayer = {
        "Wind Map" : Wind_Map,
    }

    var map = L.map('map', {
        layers: [ Windy_Map ]
    });

    var layerControl = L.control.layers(overlayLayer, baseLayers);
    layerControl.addTo(map);
    map.setView([20.998029,105.7924504], 5);

    // var geojsonLayer = new L.GeoJSON.AJAX('countries.geo.json');
    // console.log(geojsonLayer)
    // geojsonLayer.addTo(map);

    return {
        map: map,
        layerControl: layerControl
    };
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