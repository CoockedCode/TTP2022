<?php
    ini_set('display_errors', 1);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    require_once("../config.php");

    var_dump $data = json_decode(file_get_contents('php://input'));

    if(!empty($data)){
        $project_num = $data->projectId;
        $project_name = $data->projectName;
        //TODO muuta js dropdowniks ja sealt väärtus saada
        $client = $data->client;
        $machine_type = $data->machineType;
        $priority = $data->priority;
        $planned_end_date = $data->plannedEnd;
        $project_arrived_by = $data->projectArrivedBy;
        $additional_info = $data->additionalInfo;

        save_to_db($project_num, $project_name, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by, $additional_info);
    }

    function save_to_db($project_num, $project_name, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by, $additional_info){
        $notice = null;
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO projekt(projekt_nr, prioriteet, alustatud, klient_id, kokkulepitud_lopp, arhiiv, arve, saabunud) 
                                VALUES (?,?,(SELECT curdate()),?,?,NULL,NULL,false,false,?)");
        echo $conn->error;
        $stmt->bind_param("sididddiiss");
        if($stmt->execute()){
            $notice = "Salvestamine õnnestus!";
        } else {
            $notice = "Tekkis viga: " .$stmt->error;
        }
        $stmt->close();
        $conn->close();
        return $notice;
    }


?>