<?php
	require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    if(isset($_GET["work_stages"])){
        get_work_stages();
    }

    if(isset($_GET["work_levels"])){
        get_work_levels();
    }


    function get_work_stages(){
        $workstages_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, nimetus FROM too_liik");
        $stmt->bind_result($id_from_db, $stagename_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($workstages_array, array(
        "id"=>$id_from_db,
        "name"=>$stagename_from_db

            ));
        }
        echo json_encode($workstages_array);
        $stmt->close();
        $conn->close();

    }

    function get_work_levels(){
        $worklevels_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, nimetus FROM tooetapi_nimetus");
        $stmt->bind_result($id_from_db, $levelname_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($worklevels_array, array(
        "id"=>$id_from_db,
        "name"=>$levelname_from_db

            ));
        }
        echo json_encode($worklevels_array);
        $stmt->close();
        $conn->close();


    }
?>