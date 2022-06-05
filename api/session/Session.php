<?php
    header("Access-Control-Allow-Origin: *"); // Allow cross domain AJAX requests
	require_once("Session.class.php");

    // Kas on ikka GET päring?
	if ($_SERVER['REQUEST_METHOD'] != 'GET') {
		exit;
	}

	// Sess obj moodustamine
	$sess = new session();

	// Päringu filtreerimine
	if(isset($_GET["start"]) and !empty($_GET["start"])){
		$usrNam = filter_var($_GET["start"], FILTER_SANITIZE_STRING);
		$sess->start($usrNam);
	}
	if($_GET["destroy"] == "true"){
		$sess->destroy();
	}
	if($_GET["querySess"] == "true"){
		$sess->query();
		echo($sess->get_data());
	}

    // var_dump($_SESSION);
	// var_dump($_COOKIE);