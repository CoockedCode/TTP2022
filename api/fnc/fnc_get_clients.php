<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    require_once("../config.php");

    if(isset($_GET["client"])){
        // echo ("siin");
        get_clients();
    }

    //var_dump($client_array);
    // get_clients();


    function get_clients(){
        $client_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, name FROM klient");
        echo $conn->error;
        $stmt->bind_result($id_from_db, $name_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($client_array, array("id"=>$id_from_db, "name"=>$name_from_db));
        }
        echo json_encode($client_array);
        $stmt->close();
        $conn->close();

    }
?>