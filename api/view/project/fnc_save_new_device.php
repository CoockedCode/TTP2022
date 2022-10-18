<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $project_id = $data["projectId"];
        $device_type_id = $data["deviceType"];
        $power_id = $data["power"];
        $rot_per_min_id = $data["rotPerMin"];
        $device_type_nr = $data["typeNr"];
        $manufacturer_id = $data["manufacturer"];
        $shaft_height_id = $data["shaftHeight"];
        $power_supply_id = $data["powerSupply"];
        $frequency_id = $data["frequency"];
        $isolation_class_id = $data["isolationClass"];
        $IP_class_id = $data["IPClass"];
        $factory_nr = $data["factoryNr"];
        $mode = $data["mode"];
        $EX_marking = $data["EXMarking"];
        $bearing_de = $data["bearingDE"];
        $bearing_nde = $data["bearingNDE"];
        $additional_info = $data["additionalInfo"];

        // nested objektid
        $winding_data = $data["windingData"];
        $device_testing_data = $data["deviceTestingData"]; 
        $device_equipment_data = $data["deviceEquipmentData"]; 

        save_device($device_type_id, $device_type_nr, $manufacturer_id);
    }

    function save_device($device_type_id, $device_type_nr, $manufacturer_id){
        $list_html = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");

        // seade tabelisse salvestamine
        $stmt = $conn->prepare("INSERT INTO seade(id,tuup,seriaali_number,tootja,deleted,in_edit) 
                                VALUES (NULL,(SELECT vaartus FROM valikute_vaartused WHERE id=?),?,(SELECT vaartus FROM valikute_vaartused WHERE id=?),0,0)");
        $stmt->bind_param("isi", $device_type_id, $device_type_nr, $manufacturer_id);
        $stmt->execute();
        $stmt->close();
        $conn->close();
        save_device_data($GLOBALS["power_id"], $GLOBALS["rot_per_min_id"], 
                         $GLOBALS["shaft_height_id"], $GLOBALS["power_supply_id"], 
                         $GLOBALS["frequency_id"], $GLOBALS["isolation_class_id"], 
                         $GLOBALS["IP_class_id"], $GLOBALS["factory_nr"], $GLOBALS["mode"], 
                         $GLOBALS["EX_marking"], $GLOBALS["bearing_de"], 
                         $GLOBALS["bearing_nde"], $GLOBALS["additional_info"], 
                         $GLOBALS["winding_data"], $GLOBALS["device_testing_data"],
                         $GLOBALS["device_equipment_data"]);
    }

    function save_device_data($power_id, $rot_per_min_id, $shaft_height_id, 
                              $power_supply_id, $frequency_id, $isolation_class_id, 
                              $IP_class_id, $factory_nr, $mode, $EX_marking, $bearing_de, 
                              $bearing_nde, $additional_info, $winding_data, $device_testing_data,
                              $device_equipment_data){

        $data_array = array($power_id, $rot_per_min_id, $shaft_height_id, 
                            $power_supply_id, $frequency_id, $isolation_class_id, 
                            $IP_class_id, $factory_nr, $mode, $EX_marking, $bearing_de, 
                            $bearing_nde, $additional_info);

        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");

        // vaartused tabelisse salvestamine
        for($x = 0; $x < 7; $x++){
            $stmt = $conn->prepare("INSERT INTO vaartused(id,vaartus,uhik,seade_id,valikute_nimetus_id,deleted,in_edit)
                                    VALUES (NULL,(SELECT vaartus FROM valikute_vaartused WHERE id=?),
                                           (SELECT uhik FROM valikute_vaartused WHERE id=?),
                                           (SELECT MAX(id) FROM seade),
                                           (SELECT valikute_nimetus_id FROM valikute_vaartused WHERE id=?),0,0)");
            $stmt->bind_param("iii", $data_array[$x], $data_array[$x], $data_array[$x]);
            $stmt->execute();
            $stmt->close();

        }

        $technical_array = array(
            'factory_nr'      => $factory_nr,
            'mode'            => $mode,
            'EX_marking'      => $EX_marking,
            'bearing_de'      => $bearing_de,
            'bearing_nde'     => $bearing_nde,
            'additional_info' => $additional_info
        );

        $data_to_save = array(
            'tehniline-info'  => $technical_array,
            'mahise-andmed'   => $winding_data,
            'seadme-katsetus' => $device_testing_data,
            'seadme-varustus' => $device_equipment_data
        );

        foreach($data_to_save as $name => $data){
            $data = json_encode($data, JSON_FORCE_OBJECT);
            $stmt = $conn->prepare("INSERT INTO tehniline_info(id,seade_id,nimetus,andmed,deleted,in_edit)
                                    VALUES (NULL,(SELECT MAX(id) FROM seade),?,?,0,0)");
            $stmt->bind_param("ss", $name, $data);
            $stmt->execute();
            $stmt->close();
        }
        $conn->close();
    }