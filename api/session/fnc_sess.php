<?php
	require_once("./SessionManager.class.php");	
	require_once('../config.php');
	
	header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:

	if(isset($_GET["logout"])){
		logout();
	}elseif(isset($_GET["login"]) and !empty($_GET["login"])){
		
		login($_GET["login"]);
		
		if(isset($_GET["reLog"]) and !empty($_GET["reLog"])){
			login($_GET["login"], $_GET["reLog"]);
		}
		
	}elseif(isset($_GET["querySess"])){
		querySess();
	}
	
	function logout(): void{
		session_destroy();
		unset($_COOKIE);
		setcookie("CookedCode", "", time()-(86400 * 999), "/dev/", "cookedcode.tk");
	}
	
	function login($usrNam, $reLog = false): void{
		SessionManager::sessionStart("Dev", time() + (86400), "/dev", "cookedcode.tk", true);
		if($reLog){
			setcookie("CookedCode", $usrNam, time()+(86400 * 2), "/dev/", "cookedcode.tk");
		}
	}
	
	//var_export($_SESSION);
	//var_dump($_COOKIE);
	//print_r($_COOKIE);
	//echo ($_COOKIE["CookedCode"]);
	
	function querySess(): void{
		if(isset($_COOKIE) and !empty($_COOKIE)){
			
			echo json_encode(['true',  $_COOKIE["CookedCode"]]);
			//var_dump($_COOKIE);
		}else{
			echo json_encode(['false',  'nam']);
		}
	}
	