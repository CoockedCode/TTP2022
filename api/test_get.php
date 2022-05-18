<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    if(isset($_GET["usrNam"]) and !empty($_GET["usrNam"])){
        $usrNam = filter_var($_GET["usrNam"], FILTER_SANITIZE_STRING);
        login_usr($usrNam);
    }

    function login_usr($usrNam): void{
	    echo json_encode($usrNam);
        //asd
    }