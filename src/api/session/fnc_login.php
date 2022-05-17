<?php
require_once('../config.php');
require_once('./fnc_sess.php');
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:

if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and isset($_GET["passWrd"]) and !empty($_GET["passWrd"])){
	$usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
	$passWrd = filter_var($_GET["passWrd"], FILTER_SANITIZE_STRING);
	login_usr($usrNam, $passWrd);
}

function login_usr($usrNam, $passWrd): void{ 
	//$usrNam2 = $usrNam;
	//$stmt = $conn->prepare("SELECT * FROM users");

	$list_html = array();	
	$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
	$conn->set_charset("utf8");
	$stmt = $conn->prepare("SELECT usrNam, passWrd FROM users WHERE usrNam = ? AND passWrd = ? ");
	$stmt->bind_param("ss", $usrNam, $passWrd);
	$stmt->bind_result($usrNam_from_db, $passWrd_from_db);	
	$stmt->execute();
	echo $conn->error;		
	while($stmt->fetch()){
		array_push($list_html, array("usrNam"=>$usrNam_from_db, "passWrd"=>$passWrd_from_db));
	}
	echo json_encode($list_html);
	$stmt->close();
	$conn->close();		
}