import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomizedSnackbars(props) {
  
  function test1() {
  
      
      axios.post("http://cookedcode.tk/dev/api/session/fnc_sess_test.php", {"id":234, "Name": "nimi"}).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });

  }
  
  return (
    <>
      <button onClick={test1} >Test</button>
    </>
  );
}
