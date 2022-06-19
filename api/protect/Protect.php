<?php
	require_once("Protect.class.php");
	require_once("../config_header.php");

	// * tabeli in_edit muutmine
	if(
		isset($_GET["set_table"]) and !empty($_GET["set_table"]) and
		isset($_GET["set_id"]) and !empty($_GET["set_id"]) and
		isset($_GET["set_in_edit"]) and !empty($_GET["set_in_edit"])
	){
		$set_table = filter_var($_GET["set_table"], FILTER_SANITIZE_STRING);
		$set_id = $_GET["set_id"];
		$set_in_edit = $_GET["set_in_edit"];
		Protect::set($set_table, $set_id, $set_in_edit);
		echo(Protect::get_data());
		// revert_in_edit($set_table, $set_id);
	}

    // * tabeli kohta infi küsimine
	if(isset($_GET["table"]) and !empty($_GET["table"]) and isset($_GET["id"]) and !empty($_GET["id"])){
		$table = filter_var($_GET["table"], FILTER_SANITIZE_STRING);
		$id = $_GET["id"];
        Protect::query($table, $id);
        echo(Protect::get_data());
	}

	// ! SHUDOWN
	ignore_user_abort(true);							// ! php jääb siis ka käima kui leht kinni
	set_time_limit(60*30);								// ! php käivitab 30 minutiks (MAX)
	register_shutdown_function('shutdown');				// ! sutdown fnc nimetamine.
	function shutdown(){sleep(0);}						// ! paus ennem kui php läheb kinni. (Sek)

	// * in_edit tagasi 0 peale teatud aega...
	function revert_in_edit($set_table, $set_id): void{
		$protect = new Protect();
		if(connection_aborted()){
			Protect::set($set_table, $set_id, 0);
			exit();
		}
		//$max_time = time_sleep_until(time() + 60*15);	// ! paus ennem kui php läheb kinni. (Sek)
		// while(time()){
		// 	if($max_time > time()){
		// 		usleep(1);
		// 		break;
		// 	}else{
		// 		Protect::set($set_table, $set_id, 0);
		// 		exit();
		// 	}
		// 	//Protect::set($set_table, $set_id, 0);
		// }
	}