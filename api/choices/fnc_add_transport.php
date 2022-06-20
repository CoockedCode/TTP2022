<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);
    // $data=file_get_contents('php://input');

    if(!empty($data)){
        $transport_company_name=$data["firmName"];
        $transport_company_type_id=$data["firmType"];\
        add_transport_company($transport_company_name,$transport_company_type_id);
    }
    echo $data

    function add_transport_company($transport_company_name,$transport_company_type_id){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt=$conn->prepare("INSERT INTO firma(id,name,tuup,in_edit,deleted) VALUES(NULL,?,?,'0','0')");
        $stmt->bind_param("si",$transport_company_name,$transport_company_type_id);
        $stmt->execute();
        if($stmt->error){
            echo $conn->error;
        }
        $stmt->close();
        $conn->close();
    }