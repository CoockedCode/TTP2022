<?php

    session_start();
    echo($_SESSION["status"]);

    // //	kas ikka on sess olemas?
    // session_start();
	// if ($_SESSION["status"] != 'true') {exit;}

    // // Kas on ikka GET päring?
	// if ($_SERVER['REQUEST_METHOD'] != 'GET') {exit;}
