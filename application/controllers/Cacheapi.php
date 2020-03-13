<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cacheapi extends CI_Controller {
	public function cacheweatherapi($change_date, $type, $s, $z, $x, $y, $file_name){
		$API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
		$this->load->helper('url');
		
		$type = strtolower($type);
		
		$wind_color = '';
		$wind_color .= '0:5270f8;';
		$wind_color .= '1:1d5d95;';
		$wind_color .= '3:29d1ff;';
		$wind_color .= '5:0ed099;';
		$wind_color .= '7:27d827;';
		$wind_color .= '9:25a825;';
		$wind_color .= '11:c6b535;';
		$wind_color .= '13:966c12;';
		$wind_color .= '15:d07357;';
		$wind_color .= '17:900029;';
		$wind_color .= '19:ce0078;';
		$wind_color .= '21:6300aa;';
		$wind_color .= '24:3818c8;';
		$wind_color .= '27:2370be;';
		$wind_color .= '29:048da2;';
		$wind_color .= '36:7000c0';
		
		$temperature_color = '';
		$temperature_color .= '-70:1125a6;';
		$temperature_color .= '-55:8391ee;';
		$temperature_color .= '-40:315cc8;';
		$temperature_color .= '-25:4a61ca;';
		$temperature_color .= '-15:7afffb;';
		$temperature_color .= '-8:6abfb7;';
		$temperature_color .= '-4:64a5bd;';
		$temperature_color .= '0:5d85c6;';
		$temperature_color .= '1:006436;';
		$temperature_color .= '10:2de02a;';
		$temperature_color .= '21:ffe136;';
		$temperature_color .= '30:ff4014;';
		$temperature_color .= '45:880000';
		
		$humidity_color = '';
		$humidity_color .= '0:ce3700;';
		$humidity_color .= '30:c95d00;';
		$humidity_color .= '40:bc9100;';
		$humidity_color .= '50:55c700;';
		$humidity_color .= '60:02c970;';
		$humidity_color .= '70:03b5b3;';
		$humidity_color .= '75:06a1b5;';
		$humidity_color .= '80:3b9cac;';
		$humidity_color .= '83:3c93ac;';
		$humidity_color .= '87:3a86ab;';
		$humidity_color .= '90:3b83ac;';
		$humidity_color .= '93:3b7aac;';
		$humidity_color .= '97:3b629c;';
		$humidity_color .= '100:3b4871';
		
		$rain_color = '';
		$rain_color .= '0:b1b1b1;';
		$rain_color .= '0.6:2b7dc0;';
		$rain_color .= '6:3ebccb;';
		$rain_color .= '8:3ea040;';
		$rain_color .= '10:82a03d;';
		$rain_color .= '15:a0a03d;';
		$rain_color .= '20:9f3d3d;';
		$rain_color .= '31:db59db;';
		$rain_color .= '50:d7d7d7';
		
		$pressure_color = '';
		$pressure_color .= '99000:16e0ff;';
		$pressure_color .= '99500:19d3d0;';
		$pressure_color .= '100000:1abdbb;';
		$pressure_color .= '100300:1493b0;';
		$pressure_color .= '100600:137fb5;';
		$pressure_color .= '100900:1f5fcd;';
		$pressure_color .= '101500:199f00;';
		$pressure_color .= '101900:a9ad00;';
		$pressure_color .= '102200:dc9e1d;';
		$pressure_color .= '102500:e94728;';
		$pressure_color .= '103000:820053';
		
		$cloud_color = '';
		$cloud_color .= '0:b0965a;';
		$cloud_color .= '10:988b5a;';
		$cloud_color .= '30:888888;';
		$cloud_color .= '80:adb7b6;';
		$cloud_color .= '90:bec1c1;';
		$cloud_color .= '100:d5d5cd';
		
		$snow_color = '';
		$snow_color .= '0:4a4a4a;';
		$snow_color .= '2:3449b2;';
		$snow_color .= '10:1fb3b6;';
		$snow_color .= '20:218c21;';
		$snow_color .= '50:c0c02e;';
		$snow_color .= '80:c28633;';
		$snow_color .= '120:b42828;';
		$snow_color .= '500:ce5bce';
		
		$time = strtotime(date('Y-m-d H:00:00'));
		$hour = (int)date('H', $time);
		$hour = $hour % 3;
		$time = $time - $hour*60*60;
		$cur_time = strtotime(date('Y-m-d H:i:s'));
		
		$Wind_Map = 'http://maps.openweathermap.org/maps/2.0/weather/WS10/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&opacity=1&fill_bound=true&palette='.$wind_color;
		$Temperature_Map = 'http://maps.openweathermap.org/maps/2.0/weather/TA2/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$temperature_color;
		$Relative_Humidity = 'http://maps.openweathermap.org/maps/2.0/weather/HRD0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$humidity_color;
		$Accumulated_Precipitation_Rain = 'http://maps.openweathermap.org/maps/2.0/weather/PAR0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&palette='.$rain_color.'&appid='.$API_Openweathermap;
		$Atmospheric_Pressure_Mean = 'https://a.sat.owm.io/vane/2.0/weather/APM/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$pressure_color;
		$Cloudiness = 'http://maps.openweathermap.org/maps/2.0/weather/CL/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$cloud_color;
		
		$PAC0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PAC0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$PR0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PR0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$PA0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PA0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$PAS0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PAS0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap.'&palette=0:616161;1:455298;10:41a5a7;20:418d41;50:a8a841;80:aa7e3f;120:a74141;200:a841a8';
		$SD0_url = 'http://maps.openweathermap.org/maps/2.0/weather/SD0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap.'&palette='.$snow_color;
		$WND_url = 'http://maps.openweathermap.org/maps/2.0/weather/WND/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$TD2_url = 'http://maps.openweathermap.org/maps/2.0/weather/TD2/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$TS0_url = 'http://maps.openweathermap.org/maps/2.0/weather/TS0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$TS10_url = 'http://maps.openweathermap.org/maps/2.0/weather/TS10/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		
		$type_array = array(
			'Wind_Map' => $Wind_Map,
			'Temperature_Map' => $Temperature_Map,
			'Relative_Humidity' => $Relative_Humidity,
			'Accumulated_Precipitation_Rain' => $Accumulated_Precipitation_Rain,
			'Atmospheric_Pressure_Mean' => $Atmospheric_Pressure_Mean,
			'Cloudiness' => $Cloudiness,

			'PAC0' => $PAC0_url,
			'PR0' => $PR0_url,
			'PA0' => $PA0_url,
			'PAS0' => $PAS0_url,
			'SD0' => $SD0_url,
			'WND' => $WND_url,
			'TD2' => $TD2_url,
			'TS0' => $TS0_url,
			'TS10' => $TS10_url,
		);
		foreach($type_array as $key => $val){
			$type_array[strtolower($key)] = $val;
		}
		
		if(isset($type_array[$type])){
			$url = $type_array[$type];
			$cache_folder = $this->config->item('storage_cache_folder');
			$file_path = $cache_folder.$type.'_'.$z.'_'.$x.'_'.$y.'_'.$file_name;
			if(@file_exists($file_path)){
				$file_time = @filemtime($file_path);
				if($file_time >= $time){
					$content = unserialize(@file_get_contents($file_path));
					$content = $content->content;
				}else{
					$content = @file_get_contents($url);
					if($content){
						@file_put_contents($file_path, serialize((object)array('content' => $content, 'time' => $cur_time)));
					}
				}
			}else{
				$content = @file_get_contents($url);
				if($content){
					file_put_contents($file_path, serialize((object)array('content' => $content, 'time' => $cur_time)));
				}
			}
			if($content){
				$max_cache_time = 1*60*60;
				header("Cache-Control: max-age=".$max_cache_time);
				header("Content-type: image/png");
				die($content);
			}else{
				redirect($url);
			}
		}
	}
	
	public function nocacheweatherapi($change_date, $type, $s, $z, $x, $y, $file_name){
		$API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
		$this->load->helper('url');
		
		$type = strtolower($type);
		
		$wind_color = '';
		$wind_color .= '0:5270f8;';
		$wind_color .= '1:1d5d95;';
		$wind_color .= '3:29d1ff;';
		$wind_color .= '5:0ed099;';
		$wind_color .= '7:27d827;';
		$wind_color .= '9:25a825;';
		$wind_color .= '11:c6b535;';
		$wind_color .= '13:966c12;';
		$wind_color .= '15:d07357;';
		$wind_color .= '17:900029;';
		$wind_color .= '19:ce0078;';
		$wind_color .= '21:6300aa;';
		$wind_color .= '24:3818c8;';
		$wind_color .= '27:2370be;';
		$wind_color .= '29:048da2;';
		$wind_color .= '36:7000c0';
		
		$temperature_color = '';
		$temperature_color .= '-70:1125a6;';
		$temperature_color .= '-55:8391ee;';
		$temperature_color .= '-40:315cc8;';
		$temperature_color .= '-25:4a61ca;';
		$temperature_color .= '-15:7afffb;';
		$temperature_color .= '-8:6abfb7;';
		$temperature_color .= '-4:64a5bd;';
		$temperature_color .= '0:5d85c6;';
		$temperature_color .= '1:006436;';
		$temperature_color .= '10:2de02a;';
		$temperature_color .= '21:ffe136;';
		$temperature_color .= '30:ff4014;';
		$temperature_color .= '45:880000';
		
		$humidity_color = '';
		$humidity_color .= '0:ce3700;';
		$humidity_color .= '30:c95d00;';
		$humidity_color .= '40:bc9100;';
		$humidity_color .= '50:55c700;';
		$humidity_color .= '60:02c970;';
		$humidity_color .= '70:03b5b3;';
		$humidity_color .= '75:06a1b5;';
		$humidity_color .= '80:3b9cac;';
		$humidity_color .= '83:3c93ac;';
		$humidity_color .= '87:3a86ab;';
		$humidity_color .= '90:3b83ac;';
		$humidity_color .= '93:3b7aac;';
		$humidity_color .= '97:3b629c;';
		$humidity_color .= '100:3b4871';
		
		$rain_color = '';
		$rain_color .= '0:b1b1b1;';
		$rain_color .= '0.6:2b7dc0;';
		$rain_color .= '6:3ebccb;';
		$rain_color .= '8:3ea040;';
		$rain_color .= '10:82a03d;';
		$rain_color .= '15:a0a03d;';
		$rain_color .= '20:9f3d3d;';
		$rain_color .= '31:db59db;';
		$rain_color .= '50:d7d7d7';
		
		$pressure_color = '';
		$pressure_color .= '99000:16e0ff;';
		$pressure_color .= '99500:19d3d0;';
		$pressure_color .= '100000:1abdbb;';
		$pressure_color .= '100300:1493b0;';
		$pressure_color .= '100600:137fb5;';
		$pressure_color .= '100900:1f5fcd;';
		$pressure_color .= '101500:199f00;';
		$pressure_color .= '101900:a9ad00;';
		$pressure_color .= '102200:dc9e1d;';
		$pressure_color .= '102500:e94728;';
		$pressure_color .= '103000:820053';
		
		$cloud_color = '';
		$cloud_color .= '0:b0965a;';
		$cloud_color .= '10:988b5a;';
		$cloud_color .= '30:888888;';
		$cloud_color .= '80:adb7b6;';
		$cloud_color .= '90:bec1c1;';
		$cloud_color .= '100:d5d5cd';
		
		$snow_color = '';
		$snow_color .= '0:4a4a4a;';
		$snow_color .= '2:3449b2;';
		$snow_color .= '10:1fb3b6;';
		$snow_color .= '20:218c21;';
		$snow_color .= '50:c0c02e;';
		$snow_color .= '80:c28633;';
		$snow_color .= '120:b42828;';
		$snow_color .= '500:ce5bce';
		
		$time = strtotime(date('Y-m-d H:00:00'));
		$hour = (int)date('H', $time);
		$hour = $hour % 3;
		$time = $time - $hour*60*60;
		
		$Wind_Map = 'http://maps.openweathermap.org/maps/2.0/weather/WS10/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&opacity=1&fill_bound=true&palette='.$wind_color;
		$Temperature_Map = 'http://maps.openweathermap.org/maps/2.0/weather/TA2/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$temperature_color;
		$Relative_Humidity = 'http://maps.openweathermap.org/maps/2.0/weather/HRD0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$humidity_color;
		$Accumulated_Precipitation_Rain = 'http://maps.openweathermap.org/maps/2.0/weather/PAR0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&palette='.$rain_color.'&appid='.$API_Openweathermap;
		$Atmospheric_Pressure_Mean = 'https://a.sat.owm.io/vane/2.0/weather/APM/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$pressure_color;
		$Cloudiness = 'http://maps.openweathermap.org/maps/2.0/weather/CL/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$cloud_color;
		
		$PAC0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PAC0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$PR0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PR0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$PA0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PA0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$PAS0_url = 'http://maps.openweathermap.org/maps/2.0/weather/PAS0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap.'&palette=0:616161;1:455298;10:41a5a7;20:418d41;50:a8a841;80:aa7e3f;120:a74141;200:a841a8';
		$SD0_url = 'http://maps.openweathermap.org/maps/2.0/weather/SD0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap.'&palette='.$snow_color;
		$WND_url = 'http://maps.openweathermap.org/maps/2.0/weather/WND/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$TD2_url = 'http://maps.openweathermap.org/maps/2.0/weather/TD2/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$TS0_url = 'http://maps.openweathermap.org/maps/2.0/weather/TS0/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		$TS10_url = 'http://maps.openweathermap.org/maps/2.0/weather/TS10/'.$z.'/'.$x.'/'.$y.'?date='.$time.'&fill_bound=true&opacity=1&appid='.$API_Openweathermap;
		
		$type_array = array(
			'Wind_Map' => $Wind_Map,
			'Temperature_Map' => $Temperature_Map,
			'Relative_Humidity' => $Relative_Humidity,
			'Accumulated_Precipitation_Rain' => $Accumulated_Precipitation_Rain,
			'Atmospheric_Pressure_Mean' => $Atmospheric_Pressure_Mean,
			'Cloudiness' => $Cloudiness,

			'PAC0' => $PAC0_url,
			'PR0' => $PR0_url,
			'PA0' => $PA0_url,
			'PAS0' => $PAS0_url,
			'SD0' => $SD0_url,
			'WND' => $WND_url,
			'TD2' => $TD2_url,
			'TS0' => $TS0_url,
			'TS10' => $TS10_url,
		);
		foreach($type_array as $key => $val){
			$type_array[strtolower($key)] = $val;
		}
		
		if(isset($type_array[$type])){
			$url = $type_array[$type];
			redirect($url);
		}
	}
	
	public function change_map(){
		$API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
		$urls = array(
			'http://maps.openweathermap.org/maps/2.0/weather/TA2/5/25/13?appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:4eb095;5:5bc84c;10:b8db41;15:e0ce38;20:df9f41;25:dc6d55;30:b73466;40:6b1527;50:2b0001',
			'http://maps.openweathermap.org/maps/2.0/weather/TA2/5/25/14?appid='.$API_Openweathermap.'&fill_bound=true&opacity=1&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:4eb095;5:5bc84c;10:b8db41;15:e0ce38;20:df9f41;25:dc6d55;30:b73466;40:6b1527;50:2b0001',
		);
		$file_change = FCPATH.'../TOHwindy/assets/change_data.txt';
		$change_folder = $this->config->item('storage_change_folder');
		foreach($urls as $url){
			$content = @file_get_contents($url);
			$file_path = $change_folder.md5($url);
			if(@file_exists($file_path)){
				$old_content = @file_get_contents($file_path);
				if(md5($old_content) != md5($content)){
					@file_put_contents(FCPATH.'change_data.txt', date('Y_m_d_h_i_s'));
					echo ('Change:' . date('Y_m_d_h_i_s')).'<br/>';
				}else{
					echo ('Dont change<br/>');
				}
			}else{
				@file_put_contents($file_change, date('Y_m_d_h_i_s'));
				@file_put_contents($file_path, $content);
				echo ('Init:' . date('Y_m_d_h_i_s').'<br/>');
			}
		}
	}
	
	public function write_log($message, $file_name){
		$this->load->helper('file');
		$log_path = FCPATH.'../TOHwindy/assets/'.date('Y_m_d_H_').$file_name;
		
		$message = $message."\n";
		if(@file_exists($log_path)){
			write_file($log_path, $message, 'a+');
		}else{
			@file_put_contents($log_path, $message);	
		}
	}
}