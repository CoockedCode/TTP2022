<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);
    // $data=file_get_contents('php://input');

    if(!empty($data)){
        $choice_type_id=$data["choiceID"];
        $choice_value=$data["name"];
        if(!empty($data["unit"])){
            $choice_unit=$data["unit"];
        } else{
            $choice_unit=NULL;
        }
        if(!empty($data["comment"])){
            $choice_add_info=$data["comment"];
        } else{
            $choice_add_info=NULL;
        }
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