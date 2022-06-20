<?php
    require_once("../../config_header.php");
    require_once("../../config_db.php");
    require_once("../../config_session.php");

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
        $stmt = $conn->prepare("INSERT INTO tootaja(id, eesnimi, perekonnanimi, telefon_nr, user_name, email, password, palgal, in_edit) VALUES (NULL, ?, ?, ?, ?, ?, ?, 1, 0)");
        $option = ["cost" => 12];  // cost on palju vaeva nähakse parooli krüpteerimisesk 12 on max. sool lisatakse automaatselt.
        $pwd_hash = password_hash($passwd, PASSWORD_BCRYPT, $option);
        $stmt->bind_param("ssssss", $name, $sname, $telNr, $usrNam, $mail, $pwd_hash);
        $stmt->execute();
        $stmt->close();

        // Tootaja id ja rolli id sisestamine tootaja_roll tabelisse
        $stmt = $conn->prepare("INSERT INTO tootaja_roll (id, tootaja_id, roll_id, deleted, in_edit) VALUES (NULL, (SELECT MAX(id) FROM tootaja), ?, 0, 0)");
        $stmt->bind_param("i", $roleID);
        $stmt->execute();
        $stmt->close();
        $conn->close();

    }
?>
