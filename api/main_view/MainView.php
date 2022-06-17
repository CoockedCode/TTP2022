<?php
	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);
	//error_reporting(E_ALL);

	header("Access-Control-Allow-Origin: *");
    require_once("MainView.class.php");
	//if($_SERVER['REQUEST_METHOD'] != 'GET' ) {exit;}		// ! Kas on ikka GET / POST päring?

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