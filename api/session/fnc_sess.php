<?php
	// ini_set('display_errors', 1);

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

	require_once("./SessionManager.class.php");
	require_once('../config.php');



	if(isset($_GET["logout"])){
        session_destroy();
    }
	if(isset($_GET["login"]) and !empty($_GET["login"])){
		// if(isset($_GET["reLog"]) and !empty($_GET["reLog"])){
		// 	login($_GET["login"], $_GET["reLog"]);
		// }else{
		// 	login($_GET["login"]);
		// }
		login($_GET["login"]);

	}
	// elseif(isset($_GET["querySess"])){
	// 	querySess();
	// }

	//function login($usrNam, $reLog = false){
	function login($usrNam){
		SessionManager::sessionStart("Dev", 0, "/", $GLOBALS["site_url"], true);
		setcookie("CookedCode", $usrNam, time() + (86400 * 9), "/", $GLOBALS["site_url"]);
		// if($reLog){
		// 	setcookie("CookedCode", $usrNam, time() + (86400 * 9), "/", $GLOBALS["site_url"]);
		// }
	}

	// function querySess(){
	// 	$list_html = array();
	// 	if(session_status() == 2){
	// 		array_push($list_html, array("status"=>"true", "usrNam"=>$_COOKIE["CookedCode"]));
	// 		echo json_encode($list_html);

	// 		if(isset($_COOKIE) and !empty($_COOKIE)){
	// 			array_push($list_html, array("status"=>"true", "usrNam"=>$_COOKIE["CookedCode"]));
	// 			echo json_encode($list_html);
	// 		}
	// 	}else{
	// 		array_push($list_html, array("status"=>"false", "usrNam"=>"null"));
	// 		echo json_encode($list_html);
	// 	}
	// 	echo ($_COOKIE["CookedCode"]);
	// }

	// Maybe depending on PHP settings, but if return values are not the above, then go for this:
	// _DISABLED = 0
	// _NONE = 1
	// _ACTIVE = 2

	// var_export($_SESSION);
	// var_dump(session_status());
	// var_dump($_COOKIE);
	// print_r($_COOKIE);


	//foreach($_SERVER as $key_name => $key_value) { print $key_name . " = " . $key_value . "\n"; }
	//print_r(array_keys(get_defined_vars()));
