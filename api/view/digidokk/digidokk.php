<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

    //// * tabeli kohta infi küsimine
	if(isset($_GET["id"]) and !empty($_GET["id"])){
		$id = $_GET["id"];
        DigiDokk::query($id);
        echo(DigiDokk::get_data());
	}
