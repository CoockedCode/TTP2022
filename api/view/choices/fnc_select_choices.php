<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    get_device_info();

    // ID järgi valiku nimetus
    // 1 - liik
    // 2 - võimsus kW
    // 3 - p/min
    // 4 - tootja
    // 5 - võlli kõrgus
    // 6 - toite liik
    // 7 - sagedus Hz
    // 8 - Isol. klass
    // 9 - IP klass
    // 10 - tunnihind
    // 11 - takistuse ühik
    // 12 - pingeteim
    // 13 - katsetuse pinge(V)
    // 14 - ühendus
    // 15 - katsetatud

    function get_device_info(){
        $device_info_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, vaartus, valikute_nimetus_id FROM valikute_vaartused WHERE deleted='0'");
        $stmt->bind_result($id_from_db, $device_info_from_db, $attribute_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($device_info_array, array("id"=>$id_from_db, "attribute"=>$attribute_from_db, "name"=>$device_info_from_db));
        }
        echo json_encode($device_info_array);
        $stmt->close();
        $conn->close();
    }
?>