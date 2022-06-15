<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    if(isset($_GET["transport"])){
        get_transport();
    }

    function get_transport(){
        $transport_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, name FROM firma WHERE tuup = '1' AND deleted = '0'");
        $stmt->bind_result($id_from_db, $name_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($transport_array, array("id"=>$id_from_db, "name"=>$name_from_db));
        }
        echo json_encode($transport_array);
        $stmt->close();
        $conn->close();
    }
?>