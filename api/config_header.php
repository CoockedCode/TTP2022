<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	$currentRequestMethod = $_SERVER['REQUEST_METHOD'];
	$allowedRequestMethods = array('GET', 'POST', 'OPTIONS');
	if(!in_array($currentRequestMethod, $allowedRequestMethods)){exit;}

	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);
	//error_reporting(E_ALL);

	//header('Access-Control-Allow-Methods: GET, POST');
	//header("Content-Type: *; charset=UTF-8");