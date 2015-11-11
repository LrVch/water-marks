<?php
header('Content-type: application/json; charset=utf-8');

if($_SERVER['REQUEST_METHOD'] == "POST"){  
    
  $img = $_FILES['img'];
    
  $img_name = $img['name'];
  $img_type = $img['type'];
  $img_size = $img['size'];
  
  if(!file_exists(__DIR__.'/../uploads/')){
    mkdir(__DIR__.'/../uploads/', 777);
  }
  
  $file_dist = __DIR__.'/../uploads/'.$img_name;
  
  if(move_uploaded_file($img['tmp_name'], $file_dist)){
    $img_dist = '../uploads/'.$img_name;
  } else {
    $answer = "Возникла ошибка при загрузке файла на сервер";
  }
    
  $img_extension = getimagesize ($img_dist);

  $answer = array(
    'imgName' => $img_name,
    'imgType' => $img_type,
    'imgSize' => $img_size,
    'imgWidth' => $img_extension[0],  
    'imgHeight' => $img_extension[1]  
  );    
    
} else {
  $answer = "У вас нет доступа на данную страницу";
}

die(json_encode($answer));