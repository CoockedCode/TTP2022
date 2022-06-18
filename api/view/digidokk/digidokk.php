<?php

    require_once("DigiDokk.class.php");
    require_once("../config_header.php");

    //// * tabeli kohta infi küsimine
	if(isset($_GET["id"]) and !empty($_GET["id"])){
		$id = $_GET["id"];
        DigiDokk::query($id);
        echo(DigiDokk::get_data());
	}
