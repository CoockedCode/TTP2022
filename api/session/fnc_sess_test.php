<?php
	require_once("./SessionManager.class.php");	
	require_once("../config.php");
	
 	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
	header("Content-Type: text/html; charset=UTF-8");
	

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