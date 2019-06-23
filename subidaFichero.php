<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}
$path = './paris8/src/assets/productos/';
if (isset($_FILES['file'])) {
    $originalName = $_FILES['file']['name'];
    $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
    //$generatedName = md5($_FILES['file']['tmp_name']).$ext;
    $filePath = $path.$originalName;
    if (!is_writable($path)) {
        echo json_encode(array(
            'status' => false,
            'msg'    => 'Destination directory not writable.'
        ));
        exit;
    }
    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            echo json_encode(array(
                'status' => true
              //  'generatedName' => $generatedName
            ));
            
    }else{
		echo json_encode(array(
			'status' => false
			//'generatedName' => $generatedName
		));
     }
        
}else{
    echo json_encode(
        array('status' => false, 'msg' => 'No file uploaded.')
    );
    exit;
}