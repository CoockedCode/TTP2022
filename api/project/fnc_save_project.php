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
        $project_arrived_transport = $data["projectArrivedTransport"];
        $project_return_by = $data["projectReturnBy"];
        $project_return_transport = $data["projectReturnTransport"];
        $additional_info = $data["additionalInfo"];
        //var_dump($project_num);
        save_to_db($project_num, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by, $project_arrived_transport, $project_return_by, $project_return_transport);
    }

    function save_to_db($project_num, $client, $machine_type, $priority, $planned_end_date, $project_arrived_by, $project_arrived_transport, $project_return_by, $project_return_transport){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO projekt(id, projekt_nr, prioriteet, alustatud, klient_id, kokkulepitud_lopp, lopp, valjaviidud, arve, saabunud, tagastus, arhiivi, in_edit)
                                VALUES (NULL,?,?,(SELECT curdate()),?,?,NULL,NULL,0,?,?,0,0)");
        $stmt->bind_param("siisss", $project_num, $priority, $client, $planned_end_date, $project_arrived_by, $project_return_by);
        $stmt->execute();
        $stmt->close();
        if($project_arrived_by == "transpordifirma"){
            $stmt = $conn->prepare("INSERT INTO transport(id, projekt_id, transpordi_firma_id, suund) VALUES (NULL,(SELECT MAX(id) FROM projekt),?,1)");
            echo json_encode($conn->error);
            $stmt->bind_param("i", $project_arrived_transport);
            $stmt->execute();
            $stmt->close();
        }
        if($project_return_by == "transpordifirma"){
            $stmt = $conn->prepare("INSERT INTO transport(id, projekt_id, transpordi_firma_id, suund) VALUES (NULL,(SELECT MAX(id) FROM projekt),?,2)");
            $stmt->bind_param("i", $project_return_transport);
            $stmt->execute();
            $stmt->close();
        }
        $conn->close();
    }