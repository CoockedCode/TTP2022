<?php
require_once('../config.php');
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:

if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"])){
	$usrNam = $_GET["usrNam"];
	list_usr($usrNam);
}

function list_usr($usrNam): void{ 
	//$usrNam2 = $usrNam;
	//$stmt = $conn->prepare("SELECT * FROM users");

	$list_html = array();	
	$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
	$conn->set_charset("utf8");
	$stmt = $conn->prepare("SELECT * FROM users WHERE usrNam = ?");
	$stmt->bind_param("s", $usrNam);
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

		
		
// //SEE TÖÖTAB JEEEE OMG!!!!!!!!!!!!!!!!!!!!!!!!
// $name = "volov";
		
// $cars = array (
//   array("name" => $name, "id" =>22),
//   array("name" => "bmw", "id" =>22132),
//   array("name" => "audi", "id" =>2342),
//   array("name" => "lada", "id" =>422)
// );

// array_push($cars, array("name" => "saab", "id" =>52));
// echo json_encode($cars);