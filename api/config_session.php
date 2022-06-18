<?php
	require_once("auth/session/Session.class.php");

	if(!Session::query_session_and_cookie_server()){
		exit;
	}