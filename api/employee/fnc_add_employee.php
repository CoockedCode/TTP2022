<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: *; charset=UTF-8");
    require_once("../config.php");

    $data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $name=$data["employeeFname"];
        $sname=$data["employeeSname"];
        $mail=$data["employeeMail"];
        $telNr=$data["employeeNumber"];
        $usrNam=$data["employeeUsername"];
        $passwd=$data["employeePassword"];
        save_to_db($name, $sname, $mail, $usrNam, $passwd, $telNr);
    }

    function save_to_db($name, $sname, $mail, $usrNam, $passwd, $telNr){
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $list_html = array();
            $stmt = $conn->prepare("INSERT INTO tootaja (id, eesnimi, perekonnanimi, user_name, email, password, palgal, in_edit, telefon_nr) VALUES (NULL, ?, ?, ?, ?, ?, '1', '0', ?)");
            $option = ["cost" => 12];  // cost on palju vaeva nähakse parooli krüpteerimisesk 12 on max. sool lisatakse automaatselt.
            $pwd_hash = password_hash($passwd, PASSWORD_BCRYPT, $option);
            $stmt->bind_param("ssssss", $name, $sname, $usrNam, $mail, $pwd_hash, $telNr);

            if($stmt->execute()){
                array_push($list_html, array("error"=>"Edukalt salvestatud!"));
            }else{
                array_push($list_html, array("error"=>'Uue kasutaja loomisel tekkis viga.' .$stmt->error));
            }
		$stmt->close();
		$conn->close();
        echo json_encode($list_html);
    }
