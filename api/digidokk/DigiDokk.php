<?php
	header("Access-Control-Allow-Origin: *");
    require_once("DigiDokk.class.php");
	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;}		// ! Kas on ikka GET päring?
	$digidokk = new Digidokk();							// ! uus objekt

    // * tabeli kohta infi küsimine
	if(isset($_GET["id"]) and !empty($_GET["id"])){
		$id = $_GET["id"];
        $digidokk->query($id);
        echo($digidokk->get_data());
	}
