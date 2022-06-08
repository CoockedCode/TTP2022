<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");


    if(isset($_GET["client"])){
        delete_clients($_GET["client"]);
    }

    function delete_clients($id){
        $client_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("UPDATE klient SET deleted=1 WHERE id=?");
        $stmt->bind_param("i",$id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }
