<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    if(isset($_GET["device"])){
        get_device_types();
    }

    function get_device_types(){
        $device_type_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, vaartus FROM valikute_vaartused WHERE valikute_nimetus_id = 1");
        $stmt->bind_result($id_from_db, $device_type_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($device_type_array, array("id"=>$id_from_db, "name"=>$device_type_from_db));
        }
        echo json_encode($device_type_array);
        $stmt->close();
        $conn->close();
    }
?>