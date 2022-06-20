<?php

    require_once('../../config_db.php');

class DigiDokk{

    private static $return_data = null;
    public static function get_data(){return self::$return_data;}
    public static function query($id){self::query_project($id);}

    private static function query_project($id): void{
        self::$return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT projekt.id, projekt.projekt_nr, projekt.prioriteet, projekt.alustatud, projekt.klient_id, projekt.kokkulepitud_lopp, projekt.lopp,
        projekt.valjaviidud, projekt.saabunud, projekt.tagastus, projekt.vottis_vastu, arve_info.pakkumise_nr, arve_info.kokkulep_hind, arve_info.kliendi_po_nr, arve_info.lepingu_nr,
        arve_info.tellimuse_esitaja, arve_info.telefon_nr, klient.name, klient.reg_nr, klient.address, klient.posti_indeks, klient.kontakt_isik, klient.e_mail, klient.telefon,
        klient.arve_email, klient.lisa_info
        FROM projekt
        JOIN arve_info ON arve_info.projekt_id = projekt.id
        JOIN klient ON klient.id = arve_info.id
        WHERE projekt.id = ?");
        $stmt->bind_param("i", $id);
        $stmt->bind_result($id2, $projekt_nr, $prioriteet, $alustatud, $klient_id, $kokkulepitud_lopp, $lopp, $valjaviidud, $saabunud, $tagastus, $vottis_vastu,
        $pakkumise_nr, $kokkulep_hind, $kliendi_po_nr, $lepingu_nr, $tellimuse_esitaja, $arve_telefon_nr, $kliendinimi, $regnr, $address, $postiindeks, $kontaktisik, $klient_email,
        $klient_telefon, $klient_arve_email, $klient_lisainfo);
        $stmt->execute();
        if($stmt->fetch()){
            $post_address = $address . ", " . $postiindeks;
            array_push($list_html, array(
                "id"=>$id2,
                "projekt_nr"=>$projekt_nr,
                "prioriteet"=>$prioriteet,
                "alustatud"=>$alustatud,
                "kliendi_id"=>$klient_id,
                "kokkulepitud_lopp"=>$kokkulepitud_lopp,
                "lopp"=>$lopp,
                "valjaviidud"=>$valjaviidud,
                "saabunud"=>$saabunud,
                "tagastus"=>$tagastus,
                "vottis_vastu"=>$vottis_vastu,
                "pakkumise_nr"=>$pakkumise_nr,
                "kokkulep_hind"=>$kokkulep_hind,
                "kliendi_po_nr"=>$kliendi_po_nr,
                "lepingu_nr"=>$lepingu_nr,
                "tellimuse_esitaja"=>$tellimuse_esitaja,
                "arve_telefon_nr"=>$arve_telefon_nr,
                "kliendinimi"=>$kliendinimi,
                "regnr"=>$regnr,
                "post_address"=>$post_address,
                "kontaktisik"=>$kontaktisik,
                "klient_email"=>$klient_email,
                "klient_telefon"=>$klient_telefon,
                "klient_arve_email"=>$klient_arve_email,
                "klient_lisainfo"=>$klient_lisainfo,
                "notice"=>"Info edukalt saadud!",
                "type"=>"success"));
        }

        $stmt->close();
		$conn->close();

        if(empty($list_html)){
            array_push($list_html, array("notice"=>"Infot ei saadud!", "type"=>"error"));
		}
        self::$return_data = json_encode($list_html);
    }

}
