import {useState} from 'react';

export default function ClientList(){
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
					<h3>Klientide nimekiri</h3>
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
                    <table className="tg" style={{border:"1px solid black"}}>
                        <thead>
                            <tr>
                                <td className="tg-0lax" id="column1" >Nimi</td>
                                <td className="tg-0lax" id="column2">Registri NR</td>
                                <td className="tg-0lax" id="column3">Aadress</td>
                                <td className="tg-0lax" id="column4" >Postiindeks</td>
                                <td className="tg-0lax" id="column5">Kontakt isik</td>
                                <td className="tg-0lax" id="column6">Mail</td>
                                <td className="tg-0lax" id="column7" >Telefon</td>
                                <td className="tg-0lax" id="column8">Arve mail</td>
                                <td className="tg-0lax" id="column9">Lisainfo</td>
                            </tr>
                            <tr id="Tartu Mill AS">
								<td className="tg-0lax" >Firma1</td>
								<td className="tg-0lax" id="column2">82738723872</td>
								<td className="tg-0lax" id="column3">Narva Mnt 25</td>
                                <td className="tg-0lax" id="column4">15789</td>
								<td className="tg-0lax" id="column5">Margus Luik</td>
								<td className="tg-0lax" id="column6">firma1@tartu.ee</td>
                                <td className="tg-0lax" id="column7">6536543654</td>
								<td className="tg-0lax" id="column8">firma1@tartu.ee</td>
								<td className="tg-0lax" id="column9">Honored client</td>
							</tr>
                            <tr id="Tartu Mill AS">
								<td className="tg-0lax" >Firma2</td>
								<td className="tg-0lax" id="column2">82738723872</td>
								<td className="tg-0lax" id="column3">Narva Mnt 25</td>
                                <td className="tg-0lax" id="column4">15789</td>
								<td className="tg-0lax" id="column5">Margus Luik</td>
								<td className="tg-0lax" id="column6">firma2@tartu.ee</td>
                                <td className="tg-0lax" id="column7">6536543654</td>
								<td className="tg-0lax" id="column8">firma2@tartu.ee</td>
								<td className="tg-0lax" id="column9">Honored client</td>
							</tr>
                            <tr id="Tartu Mill AS">
								<td className="tg-0lax" >Firma3</td>
								<td className="tg-0lax" id="column2">82738723872</td>
								<td className="tg-0lax" id="column3">Narva Mnt 25</td>
                                <td className="tg-0lax" id="column4">15789</td>
								<td className="tg-0lax" id="column5">Margus Luik</td>
								<td className="tg-0lax" id="column6">firma3@tartu.ee</td>
                                <td className="tg-0lax" id="column7">6536543654</td>
								<td className="tg-0lax" id="column8">firma3@tartu.ee</td>
								<td className="tg-0lax" id="column9">Honored client</td>
							</tr>
                            <tr id="Tartu Mill AS">
								<td className="tg-0lax" >Firma4</td>
								<td className="tg-0lax" id="column2">82738723872</td>
								<td className="tg-0lax" id="column3">Narva Mnt 25</td>
                                <td className="tg-0lax" id="column4">15789</td>
								<td className="tg-0lax" id="column5">Margus Luik</td>
								<td className="tg-0lax" id="column6">firma4@tartu.ee</td>
                                <td className="tg-0lax" id="column7">6536543654</td>
								<td className="tg-0lax" id="column8">firma4@tartu.ee</td>
								<td className="tg-0lax" id="column9">Honored client</td>
							</tr>
                        </thead>
                    </table>
                </div>						
                </section>
		</main>			
        </>
    );
}