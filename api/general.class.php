<?php

// General::est_locale($from_db_projekt_kokkulepitud_lopp)

// require_once('../../general.class.php');

class General{

	public static function est_locale($value){
		$temp_date = new DateTime($value);
		return $temp_date->format("d.m.Y");
	}

}