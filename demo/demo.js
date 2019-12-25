
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
    var Ventusky = L.tileLayer('https://cdnstatic.ventusky.com/tiles/v1.1/land//{z}/{x}/{y}.png',{
        maxZoom: 9,
        minZoom: 3
    });

    var baseLayers = {
        "Satellite": Esri_WorldImagery,
        "Grey Canvas": Esri_DarkGreyCanvas,
        "Windy Map" : Windy_Map,
        "Open Street Map" : Open_Street_Map,
        "World Dark Gray" : World_Dark_Gray,
        "Wind Finder" : Wind_Finder,
        "Ventusky" : Ventusky,
    };

    var map = L.map('map', {
        layers: [ Windy_Map ]
    });

    var layerControl = L.control.layers(baseLayers);
    layerControl.addTo(map);
    map.setView([20.998029,105.7924504], 5);

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
	pingUrl: 'http://localhost:7000/alive',
	latestUrl: 'http://localhost:7000/latest',
	nearestUrl: 'http://localhost:7000/nearest',
	errorCallback: handleError
});