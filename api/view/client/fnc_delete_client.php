<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);
    if(!empty($data)){
        $client_ID=$data["clientId"];
        delete_clients($client_ID);
    }
    echo $data;


    function delete_clients($client_ID){
        $client_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("UPDATE klient SET deleted='1' WHERE id=?");
        $stmt->bind_param("i",$client_ID);
        $stmt->execute();
        if($stmt->error){
            echo $conn->error;
        }
        $stmt->close();
        $conn->close();
    }
