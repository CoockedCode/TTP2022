<?php
	header("Access-Control-Allow-Origin: *");

    require_once("./User.class.php");

	// Kas on ikka GET päring?
	if($_SERVER['REQUEST_METHOD'] != 'GET') {
		exit;
	}

    //kasutaja info
	if(isset($_GET["usr"]) and !empty($_GET["usr"])){
        $usrNam = filter_var($_GET["usr"], FILTER_SANITIZE_STRING);
        $user = new User();
        $user->fetch_data($usrNam);
	}

    //sisse logimine
	if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and isset($_GET["passWrd"]) and !empty($_GET["passWrd"])){
		$usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
		$passWrd = filter_var($_GET["passWrd"], FILTER_SANITIZE_STRING);
        $user = new User();
        $user->sign_in($usrNam, $passWrd);
	}

    //uue kasutaja lisamine
    // if(
    //     isset($_GET["first_name"]) and !empty($_GET["first_name"]) and
    //     isset($_GET["last_name"]) and !empty($_GET["last_name"]) and
    //     isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and
    //     isset($_GET["passWrd"]) and !empty($_GET["passWrd"]) and
    //     isset($_GET["onPay"]) and !empty($_GET["onPay"])
    // ){
    //     $first_name = filter_var($_GET["first_name"], FILTER_SANITIZE_STRING);
    //     $last_name = filter_var($_GET["last_name"], FILTER_SANITIZE_STRING);
    //     $usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
    //     $passWrd = filter_var($_GET["passWrd"], FILTER_SANITIZE_STRING);
    //     $on_pay = filter_var($_GET["onPay"], FILTER_SANITIZE_STRING);
    //     $user = new User();
    //     $user->store_new($first_name, $last_name, $usrNam, $passWrd, $on_pay);
    // }
