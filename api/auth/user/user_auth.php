<?php
    require_once("user.class.php");
    require_once("../../config_header.php");

    // * sisse logimine
	if(isset($_GET["user_name"]) and !empty($_GET["user_name"]) and isset($_GET["password"]) and !empty($_GET["password"])){
		$user_name = filter_var($_GET["user_name"], FILTER_SANITIZE_STRING);
		$password = filter_var($_GET["password"], FILTER_SANITIZE_STRING);
        User::log_in($user_name, $password);
        echo(User::get_data());
	}