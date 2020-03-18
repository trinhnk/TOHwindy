<!doctype html>
<html>
<head>
	<title>Go Weather Radar</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<style>
		.leaflet-control-layers, .leaflet-control-zoom{
			display:none;
		}
	</style>
</head>
<body>
	<div id="map"></div>
	<div id="logo-wrapper">
		<div class="copyright">
			<div>© TOHSOFT Co.</div>
		</div>
	</div>
	<?php
		function recurse_copy($src,$dst) { 
			$dir = opendir($src); 
			@mkdir($dst); 
			while(false !== ( $file = readdir($dir)) ) { 
				if (( $file != '.' ) && ( $file != '..' )) { 
					if ( is_dir($src . '/' . $file) ) { 
						recurse_copy($src . '/' . $file,$dst . '/' . $file); 
					} 
					else { 
						copy($src . '/' . $file,$dst . '/' . $file); 
					} 
				} 
			} 
			closedir($dir); 
		} 
		
		define('FCPATH', dirname(__FILE__).DIRECTORY_SEPARATOR);
		
		$version = '20200306';
		$change_data = date('Y_m_d_H_00_00');
		
		$wind_json_date = date('Y-m-d H:40:00');
		$wind_json_date_str = date('Y_m_d_H_40_00', strtotime($wind_json_date));
		if(!@file_exists(FCPATH.'resource/wind/wind_'.$wind_json_date_str.'.json')){
			copy (FCPATH.'resource/wind/wind.json', FCPATH.'resource/wind/wind_'.$wind_json_date_str.'.json');
			$before_wind_json_date_str = date('Y_m_d_H_40_00', strtotime($wind_json_date) - 60*60);
			if(@file_exists(FCPATH.'resource/wind/wind_'.$before_wind_json_date_str.'.json')){
				@unlink(FCPATH.'resource/wind/wind_'.$before_wind_json_date_str.'.json');
			}
		}
		
		if(!@file_exists(FCPATH.'assets/'.$version.'_my_css.css')){
			copy (FCPATH.'my_css.css', FCPATH.'assets/'.$version.'_my_css.css');
		}
		if(!@file_exists(FCPATH.'assets/'.$version.'_style.css')){
			copy (FCPATH.'style.css', FCPATH.'assets/'.$version.'_style.css');
		}
		if(!@file_exists(FCPATH.'assets/'.$version.'_jscript.js')){
			copy (FCPATH.'jscript.js', FCPATH.'assets/'.$version.'_jscript.js');
		}
		if(!@file_exists(FCPATH.'assets/'.$version.'_load-city-name-json.js')){
			copy (FCPATH.'dist/load-city-name-json.js', FCPATH.'assets/'.$version.'_load-city-name-json.js');
		}
		if(!@file_exists(FCPATH.'assets/'.$version.'_wind-js-leaflet.css')){
			copy (FCPATH.'dist/wind-js-leaflet.css', FCPATH.'assets/'.$version.'_wind-js-leaflet.css');
		}
		if(!@file_exists(FCPATH.'assets/'.$version.'_wind-js-leaflet.js')){
			copy (FCPATH.'dist/wind-js-leaflet.js', FCPATH.'assets/'.$version.'_wind-js-leaflet.js');
		}
		
		$source_fontawesome = FCPATH.'dist/fontawesome-free-5.12.1';
		$des_fontawesome = FCPATH.'assets/fontawesome_'.$version;
		if(!@file_exists($des_fontawesome)){
			recurse_copy($source_fontawesome, $des_fontawesome);
		}
		
		$resource_url = 'http://goweatherradar.com/';
		$wind_json_url = 'http://goweatherradar.com/resource/wind/wind_'.$wind_json_date_str.'.json';
		$main_cache_url = 'http://cache.goweatherradar.com/cacheapi/cacheweatherapi/'.$change_data.'/';
		
		//$resource_url = 'http://winlocal.com/';
		//$wind_json_url = 'http://winlocal.com/resource/wind/wind_'.$wind_json_date_str.'.json';
		//$main_cache_url = 'http://cache.winlocal.com/cacheapi/cacheweatherapi/'.$change_data.'/';
	?>
	
	<script>
		var wind_json_url = '<?php echo $wind_json_url;?>';
		var main_cache_url = '<?php echo $main_cache_url;?>';
	</script>
	
	<link rel="stylesheet" href="<?php echo $resource_url;?>assets/<?php echo $version;?>_style.css" />
	<link rel="stylesheet" href="<?php echo $resource_url;?>assets/fontawesome_<?php echo $version;?>/css/all.css"/>
	<link rel="stylesheet" href="<?php echo $resource_url;?>assets/<?php echo $version;?>_my_css.css" />

	<script src="<?php echo $resource_url;?>dist/jquery/1.9.1/jquery.min.js"></script>

	<!-- Leaflet 0.7.7 -->
	<link rel="stylesheet" href="<?php echo $resource_url;?>dist/leaflet/0.7.7/leaflet.css">
	<script src="<?php echo $resource_url;?>dist/leaflet/0.7.7/leaflet.js"></script>

	<!--wind-js-leaflet-->
	<link rel="stylesheet" href="<?php echo $resource_url;?>assets/<?php echo $version;?>_wind-js-leaflet.css" />
	<script src="<?php echo $resource_url;?>assets/<?php echo $version;?>_wind-js-leaflet.js"></script>
	
	<!-- Leaflet TileLayer GeoJSON -->
	<script src="<?php echo $resource_url;?>assets/<?php echo $version;?>_load-city-name-json.js"></script>
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
				
				$('.leaflet-left').addClass('leaflet-right').removeClass('leaflet-left'); //Add class leaflet-right & xóa class leaflet-right trên site, tốt nhất là ghi đè vào js thì ok hơn
				$('.leaflet-control-layers').addClass('leaflet-control-layers-expanded custom-bar'); //add class custom-bar vào select bản đồ
				$('.leaflet-control-layers').mouseout(function(){
					$('.leaflet-control-layers').addClass('leaflet-control-layers-expanded custom-bar'); //add class custom-bar vào select bản đồ
				});
				
				$('.leaflet-control-layers-overlays').attr( "style", "display:none;" ); // Ẩn các bar thừa
				$('.leaflet-control-layers-separator').attr( "style", "display:none;" );// Ẩn các bar thừa
				
				$('.leaflet-control-zoom').attr( "style", "display:block;" );
				
				//Active first icon
				$('.icons-font').each(function(index, value){
					if(index == 0){
						$('.icons-font-active').addClass('icons-font').removeClass('icons-font-active'); //xóa tất cả class 'icons-font-active' thay bằng 'icons-font'
						$(this).removeClass('icons-font').addClass('icons-font-active'); // chuyển icons-font thành icons-font-active khi click
					}
				});
				// active icons by click
				$('.icons-font').click(function(){
					$('.icons-font-active').addClass('icons-font').removeClass('icons-font-active'); //xóa tất cả class 'icons-font-active' thay bằng 'icons-font'
					$(this).removeClass('icons-font').addClass('icons-font-active'); // chuyển icons-font thành icons-font-active khi click
				});
			});
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
		.leaflet-top{top:1%!important;}
		.leaflet-control, .custom-bar{margin-right:10px!important;}
		.leaflet-bar a{background-color:rgba(68,65,65,0.60);border-bottom:1px solid #ccc;width:30px!important;height:30px!important;line-height:30px!important;display:block;text-align:center;text-decoration:none;color:white;}
		.leaflet-control-zoom-in,.leaflet-control-zoom-out{font-size:12px!important;border:0!important;}
		.leaflet-control-layers-expanded{padding:2px!important;color:#333;background:rgba(68,65,65,0.60);}
		.custom-bar{top:80px!important;display:none;}
		.icons-font, .icons-font-active{font-size:12px!important;color:white;line-height:12px;margin:2px;}
		.leaflet-control-layers-expanded center{width:26px!important;height:26px!important;line-height:26px!important;}
		.tooltiptext, .tooltiptext:hover{font-size:9px!important;line-height:30px!important;text-decoration:underline;margin-top:-23px!important;padding:0!important;}
		.icons-font-active{color:orange!important;}
		.leaflet-touch .leaflet-bar{border:none;}
		.leaflet-control-zoom-in:focus, .leaflet-control-zoom-in:active, .leaflet-control-zoom-in:focus-within, .leaflet-control-zoom-in:hover, .leaflet-control-zoom-in:visited{outline:0 !important;}
		.leaflet-control-zoom-in, .leaflet-control-zoom-out{outline:0 !important;}
		.copyright{position:absolute;text-align:center;font-size:11px;color:#ffffff;font-weight:bold;pointer-events:auto;left:50%;margin-left:-41.5px;bottom:5px;text-shadow:0px 0px 5px rgba(0, 0, 0, 0.7);}
	</style>
</body>
</html>
