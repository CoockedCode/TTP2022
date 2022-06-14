<?php
	header("Access-Control-Allow-Origin: *");
    require_once("Protect.class.php");
	if($_SERVER['REQUEST_METHOD'] != 'GET') {exit;}		// ! Kas on ikka GET päring?
	$protect = new Protect();							// ! uus objekt

	// * tabeli in_edit muutmine
	if(
		isset($_GET["set_table"]) and !empty($_GET["set_table"]) and
		isset($_GET["set_id"]) and !empty($_GET["set_id"]) and
		isset($_GET["set_in_edit"]) and !empty($_GET["set_in_edit"])
	){
		$set_table = filter_var($_GET["set_table"], FILTER_SANITIZE_STRING);
		$set_id = filter_var($_GET["set_id"], FILTER_SANITIZE_STRING);
		$set_in_edit = filter_var($_GET["set_in_edit"], FILTER_SANITIZE_STRING);
		$protect->set($set_table, $set_id, $set_in_edit);
		echo($protect->get_data());
		revert_in_edit($set_table, $set_id);
		echo "Tere!";

	}

	// echo "Tere!";
	revert_in_edit(2, 2);

    // * tabeli kohta infi küsimine
	if(isset($_GET["table"]) and !empty($_GET["table"]) and isset($_GET["id"]) and !empty($_GET["id"])){
		$table = filter_var($_GET["table"], FILTER_SANITIZE_STRING);
		$id = filter_var($_GET["id"], FILTER_SANITIZE_STRING);
        $protect->query($table, $id);
        echo($protect->get_data());
	}

	// ! SHUDOWN
	ignore_user_abort(true);							// ! php jääb siis ka käima kui leht kinni
	// set_time_limit(60*30);								// ! php käivitab 30 minutiks (MAX)
	// register_shutdown_function('shutdown');				// ! sutdown fnc nimetamine.
	// function shutdown(){sleep(10);}						// ! paus ennem kui php läheb kinni. (Sek)

	// * in_edit tagasi 0 peale teatud aega...
	function revert_in_edit($set_table, $set_id): void{
		$protect = new Protect();
		if(connection_aborted()){
			// $protect->set($set_table, $set_id, 0);
		}

		$max_time = time_sleep_until(time() + 4*1);	// ! paus ennem kui php läheb kinni. (Sek)

		if(time() > $max_time){
			//$protect->set($set_table, $set_id, 0);
			echo "Terewas!";
		}

	}