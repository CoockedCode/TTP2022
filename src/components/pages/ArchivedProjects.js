import {useState} from 'react';

export default function ArchivedProjects(){

	const [searchID, setSearchID] = useState();
	const searchFnc = (e)=>{
		e.preventDefault();
		console.log(searchID);
		document.getElementById(searchID).style.color = "red";
	}
	
	return(
		<>
		<main>
			<section>
				<div id="header-wrapper">
					<h3>Arhiveeritud projektid</h3>
				</div>				
				<div id="content-wrapper">
					<div id="search-wrapper" style={{paddingBottom: "22px"}}> 
						<form onSubmit={(e) => searchFnc(e)}>
							<label htmlFor="searchID">Otsi: </label>
							<input type="search" name="searchID" id="searchID" onInputCapture={(e) => setSearchID(e.target.value)}/>
							<label htmlFor="searchBtn"></label>
							<input type="submit" value="Otsi" />
						</form>
											
					</div>										
					<table className="tg">
						<thead>
							<tr>
								<td className="tg-0lax" id="columnID" >ID</td>
								<td className="tg-0lax" id="column2">Projekt</td>
								<td className="tg-0lax" id="column3">Info</td>
							</tr>
							<tr id="345345">
								<td className="tg-0lax" >345345</td>
								<td className="tg-0lax" id="column2">Mähkimine</td>
								<td className="tg-0lax" id="column3">lõpetatud</td>
							</tr>
							<tr id='675867'>
								<td className="tg-0lax" >675867</td>
								<td className="tg-0lax" id="column2">Laagri vahetus</td>
								<td className="tg-0lax" id="column3">lõpetatud</td>
							</tr>
							<tr id='324'> 
								<td className="tg-0lax" >324</td>
								<td className="tg-0lax" id="column2">Mootori hooldus</td>
								<td className="tg-0lax" id="column3">lõpetatud</td>
							</tr>
							<tr id='76'>
								<td className="tg-0lax" >76</td>
								<td className="tg-0lax" id="column2">Värvimine</td>
								<td className="tg-0lax" id="column3">lõpetatud</td>
							</tr>
							<tr id='789'>
								<td className="tg-0lax" >789</td>
								<td className="tg-0lax" id="column2">Tasakaalustamine</td>
								<td className="tg-0lax" id="column3">lõpetatud</td>
							</tr>
						</thead>
					</table>
				</div>
			</section>
		</main>
		</>
	);
}