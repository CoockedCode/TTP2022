<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $material_name=$data["name"];
        $material_type=$data["type"];
        $price=$data["price"];
        save_to_db($material_name, $material_type,$price);
    }
    //echo $data;

    function save_to_db($material_name, $material_type,$price){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
            $stmt = $conn->prepare("INSERT INTO ladu(id,nimetus,tuup,uhiku_hind,in_edit,deleted) VALUES (NULL,?,?,?,'0','0')");
            $stmt->bind_param("ssi",$material_name, $material_type,$price);
            $stmt->execute();
        // if($stmt->error){
        //     echo $conn->error;
        // }
        $stmt->close();
        $conn->close();
    }