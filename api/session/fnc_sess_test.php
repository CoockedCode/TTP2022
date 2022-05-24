<?php
	// ini_set('display_errors', 1);
	require_once("./SessionManager.class.php");
	require_once("../config.php");

 	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");


	if ($_SERVER['REQUEST_METHOD'] != 'POST') {
		exit;
	}

	$obj = json_decode(file_get_contents('php://input'));
	$id = $obj->id;
	$Name = $obj->Name;
	//test by returning the same values
	$retObj=(object)["id"=>$id,"Name"=>$Name];
	//echo json_encode($retObj);
	echo json_encode($obj->id);