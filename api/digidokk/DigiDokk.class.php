<?php

    require_once('../session/Session.class.php');
    require_once('../config.php');

class DigiDokk{

    private $return_data = null;
    public function get_data(){return $this->return_data;}

    public function query($id){$this->query_project($id);}

    private function query_project($id): void{

        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT id, projekt_nr, prioriteet, alustatud, klient_id, kokkulepitud_lopp, lopp, valjaviidud, arve, saabunud, tagastus, teostatav, vottis_vastu, arhiivi FROM projekt WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->bind_result($id2, $projekt_nr, $prioriteet, $alustatud, $klient_id, $kokkulepitud_lopp, $lopp, $valjaviidud, $arve, $saabunud, $tagastus, $teostatav, $vottis_vastu, $arhiivi);
        $stmt->execute();
        if($stmt->fetch()){
            array_push($list_html, array(
                "id"=>$id2,
                "projekt_nr"=>$projekt_nr,
                "prioriteet"=>$prioriteet,
                "alustatud"=>$alustatud,
                "kliendi_id"=>$klient_id,
                "kokkulepitud_lopp"=>$kokkulepitud_lopp,
                "lopp"=>$lopp,
                "valjaviidud"=>$valjaviidud,
                "arve"=>$arve,
                "saabunud"=>$saabunud,
                "tagastus"=>$tagastus,
                "teostatav"=>$teostatav,
                "vottis_vastu"=>$vottis_vastu,
                "arhiivi"=>$arhiivi,
                "notice"=>"Info edukalt saadud!",
                "type"=>"success"));
        }

        $stmt->close();
		$conn->close();

        if(empty($list_html)){
            array_push($list_html, array("notice"=>"Infot ei saadud!", "type"=>"error"));
		}
        $this->return_data = json_encode($list_html);
    }

}
