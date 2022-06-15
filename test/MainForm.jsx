import React from "react";

const MainForm = ({formItem}) => {
  return (
    <div className="todo">
      <span className="todo-text">
		  {/* {index + 1}.     index,  */}		
         ID: {formItem.id} <br /> usr: {formItem.usrNam} <br /> passwd: {formItem.passWrd} <br /> created: {formItem.created} <hr />
      </span>
    </div>
  );
};

export default MainForm;
