<?php
	require_once('../../config_header.php');
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    if(isset($_GET["tester"])){
        get_tester();
    }

    function get_tester(){
        $worker_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT tootaja_roll.id, tootaja.eesnimi, tootaja.perekonnanimi FROM tootaja_roll INNER JOIN tootaja ON tootaja_roll.tootaja_id=tootaja.id WHERE deleted = '0' AND roll_id = '2'");
        $stmt->bind_result($id_from_db, $first_name_from_db, $last_name_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($worker_array, array("id"=>$id_from_db, "name"=>$first_name_from_db." ".$last_name_from_db));
        }
        echo json_encode($worker_array);
        $stmt->close();
        $conn->close();
    }
?>