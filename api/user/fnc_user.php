<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");

	// Kas on ikka GET päring?
	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		exit;
	}

	// Päringu filtreerimine
	if(isset($_GET["usr"]) and !empty($_GET["usr"])){
        $usrNam = filter_var($_GET["usr"], FILTER_SANITIZE_STRING);
		fetch_user_data($usrNam);
	}

	// Funktsioonid
	function fetch_user_data($usrNam): void{
		$list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT * FROM tootaja WHERE user_name = ? ");
		$stmt->bind_param("s", $usrNam);
		$stmt->bind_result(
            $id_from_db, $first_name_from_db, $last_name_from_db, $usrNam_from_db, $passWrd_from_db, $on_pay_from_db);
		$stmt->execute();
		// echo $conn->error;
		while($stmt->fetch()){
			array_push($list_html, array(
                "id"=>$id_from_db,
                "first_name"=>$first_name_from_db,
                "last_name"=>$last_name_from_db,
                "user_name"=>$usrNam_from_db,
                "password"=>$passWrd_from_db,
                "on_pay"=>$on_pay_from_db
                ));
		}
		$stmt->close();
		$conn->close();


		if(!empty($list_html)){
			echo json_encode($list_html);
		} else {
			echo json_encode(array("error"=>"Vale parool või kasutaja!"));
		}
	}
?>