<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $employee_fname=$data["employeeFname"];
        $employee_sname=$data["employeeSname"];
        $employee_mail=$data["employeeMail"];
        $employee_number=$data["employeeNumber"];
        $employee_username=$data["employeeUsername"]
        $employee_password=$data["employeePassword"]
        $employee_active=$data["employeeActive"];
        save_to_db($employee_fname, $employee_sname, $employee_mail, $employee_number, $employee_username, $employee_password, $employee_active);
    }
    echo $data;

    function save_to_db($employee_fname, $employee_sname, $employee_mail, $employee_number, $employee_username, $employee_password, $employee_active){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO tootaja(id,eesnimi,perekonnanimi,username,email,password,palgal,in_edit") VALUES (NULL,?,?,?,?,?,?,NULL)");
        $stmt->bind_param("isssssii", $employee_fname, $employee_sname, $employee_mail, $employee_number, $employee_username, $employee_password, $employee_active);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }