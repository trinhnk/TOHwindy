<!doctype html>
<html>
<head>
	<title>Windy Leaflet</title>
	<meta charset="utf-8">
</head>
<body>
	<?php $resource_url = 'http://resource.goweatherradar.com/';?>
	<?php $resource_url = 'http://mylocal.com/tohwindy/';?>
	
	<div id="map"></div>
	<div id="temp"></div>

	<script src="<?php echo $resource_url;?>dist/jquery/1.9.1/jquery.min.js"></script>

	<!-- Leaflet 0.7.7 -->
	<link rel="stylesheet" href="<?php echo $resource_url;?>dist/leaflet/0.7.7/leaflet.css">
	<script src="<?php echo $resource_url;?>dist/leaflet/0.7.7/leaflet.js"></script>

	<!--wind-js-leaflet-->
	<link rel="stylesheet" href="<?php echo $resource_url;?>dist/wind-js-leaflet.css" />
	<script src="<?php echo $resource_url;?>dist/wind-js-leaflet.js"></script>

	<!-- Leaflet TileLayer GeoJSON -->
	<script src="<?php echo $resource_url;?>dist/load-city-name-json.js"></script>

	<!-- CSS Thêm Mới -->
	<!-- <script src="/dist/font/kit.fontawesome.js"></script> -->
	<!-- <script src="/dist/jquery/3.4.1/jquery.min.js"></script> -->
	<link rel="stylesheet" href="<?php echo $resource_url;?>dist/fontawesome-free-5.12.1/css/all.css"/>
	<link rel="stylesheet" href="<?php echo $resource_url;?>dist/css/my_css.css" />

	<?php 
		define('FCPATH', dirname(__FILE__).DIRECTORY_SEPARATOR);
		
		$version = file_get_contents(FCPATH.'version.txt');
		copy (FCPATH.'style.css', FCPATH.'assets/'.$version.'_style.css');
		copy (FCPATH.'jscript.js', FCPATH.'assets/'.$version.'_jscript.js');
	?>
	<link rel="stylesheet" href="<?php echo $resource_url;?>assets/<?php echo $version;?>_style.css" />
	<script src="<?php echo $resource_url;?>assets/<?php echo $version;?>_jscript.js"></script>
	
	<script>
		function check_checkbox(callback){
			var checkbox_arrs = $('input[type=checkbox]');
			if(checkbox_arrs && checkbox_arrs[1]){
				callback();
			}else{
				setTimeout(function(){
					check_checkbox();
				}, 100);
			}
		}
		$(document).ready(function(){
			check_checkbox(function(){
				$('input[type=checkbox]')[1].click();
				$('input[type=checkbox]').attr( "disabled", "disabled" );
				
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
			});
		});
	</script>
</body>
</html>
