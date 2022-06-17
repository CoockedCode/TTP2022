<?php
	require_once("../config.php");
	require_once("Session.class.php");

	// Päringu filtreerimine
	if(isset($_GET["start"]) and !empty($_GET["start"])){
		$usrNam = filter_var($_GET["start"], FILTER_SANITIZE_STRING);
		Session::start($usrNam);
	}
	if($_GET["destroy"] == "true"){
		Session::destroy();
	}
	if($_GET["querySess"] == "true"){
		Session::query();
		echo(Session::get_data());
	}

    // var_dump($_SESSION);
	// var_dump($_COOKIE);