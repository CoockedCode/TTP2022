<?php

	header("Access-Control-Allow-Origin: *");
    require_once("DigiDokk.class.php");
	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;}		// ! Kas on ikka GET päring?

	$DD = new DigiDokk();

    //// * tabeli kohta infi küsimine
	if(isset($_GET["id"]) and !empty($_GET["id"])){
		$id = $_GET["id"];
        $DD->query($id);
        echo($DD->get_data());
	}
