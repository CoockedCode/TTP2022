<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once('../config.php');
    require_once('./fnc_sess.php');

    if(isset($_GET["workStart"]) and !empty($_GET["workStart"])){
		$workStart = filter_var($_GET["workStart"], FILTER_SANITIZE_STRING);
        setWorkStart($workStart);
	}

    if(isset($_GET["workStop"]) and !empty($_GET["workStop"])){
		$workStop = filter_var($_GET["workStop"], FILTER_SANITIZE_STRING);
        setWorkStop($workStop);
	}

    function setWorkStart($workStart){
		$list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
		$conn->set_charset("utf8");

        $stmt = $conn->prepare("UPDATE progress SET algus = NOW() WHERE id = ?");
		$stmt->bind_param("i", $workStart);
        echo $stmt->error;
		echo $conn->error;

		if($stmt->execute()){
            array_push($list_html, array("Edukalt tühistatud!");
		}else{
            array_push($list_html, array("Tekkis viga: " .$stmt->error);
		}

		$stmt->close();
		$conn->close();
		echo json_encode($list_html);
        return null;
	}

    function setWorkStop($workStart){
		$list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");

        $stmt = $conn->prepare("UPDATE progress SET lopp = NOW() WHERE id = ?");
		$stmt->bind_param("i", $workStart);
        echo $stmt->error;
		echo $conn->error;

		if($stmt->execute()){
            array_push($list_html, array("Edukalt tühistatud!");
		}else{
            array_push($list_html, array("Tekkis viga: " .$stmt->error);
		}

		$stmt->close();
		$conn->close();
		echo json_encode($list_html);
        return null;
	}