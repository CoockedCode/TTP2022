<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");

    if(isset($_GET["client"]) and !empty($_GET["client"])){
        get_client_info($_GET["client"]);
    }

    function get_client_info($id){
        $client_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT * FROM klient WHERE id = ?");
        $stmt->bind_param("i",$id);
        $stmt->bind_result($id_from_db, $name_from_db, $reg_from_db, $address_from_db, $posti_indeks_from_db, $kontakt_isik_from_db, $e_mail_from_db, $telefon_from_db, $arve_mail_from_db, $lisa_info_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            array_push($client_array, array(
                "id"=>$id_from_db,
                "name"=>$name_from_db,
                "regNum"=>$reg_from_db,
                "address"=>$address_from_db,
                "postInd"=>$posti_indeks_from_db,
                "kontakt"=>$kontakt_isik_from_db,
                "mail"=>$e_mail_from_db,
                "telefon"=>$telefon_from_db,
                "invoiceEm"=>$arve_mail_from_db,
                "addInf"=>$lisa_info_from_db
                ));
        }
        $json=json_encode($client_array);
        echo $json;
        $stmt->close();
        $conn->close();
    }