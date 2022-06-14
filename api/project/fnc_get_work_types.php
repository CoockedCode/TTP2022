<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    if(isset($_GET["work"])){
        get_work_types();
    }

    function get_work_types(){
        $work_type_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, nimetus FROM too_liik");
        $stmt->bind_result($id_from_db, $work_type_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($work_type_array, array("id"=>$id_from_db, "name"=>$work_type_from_db));
        }
        echo json_encode($work_type_array);
        $stmt->close();
        $conn->close();
    }
?>