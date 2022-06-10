<?php

use function PHPSTORM_META\type;

    require_once('../session/Session.class.php');
    require_once('../config.php');

class User{

    private $return_data = null;

    public function get_data(){
        return $this->return_data;
    }

    public function store_new($first_name, $last_name, $usrNam, $passWrd, $on_pay){
        $this->store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay);
    }

    public function sign_in($user_name, $password){
        $this->sign_in_user($user_name, $password);
    }

    public function fetch_data($usrNam){
        $this->fetch_user_data($usrNam);
    }

    public function change_password($usrNam, $old_password, $new_password){
        $this->change_user_password($usrNam, $old_password, $new_password);
    }

    public function change_name($old_user_name, $new_user_name, $password){
        $this->change_user_name($old_user_name, $new_user_name, $password);
    }

    private function change_user_name($old_user_name, $new_user_name, $password): void{
        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        // TODO: kontrolli kas selline kasutaja nimi on olemas juba...

        $this->return_data = null;
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
                            array_push($list_html, array("notice"=>"Kasutajanimi edukalt muudetud!", "type"=>"success"));
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
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Vale parool või kasutaja!", "type"=>"error"));
            $this->return_data = json_encode($list_html);
		}
        $this->return_data = json_encode($list_html);
    }


    private function change_user_password($usrNam, $old_password, $new_password): void{
        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
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
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Vale parool või kasutaja!", "type"=>"error"));
            $this->return_data = json_encode($list_html);
		}
        $this->return_data = json_encode($list_html);
    }

    private function store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay){
        //	TODO: see tööle panna.. kas ikka on sess olemas?
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
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

        $this->return_data = json_encode($list_html);

	}

    private function sign_in_user($user_name, $password): void{
        $this->return_data = null;
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
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("error"=>"Vale parool või kasutaja!"));
            $this->return_data = json_encode($list_html);
		}

    }

    private function fetch_user_data($usrNam): void{
        //	kas ikka on sess olemas?
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
		$list_html = array();

        // // Error kontroll
        // array_push($list_html, array("error"=>$_SESSION["status"]));
        // $this->return_data = json_encode($list_html);

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");

		$stmt = $conn->prepare("SELECT id, eesnimi, perekonnanimi, user_name, email FROM tootaja WHERE user_name = ?");
		$stmt->bind_param("s", $usrNam);
		$stmt->bind_result(
            $id_from_db, $first_name_from_db, $last_name_from_db, $user_name_from_db, $email_from_db);

		$stmt->execute();
		// echo $conn->error;
		while($stmt->fetch()){
			array_push($list_html, array(
                "id"=>$id_from_db,
                "first_name"=>$first_name_from_db,
                "last_name"=>$last_name_from_db,
                "user_name"=>$user_name_from_db,
                "email"=>$email_from_db
                ));
		}
		$stmt->close();
		$conn->close();

		if(!empty($list_html)){
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("error"=>"Vale parool või kasutaja!"));
            $this->return_data = json_encode($list_html);
		}

	}

}