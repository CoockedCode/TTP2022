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
		axios.post(endpoint+"/view/client/fnc_update_client.php", dataToSave)
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


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};

	const handleClose = () => {
	  setOpen(false);
	};



	// klient dropdown menu algus
	const [options, setOptions] = useState([]);
	const getOptions = async ()=>{
		const resp = await axios.get(endpoint + "/view/client/fnc_read_current_client.php?client");
		console.log(resp);
		setOptions([]);
		resp.data.forEach(element => {
			setOptions(oldArray => [...oldArray, element])
			//console.log(element)
		});
		//console.log(options);
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
				clientId: options[companyRealId].id,
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
		const toDelete = {
			clientId: options[companyRealId].id,
		};

		axios.post(endpoint+"/view/client/fnc_delete_client.php?client", toDelete)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Klient edukalt kustutatud!"));
			}
		})
		.catch(function (err) {
			dispatch(setSnackbar(true,"error","Kustutamisel tekkis viga!"))
		});
		handleClose();
	}


	// TODO: filtreermine...
	const handleUpdateRegNum=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].regNum=e.target.value;
		setOptions(o2);
	}
	const handleUpdateAddress=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].address=e.target.value;
		setOptions(o2);
	}
	const handleUpdatePostIndex=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].postInd=e.target.value;
		setOptions(o2);
	}
	const handleUpdateContPers=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].kontakt=e.target.value;
		setOptions(o2);
	}
	const handleUpdateMail=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].mail=e.target.value;
		setOptions(o2);
	}
	const handleUpdatePhone=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].telefon=e.target.value;
		setOptions(o2);
	}
	const handleUpdateInvoiceEM=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].invoiceEm=e.target.value;
		setOptions(o2);
	}
	const handleUpdateAddInfo=(e)=>{
		//e.target.value="";
		o2=[...options];
		o2[companyRealId].addInf=e.target.value;
		setOptions(o2);
	}

	const [companyID, setCompanyID] = useState("");
	const [companyRealId, setCompanyRealId] = useState("");
	const handleChange = (e) => {
		setCompanyID(e.target.key);
		setCompanyRealId(e.target.value);
	};

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
								value={companyRealId}
								label="companyID"
								onChange={handleChange}
							>
								{options.map((option, index) => (<MenuItem key={index} value={index} placeholder={option.name}>{option.name}</MenuItem>))}
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
									value={ options[companyRealId] ? options[companyRealId].regNum : "" }
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
									value={ options[companyRealId] ? options[companyRealId].address : "" }
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
									value={options[companyRealId] ? options[companyRealId].postInd : "" }
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
									value={options[companyRealId] ? options[companyRealId].kontakt : "" }
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
									value={ options[companyRealId] ? options[companyRealId].mail : "" }
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
									value={ options[companyRealId] ? options[companyRealId].telefon : "" }
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
									value={ options[companyRealId] ? options[companyRealId].invoiceEm : "" }
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
									value={ options[companyRealId] ? options[companyRealId].addInf : "" }
									onChange={(e)=>handleUpdateAddInfo(e)}
									type="text"
									margin="dense"
									multiline
									rows={6}
									 />
							</>

						<Box sx={{display: "flex", justifyContent: "space-between"}}>
							<Button
								type="button"
								variant="outlined"
								color="warning"
								sx={{ my: 2, width: "49%" }}
								onClick={handleClickOpen}
								>
								Kustuta klient
							</Button>
							<Button
								type="submit"
								variant="contained"
								sx={{ my: 2, width: "49%" }}
								margin="dense"
								//onClick={handleSubmit}
								>
								Uuenda Klient
							</Button>
						</Box>

						<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">
								{"Kustuta klient?"}
								</DialogTitle>
								<DialogContent>
								<DialogContentText id="alert-dialog-description">
									Soovid tõeliselt klienti kustutada? Nagu FR FR?
								</DialogContentText>
								</DialogContent>
								<DialogActions>
								<Button
									variant="contained"
									sx={{ mt: 2, mb: 2, bgcolor: 'main',
									width: 'auto' }}
									margin="dense"
									onClick={handleClose}>
									Cancel
								</Button>
								<Button
									variant="contained"
									sx={{ mt: 2, mb: 2, bgcolor: 'red', width: 'auto' }}
									onClick={() => deleteClient()} autoFocus>
									Jah, kustuta klient
								</Button>
								</DialogActions>
							</Dialog>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}