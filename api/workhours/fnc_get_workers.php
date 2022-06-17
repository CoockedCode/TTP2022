<?php
    require_once('../config.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");

    get_clients();


    function get_clients(){
        $employee_array=array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, eesnimi, perekonnanimi FROM tootaja WHERE palgal='1'");
        $stmt->bind_result($id_from_db,$fname_from_db,$lname_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            $fullname = $fname_from_db;
            $fullname .=" ";
            $fullname .= $lname_from_db;
            array_push($employee_array, array("id"=>$id_from_db, "name"=>$fullname));
        }
        echo json_encode($employee_array);
        $stmt->close();
        $conn->close();
    }