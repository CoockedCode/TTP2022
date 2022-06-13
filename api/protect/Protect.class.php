<?php

    require_once('../session/Session.class.php');
    require_once('../config.php');

class Protect{

    private $return_data = null;
    public function get_data(){return $this->return_data;}

    public function query($table, $id){$this->query_in_eit($table, $id);}
    public function start($table, $id, $set_in_edit){$this->set_in_edit($table, $id, $set_in_edit);}

    private function query_in_eit($table, $id): void{
        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
        $list_html = array();

		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");
        $stmt = $conn->prepare("SELECT in_edit FROM $table WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->bind_result($in_edit_from_db);
        $stmt->execute();
        if($stmt->fetch()){
            if($in_edit_from_db == "1"){
                array_push($list_html, array("in_edit"=>"1", "notice"=>"Keegi juba muudab!", "type"=>"error"));
            }else{
                array_push($list_html, array("in_edit"=>"0", "notice"=>"Saad muuta!", "type"=>"info"));
            }
        }

        $stmt->close();
		$conn->close();

        if(!empty($list_html)){
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Keegi juba muudab!", "type"=>"error"));
            $this->return_data = json_encode($list_html);
		}
        $this->return_data = json_encode($list_html);
    }

    private function set_in_edit($table, $id, $set_in_edit): void{

        //	TODO: see tööle panna..
        // session_start();
        // if ($_SESSION["status"] != 'true') {exit;}

        $this->return_data = null;
        $list_html = array();
		$conn = new mysqli($GLOBALS["server_host"], $GLOBALS["server_user_name"], $GLOBALS["server_password"], $GLOBALS["database"], $GLOBALS["db_port"]);
		$conn->set_charset("utf8");

        // * in_edit uuenadmine nr 1-ks
        $stmt = $conn->prepare("UPDATE $table SET in_edit = ? WHERE id = ?");
        $stmt->bind_param("is", $set_in_edit, $id);
        $stmt->execute();
        if($stmt->fetch()){
            if($set_in_edit == "1"){
                array_push($list_html, array("in_edit"=>"1", "notice"=>"Keegi juba muudab!", "type"=>"error"));
            }else{
                array_push($list_html, array("in_edit"=>"0", "notice"=>"Saad muuta!", "type"=>"info"));
            }

        }

        $stmt->close();
		$conn->close();
        if(!empty($list_html)){
            $this->return_data = json_encode($list_html);
		}else{
            array_push($list_html, array("notice"=>"Kõik katki!", "type"=>"error"));
            $this->return_data = json_encode($list_html);
		}
        $this->return_data = json_encode($list_html);



    }

}