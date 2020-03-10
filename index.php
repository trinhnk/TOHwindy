<!doctype html>
<html>
<head>
	<title>Go Weather Radar</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
		
		$version = file_get_contents(FCPATH.'version.txt');
		//$change_data = file_get_contents(FCPATH.'change_data.txt');
		//$change_data = date('Y_m_d_H_i_00', strtotime(date('Y-m-d H:00:00')) + ((int)date('i') - (int)date('i')%5) * 60);
		$change_data = date('Y_m_d_H');
		
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
		
		//$resource_url = 'http://mylocal.com/tohwindy/';
		//$wind_json_url = 'http://mylocal.com/tohwindy/resource/wind/wind_'.$wind_json_date_str.'.json';
		//$main_cache_url = 'http://mylocal.com/cacheapi/cacheweatherapi/'.$change_data.'/';
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
