import { FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';;

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function UpdateClient(){
	//snackbar
	const dispatch = useDispatch();


	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint+"/client/fnc_update_client.php", dataToSave)
		.then(function (response) {
			// console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Klient edukalt uuendatud!"));
			}
		})
		.catch(function (err) {
			// console.log(err);
			dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
		});

	};


	// const [rowOptions, setRowOptions] = useState([]);
	// const forRows = async (idSend) => {
	// 	//console.log(idSend);
	// 	const resp = await axios.get(endpoint + "/client/fnc_read_current_client.php?client");
	// 	console.log(resp.data)
	// 	setRowOptions([]);
	// 	resp.data.forEach(element=>{
	// 		setRowOptions(oldArray=>[...oldArray, element])
	// 	});
	// }


	// klient dropdown menu algus
	const [options, setOptions] = useState([]);
	const getOptions = async ()=>{
		const resp = await axios.get(endpoint + "/client/fnc_read_current_client.php?client");
		// console.log(resp);
		setOptions([]);
		resp.data.forEach(element => {
			setOptions(oldArray => [...oldArray, element])
			// console.log(element)
		});
	};

	useEffect(() => {getOptions();
	}, []);

	// console.log(rowOptions);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		//console.log(formData);
		if(formData.get("clientRegNum") || formData.get("clientAddr") || formData.get("postIndex") ||
			 formData.get("contPers") || formData.get("clientEmail") || formData.get("clientPhoneNr") || formData.get("invoiceEm")){
			// console.log("väljad täidetud")
			const dataToSave = {
				clientId: companyID,
				clientRegNum: formData.get("clientRegNum"),
				clientAddr: formData.get("clientAddr"),
				postIndex: formData.get("postIndex"),
				contPers: formData.get("contPers"),
				clientEmail: formData.get("clientEmail"),
				clientPhoneNr: formData.get("clientPhoneNr"),
				invoiceEm: formData.get("invoiceEm"),
				additionalInfo: formData.get("addInfo")
			};
			saveData(dataToSave);
		}
	}

	const deleteClient=()=>{
		axios.get(endpoint+"/client/fnc_delete_client.php?client")
		.then(function (response) {
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Klient edukalt kustutatud!"));
			}
		})
		.catch(function (err) {
			dispatch(setSnackbar(true,"error","Kustutamisel tekkis viga!"))
		});
	}

	const [companyID, setCompanyID] = useState("");
	const handleChange = (e) => {
		setCompanyID(e.target.value);
		//console.log(companyID);

		//forRows(companyID);

	};

	// TODO: filtreermine...
	const handleUpdateRegNum=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].regNum=e.target.value;
		console.log(o2);
		setOptions(o2);
	}
	const handleUpdateAddress=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].address=e.target.value;
		console.log(o2);
		
		setOptions(o2);
	}
	const handleUpdatePostIndex=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].postInd=e.target.value;
		console.log(o2);
		setOptions(o2);
	}
	const handleUpdateContPers=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].kontakt=e.target.value;
		console.log(o2);
		setOptions(o2);
	}
	const handleUpdateMail=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].mail=e.target.value;
		console.log(o2);
		setOptions(o2);
	}
	const handleUpdatePhone=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].telefon=e.target.value;
		console.log(o2);
		setOptions(o2);
	}
	const handleUpdateInvoiceEM=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].invoiceEm=e.target.value;
		console.log(o2);
		setOptions(o2);
	}
	const handleUpdateAddInfo=(e)=>{
		console.log(e.target.value);
		//e.target.value="";
		o2=[...options];
		o2[companyID-1].addInf=e.target.value;
		console.log(o2);
		setOptions(o2);
	}

	return(
		<>
		<main>
			<section style={{width: "50%"}}>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Uuenda klienti</h3>
				</div>
				<Box component = "form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: "100%"}}>

							<InputLabel id="clientLabel">Vali klient</InputLabel>
							<Select
								labelId="clientLabel"
								id="client"
								value={companyID}
								label="companyID"
								onChange={handleChange}
							>
								{options.map((options, index) => (<MenuItem key={index} value={options.id} placeholder={options.name}>{options.name}</MenuItem>))}
							</Select>

							{/* { console.log(options[2]) } */}

							<>
								<TextField
									required
									fullWidth
									id="clientRegNum"
									label="Kliendi registrinumber"
									name="clientRegNum"
									autoComplete="none"
									value={ companyID ? options[companyID-1].regNum : "" }
									onChange={(e)=>handleUpdateRegNum(e)}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									// sx={{ width: 'auto'}}
									id="clientAddr"
									label="Kliendi address"
									name="clientAddr"
									autoComplete="none"
									value={ companyID ? options[companyID-1].address : "" }
									onChange={(e)=>handleUpdateAddress(e)}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									autoFocus
									id="postIndex"
									label="Postiindeks"
									name="postIndex"
									autoComplete="none"
									value={ companyID ? options[companyID-1].postInd : "" }
									onChange={(e)=>handleUpdatePostIndex(e)}
									type="number"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									autoFocus
									id="contPers"
									label="Kontakt isik"
									name="contPers"
									autoComplete="none"
									value={ companyID ? options[companyID-1].kontakt : "" }
									onChange={(e)=>handleUpdateContPers(e)}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									id="clientEmail"
									label="Kliendi e-mail"
									name="clientEmail"
									autoComplete="none"
									value={ companyID ? options[companyID-1].mail : "" }
									onChange={(e)=>handleUpdateMail(e)}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									id="clientPhoneNr"
									label="Kliendi tel nr"
									name="clientPhoneNr"
									autoComplete="none"
									value={ companyID ? options[companyID-1].telefon : "" }
									onChange={(e)=>handleUpdatePhone(e)}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									autoFocus
									id="invoiceEm"
									label="Arve e-mail"
									name="invoiceEm"
									autoComplete="none"
									value={ companyID ? options[companyID-1].invoiceEm : "" }
									onChange={(e)=>handleUpdateInvoiceEM(e)}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									optional
									fullWidth
									autoFocus
									id="addInfo"
									label="Lisa info"
									name="addInfo"
									autoComplete="none"
									value={ companyID ? options[companyID-1].addInf : "" }
									onChange={(e)=>handleUpdateAddInfo(e)}
									type="text"
									margin="dense"
									size="small" />
							</>
						<Button
							type="submit"

							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							margin="dense"
							//onClick={handleSubmit}
							>
							Uuenda Klient
						</Button>
						<Button
							type="button"
							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'red', width: 'auto' }}
							onClick={deleteClient}
							>
							Kustuta klient
						</Button>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}