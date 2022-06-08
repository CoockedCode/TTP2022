<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    require_once("../config.php");
    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $project_num = $data["projectId"];
        $project_name = $data["projectName"];
        $client = $data["client"];
        $machine_type = $data["machineType"];
        $priority = $data["priority"];
        $planned_end_date = $data["plannedEnd"];
        $project_arrived_by = $data["projectArrivedBy"];
        $additional_info = $data["additionalInfo"];
        var_dump($project_num);
        save_to_db($project_num, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by);
    }

    function save_to_db($project_num, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO projekt(id, projekt_nr, prioriteet, alustatud, klient_id, kokkulepitud_lopp, lopp, valjaviidud, arhiivi, arve, saabunud)
                                VALUES (NULL,?,?,(SELECT curdate()),?,?,NULL,NULL,0,0,?)");
        $stmt->bind_param("siiss", $project_num, $priority, $client, $planned_end_date, $project_arrived_by);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }
