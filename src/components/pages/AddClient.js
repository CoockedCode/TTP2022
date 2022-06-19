import { FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import { endpoint } from "../../endpoint";

export default function AddClient(){
	//snackbar
	const dispatch = useDispatch();

	//1. Kliendi nimi
	const [valueClientName, setValueClientName] = useState();
	const [errorClientName, setErrorClientName] = useState(false);
	//2. Registri number
	const [valueRegNum, setValueRegNum] = useState();
	const [errorRegNum, setErrorRegNum] = useState(false);
	//4. Kliendi aadress
	const [valueClientAddr, setValueClientAddr] = useState();
	const [errorClientAddr, setErrorClientAddr] = useState(false);
	//5. Postiindex
	const [valuePostInd, setValuePostInd] = useState();
	const [errorPostInd, setErrorPostInd] = useState(false);
	//6. Kontakt isik
	const [valueContPers, setValueContPers] = useState();
	const [errorContPers, setErrorContPers] = useState(false);
	//7. Email
	const [valueEmail, setEmail] = useState();
	const [errorEmail, setErrorEmail] = useState(false);
	//8. Telefon
	const [valuePhone, setValuePhone] = useState();
	const [errorPhone, setErrorPhone] = useState(false);
	//9. Arve mail
	const [valueInvoiceEm, setValueInvoiceEm] = useState();
	const [errorInvoiceEm, setErrorInvoiceEm] = useState(false);

	useEffect(() => {
		if(valueClientName){setErrorClientName(false);}
		if(valueRegNum){setErrorRegNum(false);}
		if(valueClientAddr){setErrorClientAddr(false);}
		if(valuePostInd){setErrorPostInd(false);}
		if(valueContPers){setErrorContPers(false);}
		if(valueEmail){setErrorEmail(false);}
		if(valuePhone){setErrorPhone(false);}
		if(valueInvoiceEm){setErrorEnvoiceEm(false);}
	}, [valueClientName, valueRegNum, valueClientAddr, valuePostInd, valueContPers, valueEmail, valuePhone, valueInvoiceEm])
	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint+"/view/client/fnc_add_client.php", dataToSave)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Klient edukalt lisatud!"));
			}
		})
		.catch(function (err) {
			console.log(err);
			dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
		});

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		//console.log(formData);
		if(formData.get("clientName") && formData.get("clientRegNum") && formData.get("clientAddr") && formData.get("postIndex") &&
			 formData.get("contPers") && formData.get("clientEmail")&& formData.get("clientPhoneNr")&& formData.get("invoiceEm")){
			console.log("väljad täidetud")
			const dataToSave = {
				clientName: formData.get("clientName"),
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
		} else {
			console.log("viga")
			if(!formData.get("clientName")){
				setErrorClientName(true);
			}else{
				setValueClientName(formData.get("clientName"));
			}
			if(!formData.get("clientRegNum")){
				setErrorRegNum(true);
			}else{
				setValueRegNum(formData.get("clientRegNum"))
			}
			if(!formData.get("clientAddr")){
				setErrorClientAddr(true);
			}else{
				setValueClientAddr(formData.get("clientAddr"));
			}
			if(!formData.get("postIndex")){
				setErrorPostInd(true);
			}else{
				setValuePostInd(formData.get("postIndex"));
			}
			if(!formData.get("contPers")){
				setErrorContPers(true);
			}else{
				setValueContPers(formData.get("postIndex"));
			}
			if(!formData.get("clientEmail")){
				setErrorEmail(true);
			}else{
				setEmail(formData.get("clientEmail"));
			}
			if(!formData.get("clientPhoneNr")){
				setErrorPhone(true);
			}else{
				setValuePhone(formData.get("clientPhoneNr"));
			}
			if(!formData.get("invoiceEm")){
				setErrorInvoiceEm(true);
			}else{
				setValueInvoiceEm(formData.get("invoiceEm"));
			}

		}
	};

	return(
		<>
		<main>
			<section style={{minWidth: "20rem", maxWidth: "35%"}}>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Lisa uus klient</h3>
				</div>
				<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl fullWidth>
						<TextField
							required
							fullWidth
							autoFocus
							error={!!errorClientName}
							id="clientName"
							label="Kliendi nimi"
							name="clientName"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							error={!!errorRegNum}
							id="clientRegNum"
							label="Kliendi registrinumber"
							name="clientRegNum"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							// sx={{ width: 'auto'}}
							error={!!errorClientAddr}
							id="clientAddr"
							label="Kliendi address"
							name="clientAddr"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							autoFocus
							error={!!errorPostInd}
							id="postIndex"
							label="Postiindeks"
							name="postIndex"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							autoFocus
							error={!!errorContPers}
							id="contPers"
							label="Kontakt isik"
							name="contPers"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							error={!!errorEmail}
							id="clientEmail"
							label="Kliendi e-mail"
							name="clientEmail"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							required
							fullWidth
							error={!!errorPhone}
							id="clientPhoneNr"
							label="Kliendi tel nr"
							name="clientPhoneNr"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							required
							fullWidth
							autoFocus
							error={!!errorInvoiceEm}
							id="invoiceEm"
							label="Arve e-mail"
							name="invoiceEm"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField
							optional
							fullWidth
							autoFocus
							id="addInfo"
							label="Lisa info"
							name="addInfo"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							multiline
							rows={4}
							/>

						<Button
							type="submit"
							variant="contained"
							sx={{mt: 1}}
							margin="dense"
							>
							Lisa Klient
						</Button>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}