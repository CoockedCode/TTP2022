<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $choice_type_id=["choiceID"];
        $choice_value=["name"];
        $choice_unit=["unit"];
        $choice_add_info=["comment"];
        add_new_choice($choice_type_id,$choice_value,$choice_unit,$choice_add_info);
    }
    echo $data;

    function add_new_choice($choice_type_id,$choice_value,$choice_unit,$choice_add_info){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt=$conn->prepare("INSERT INTO valikute_vaartused(id,vaartus,uhik,markused,valikute_nimetus_id,deleted,in_edit) VALUES(NULL,?,?,?,?,'0','0')");
        $stmt->bind_param("sssi",$choice_value,$choice_unit,$choice_add_info,$choice_type_id);
        $stmt->execute();
        if($stmt->error){
            echo $conn->error;
        }
        $stmt->close();
        $conn->close();

    }