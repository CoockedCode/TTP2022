<?php
    require_once('../../config_db.php');

class Protect{

    private static $return_data = null;
    public static function get_data(){return self::$return_data;}

    public static function query($table, $id){self::query_in_edit($table, $id);}
    public static function set($table, $id, $set_in_edit){self::set_in_edit($table, $id, $set_in_edit);}

    private static function query_in_edit($table, $id): void{
        self::$return_data = null;
        $list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT in_edit FROM $table WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->bind_result($in_edit_from_db);
        $stmt->execute();
        while($stmt->fetch()){
            if($in_edit_from_db == "1"){
                array_push($list_html, array("in_edit"=>"1", "notice"=>"Keegi juba muudab!", "type"=>"error"));
            }else{
                array_push($list_html, array("in_edit"=>"0", "notice"=>"Saad muuta!", "type"=>"info"));
            }
        }
        $stmt->close();
		$conn->close();
        if(empty($list_html)){array_push($list_html, array("in_edit"=>"1", "notice"=>"Keegi juba muudab!", "type"=>"error"));}
        self::$return_data = json_encode($list_html);
    }

    private static function set_in_edit($table, $id, $set_in_edit): void{
        self::$return_data = null;
        $list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("UPDATE $table SET in_edit = ? WHERE id = ?");
        $stmt->bind_param("ii", $set_in_edit, $id);
        if($stmt->execute()){
            array_push($list_html, array("in_edit"=>"0", "notice"=>"Edukalt AB-sse indo edastatud!", "type"=>"info"));
        }
        $stmt->fetch();

        $stmt->close();
		$conn->close();
        //if(!empty($list_html)){array_push($list_html, array("notice"=>"Kõik katki!", "type"=>"error"));}
        self::$return_data = json_encode($list_html);
    }

    public static function query_in_edit_server($table, $id){
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT in_edit FROM $table WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->bind_result($in_edit_from_db);
        $stmt->execute();
        $stmt->fetch();
        $stmt->close();
		$conn->close();
        return $in_edit_from_db;
    }

}