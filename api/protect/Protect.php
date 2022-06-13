<?php
	header("Access-Control-Allow-Origin: *");

    require_once("Protect.class.php");

	// ! Kas on ikka GET päring?
	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;
	}

    // ! uus objekt
    $protect = new Protect();

    // * sisse logimine
	if(isset($_GET["table"]) and !empty($_GET["table"]) and isset($_GET["id"]) and !empty($_GET["id"])){
		$table = filter_var($_GET["table"], FILTER_SANITIZE_STRING);
		$id = filter_var($_GET["id"], FILTER_SANITIZE_STRING);
        $protect->query($table, $id);
        echo($protect->get_data());
	}
