<?php
    //echo("asd");

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
	//header("Content-Type: application/json; charset=UTF-8");

	// if ($_SERVER['REQUEST_METHOD'] != 'POST') {
	// 	exit;
	// }

    if(isset($_POST["save"]) && !empty($_POST["save"])){
        saveToFile($_POST["save"]);
    }

    function saveToFile($stringToSave){
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        file_put_contents("database.txt", $jsonString);
    }
