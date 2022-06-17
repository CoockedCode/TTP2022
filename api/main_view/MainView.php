<?php
    require_once("MainView.class.php");
	require_once("../config.php");

	// * Kõikide tabelite kohta infi küsimine
	if(isset($_GET["fetch"]) and !empty($_GET["fetch"])){
		$fetch = filter_var($_GET["fetch"], FILTER_SANITIZE_STRING);
		MainView::fetch($fetch);
		echo(MainView::get_data());
	}

	// * Projekti arhiveermine
	$data = json_decode(file_get_contents('php://input'), true);
	if(!empty($data)){
		MainView::archive($data);
		echo(MainView::get_data());
	}