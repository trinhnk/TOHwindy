<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cacheapi extends CI_Controller {
	private $API_Openweathermap = '9de243494c0b295cca9337e1e96b00e2'; //Internet
	
	public function change_map(){
		$urls = array(
			'https://c.sat.owm.io/vane/2.0/weather/TA2/5/25/13?appid='.$this->API_Openweathermap.'&fill_bound=true&opacity=1&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:4eb095;5:5bc84c;10:b8db41;15:e0ce38;20:df9f41;25:dc6d55;30:b73466;40:6b1527;50:2b0001',
			'https://a.sat.owm.io/vane/2.0/weather/TA2/5/25/14?appid='.$this->API_Openweathermap.'&fill_bound=true&opacity=1&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:4eb095;5:5bc84c;10:b8db41;15:e0ce38;20:df9f41;25:dc6d55;30:b73466;40:6b1527;50:2b0001',
		);
		$file_change = FCPATH.'../TOHwindy/change_data.txt';
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

	public function cacheweatherapi($change_date, $type, $s, $z, $x, $y, $file_name){
		$this->load->helper('url');
		
		$type = strtolower($type);
		
		$Temp3 = "";
		$Temp3 .= "-65:821692;";
		$Temp3 .= "-55:821692;";
		$Temp3 .= "-45:821692;";
		$Temp3 .= "-40:821692;";
		$Temp3 .= "-30:8257db;";
		$Temp3 .= "-20:208cec;";
		$Temp3 .= "-10:20c4e8;";
		$Temp3 .= "0:4eb095;";
		$Temp3 .= "5:5bc84c;";
		$Temp3 .= "10:b8db41;";
		$Temp3 .= "15:e0ce38;";
		$Temp3 .= "20:df9f41;";
		$Temp3 .= "25:dc6d55;";
		$Temp3 .= "30:b73466;";
		$Temp3 .= "40:6b1527;";
		$Temp3 .= "50:2b0001";
		
		$Wind_Map_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/WS10/'.$z.'/'.$x.'/'.$y.'?appid='.$this->API_Openweathermap.'&opacity=1&fill_bound=true&palette=0:6271B7;1:39619F;3:4A94A9;5:4D8D7B;7:53A553;9:359F35;11:A79D51;13:9F7F3A;15:A16C5C;17:813A4E;19:AF5088;21:755088;24:6D61A3;27:44698D;29:5C9098;36:7D44A5';
		$Temperature_Map_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/TA2/'.$z.'/'.$x.'/'.$y.'?appid='.$this->API_Openweathermap.'&fill_bound=true&opacity=1&palette='.$Temp3;
		$Relative_Humidity_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/HRD0/'.$z.'/'.$x.'/'.$y.'?appid='.$this->API_Openweathermap.'&fill_bound=true&opacity=1&palette=0:ad5538;30:ad6e38;40:ad9238;50:69ad38;60:38ad79;70:38aead;75:38a0ad;80:389dad;83:3894ad;87:3887ad;90:3884ad;93:387bad;97:38629d;100:384672';
		$Accumulated_Precipitation_Rain_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/PAR0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&palette=0:6f6f6f;0.6:3c74a0;6:3ba1a1;8:3ba13d;10:82a13b;15:a1a13b;20:a13b3b;31:a13ba1;50:a8a8a8&appid='.$this->API_Openweathermap;
		$Atmospheric_Pressure_Mean_Map_url = 'https://'.$s.'.tile.openweathermap.org/map/pressure/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&pallette=990:8eb3b8;995:68b4b3;1000:45a7a6;1003:398393;1006:397693;1009:395b93;1015:3a7535;1019:9fa141;1022:ad8839;1025:aa5443;1030:5e3c51&appid='.$this->API_Openweathermap;
		$Cloudiness_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/CL/'.$z.'/'.$x.'/'.$y.'?appid='.$this->API_Openweathermap.'&fill_bound=true&opacity=1&palette=0:928246;10:847746;30:747474;80:adb7b6;95:bec1c1;100:d5d5cd';
		
		$PAC0_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/PAC0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		$PR0_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/PR0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		$PA0_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/PA0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		$PAS0_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/PAS0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap.'&palette=0:616161;1:455298;10:41a5a7;20:418d41;50:a8a841;80:aa7e3f;120:a74141;200:a841a8';
		$SD0_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/SD0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap.'&palette=0:616161;1:455298;10:41a5a7;20:418d41;50:a8a841;80:aa7e3f;120:a74141;200:a841a8';
		$WND_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/WND/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		$TD2_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/TD2/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		$TS0_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/TS0/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		$TS10_url = 'https://'.$s.'.sat.owm.io/vane/2.0/weather/TS10/'.$z.'/'.$x.'/'.$y.'?fill_bound=true&opacity=1&appid='.$this->API_Openweathermap;
		
		$type_array = array(
			'Wind_Map' => $Wind_Map_url,
			'Temperature_Map' => $Temperature_Map_url,
			'Relative_Humidity' => $Relative_Humidity_url,
			'Accumulated_Precipitation_Rain' => $Accumulated_Precipitation_Rain_url,
			'Atmospheric_Pressure_Mean_Map' => $Atmospheric_Pressure_Mean_Map_url,
			'Cloudiness' => $Cloudiness_url,
			
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

			$cache_folder = $this->config->item('storage_cache_folder').$change_date;
			if(!@file_exists($cache_folder)){
				mkdir($cache_folder);
			}
			
			$file_path = $cache_folder.md5($url).$file_name;
			$max_cache_time = 3*60*60;
			if(@file_exists($file_path)){
				$content = @file_get_contents($file_path);
				header("Cache-Control: max-age=".$max_cache_time);
				header("Content-type: image/png");
				die($content);
			}else{
				$content = @file_get_contents($url);
				if($content){
					@file_put_contents($file_path, $content);
					header("Cache-Control: max-age=".$max_cache_time);
					header("Content-type: image/png");
					die($content);
				}else{
					redirect($url);
				}
			}
		}
	}
}