<?php

ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: *; charset=UTF-8");
require_once("../config.php");

function read_clients(){
    $conn = new mysqli($GLOBALS["server_host"],$GLOBALS["sever_user_name"],$GLOBALS["server_password"],$GLOBALS["database"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT name,reg_nr,address,posti_indeks,kontakt_isik,e_mail,telefon,arve_email,lisa_info FROM klient");
		echo $conn->error;
        $stmt->bind_result($name_from_db,$reg_from_db,$address_from_db,$posti_indeks_from_db,$kontakt_isik_from_db,$e_mail_from_db,$telefon_from_db,$arve_mail_from_db,$lisa_info_from_db);
        $for_js=null;
        while($stmt->fetch()){
            $for_js .="[{Nimi:".$name_from_db.",";
            $for_js .= $reg_from_db.",";
            $for_js .= $address_from_db.",";
            $for_js .= $posti_indeks_from_db.",";
            $for_js .= $kontakt_isik_from_db.",";
            $for_js .= $e_mail_from_db.",";
            $for_js .= $telefon_from_db.",";
            $for_js .= $arve_mail_from_db.",";
            $for_js .= $lisa_info_from_db."}]";
        }
        $stmt->close;
        $conn->close;
        return $for_js;
}