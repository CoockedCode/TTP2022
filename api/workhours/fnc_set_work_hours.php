<?php

require_once('../config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: *; charset=UTF-8");
$data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $client_name=$data["projectID"];
        $client_reg_num=$data["clientRegNum"];
        $client_addr=$data["clientAddr"];
        $post_index=$data["postIndex"];
        $cont_person=$data["contPers"];
        $client_email=$data["clientEmail"];
        $client_phone=$data["clientPhoneNr"];
        $invoice_email=$data["invoiceEm"];
        $additional_info=$data["additionalInfo"];
        set_project_hours()
    }
    echo $data;


function set_project_hours(){

}