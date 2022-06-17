<?php
	header("Access-Control-Allow-Origin: *");
	$currentRequestMethod = $_SERVER['REQUEST_METHOD'];
	$allowedRequestMethods = array('GET', 'POST');
	if(!in_array($currentRequestMethod, $allowedRequestMethods)){exit;}

	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);
	//error_reporting(E_ALL);