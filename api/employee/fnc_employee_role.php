<?php
    require_once('../config.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");

    get_employee_roles();

function get_employee_roles(){
    $role_array = array();
    $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
    $conn->set_charset("utf8");
    $stmt = $conn->prepare("SELECT id, rolli_nimi FROM roll");
    $stmt->bind_result($roleID_from_db, $rolename_from_db);
    $stmt->execute();
    while($stmt->fetch()){
        array_push($role_array, array(
            "roleID"=>$roleID_from_db,
            "roleName"=>$rolename_from_db
        ));
    }
    echo ($role_array);
    echo $conn->error;
    $stmt->close();
    $conn->close();

}