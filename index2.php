<!doctype html>
<html>
<head>
	<title>Windy Leaflet</title>
	<meta charset="utf-8">
	<!-- <meta http-equiv="refresh" content="1; URL=http://45.79.69.97/TOHwindy/demo/demo.html"> -->

</head>
<body>

<div id="map"></div>
<div id="temp"></div>

<!--vendor-->
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->
<script src="dist/jquery/1.9.1/jquery.min.js"></script>

<!-- Leaflet 0.7.7 -->
<link rel="stylesheet" href="dist/leaflet/0.7.7/leaflet.css">
<script src="dist/leaflet/0.7.7/leaflet.js"></script>

<!--wind-js-leaflet-->
<link rel="stylesheet" href="dist/wind-js-leaflet.css" />
<script src="dist/wind-js-leaflet.js"></script>

<!-- Leaflet TileLayer GeoJSON -->
<script src="dist/load-city-name-json.js"></script>

<!--demo-->
<link rel="stylesheet" href="demo.css" />
<script src="demo.js"></script>

<!-- CSS Thêm Mới -->
<script src="https://kit.fontawesome.com/9cf251c4ce.js" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<link rel="stylesheet" href="css/my_css.css" />

<script>
	// // $('input[type=checkbox]')[2].click();
	$('input[type=checkbox]')[1].click();
	$('input[type=checkbox]').attr( "disabled", "disabled" );

	// $('input[type=checkbox]')[1].css('display', 'none');
	// // $('input[type=radio]')[0].click();
	
	$('#temp').attr("style","display:none;"); //ẩn div có id="temp"
	$('.leaflet-left').addClass('leaflet-right').removeClass('leaflet-left'); //Add class leaflet-right & xóa class leaflet-right trên site, tốt nhất là ghi đè vào js thì ok hơn
	$('.leaflet-control-layers').addClass('leaflet-control-layers-expanded custom-bar'); //add class custom-bar vào select bản đồ
	$('.leaflet-control-layers').mouseout(function(){
	 	$('.leaflet-control-layers').addClass('leaflet-control-layers-expanded custom-bar'); //add class custom-bar vào select bản đồ
	 });

	$('.leaflet-control-layers-overlays').attr( "style", "display:none;" ); // Ẩn các bar thừa
	$('.leaflet-control-layers-separator').attr( "style", "display:none;" );// Ẩn các bar thừa

	// active icons by click
	$('.icons-font').click(function(){
		$('.icons-font-active').addClass('icons-font').removeClass('icons-font-active'); //xóa tất cả class 'icons-font-active' thay bằng 'icons-font'
		$(this).removeClass('icons-font').addClass('icons-font-active'); // chuyển icons-font thành icons-font-active khi click
	});

	var W = new Object();
        W.store = new Object();
        W.maps = new Object();
        W.maps.setView = function(latlng){
            map.setView([latlng[0], latlng[1]], 5);
            // window.location.href = "http://radar.tohapp.com/en/apiv2/tohWeather.php?lat="+latlng[0]+"&lng="+latlng[1]+"&z=8&overlay="+currentOverlay;
        }

        W.store.set = function(key, value){
            if(key == "overlay" && value == "clouds"){
                $('#cloudy-layout').click()
            }else if(key == "overlay" && value == "rain"){
                $('#rain-layout').click()
            }else if(key == "overlay" && value == "pressure"){
                $('#pressure-layout').click()
            }else if(key == "overlay" && value == "wind"){
                $('#windy-layout').click()
            }else if(key == "overlay" && value == "temp"){
                $('#temp-layout').click()
            }else if(key == "overlay" && value == "rh"){
                $('#humidity-layout').click()
			}
			// else if(key == "overlay" && value == "waves"){
            //     alert(7)
            // }else if(key == "overlay" && value == "currents"){
            //     alert(8)
            // }    
        }

	function returnAndroid() {
		if (typeof Android === 'undefined') {
		return;
		}else{
		return Android.returnAndroid('{"layouts" : [{"name" : "clouds"}, {"name" : "rain"}, {"name" : "pressure"}, {"name" : "wind"}, {"name" : "temp"}, {"name" : "rh"}]}');
		}
	}
	returnAndroid();
</script>
<style>
	.leaflet-top {
		top: 1%!important;
	}

	.leaflet-control, .custom-bar {
		margin-right: 10px!important;
	}

	.leaflet-bar a {
		background-color: #000000;
		/* background-color: rgba(68,65,65,0.60); */
		border-bottom: 1px solid #ccc;
		width: 30px!important;
		height: 30px!important;
		line-height: 30px!important;
		display: block;
		text-align: center;
		text-decoration: none;
		color: white;
	}
	.leaflet-control-zoom-in,
	.leaflet-control-zoom-out{
		font-size: 12px!important;
	}
	.leaflet-control-layers-expanded {
		padding: 2px!important;
		color: #333;
		background: rgba(68,65,65,0.60);
	}
	.custom-bar {
		top: 80px!important;
		display:none;
	}

	.icons-font, .icons-font-active {
		font-size: 12px!important;
		color: white;
		line-height: 12px;
		margin: 2px;
	}

	.leaflet-control-layers-expanded center{
		width: 26px!important;
		height: 26px!important;
		line-height: 26px!important;
	}

	.tooltiptext, .tooltiptext:hover {
		font-size: 9px!important;
		line-height: 30px!important;
		text-decoration: underline;
		margin-top:-23px!important;
		padding:0!important;
	}

	.icons-font-active {
		color: orange!important;
	}
</style>
</body>
</html>
