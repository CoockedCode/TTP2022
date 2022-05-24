import React, { useState, useEffect } from "react";
import MainForm2 from "../MainForm2";
import axios from "axios";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

//Muutujad contendi laadimiseks...
let isLoaded = false;
const TestAB = () => {
	const [queryText, setQueryText] = useState('');
	const endpoint = 'http://cookedcode.tk/dev/api/fnc/fnc_usr.php?get_usr=get_all';
	const [forms, formItem] = useState([]);
	const fetchForms = async () => {
	const { status, data } = await axios.get(endpoint);
		if (status === 200) {
			formItem(data);
			isLoaded = true;
		}
	};
	
	//Teeb asja ainult 1 kord...
	useEffect(() => { fetchForms(); }, []);
	
	return (
	<>
		<main>
			<section>
				<h3>Vali kasutaja</h3>
				<div id="search-bar">
					<label htmlFor="userSrc"></label>
					<input type="search" name="userSrc" id="userSrc" required placeholder="Otsi..." autoComplete="off" onInput={(e)=> setQueryText(e.target.value)}/>
				</div>
				<hr />
				<div id="showUsr">
					<ReactPlaceholder ready={isLoaded} color='#E0E0E0' rows={4} firstLaunchOnly={true}>
						
					{
						
					forms.filter((forms) => {
						//console.log(forms);
						if(queryText == ""){
							return forms;
						}else if(forms.id.toString().toLowerCase().includes(queryText.toString().toLowerCase())){
							return forms;
						}else if(forms.usrNam.toString().toLowerCase().includes(queryText.toString().toLowerCase())){
							return forms;
						}
							
					}).map((forms, key) => ( 
						<MainForm2
						formItem={forms}
						key={key} 
						placeholder="Loding..."
						/>
					))
						
					}
						
					</ReactPlaceholder>	
				</div>
			</section>
		</main>
		
	</>
	);
  
}

export default TestAB;
