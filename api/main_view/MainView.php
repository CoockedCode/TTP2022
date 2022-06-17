<?php
	//ini_set('display_errors', 1);
	//ini_set('display_startup_errors', 1);
	//error_reporting(E_ALL);

	header("Access-Control-Allow-Origin: *");
    require_once("MainView.class.php");
	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;}		// ! Kas on ikka GET päring?

	// * tabeli kohta infi küsimine
	if(
		isset($_GET["fetch"]) and !empty($_GET["fetch"])
		){
		$fetch = filter_var($_GET["fetch"], FILTER_SANITIZE_STRING);

		MainView::query($fetch);
		echo(MainView::get_data());



	}