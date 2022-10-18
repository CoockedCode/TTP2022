<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    if(isset($_GET["material"])){
        get_material();
    }

    function get_material(){
        $material_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, nimetus, tuup FROM ladu WHERE deleted = '0'");
        $stmt->bind_result($id_from_db, $name_from_db, $tuup_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            $display_name .= $name_from_db;
            $display_name .= " ";
            $display_name .= $tuup_from_db;
            array_push($material_array, array("id"=>$id_from_db, "name"=>$display_name));
        }
        echo json_encode($material_array);
        $stmt->close();
        $conn->close();
    }
?>