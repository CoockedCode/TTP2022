<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);
    if(!empty($data)){
        $choice_ID=$data["deletedID"];
        delete_clients($choice_ID);
    }
    echo $data;

    function delete_clients($choice_ID){
        $client_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("UPDATE valikute_vaartused SET deleted='1' WHERE id=?");
        $stmt->bind_param("i",$choice_ID);
        $stmt->execute();
        if($stmt->error){
            echo $conn->error;
        }
        $stmt->close();
        $conn->close();
    }
