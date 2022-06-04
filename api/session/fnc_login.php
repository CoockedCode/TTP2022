<?php
	require_once('../config.php');
	require_once('./Session.php');
	header("Access-Control-Allow-Origin: *");

	// Kas on ikka GET päring?
	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		exit;
	}

	// Päringu filtreerimine
	if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and isset($_GET["passWrd"]) and !empty($_GET["passWrd"])){
		$usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
		$passWrd = filter_var($_GET["passWrd"], FILTER_SANITIZE_STRING);
		login_usr($usrNam, $passWrd);
	}

	// Funktsioonid
	function login_usr($usrNam, $passWrd): void{
		$list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT user_name, password FROM tootaja WHERE user_name = ? AND password = ? ");
		$stmt->bind_param("ss", $usrNam, $passWrd);
		$stmt->bind_result($usrNam_from_db, $passWrd_from_db);
		$stmt->execute();
		// echo $conn->error;
		while($stmt->fetch()){
			array_push($list_html, array("usrNam"=>$usrNam_from_db, "passWrd"=>$passWrd_from_db));
		}
		$stmt->close();
		$conn->close();

		// Kui on üks või rohkem vasteid, siis kasutaja on olemas...
		// ...ja kui kasutaja on olemas, siis teeme sessiooni talle ja lisame küpsise

		if(!empty($list_html)){
			$sess = new session();
			$sess->start($usrNam);
			echo json_encode($list_html);
		} else {
			echo json_encode(array("error"=>"Vale parool või kasutaja!"));
		}
	}
?>