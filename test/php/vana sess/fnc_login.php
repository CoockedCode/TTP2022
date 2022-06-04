<?php

	require_once('./Session.php');
	header("Access-Control-Allow-Origin: *");

	// Kas on ikka GET päring?
	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		exit;
	}

	// Päringu filtreerimine


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