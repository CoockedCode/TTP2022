<?php

class session {
	// Kui tehakse sess siis saadetakse kasutaja nimi ka sessiooni väljale!!!!
	// Ehk tehakse ka küpsis selle jaoks, et saaks pärast auto sisse logida!!!

	private static $return_data = null;
    public static function get_data(){return self::$return_data;}
	public static function start($usrNam){self::start_session_and_cookie($usrNam);}
	public static function destroy(){self::destroy_session_and_cookie();}
	public static function query(){self::query_session_and_cookie();}

	private static function start_session_and_cookie($usrNam): void{
		setcookie("ELMAS", $usrNam, [
			'expires' => time()+(86400 * 7),
			'path' => "/",
			'domain' => "elektrimasinad.digifi.eu",
			'samesite' => "strict",
			'secure' => "true",
			'httponly' => "true",
    	]);
		session_start();
		$_SESSION["user_name"] = $usrNam;
		$_SESSION["status"] = "true";
	}

	private static function destroy_session_and_cookie(): void{
		session_start();
		$_SESSION["user_name"] = null;
		$_SESSION["status"] = "false";
		setcookie("ELMAS", "", [
			'expires' => time()-(86400 * 10),
			'path' => "/",
			'domain' => "elektrimasinad.digifi.eu",
			'samesite' => "strict",
			'secure' => "true",
			'httponly' => "true",
    	]);
		session_unset();
		session_destroy();
	}

	private static function query_session_and_cookie(): void{
		self::$return_data = null;
        $list_html = array();
		session_destroy();
		if(isset($_COOKIE) and !empty($_COOKIE)){
			session_start();
			if ($_SESSION["status"] == 'true'){
				array_push($list_html, array("status"=>"true", "user_name"=>$_SESSION["user_name"]));
			}else{
				array_push($list_html, array("status"=>"false", "user_name"=>null));
			}
		}else{
			array_push($list_html, array("status"=>"false", "user_name"=>null));
		}
		self::$return_data = json_encode($list_html);
	}

	// * Meetod serveri siseseks ringluseks
	public static function query_session_and_cookie_server(){
		$notice = null;
		session_destroy();
		if(isset($_COOKIE) and !empty($_COOKIE)){
			session_start();
			if ($_SESSION["status"] == 'true'){
				$notice = true;
			}else{
				$notice = false;
			}
		}else{
			$notice = false;
		}
		return $notice;
	}

}
