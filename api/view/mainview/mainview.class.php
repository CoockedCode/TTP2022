<?php

    require_once('../../config_db.php');

class MainView {

	private static $return_data = null;
    public static function get_data(){return self::$return_data;}

	public static function fetch($query){return self::fetch_all_projects($query);}
	public static function archive($id){return self::archive_project($id);}
	public static function query_archive($id){return self::query_archive_project($id);}

	private static function fetch_all_projects($query): void{
		self::$return_data = null;
        $list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT projekt.id, projekt.projekt_nr, projekt.prioriteet, projekt.alustatud, projekt.kokkulepitud_lopp, projekt.lopp, projekt.valjaviidud, projekt.arve, projekt.saabunud, projekt.tagastus, projekt.teostatav, projekt.vottis_vastu, projekt.arhiivi, klient.name FROM projekt LEFT JOIN klient ON projekt.klient_id = klient.id WHERE arhiivi = ?");
		$stmt->bind_param("i", $query);
		$stmt->bind_result(
			$from_db_projekt_id,
			$from_db_projekt_projekt_nr,
			$from_db_projekt_prioriteet,
			$from_db_projekt_alustatud,
			$from_db_projekt_kokkulepitud_lopp,
			$from_db_projekt_lopp,
			$from_db_projekt_valjaviidud,
			$from_db_projekt_arve,
			$from_db_projekt_saabunud,
			$from_db_projekt_tagastus,
			$from_db_projekt_teostatav,
			$from_db_projekt_vottis_vastu,
			$from_db_projekt_arhiivi,
			$from_db_projekt_klient_name
		);
        $stmt->execute();
        while($stmt->fetch()){
			array_push($list_html, array(
				"id_DB"=>$from_db_projekt_id,
				"ID"=>$from_db_projekt_projekt_nr,
				"PT"=>$from_db_projekt_prioriteet,
				"alustatud"=>$from_db_projekt_alustatud,
				"kokkulepitud_lopp"=>$from_db_projekt_kokkulepitud_lopp,
				"lopp"=>$from_db_projekt_lopp,
				"valjaviidud"=>$from_db_projekt_valjaviidud,
				"arve"=>$from_db_projekt_arve,
				"saabunud"=>$from_db_projekt_saabunud,
				"tagastus"=>$from_db_projekt_tagastus,
				"teostatav"=>$from_db_projekt_teostatav,
				"vottis_vastu"=>$from_db_projekt_vottis_vastu,
				"Arhiivi"=>$from_db_projekt_arhiivi,
				"Klient"=>$from_db_projekt_klient_name,
				"DigiDokk"=> '<LINK>',
				"Avatud"=> "homme",
				"Too_nimetus"=> 'Mähkimine',
				"Tootja"=> "ABB",
				"Seadme_liik"=> "ASD",
				"Seadme_tüüp"=> "ASD",
				"kW"=> "ASD",
				"pmin"=> "ASD",
				"Kokkulepitud_tähtaeg"=> "ASD",
				"Lopetatud"=> "ASD",
				"Väljaviidud"=> "ASD",
				"Kustuta"=> "EI",
				"notice"=>"AB-st info kätte saadud!",
				"type"=>"success",

				"Progress"=> [
					["work"=> 'DE', "workProg"=> '1', "pos"=> '1'],
					["work"=> 'LI', "workProg"=> '2', "pos"=> '2'],
					["work"=> 'ASD', "workProg"=> '0',  "pos"=> '3'],
					["work"=> 'DF', "workProg"=> '3',  "pos"=> '4'],
					["work"=> 'DG', "workProg"=> '0',  "pos"=> '5'],
					["work"=> 'HF', "workProg"=> '0',  "pos"=> '6'],

				]
			));
        }
		$stmt->close();
		$conn->close();
        if(empty($list_html)){array_push($list_html, array("notice"=>"AB-ga suhtlemisel tekkis viga!", "type"=>"error"));}
        self::$return_data = json_encode($list_html);
	}

	private static function archive_project($id): void{
		self::$return_data = null;
        $list_html = array();
		$value = self::query_archive_project($id);
		$value = !$value;
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		 $stmt = $conn->prepare("UPDATE projekt SET arhiivi = ? WHERE id = ?");
        $stmt->bind_param("ii", $value, $id);
        $stmt->execute();
        while($stmt->fetch()){
			array_push($list_html, array("notice"=>"Projekt edukalt arhiveeritud!", "type"=>"success"));
        }
        $stmt->close();
		$conn->close();
        //if(empty($list_html)){array_push($list_html, array("notice"=>"AB-ga suhtlemisel tekkis viga!", "type"=>"error"));}
        self::$return_data = json_encode($list_html);
	}

	private static function query_archive_project($id){
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT arhiivi FROM projekt WHERE id = ?");
        $stmt->bind_param("i", $id);
		$stmt->bind_result($from_db_projekt_arhiivi);
        $stmt->execute();
        while($stmt->fetch()){
			$from_db_projekt_arhiivi;
        }
        $stmt->close();
		$conn->close();
		return $from_db_projekt_arhiivi;
	}

}