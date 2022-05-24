<?php
    ini_set('display_errors', 1);
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);
    
    if(!empty($data)){
        $project_num = $data["dataToSave"]["projectId"];
        $project_name = $data["dataToSave"]["projectName"];
        //TODO muuta js dropdowniks ja sealt väärtus saada
        $client = $data["dataToSave"]["client"];
        $machine_type = $data["dataToSave"]["machineType"];
        $priority = $data["dataToSave"]["priority"];
        $planned_end_date = $data["dataToSave"]["plannedEnd"];
        $project_arrived_by = $data["dataToSave"]["projectArrivedBy"];
        $additional_info = $data["dataToSave"]["additionalInfo"];

        save_to_db($project_num, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by);
    }

    function save_to_db($project_num, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by){
        $notice = null;
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO projekt(id, projekt_nr, prioriteet, alustatud, klient_id, kokkulepitud_lopp, lopp, valjaviidud, arhiivi, arve, saabunud) 
                                VALUES (NULL,?,?,(SELECT curdate()),?,?,NULL,NULL,0,0,?)");
        echo $conn->error;
        $stmt->bind_param("siiss", $project_num, $priority, $client, $planned_end_date, $project_arrived_by);
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