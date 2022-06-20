<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);

    // id küsimine ABst nime / väärtuse saamiseks järgmistel:
    // deviceID TIMM
    // powerID TIMM
    // rotPerMin TIMM
    // manufacturer TIMM
    // shaftHeight TIMM
    // powerSupply TIMM
    // frequency TIMM
    // isolationClass TIMM
    // IPClass TIMM
    // tester ID TIMM
    // isolationResistanceUnit id
    // connectionType id
    // testingMethod id
    // testingVoltage id
    // voltageTest id
    // resistanceUUnit
    // resistanceVUnit
    // resistanceWUnit

    if(!empty($data)){
        $project_id = $data["projectId"];
        $device_type_id = $data["deviceType"]; // olemas
        $power_id = $data["power"]; // olemas
        $rot_per_min_id = $data["rotPerMin"]; // olemas
        $device_type_nr = $data["typeNr"]; // olemas
        $manufacturer_id = $data["manufacturer"]; // olemas
        $shaft_height_id = $data["shaftHeight"]; // olemas
        $power_supply_id = $data["powerSupply"]; // olemas
        $frequency_id = $data["frequency"]; // olemas
        $isolation_class_id = $data["isolationClass"]; // olemas
        $IP_class_id = $data["IPClass"]; // olemas
        $factory_nr = $data["factoryNr"]; // olemas
        $mode = $data["mode"]; // olemas
        $EX_marking = $data["EXMarking"]; // olemas
        $bearing_de = $data["bearingDE"]; // olemas
        $bearing_nde = $data["bearingNDE"]; // olemas
        $additional_info = $data["additionalInfo"]; // olemas

        // nested objektid
        $winding_data = $data["windingData"];
        $device_testing_data = $data["deviceTestingData"];
        $device_tester_id = $data["deviceTestingData"][0]["tester"];
        $isolation_resistance_unit_id = $data["deviceTestingData"][0]["isolationResistanceUnit"];
        $device_equipment_data = $data["deviceEquipmentData"];

        // echo json_encode($data["deviceTestingData"][0]["isolationResistanceUnit"]);
        echo ($winding_data);

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
        // echo json_encode("SEAL");
        save_device_data($GLOBALS["power_id"], $GLOBALS["rot_per_min_id"], 
                         $GLOBALS["shaft_height_id"], $GLOBALS["power_supply_id"], 
                         $GLOBALS["frequency_id"], $GLOBALS["isolation_class_id"], 
                         $GLOBALS["IP_class_id"], $GLOBALS["factory_nr"], $GLOBALS["mode"], 
                         $GLOBALS["EX_marking"], $GLOBALS["bearing_de"], 
                         $GLOBALS["bearing_nde"], $GLOBALS["additional_info"], 
                         $GLOBALS["winding_data"]);
    }

    function save_device_data($power_id, $rot_per_min_id, $shaft_height_id, 
                              $power_supply_id, $frequency_id, $isolation_class_id, 
                              $IP_class_id, $factory_nr, $mode, $EX_marking, $bearing_de, 
                              $bearing_nde, $additional_info, $winding_data){

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
            // echo json_encode($stmt->error);
            $stmt->execute();
            $stmt->close();

        }
        $technical_array = array(
            // 'power_kW' => $power_id,
            // 'rotation_per_min' => $rot_per_min_id,
            // 'shaft_height' => $shaft_height_id,
            // 'power_supply' => $power_supply_id,
            // 'frequency' => $frequency_id,
            // 'isolation_class' => $isolation_class_id, 
            // 'IP_class' => $IP_class_id, 
            'factory_nr' => $factory_nr, 
            'mode' => $mode, 
            'EX_marking' => $EX_marking, 
            'bearing_de' => $bearing_de, 
            'bearing_nde' => $bearing_nde, 
            'additional_info' => $additional_info
        );
        // foreach($technical_array as $key => $val){
        //     if($key == 'factory_nr'){break;}
        //     $stmt = $conn->prepare("SELECT vaartus FROM valikute_vaartused WHERE id=?");
        //     $stmt->bind_param("i", $val);
        //     $stmt->bind_result($value_from_db);
        //     $stmt->execute();
        //     if($stmt->fetch()){
        //         $data_array[$key] = $value_from_db;
        //     }
        //     $stmt->close();
        // }
        // tehniliste andmete lahtrite salvestamine
        $technical_array = json_encode($technical_array, JSON_FORCE_OBJECT);
        $stmt = $conn->prepare("INSERT INTO tehniline_info(id,seade_id,nimetus,andmed,deleted,in_edit) VALUES (NULL,(SELECT MAX(id) FROM seade),'tehniline-info',?,0,0)");
        $stmt->bind_param("s", $technical_array);
        $stmt->execute();
        $stmt->close();
        // mähise andmete salvestamine
        $winding_data = json_encode($winding_data, JSON_FORCE_OBJECT);
        $stmt = $conn->prepare("INSERT INTO tehniline_info(id,seade_id,nimetus,andmed,deleted,in_edit) VALUES (NULL,(SELECT MAX(id) FROM seade),'mahise-andmed',?,0,0)");
        $stmt->bind_param("s", $winding_data);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }