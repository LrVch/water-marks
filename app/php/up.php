<?php

if($_SERVER['REQUEST_METHOD'] == "POST") {  
    
  $img = empty($_FILES['img']) ? null : $_FILES['img'];
	
	if ($img) {
		
    $img_name = $img['name'];
    $img_type = $img['type'];
    $img_size = $img['size'];
    $max_img_size = 2097152;
    $answer = array();
		
		function get_ext($file_dist) {
      return strtolower(pathinfo($file_dist, PATHINFO_EXTENSION));
    }
		
		function is_image($file_dist) {
      $exts = array('jpeg', 'jpg', 'png', 'gif');
      return in_array(get_ext($file_dist), $exts);
    }

    function is_mimeimage($file) {
      $mime_str = strpos(mime_content_type($file), "/");
      $mime_result = substr(mime_content_type($file), 0, $mime_str);
      if ($mime_result == 'image')
        return true;
      else
        return false;
    }
    
		function generate_name($file, $path, $prefix = '') {
      $name = $prefix.md5(uniqid()).'-'.time().'.'.get_ext($file);

      while (file_exists($path.$name)) {
        $name = generate_name($name, $path, $prefix);
      }

      return $name;
    }
		
    if(!file_exists(__DIR__.'/../uploads/')){
      mkdir(__DIR__.'/../uploads/', 0755);
    }
    
    $file_dist = __DIR__.'/../uploads/'.$img_name;
    
    if (!is_image($file_dist)) {
      $answer = array( "error" => "notImage");
      header('Content-type: application/json; charset=utf-8');
      die(json_encode($answer));
    }

    if ($img_size > $max_img_size) {
      $answer = array( "error" => "tooBig");
      header('Content-type: application/json; charset=utf-8');
      die(json_encode($answer));
    }
    
    if ($img['error'] != UPLOAD_ERR_OK) {
			$answer = array( "error" => "error");
      header('Content-type: application/json; charset=utf-8');
      die(json_encode($answer));
    }
    
    $new_name = generate_name($img_name, __DIR__.'/../uploads/');
    $new_path = __DIR__.'/../uploads/'.$new_name;

    if(move_uploaded_file($img['tmp_name'], $new_path)){
      $img_dist = '../uploads/'.$new_name;

      if (!is_mimeimage($img_dist)) {
        $answer = array( "error" => "notImage" );
        header('Content-type: application/json; charset=utf-8');
        die(json_encode($answer));
      }
    } else {
      $answer = array( "error" => "Возникла ошибка при загрузке файла на сервер");
      header('Content-type: application/json; charset=utf-8');
      die(json_encode($answer));
    }
      
    $img_extension = getimagesize($img_dist);
  
    $answer = array(
      'imgName' => $new_name,
      'imgType' => $img_type,
      'imgSize' => $img_size,
      'imgWidth' => $img_extension[0],  
      'imgHeight' => $img_extension[1]  
      );    
  } else {
	  $answer = array( "error" => "Вы не загрузили картинку");
    header('Content-type: application/json; charset=utf-8');
    die(json_encode($answer));
  }
} else {
  $answer = array("error" => "У вас нет доступа на данную страницу");
  header('Content-type: application/json; charset=utf-8');
  die(json_encode($answer));
}
  
header('Content-type: application/json; charset=utf-8');
die(json_encode($answer));