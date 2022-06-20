<?php

    require_once("../../config_db.php");
    require_once("../session/session.class.php");

class User{

    private static $return_data = null;

    public static function get_data(){
        return self::$return_data;
    }

    public static function store_new($first_name, $last_name, $user_name, $password, $on_pay){
        self::store_new_user($first_name, $last_name, $user_name, $password, $on_pay);
    }

    public static function log_in($user_name, $password){
        self::log_in_user($user_name, $password);
    }

    public static function fetch_data($user_name){
        self::fetch_user_data($user_name);
    }

    public static function change_password($user_name, $old_password, $new_password){
        self::change_user_password($user_name, $old_password, $new_password);
    }

    public static function change_name($old_user_name, $new_user_name, $password){
        self::change_user_name($old_user_name, $new_user_name, $password);
    }

    private static function change_user_name($old_user_name, $new_user_name, $password): void{
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


    private static function change_user_password($user_name, $old_password, $new_password): void{
        self::$return_data = null;
        $list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        // * kasutaja vana parooli kätte saamine ja lahti krüpteerimine
        $stmt = $conn->prepare("SELECT id, password FROM tootaja WHERE user_name = ? AND palgal = '1'");
        $stmt->bind_param("s", $user_name);
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

    private static function store_new_user($first_name, $last_name, $user_name, $password, $on_pay){
        self::$return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT user_name FROM tootaja WHERE user_name = ?");
        $stmt->bind_param("s", $user_name);
        $stmt->bind_result($user_name_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            array_push($list_html, array("error"=>'Uue kasutaja loomisel tekkis viga.' . "Sellise kasutajanimega kasutaja on juba olemas!"));
        }else {
            $stmt = $conn->prepare("INSERT INTO tootaja (id, eesnimi, perekonnanimi, user_name, password, palgal) VALUES (NULL, ?, ?, ?, ?, ?)");
            // echo $conn->error;
            $option = ["cost" => 12];  // cost on palju vaeva nähakse parooli krüpteerimisesk 12 on max. sool lisatakse automaatselt.
            $pwd_hash = password_hash($password, PASSWORD_BCRYPT, $option);
            $stmt->bind_param("ssssi", $first_name, $last_name, $user_name, $pwd_hash, $on_pay);
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

    private static function log_in_user($user_name, $password): void{
        self::$return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT user_name, password FROM tootaja WHERE user_name = ? AND palgal = '1'");
        $stmt->bind_param("s", $user_name);
		$stmt->bind_result($user_name_from_db, $password_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            if(password_verify($password, $password_from_db)){
                $_SESSION["user_name"] = $user_name_from_db;
                array_push($list_html, array("user_name"=>$user_name_from_db, "signIn"=>"true"));
            }
        }
        $stmt->close();
		$conn->close();

		if(!empty($list_html)){
			Session::start($user_name);
            self::$return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("error"=>"Vale parool või kasutaja!"));
            self::$return_data = json_encode($list_html);
		}

    }

    private static function fetch_user_data($user_name): void{
        self::$return_data = null;
		$list_html = array();
        $roles = null;
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT id, eesnimi, perekonnanimi, user_name, email FROM tootaja WHERE user_name = ?");
		$stmt->bind_param("s", $user_name);
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