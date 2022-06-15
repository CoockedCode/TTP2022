<?php
	header("Access-Control-Allow-Origin: *");
    require_once("Protect.class.php");

	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;}		// ! Kas on ikka GET päring?