<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);

    // id küsimine ABst nime / väärtuse saamiseks järgmistel:
    // deviceID
    // powerID
    // rotPerMin
    // manufacturer
    // shaftHeight
    // powerSupply
    // frequency
    // isolationClass
    // IPClass
    // tester ID
    // isolationResistanceUnit id
    // connectionType id
    // testingMethod id
    // testingVoltage id
    // voltageTest id
    // resistanceUUnit
    // resistanceVUnit
    // resistanceWUnit

    if(!empty($data)){
        echo $data;
    }

    function save_to_db(){
        $list_html = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        // projekti info salvestamine
        $stmt = $conn->prepare("");
        $stmt->bind_param("", );
        $stmt->execute();
    }