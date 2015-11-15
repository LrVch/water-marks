<?php
	require_once 'wideimage/WideImage.php';

//	use \WideImage\WideImage as WideImage;

	$image = WideImage::loadFromFile('../'.$_POST['bg_img']);
	$watermark = WideImage::loadFromFile('../'.$_POST['wm_img']);

  //$name = "".md5(uniqid()).'-'.time().'.jpg';
  $name = "result-".date("His").'.jpg';

	$dir='../result';
	
	if(!is_dir($dir)) {
		mkdir($dir);
		$merged = $image->merge($watermark, $_POST['pos_x']*$_POST['ratio'], $_POST['pos_y']*$_POST['ratio'] ,$_POST['opacity'])->saveToFile($dir.'/'.$name);
		}
		else
		{
		$merged = $image->merge($watermark, $_POST['pos_x']*$_POST['ratio'], $_POST['pos_y']*$_POST['ratio'] ,$_POST['opacity'])->saveToFile($dir.'/'.$name);
		}

header('Content-type: application/json; charset=utf-8');
die(json_encode($name));