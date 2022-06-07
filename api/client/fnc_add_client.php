<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $client_name=$data["dataToSave"]["clientName"];
        $client_reg_num=$data["dataToSave"]["clientRegNum"];
        $client_addr=$data["dataToSave"]["clientAddr"];
        $post_index=$data["dataToSave"]["postIndex"];
        $cont_person=$data["dataToSave"]["contPers"];
        $client_email=$data["dataToSave"]["clientEmail"];
        $client_phone=$data["dataToSave"]["clientPhoneNr"];
        $invoice_email=$data["dataToSave"]["invoiceEm"];
        $additional_info=$data["dataToSave"]["additionalInfo"];
        save_to_db($client_name, $client_reg_num, $client_addr, $post_index, $cont_person, $client_email, $client_phone, $invoice_email, $additional_info);
    }
    echo $data;

    function save_to_db($client_name, $client_reg_num, $client_addr, $post_index, $cont_person, $client_email, $client_phone, $invoice_email, $additional_info){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO klient(id,name,reg_nr,address,posti_indeks,kontakt_isik,e_mail,telefon,arve_email,lisa_info) VALUES (NULL,?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("sssisssss", $client_name, $client_reg_num, $client_addr, $post_index, $cont_person, $client_email, $client_phone, $invoice_email, $additional_info);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }