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
        $work_type = $data["workType"]; // ei saada prg
        $planned_end_date = $data["plannedEndDate"];
        $start_date = $data["startDate"];
        $project_arrived_by = $data["projectArrivedBy"];
        $project_arrived_transport = $data["projectArrivedTransport"];
        $project_return_by = $data["projectReturnBy"];
        $project_return_transport = $data["projectReturnTransport"];
        $offer_nr = $data["offerNr"];
        $agreed_price = $data["agreedPrice"];
        $client_PO = $data["clientPO"];
        $orderer = $data["orderer"];
        $orderer_phone_nr = $data["ordererPhoneNr"];
        $contract_nr = $data["contractNr"];
        $first_defecting = $data["firstDefecting"];
        $accepted_by = $data["acceptedBy"];
        $additional_info = $data["additionalInfo"]; // ei saada prg
        //var_dump($project_num);
        save_to_db($project_num, $client, $machine_type, $priority, $start_date, $planned_end_date, $project_arrived_by, 
                    $project_arrived_transport, $project_return_by, $project_return_transport, $offer_nr, 
                    $agreed_price, $client_PO, $orderer, $orderer_phone_nr, $contract_nr, $first_defecting, $accepted_by);
    }

    function save_to_db($project_num, $client, $machine_type, $priority, $start_date, $planned_end_date, 
                        $project_arrived_by, $project_arrived_transport, $project_return_by, 
                        $project_return_transport, $offer_nr, $agreed_price, $client_PO, $orderer,
                        $orderer_phone_nr, $contract_nr, $first_defecting, $accepted_by){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        // projekti info salvestamine
        $stmt = $conn->prepare("INSERT INTO projekt(id, projekt_nr, prioriteet, alustatud, klient_id, kokkulepitud_lopp, lopp, valjaviidud, arve, saabunud, tagastus, teostatav, vottis_vastu, arhiivi, in_edit)
                                VALUES (NULL,?,?,?,?,?,NULL,NULL,0,?,?,?,?,0,0)");
        $stmt->bind_param("sisisssis", $project_num, $priority, $start_date, $client, $planned_end_date, $project_arrived_by, $project_return_by, $first_defecting, $accepted_by);
        $stmt->execute();
        $stmt->close();
        // transpordi firma salvestamine
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
        // arve info salvestamine
        $stmt = $conn->prepare("INSERT INTO arve_info(id, projekt_id, pakkumise_nr, kokkulep_hind, kliendi_po_nr, lepingu_nr, tellimuse_esitaja, telefon_nr) 
                                VALUES (NULL,(SELECT MAX(id) FROM projekt),?,?,?,?,?,?)");
        $stmt->bind_param("ssssss", $offer_nr, $agreed_price, $client_PO, $contract_nr, $orderer, $orderer_phone_nr);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }