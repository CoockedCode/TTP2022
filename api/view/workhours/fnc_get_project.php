<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");
    if(isset($_GET["project"])){
        get_project();
    }
    function get_project(){
        $project_array=array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, projekt_nr FROM projekt");
        $stmt->bind_result($id_from_db,$name_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($project_array, array("id"=>$id_from_db, "name"=>$name_from_db));
        }
        echo json_encode($project_array);
        $stmt->close();
        $conn->close();
    }