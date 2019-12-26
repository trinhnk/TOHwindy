
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
        maxZoom: 20,
        minZoom: 3
    });
    var Mapbox_Satellite = L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token='+mapboxAccessToken,{
        maxZoom: 20,
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

    var Wind_Map = L.tileLayer('https://a.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=06aac0fd4ba239a20d824ef89602f311',{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    });
    var Temperature_Map = L.tileLayer('https://b.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid=06aac0fd4ba239a20d824ef89602f311',{
        maxZoom: 11,
        minZoom: 3,
        opacity: 0.7
    })
    var overlayLayer = {
        "Wind Map" : Wind_Map,
        "Temperature Map" : Temperature_Map
    }

    var map = L.map('map', {
        layers: [ Windy_Map ]
    });

    var layerControl = L.control.layers(baseLayers, overlayLayer);
    layerControl.addTo(map);
    map.setView([20.998029,105.7924504], 5);

    var greenIcon = L.icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76]
    })
    L.marker([20.998029,105.7924504], {icon: greenIcon}).addTo(map);

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