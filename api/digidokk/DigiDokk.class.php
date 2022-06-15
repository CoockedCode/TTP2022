<?php

    require_once('../session/Session.class.php');
    require_once('../config.php');

class DigiDokk{

    private $return_data = null;

    public function get_data(){return $this->return_data;}

    public function query($id){$this->query_project($id);}

    private function query_project($id){

        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT * FROM project WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->bind_result($id_from_db, $projekt_nr_from_db, $prioriteet_from_db, $klient_id_from_db, $kokkulepitud_lopp_from_db, $lopp_from_db, $valjaviidud_from_db, $arve_from_db,
            $saabunud_from_db, $tagastus_from_db, $teostatav_from_db, $vottis_vastu_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            
                array_push($list_html, array(
                    "id"=>$id_from_db,
                    "projekt_nr"=>$projekt_nr_from_db,
                    "prioriteet"=>$prioriteet_from_db,
                    "kliendi id"=>$klient_id_from_db,
                    "kokkulepitud lopp"=>$kokkulepitud_lopp_from_db,
                    "lopp"=>$lopp_from_db,
                    "valjaviidud"=>$valjaviidud_from_db,
                    "arve"=>$arve_from_db,
                    "saabunud"=>$saabunud_from_db,
                    "tagastus"=>$tagastus_from_db,
                    "teostatav"=>$teostatav_from_db,
                    "vottis vastu"=>$vottis_vastu_from_db,
                    "notice"=>"Info edukalt saadud!",
                    "type"=>"success"));
         

        }else{
            array_push($list_html, array(
            "notice"=>"Infot ei saadud!",
            "type"=>"error"));
        }

        $stmt->close();
		$conn->close();

        if(!empty($list_html)){
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Viga andmebaasiga suhtlemisel!", "type"=>"error"));
            $this->return_data = json_encode($list_html);
		}
        $this->return_data = json_encode($list_html);


    }

}
