<?php
	header("Access-Control-Allow-Origin: *");

    require_once("User.class.php");
    require_once('../Validate.class.php');

	// ! Kas on ikka GET päring?
	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;
	}

    // ! uus objekt
    $user = new User();

    // * sisse logimine
	if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and isset($_GET["passWrd"]) and !empty($_GET["passWrd"])){
		$usrNam = Validate::str($_GET["usrNam"]);
		$passWrd = Validate::str($_GET["passWrd"]);
        $user->sign_in($usrNam, $passWrd);
        echo($user->get_data());
	}

    // * kasutaja info
	if(isset($_GET["usr"]) and !empty($_GET["usr"])){
        $usrNam = Validate::str($_GET["usr"]);
        $user->fetch_data($usrNam);
        echo($user->get_data());
	}

    // * kasutaja parooli muutmine
	if(
        isset($_GET["changePwdUsr"]) and !empty($_GET["changePwdUsr"]) and
        isset($_GET["changePwdOld"]) and !empty($_GET["changePwdOld"]) and
        isset($_GET["changePwdNew"]) and !empty($_GET["changePwdNew"])
    ){
        $usrNam = Validate::str($_GET["changePwdUsr"]);
        $old_password = Validate::str($_GET["changePwdOld"]);
        $new_password = Validate::str(($_GET["changePwdNew"]);
        $user->change_password($usrNam, $old_password, $new_password);
        echo($user->get_data());
	}

    // * kasutaja nime muutmine
	if(
        isset($_GET["changeNameOld"]) and !empty($_GET["changeNameOld"]) and
        isset($_GET["changeNameNew"]) and !empty($_GET["changeNameNew"]) and
        isset($_GET["changeNamePwd"]) and !empty($_GET["changeNamePwd"])
    ){
        $old_user_name = Validate::str($_GET["changeNameOld"]);
        $new_user_name = Validate::str($_GET["changeNameNew"]);
        $password = Validate::str($_GET["changeNamePwd"]);
        $user->change_name($old_user_name, $new_user_name, $password);
        echo($user->get_data());
	}

    // * uue kasutaja lisamine
    if(
        isset($_GET["first_name"]) and !empty($_GET["first_name"]) and
        isset($_GET["last_name"]) and !empty($_GET["last_name"]) and
        isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and
        isset($_GET["passWrd"]) and !empty($_GET["passWrd"]) and
        isset($_GET["onPay"]) and !empty($_GET["onPay"])
    ){
        $last_name = Validate::str($_GET["last_name"]);
        $usrNam = Validate::str($_GET["usrNam"]);
        $passWrd = Validate::str($_GET["passWrd"]);
        $on_pay = Validate::int($_GET["onPay"]);
        $user->store_new($first_name, $last_name, $usrNam, $passWrd, $on_pay);
        // echo($user->get_data());
    }
