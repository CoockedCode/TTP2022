import { FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import { data } from 'jquery';

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function AddClient(){
	//snackbar
	const dispatch = useDispatch();
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState();
	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint+"/client/fnc_add_client.php", dataToSave)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
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
			setHelperText("");
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
				setHelperText("Kliendi nimi puudu!");
				setError(true);
			}
			if(!formData.get("clientRegNum")){
				setHelperText("Kliendi registratsiooni number puudu!");
				setError(true);
			}
			if(!formData.get("clientAddr")){
				setHelperText("Cliendi aadress!");
				setError(true);
			}
			if(!formData.get("postIndex")){
				setHelperText("Kliendi postindeks on puudu!");
				setError(true);
			}
			if(!formData.get("contPers")){
				setHelperText("Kontaktisik puudu!");
				setError(true);
			}
			if(!formData.get("clientEmail")){
				setHelperText("Kliendi meil puudu!");
				setError(true);
			}
			if(!formData.get("clientPhoneNr")){
				setHelperText("Kliendi telefon puudu!");
				setError(true);
			}
			if(!formData.get("invoiceEm")){
				setHelperText("Arve e-mail puudu!");
				setError(true);
			}

		}
	//dispatch(setSnackbar(true,"success","Klient edukalt lisatud!"));
	};

	return(
		<>
		<main>
			<section style={{width: "50%"}}>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Lisa uus klient</h3>
				</div>
				<Box component = "form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: "100%"}} error={error}>
						<TextField
							required
							fullWidth
							autoFocus
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
							id="postIndex"
							label="Postiindeks"
							name="postIndex"
							autoComplete="none"
							type="number"
							margin="dense"
							size="small"
							/>
						<TextField
							required
							fullWidth
							autoFocus
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
							/>

						<Button
							type="submit"

							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							margin="dense"
							//onClick={handleSubmit}
							>
							Lisa Klient
						</Button>
						<FormHelperText>{helperText}</FormHelperText>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}