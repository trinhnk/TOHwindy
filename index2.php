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
</script>
<style>
	.leaflet-control-zoom, 
	.custom-bar{
		width: 20%;
		height: 20%;
	}
</style>
</body>
</html>
