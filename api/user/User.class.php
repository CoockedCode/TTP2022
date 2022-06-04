<?php

    require_once("../Session/Session.class.php");
    require_once('../config.php');

class User{

    public function store_new($first_name, $last_name, $usrNam, $passWrd, $on_pay): void{
        $this->store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay);
    }

    public function sign_in($user_name, $password){
        $this->sign_in_user($user_name, $password);
    }

    public function fetch_data($usrNam){
        $this->fetch_user_data($usrNam);
    }

    private function store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay): void{
        $notice = "";
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT user_name FROM tootaja WHERE user_name = ?");
        $stmt->bind_param("s", $usrNam);
        $stmt->bind_result($usrNam_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            //kasutaja juba olemas - ei saa salvestada!!
            $notice = "Sellise tunnusega (" .$usrNam .") kasutaja on <strong>juba olemas</strong>!";
        }else {
            $stmt = $conn->prepare("INSERT INTO tootaja (id, first_name, last_name, user_name, password, on_pay) VALUES (NULL, ?, ?, ?, ?, ?)");
            echo $conn->error;
            //krüpteerime prarooli
            $option = ["cost" => 12];  // cost on palju vaeva nähakse parooli krüpteerimisesk 12 on max. sool lisatakse automaatselt.
            $pwd_hash = password_hash($passWrd, PASSWORD_BCRYPT, $option); //passwd actual cryptimine.
            //serverisse saatmine
            $stmt->bind_param("ssssi", $first_name, $last_name, $usrNam, $pwd_hash, $on_pay);
            if($stmt->execute()){
                $notice = 'Uus kasutaja edukalt loodud.';
            }else{
                $notice = 'Uue kasutaja loomisel tekkis viga.' .$stmt->error;
            }
        }
		$stmt->close();
		$conn->close();
        echo $notice;
	}

    private function sign_in_user($user_name, $password): void{
        $notice = null;
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT user_name, password FROM tootaja WHERE user_name = ? AND password = ? ");
        echo $conn->error;
        $stmt->bind_param("s", $email);
        $stmt->bind_param("ss", $usrNam, $password);
		$stmt->bind_result($user_name_from_db, $password_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            //tuli vaste, kontrollime parooli
            if(password_verify($password, $password_from_db)){
                //sisse logimine
                $_SESSION["sess_usr_nam"] = $user_name_from_db;
                array_push($list_html, array("usrNam"=>$user_name_from_db, "passWrd"=>$password_from_db));

            }
        }

        $stmt->close();
		$conn->close();

		// Kui on üks või rohkem vasteid, siis kasutaja on olemas...
		// ...ja kui kasutaja on olemas, siis teeme sessiooni talle ja lisame küpsise

		if(!empty($list_html)){
			$sess = new session();
			$sess->start($usrNam);
			echo json_encode($list_html);
		} else {
			echo json_encode(array("error"=>"Vale parool või kasutaja!"));
		}

    }

    private function fetch_user_data($usrNam): void{
		$list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
		$stmt = $conn->prepare("SELECT * FROM tootaja WHERE user_name = ? ");
		$stmt->bind_param("s", $usrNam);
		$stmt->bind_result(
            $id_from_db, $first_name_from_db, $last_name_from_db, $usrNam_from_db, $passWrd_from_db, $on_pay_from_db);
		$stmt->execute();
		// echo $conn->error;
		while($stmt->fetch()){
			array_push($list_html, array(
                "id"=>$id_from_db,
                "first_name"=>$first_name_from_db,
                "last_name"=>$last_name_from_db,
                "user_name"=>$usrNam_from_db,
                "password"=>$passWrd_from_db,
                "on_pay"=>$on_pay_from_db
                ));
		}
		$stmt->close();
		$conn->close();


		if(!empty($list_html)){
			echo json_encode($list_html);
		} else {
			echo json_encode(array("error"=>"Vale parool või kasutaja!"));
		}
	}

}