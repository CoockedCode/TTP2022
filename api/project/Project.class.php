<?php

    require_once('../session/Session.class.php');
    require_once('../config.php');

class Project{

    // TODO: LISADA SESS KONTROLL...

    private $return_data = null;
    public function get_data(){return $this->return_data;}

    public function query(){$this->query_project();}
    public function query_all(){$this->query_all_projects();}

    private function query_project(): void{
        $this->return_data = null;
        $list_html = array();
    }

    private function query_all_projects(): void{
        $this->return_data = null;
        $list_html = array();
    }

}