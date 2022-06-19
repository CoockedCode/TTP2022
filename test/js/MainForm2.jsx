import React from "react";

const MainForm2 = ({formItem}) => { 
  return (
    <div className="todo">
      <span className="todo-text">
		  {/* {index + 1}.     index,  */}		
         ID: {formItem.id} <br /> {formItem.usrNam}:{formItem.passWrd} <br /> created: {formItem.created} <hr />
      </span>
    </div>
  );
}; 

export default MainForm2;
