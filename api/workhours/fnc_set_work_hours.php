<?php

require_once('../config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: *; charset=UTF-8");
$data = json_decode(file_get_contents('php://input'), true);

    if(!empty($data)){
        $project_id=$data["projectID"];
        $project_all_hours=$data["projectAllHours"];
        $project_normal_hours=$data["projectNormalHours"];
        $project_over_hours=$data["projectOverHours"];
        $worker_id=$data["workerID"];
        $work_id=$data["workID"];
        $date_opened=$data["projectOpenedDate"];
        $worker_normal_hours=$data["projectWorkerNormalHours"];
        $worker_over_hours=$data["projectWorkerOverHours"];
        set_project_hours($project_id,$project_all_hours,$project_normal_hours,$project_over_hours);
    }
    echo $data;


function set_project_hours($project_id,$project_all_hours,$project_normal_hours,$project_over_hours){
    $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
    $conn->set_charset("utf8");
    $stmt=$conn->prepare("SELECT id from toode_tunnid WHERE projekt_id=?");
    $stmt->bind_param("i",$project_id);
    $stmt->bind_result($test);
    $stmt->execute();
    if($stmt->fetch()){
        $stmt->close();
        $stmt=$conn->prepare("SELECT kokku_h,kokku_norm_h,kokku_ule_h FROM toode_tunnid WHERE projekt_id=?");
        $stmt->bind_param("i",$project_id);
        $stmt->bind_result($all_hours_from_db,$nomal_hours_from_db,$over_hours_from_db);
        $stmt->execute();
        echo "Kaa vigane".$stmt->error;
        $total_hours=$all_hours_from_db+$project_all_hours;
        $total_normal_hours=$nomal_hours_from_db+$project_normal_hours;
        $total_over_hours=$over_hours_from_db+$project_over_hours;
        $stmt->close();
        $stmt=$conn->prepare("UPDATE toode_tunnid SET kokku_h=?,kokku_norm_h=?,kokku_ule_h=? WHERE projekt_id=?");
        $stmt->bind_param("iiii",$total_hours,$total_normal_hours,$total_over_hours,$project_id);
        $stmt->execute();
        $stmt->close();
    } else {
        $stmt->close();
        $stmt=$conn->prepare("INSERT INTO toode_tunnid(id,projekt_id,kokku_h,kokku_norm_h,kokku_ule_h,in_edit,deleted) VALUES (NULL,?,?,?,?,'0','0')");
        $stmt->bind_param("iiii",$project_id,$project_all_hours,$project_normal_hours,$project_over_hours);
        $stmt->execute();
        if($stmt->error()){
            echo $conn->error;
        }
        $stmt->close();
        echo("else");
    }
    $conn->close();
    set_worker_hours($GLOBALS["project_id"],$GLOBALS["worker_id"],$GLOBALS["work_id"],$GLOBALS["date_opened"],$GLOBALS["worker_normal_hours"],$GLOBALS["worker_over_hours"]);

}

function set_worker_hours($project_id,$worker_id,$work_id,$date_opened,$worker_normal_hours,$worker_over_hours){
    $id_for_insert=null;
    $conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
    $conn->set_charset("utf8");
    $stmt=$conn->prepare("SELECT id from toode_tunnid WHERE projekt_id=?");
    echo $conn->error;
    $stmt->bind_param("i",$project_id);
    $stmt->bind_result($project_hours_id_from_db);
    $stmt->execute();
    echo "Viga siin".$stmt->error;
    $id_for_insert=$project_hours_id_from_db;
    $stmt->close();
    echo($id_for_insert);
    $stmt=$conn->prepare("INSERT INTO tootajate_tunnid(id,toode_tunnid_id,tootaja_id,tooetapi_nimetus_id,kuupaev,norm_h,ule_h,in_edit,deleted) VALUES(NULL,?,?,?,?,?,?,'0','0')");
    echo "Viga seal".$conn->error;
    $stmt->bind_param("iiisii",$id_for_insert,$worker_id,$work_id,$date_opened,$worker_normal_hours,$worker_over_hours);
    $stmt->execute();
    echo $stmt->error;
    $stmt->close();
    $conn->close();

}