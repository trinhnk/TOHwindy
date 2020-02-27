<?php

    ini_set('MAX_EXECUTION_TIME', '-1');
    set_time_limit(0);

    function multiple_threads_request($nodes, $x, $y){
            $path_z = 'C:/xampp/htdocs/windy/images11';
            $path_x = $path_z.'/'.$x;
            $mh = curl_multi_init();
            $curl_array = array();
            $timeout = 5;

            if (!file_exists($path_z)) {
                mkdir($path_z, 0777, true);
            }

            if (!file_exists($path_x)) {
                mkdir($path_x, 0777, true);
            }

            foreach($nodes as $i => $url)
            {
                $curl_array[$i] = curl_init($url);

                curl_setopt($curl_array[$i], CURLOPT_URL, $url);
                curl_setopt($curl_array[$i], CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($curl_array[$i], CURLOPT_CONNECTTIMEOUT, $timeout);
                curl_multi_add_handle($mh, $curl_array[$i]);
            }
            $running = NULL;
            do {
                usleep(10000);
                curl_multi_exec($mh,$running);
            } while($running > 0);
        
            $res = array();
            $arrContextOptions=array(
                "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ),
            ); 
            foreach($nodes as $i => $url)
            {
                $res[$url] = curl_multi_getcontent($curl_array[$i]);
                $fp2 = fopen($path_x."/".($i + $y).'.png', "w");
                fwrite($fp2, $res[$url]);
                fclose($fp2);
            }
        
            foreach($nodes as $i => $url){
                curl_multi_remove_handle($mh, $curl_array[$i]);
            }
            curl_multi_close($mh);       
            return $res;
    }

    $arrayImage = [];

    for ($x=0; $x < 2048; $x++) { 
        for ($y=0; $y < 2048; $y++) {
            if($y % 60 == 0){
                $arrayImage = [];
            }
            $arrayImage[] = 'https://tiles.windy.com/tiles/v9.0/darkmap/11/'.$x.'/'.$y.'.png';
            if($y % 60 == 59){
                echo 'run'.$x.'<br/>';
                multiple_threads_request($arrayImage, $x, $y - 59);
            }
        }
    }
?>
