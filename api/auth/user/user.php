<?php
    require_once("user.class.php");
    require_once("../../config_header.php");
    require_once("../../config_session.php");

    // * kasutaja info
	if(isset($_GET["usr"]) and !empty($_GET["usr"])){
        $usrNam = filter_var($_GET["usr"], FILTER_SANITIZE_STRING);
        User::fetch_data($usrNam);
        echo(User::get_data());
	}

    // * kasutaja parooli muutmine
	if(
        isset($_GET["changePwdUsr"]) and !empty($_GET["changePwdUsr"]) and
        isset($_GET["changePwdOld"]) and !empty($_GET["changePwdOld"]) and
        isset($_GET["changePwdNew"]) and !empty($_GET["changePwdNew"])
    ){
        $usrNam = filter_var($_GET["changePwdUsr"], FILTER_SANITIZE_STRING);
        $old_password = filter_var($_GET["changePwdOld"], FILTER_SANITIZE_STRING);
        $new_password = filter_var($_GET["changePwdNew"], FILTER_SANITIZE_STRING);
        User::change_password($usrNam, $old_password, $new_password);
        echo(User::get_data());
	}

    // * kasutaja nime muutmine
	if(
        isset($_GET["changeNameOld"]) and !empty($_GET["changeNameOld"]) and
        isset($_GET["changeNameNew"]) and !empty($_GET["changeNameNew"]) and
        isset($_GET["changeNamePwd"]) and !empty($_GET["changeNamePwd"])
    ){
        $old_user_name = filter_var($_GET["changeNameOld"], FILTER_SANITIZE_STRING);
        $new_user_name = filter_var($_GET["changeNameNew"], FILTER_SANITIZE_STRING);
        $password = filter_var($_GET["changeNamePwd"], FILTER_SANITIZE_STRING);
        User::change_name($old_user_name, $new_user_name, $password);
        echo(User::get_data());
	}

    // * uue kasutaja lisamine
    if(
        isset($_GET["first_name"]) and !empty($_GET["first_name"]) and
        isset($_GET["last_name"]) and !empty($_GET["last_name"]) and
        isset($_GET["usrNam"]) and !empty($_GET["usrNam"]) and
        isset($_GET["passWrd"]) and !empty($_GET["passWrd"]) and
        isset($_GET["onPay"]) and !empty($_GET["onPay"])
    ){
        $first_name = filter_var($_GET["first_name"], FILTER_SANITIZE_STRING);
        $last_name = filter_var($_GET["last_name"], FILTER_SANITIZE_STRING);
        $usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
        $passWrd = filter_var($_GET["passWrd"], FILTER_SANITIZE_STRING);
        $on_pay = filter_var($_GET["onPay"], FILTER_SANITIZE_STRING);
        User::store_new($first_name, $last_name, $usrNam, $passWrd, $on_pay);
        // echo(User::get_data());
    }
