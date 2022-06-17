<?php
	header("Access-Control-Allow-Origin: *");
	$currentRequestMethod = $_SERVER['REQUEST_METHOD'];
	$allowedRequestMethods = array('GET', 'POST');
	if(!in_array($currentRequestMethod, $allowedRequestMethods)){exit;}

	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);
	//error_reporting(E_ALL);

	$server_host = "localhost";
	$server_user_name = "em_user0412";
	$server_password = "qAm7?4o2";
	$database = "em_j1351s";
	$db_port = "3306";