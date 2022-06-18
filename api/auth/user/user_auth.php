<?php
    require_once("User.class.php");
    require_once("../../config_header.php");

    // * sisse logimine
	if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and isset($_GET["passWrd"]) and !empty($_GET["passWrd"])){
		$usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
		$passWrd = filter_var($_GET["passWrd"], FILTER_SANITIZE_STRING);
        User::sign_in($usrNam, $passWrd);
        echo(User::get_data());
	}