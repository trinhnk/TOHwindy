<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cacheapi extends CI_Controller {
	public function getimage(){
		$this->load->helper('url');
		
		$url = $this->input->get('url');
		foreach($this->input->get() as $key => $val){
			if($key != 'url'){
				$url .= '&'.$key .'=' . $val;
			}				
		}
		
		$cache_folder = $this->config->item('storage_cache_folder');
		
		$last_dot_pos = strrpos($url, ".");
		$allow_extensions = array('.json', '.png');
		$file_extension = mb_substr($url, $last_dot_pos);
		$file_extension = in_array($file_extension, $allow_extensions) ? $file_extension : '.png';
		
		$file_path = $cache_folder.md5($url).($file_extension ? $file_extension : '');
		$max_cache_time = 3*60*60;
		if(@file_exists($file_path)){
			$file_time = @filemtime($file_path);
			$cur_time = strtotime(date('Y-m-d H:i:s'));
			$max_cache_time = $max_cache_time - ($cur_time - $file_time);
			$max_cache_time = $max_cache_time < 0 ? 0 : $max_cache_time;
			if($max_cache_time <= 0){
				$content = @file_get_contents($url);
				if($content){
					@file_put_contents($file_path, $content);
				}
			}else{
				$content = @file_get_contents($file_path);
			}
		}else{
			$content = @file_get_contents($url);
			if($content){
				@file_put_contents($file_path, $content);
			}else{
				$max_cache_time = 0;
			}
		}
		
		if($max_cache_time > 0){
			header("Cache-Control: max-age=".$max_cache_time);
		}
		if($file_extension == '.json'){
			header("Access-Control-Allow-Origin: *");
			die($content);
		}else{
			header("Content-type: image/png");
			die($content);
		}
	}
}