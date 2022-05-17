import React, { useState, useEffect } from "react";
import MainForm from "../MainForm";
import axios from "axios";

const TestAB = () => {

	const [usrNam, setUsrNam] = useState(null);
	const endpoint = 'http://cookedcode.tk/dev/api/fnc/test.php?usrNam=';
	const [forms, formItem] = useState([]);
	const fetchForms = async () => {
	const { status, data } = await axios.get(endpoint + usrNam);
		if (status === 200) {
			formItem(data);
		}
	};
	
	useEffect(() => {
		if(usrNam !== null && usrNam !== " "){
			if(usrNam.length > 4){
				fetchForms();
			}
		}
	}, [usrNam]);
	
	return (
	<>
		<main>
			<section>
				<h3>Vali kasutaja</h3>
				<input type="search" name="userSrc" id="userSrc"  required placeholder="Kasutaja" onInput={(e)=> setUsrNam(e.target.value)}/>
				<hr />
				<div id="showUsr">			
					{forms.map((forms) => (
						<MainForm
						formItem={forms}
						key={forms.id} 
						/>
					))}
				</div>
			</section>
		</main>
	</>
	);
  
}

export default TestAB;
