<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");

	// Kas on ikka GET päring?
	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		exit;
	}

	// Päringu filtreerimine
	if(isset($_GET["usr"]) and !empty($_GET["usr"])){
        $usrNam = filter_var($_GET["usr"], FILTER_SANITIZE_STRING);
		fetch_user_data($usrNam);
	}

	// Funktsioonid
