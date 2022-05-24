<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

	if ($_SERVER['REQUEST_METHOD'] != 'POST') {
		exit;
	}

    $obj = json_decode(file_get_contents('php://input'));
    $jsonString = json_encode($obj).PHP_EOL;
    file_put_contents("./localDB/database.txt", $jsonString , FILE_APPEND);