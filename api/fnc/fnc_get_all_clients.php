<?php
    require_once('../config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    if(isset($_GET["client"])){
        read_clients();
    }

    function read_clients(){
        $client_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT * FROM klient");
        $stmt->bind_result($id_from_db, $name_from_db, $reg_from_db, $address_from_db, $posti_indeks_from_db, $kontakt_isik_from_db, $e_mail_from_db, $telefon_from_db, $arve_mail_from_db, $lisa_info_from_db);
        while($stmt->fetch()){
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
        echo json_encode($client_array);
        $stmt->close();
        $conn->close();
    }