<?php

	require_once("SessionManager.class.php");

class session {
	// Kui tehakse sess siis saadetakse kasutaja nimi ka sessiooni väljale!!!!
	// Ehk tehakse ka küpsis selle jaoks, et saaks pärast auto sisse logida!!!

	// Meetodite välja kutsumine
	public function start($usrNam){$this->start_session_and_cookie($usrNam);}
	public function destroy(){$this->destroy_session_and_cookie();}
	public function query(){$this->query_session_and_cookie();}

	// Funktsioonid
	private function start_session_and_cookie($usrNam): void{
		//SessionManager::sessionStart("ELMAS", 86400, "/", "elektrimasinad.digifi.eu", true);
		// OOP meetod, mitte katkine otsene nö vooid meetodi kasutamine. Ehk tehakse uus obj!
		$sess = new SessionManager();
		$sess->sessionStart("ELMAS", 86400, "/", "elektrimasinad.digifi.eu", true);
		setcookie("ELMAS", $usrNam, time()+(86400 * 7), "/", "elektrimasinad.digifi.eu");
		$_SESSION["sess_usr_nam"] = $usrNam;
	}
	private function destroy_session_and_cookie(): void{
		unset($_SESSION);
		session_destroy();
		setcookie("ELMAS", "", time()-3600);
		setcookie("ELMAS_Session", "", time()-3600);
		unset($_COOKIE);
	}
	private function query_session_and_cookie(): void{
		if(isset($_COOKIE) and !empty($_COOKIE)){
			echo json_encode(['true',  $_COOKIE["ELMAS"]]);
			//var_dump($_COOKIE);
		}else{
			echo json_encode(['false',  'No cookie']);
		}
	}
} // class end

	// TODO: TRY CATCH!
	// TODO: Sess muutjate mida on tuleviks vaja!
	// $sess_user_id = $_SESSION['sess_user_id'];
	// $sess_user_role = $_SESSION['sess_user_role'];