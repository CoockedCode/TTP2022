<?php
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

    private function store_new_user($first_name, $last_name, $usrNam, $passWrd, $on_pay){
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

        $stmt = $conn->prepare("SELECT user_name, password FROM tootaja WHERE user_name = ?");
        // echo $conn->error;
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

		// Kui on üks või rohkem vasteid, siis kasutaja on olemas...
		// ...ja kui kasutaja on olemas, siis teeme sessiooni talle ja lisame küpsise
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
        $this->return_data = null;
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
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("error"=>"Vale parool või kasutaja!"));
            $this->return_data = json_encode($list_html);
		}

	}

}