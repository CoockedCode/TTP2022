<?php
    require_once('../config.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");

    get_employee_role();

function get_employee_role(){
    $role_array = array();
    $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
    $conn->set_charset("utf8");
    $stmt = $conn->prepare("SELECT tootaja.id, roll.rolli_nimi FROM tootaja JOIN tootaja_roll ON tootaja.id = tootaja_roll.tootaja_id JOIN roll ON tootaja_roll.roll_id = roll_id");
    $stmt->bind_result($employeeid_from_db, $rolename_from_db);
    $stmt->execute();
    while($stmt->fetch()){
        array_push($role_array, array("id"=>$employeeid_from_db, "role"=>$rolename_from_db));
    }

    echo json_encode($role_array);
    echo $conn->error;
    $stmt->close();
    $conn->close();

}