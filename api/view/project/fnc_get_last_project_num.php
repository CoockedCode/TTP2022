<?php
	require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    if(isset($_GET["last_project"])){
        get_last_project_num();
    }

    function get_last_project_num(){
        $last_project_num = null;
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT projekt_nr FROM projekt ORDER BY id DESC LIMIT 1");
        $stmt->bind_result($last_project_num);
        $stmt->execute();
        if($stmt->fetch()){
            echo json_encode($last_project_num);
        }
        $stmt->close();
        $conn->close();
    }
?>