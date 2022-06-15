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
        $roleID=$data["employeeRoleID"];


        save_to_db($name, $sname, $mail, $usrNam, $passwd, $telNr, $roleID, $last_added_empID);

    }

    function save_to_db($name, $sname, $mail, $usrNam, $passwd, $telNr, $roleID, $last_added_empID){
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("INSERT INTO tootaja(id, eesnimi, perekonnanimi, telefon_nr, user_name, email, password, palgal, in_edit) VALUES (NULL, ?, ?, ?, ?, ?, ?, '1', '0')");
        $option = ["cost" => 12];  // cost on palju vaeva nähakse parooli krüpteerimisesk 12 on max. sool lisatakse automaatselt.
        $pwd_hash = password_hash($passwd, PASSWORD_BCRYPT, $option);
        $stmt->bind_param("ssssss", $name, $sname, $telNr, $usrNam, $mail, $pwd_hash);
        $stmt->execute();
        $stmt->close();
        if(!empty($roleID)){
            // just lisatud tootaja id andmebaasist saamine
            $stmt = $conn->prepare("SELECT MAX(id) FROM tootaja");
            $stmt->bind_result($last_added_empID);
            $stmt->execute();
            $stmt->close();
            if(!empty($last_added_empID)){
                // Tootaja id ja rolli id sisestamine tootaja_roll tabelisse
                $stmt = $conn->prepare("INSERT INTO tootaja_roll (id, tootaja_id, roll_id, deleted, in_edit) VALUES (NULL, ?, ?, "1", "1")");
                $stmt->bind_param("ii", $last_added_empID, $roleID);
                $stmt->execute();
                $stmt->close();
                $conn->close();
            }
        }

    }
?>
