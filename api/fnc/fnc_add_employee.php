<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $employee_fname=$data["dataToSave"]["employeeFname"];
        $employee_sname=$data["dataToSave"]["employeeSname"];
        $employee_mail=$data["dataToSave"]["employeeMail"];
        $employee_number=$data["dataToSave"]["employeeNumber"];
        $employee_username=$data["dataToSave"]["employeeUsername"]
        $employee_password=$data["dataToSave"]["employeePassword"]
        $employee_position=$data["dataToSave"]["employeePosition"];
        save_to_db($employee_fname, $employee_sname, $employee_mail, $employee_number, $employee_username, $employee_password, $employee_position);
    }
    echo $data;

    function save_to_db($employee_fname, $employee_sname, $employee_mail, $employee_number, $employee_username, $employee_password, $employee_position){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO tootaja(id,eesnimi,perekonnanimi,meil,number,username,password,palgal") VALUES (NULL,?,?,?,?,?,?,?)");
        $stmt->bind_param("", $employee_fname, $employee_sname, $employee_mail, $employee_number, $employee_username, $employee_password, $employee_position;
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }