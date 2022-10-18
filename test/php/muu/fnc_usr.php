<?php
require_once('../config.php');
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:

//http://cookedcode.tk/dev/scripts/php/fnc_usr.php?get_usr=get_all

if(isset($_GET["get_usr"]) and !empty($_GET["get_usr"])){
	$fnc_var = $_GET["get_usr"];
	list_usr();
}

function list_usr(): void{ 
	$list_html = array();	
	//$conn = new mysqli($_GLOBALS server_host, $server_user_name, $server_password, $database);
	$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
	$conn->set_charset("utf8");
	$stmt = $conn->prepare("SELECT * FROM users");	
	$stmt->bind_result($id_from_db, $usrNam_from_db, $passWrd_from_db, $created_from_db);	
	$stmt->execute();
	echo $conn->error;		
	while($stmt->fetch()){
		array_push($list_html, array("id"=>$id_from_db, "usrNam"=>$usrNam_from_db, "passWrd"=>$passWrd_from_db, "created"=>$created_from_db));
	}
	echo json_encode($list_html);
	$stmt->close();
	$conn->close();		
}