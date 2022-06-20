<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $client_name=$data["clientName"];
        $client_reg_num=$data["clientRegNum"];
        $client_addr=$data["clientAddr"];
        $post_index=$data["postIndex"];
        $cont_person=$data["contPers"];
        $client_email=$data["clientEmail"];
        $client_phone=$data["clientPhoneNr"];
        $invoice_email=$data["invoiceEm"];
        $additional_info=$data["additionalInfo"];
        save_to_db($client_name, $client_reg_num, $client_addr, $post_index, $cont_person, $client_email, $client_phone, $invoice_email, $additional_info);
    }
    //echo $data;

    function save_to_db($client_name, $client_reg_num, $client_addr, $post_index, $cont_person, $client_email, $client_phone, $invoice_email, $additional_info){
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO klient(id,name,reg_nr,address,posti_indeks,kontakt_isik,e_mail,telefon,arve_email,lisa_info,deleted,in_edit) VALUES (NULL,?,?,?,?,?,?,?,?,?,'0','0')");
        $stmt->bind_param("sssisssss", $client_name, $client_reg_num, $client_addr, $post_index, $cont_person, $client_email, $client_phone, $invoice_email, $additional_info);
        $stmt->execute();
        // if($stmt->error){
        //     echo $conn->error;
        // }
        $stmt->close();
        $conn->close();
    }