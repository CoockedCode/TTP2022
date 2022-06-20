<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    if(isset($_GET["role"])){
        get_employee_roles();

    }

function get_employee_roles(){
    $role_array = array();
    $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
    $conn->set_charset("utf8");
    $stmt = $conn->prepare("SELECT id, rolli_nimi FROM roll");
    $stmt->bind_result($roleID_from_db, $rolename_from_db);
    $stmt->execute();
    while($stmt->fetch()){
        array_push($role_array, array("id"=>$roleID_from_db, "name"=>$rolename_from_db));
    }
    echo json_encode($role_array);
    $stmt->close();
    $conn->close();

}