<?php
	require_once('../config.php');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: *; charset=UTF-8");

    // if(isset($_GET["employee"])){
        get_employees();
    // }

    function get_employees(){
        $employee_array = array();
        $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
        $conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT * FROM tootaja");
        $stmt->bind_result($id_from_db, $fname_from_db, $sname_from_db, $phone_from_db, $username_from_db, $email_from_db, $password_from_db, $status_from_db, $edit_from_db);
        $stmt->execute();

        while($stmt->fetch()){
            if($status_from_db == 1){
                $status_from_db = "Aktiivne";
            }
            if($phone_from_db == ''){
                $phone_from_db = 'Puudub';
            }
            $conn2 = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
            $stmt2 = $conn2->prepare("SELECT roll.rolli_nimi FROM roll INNER JOIN tootaja_roll ON roll.id=tootaja_roll.roll_id WHERE tootaja_roll.tootaja_id = ?");
                $stmt2->bind_param("i", $id_from_db);
                $stmt2->bind_result($rolename_from_db);
                $stmt2->execute();
                while($stmt2->fetch()){
                        array_push($employee_array, array(
                    "employeeID"=>$id_from_db,
                    "employeeFname"=>$fname_from_db,
                    "employeeSname"=>$sname_from_db,
                    "employeeNumber"=>$phone_from_db,
                    "employeeUsername"=>$username_from_db,
                    "employeeMail"=>$email_from_db,
                    "employeePassword"=>$password_from_db,
                    "employeeActive"=>$status_from_db,
                    "employeeRole"=>$rolename_from_db
                    ));
                }
        }
        echo json_encode($employee_array);
        // echo $conn->error;
        $stmt->close();
        $conn->close();
        $stmt2->close();
        $conn2->close();
    }
?>