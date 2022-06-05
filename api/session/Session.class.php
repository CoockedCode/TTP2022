<?php

	require_once("SessionManager.class.php");

class session {
	// Kui tehakse sess siis saadetakse kasutaja nimi ka sessiooni väljale!!!!
	// Ehk tehakse ka küpsis selle jaoks, et saaks pärast auto sisse logida!!!

	// Meetodite välja kutsumine
	private $return_data = null;
    public function get_data(){return $this->return_data;}
	public function start($usrNam){$this->start_session_and_cookie($usrNam);}
	public function destroy(){$this->destroy_session_and_cookie();}
	public function query(){$this->query_session_and_cookie();}

	// Funktsioonid
	private function start_session_and_cookie($usrNam): void{
		//SessionManager::sessionStart("ELMAS", 86400, "/", "elektrimasinad.digifi.eu", true);
		// OOP meetod, mitte katkine otsene nö vooid meetodi kasutamine. Ehk tehakse uus obj!
		$sessMan = new SessionManager();

		// TODO: PÄRIS BULIDS SEE LIADA
		$sessMan->sessionStart("ELMAS", 86400, "/", "elektrimasinad.digifi.eu", true);
		setcookie("ELMAS", $usrNam, time()+(86400 * 7), "/", "elektrimasinad.digifi.eu", true, true);

		//TODO: JA SEE EEMALDADA
		// $sessMan->sessionStart("ELMAS", 86400, "/", "/", true);
		// // setcookie("ELMAS", $usrNam, time()+(86400 * 7));
		// setcookie("ELMAS", $usrNam, time()+(86400 * 7), "/", "localhost:1234");

		$_SESSION["sess_usr_nam"] = $usrNam;
	}
	private function destroy_session_and_cookie(): void{
		session_destroy();
		setcookie("ELMAS", "", time()-(86400 * 10), "/", "elektrimasinad.digifi.eu", true, true);
		setcookie("ELMAS_Session", "", time()-(86400 * 10), "/", "elektrimasinad.digifi.eu", true, true);
	}
	private function query_session_and_cookie(): void{
		$this->return_data = null;
        $list_html = array();

		if(isset($_COOKIE) and !empty($_COOKIE)){
			array_push($list_html, array("status"=>"true", "user_name"=>$_COOKIE["ELMAS"]));
			// echo json_encode(['true',  $_COOKIE["ELMAS"]]);
			//var_dump($_COOKIE);
		}else{
			array_push($list_html, array("status"=>"false", "user_name"=>null));
			// echo json_encode(['false',  'No cookie']);
		}

		// array_push($list_html, array("status"=>"tru2e", "user_name"=>$_COOKIE["ELMAS"]));

		$this->return_data = json_encode($list_html);
	}
} // class end

	// TODO: TRY CATCH!
	// TODO: Sess muutjate mida on tuleviks vaja!
	// $sess_user_id = $_SESSION['sess_user_id'];
	// $sess_user_role = $_SESSION['sess_user_role'];