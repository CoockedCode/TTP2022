<?php

    require_once('../session/Session.class.php');
    require_once('../config.php');

class User{

    private static $return_data = null;

    public static function get_data(){
        return self::$return_data;
    }

    public static function store_new($first_name, $last_name, $usrNam, $passWrd, $on_pay){
        self::store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay);
    }

    public static function sign_in($user_name, $password){
        self::sign_in_user($user_name, $password);
    }

    public static function fetch_data($usrNam){
        self::fetch_user_data($usrNam);
    }

    public static function change_password($usrNam, $old_password, $new_password){
        self::change_user_password($usrNam, $old_password, $new_password);
    }

    public static function change_name($old_user_name, $new_user_name, $password){
        self::change_user_name($old_user_name, $new_user_name, $password);
    }

    private static function change_user_name($old_user_name, $new_user_name, $password): void{
        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        // TODO: kontrolli kas selline kasutaja nimi on olemas juba...

        self::$return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");

        // * Kasutaja nime jube olemas olu kontroll
        $stmt = $conn->prepare("SELECT EXISTS (SELECT user_name FROM tootaja WHERE user_name = ? limit 1)");
        $stmt->bind_param("s", $new_user_name);
		$stmt->bind_result($response_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            if($response_from_db == 0){
                $stmt->close();
                // * kasutaja vana parooli kätte saamine ja lahti krüpteerimine ning kasutaja nimi
                $stmt = $conn->prepare("SELECT id, password FROM tootaja WHERE user_name = ? AND palgal = '1'");
                $stmt->bind_param("s", $old_user_name);
                $stmt->bind_result($id_from_db, $password_from_db);
                $stmt->execute();
                if($stmt->fetch()){
                    if(password_verify($password, $password_from_db)){
                        $stmt->close();
                        // * kasutajanime muutmine
                        $stmt = $conn->prepare("UPDATE tootaja SET user_name = ? WHERE id = ?");
                        $stmt->bind_param("si", $new_user_name, $id_from_db);
                        if($stmt->execute()){
                            array_push($list_html, array("notice"=>"Kasutajanimi edukalt muudetud!", "type"=>"success", "user_name"=>$new_user_name));
                        }else{
                            array_push($list_html, array("notice"=>'Tekkis viga.' .$stmt->error, "type"=>"error"));
                        }
                    }
                }
            }else{
                array_push($list_html, array("notice"=>'Sellsie nimega kasutaja on juba olemas!', "type"=>"error"));
            }
        }

        $stmt->close();
		$conn->close();
        if(!empty($list_html)){
            self::$return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Vale parool või kasutaja!", "type"=>"error"));
            self::$return_data = json_encode($list_html);
		}
        self::$return_data = json_encode($list_html);
    }


    private static function change_user_password($usrNam, $old_password, $new_password): void{
        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        self::$return_data = null;
        $list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        // * kasutaja vana parooli kätte saamine ja lahti krüpteerimine
        $stmt = $conn->prepare("SELECT id, password FROM tootaja WHERE user_name = ? AND palgal = '1'");
        $stmt->bind_param("s", $usrNam);
		$stmt->bind_result($id_from_db, $password_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            if(password_verify($old_password, $password_from_db)){
                $stmt->close();
                // * uue parooli krüpteermine
                $option = ["cost" => 12];
                $pwd_hash = password_hash($new_password, PASSWORD_BCRYPT, $option);
                // * parooli muutmine
                $stmt = $conn->prepare("UPDATE tootaja SET password = ? WHERE id = ?");
                $stmt->bind_param("si", $pwd_hash, $id_from_db);
                if($stmt->execute()){
                    array_push($list_html, array("notice"=>"Parool edukalt muudetud!", "type"=>"success"));
                }else{
                    array_push($list_html, array("notice"=>'Tekkis viga.' .$stmt->error, "type"=>"error"));
                }
            }
        }
        $stmt->close();
		$conn->close();
        if(!empty($list_html)){
            self::$return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Vale parool või kasutaja!", "type"=>"error"));
            self::$return_data = json_encode($list_html);
		}
        self::$return_data = json_encode($list_html);
    }

    private static function store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay){
        //	TODO: see tööle panna.. kas ikka on sess olemas?
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        self::$return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT user_name FROM tootaja WHERE user_name = ?");
        $stmt->bind_param("s", $usrNam);
        $stmt->bind_result($usrNam_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            array_push($list_html, array("error"=>'Uue kasutaja loomisel tekkis viga.' . "Sellise kasutajanimega kasutaja on juba olemas!"));
        }else {
            $stmt = $conn->prepare("INSERT INTO tootaja (id, eesnimi, perekonnanimi, user_name, password, palgal) VALUES (NULL, ?, ?, ?, ?, ?)");
            // echo $conn->error;
            $option = ["cost" => 12];  // cost on palju vaeva nähakse parooli krüpteerimisesk 12 on max. sool lisatakse automaatselt.
            $pwd_hash = password_hash($passWrd, PASSWORD_BCRYPT, $option);
            $stmt->bind_param("ssssi", $first_name, $last_name, $usrNam, $pwd_hash, $on_pay);
            if($stmt->execute()){
                array_push($list_html, array("error"=>"Edukalt salvestatud!"));
            }else{
                array_push($list_html, array("error"=>'Uue kasutaja loomisel tekkis viga.' .$stmt->error));
            }
        }
		$stmt->close();
		$conn->close();

        self::$return_data = json_encode($list_html);

	}

    private static function sign_in_user($user_name, $password): void{
        self::$return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT user_name, password FROM tootaja WHERE user_name = ? AND palgal = 1");
        $stmt->bind_param("s", $user_name);

		$stmt->bind_result($user_name_from_db, $password_from_db);

        $stmt->execute();
        if($stmt->fetch()){
            if(password_verify($password, $password_from_db)){
                $_SESSION["user_name"] = $user_name_from_db;
                array_push($list_html, array("usrNam"=>$user_name_from_db, "signIn"=>"true"));
            }
        }
        $stmt->close();
		$conn->close();

		if(!empty($list_html)){
			$sess = new session();
			$sess->start($user_name);
            self::$return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("error"=>"Vale parool või kasutaja!"));
            self::$return_data = json_encode($list_html);
		}

    }

    private static function fetch_user_data($usrNam): void{
        //	kas ikka on sess olemas?
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        self::$return_data = null;
		$list_html = array();
        $roles = null;

        // // Error kontroll
        // array_push($list_html, array("error"=>$_SESSION["status"]));
        // self::$return_data = json_encode($list_html);

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");

		$stmt = $conn->prepare("SELECT id, eesnimi, perekonnanimi, user_name, email FROM tootaja WHERE user_name = ?");
		$stmt->bind_param("s", $usrNam);
		$stmt->bind_result(
            $id_from_db, $first_name_from_db, $last_name_from_db, $user_name_from_db, $email_from_db);

		$stmt->execute();
		// echo $conn->error;
		while($stmt->fetch()){
            $conn2 = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
            $stmt2 = $conn2->prepare("SELECT roll.rolli_nimi FROM roll INNER JOIN tootaja_roll ON roll.id=tootaja_roll.roll_id WHERE tootaja_roll.tootaja_id = ?");
                $stmt2->bind_param("i", $id_from_db);
                $stmt2->bind_result($rolename_from_db);
                $stmt2->execute();

                while($stmt2->fetch()){
                    $roles .= $rolename_from_db . " ";
                }

                array_push($list_html, array(
                        "id"=>$id_from_db,
                        "first_name"=>$first_name_from_db,
                        "last_name"=>$last_name_from_db,
                        "user_name"=>$user_name_from_db,
                        "email"=>$email_from_db,
                        "roles"=>$roles
                ));

		}
		$stmt->close();
		$conn->close();
        $stmt2->close();
		$conn2->close();

		if(!empty($list_html)){
            self::$return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("error"=>"Vale parool või kasutaja!"));
            self::$return_data = json_encode($list_html);
		}

	}

}