<?php 

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    read_for_table();


    function read_for_table(){
        $choice_all_info_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt=$conn->prepare("SELECT valikute_vaartused.id,valikute_vaartused.vaartus,valikute_nimetus.nimetus FROM valikute_vaartused JOIN valikute_nimetus ON valikute_vaartused.valikute_nimetus_id=valikute_nimetus.id");
        $stmt->bind_result($id_from_db,$name_from_db,$type_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            array_push($choice_all_info_array, array("id"=>$id_from_db, "name"=>$name_from_db, "type"=>$type_from_db));
        }
        echo json_encode($choice_all_info_array);
    }