import { FormControl, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import { List, ListItem, ListItemText } from '@mui/material';
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

	const forRows = async (id) => {
		const resp = await axios.get(endpoint + "/client/fnc_read_to_update_client.php?client=" + id);
		console.log(resp)
			setRegNum(resp.data[0].regNum);
			setAdress(resp.data[0].address);
			setPostIndex(resp.data[0].postInd);
			setContPerson(resp.data[0].kontakt);
			setMail(resp.data[0].mail);
			setPhoneNR(resp.data[0].telefon);
			setInvoiceEM(resp.data[0].invoiceEM);
			setAddInfo(resp.data[0].addInf);
			console.log(resp.data[0].id);
	}

	const[index,setSelectedIndex]=useState("")

		// klient dropdown menu algus
		const [options, setOptions] = useState([]);
		const getOptions = async ()=>{
			const resp = await axios.get(endpoint + "/client/fnc_get_clients_name_id.php?client");
			setOptions([]);
			resp.data.forEach(element => {
				setOptions(oldArray => [...oldArray, element])
				// console.log(element)
			});
		};

		useEffect(() => {
			getOptions();
		  }, []);

		const[regNum,setRegNum]=useState();
		const[adress,setAdress]=useState();
		const[postIndex,setPostIndex]=useState();
		const[contPerson,setContPerson]=useState();
		const[mail,setMail]=useState();
		const[phoneNR,setPhoneNR]=useState();
		const[invoiceEM,setInvoiceEM]=useState();
		const[addInfo,setAddInfo]=useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		//console.log(formData);
		if(formData.get("clientRegNum") || formData.get("clientAddr") || formData.get("postIndex") ||
			 formData.get("contPers") || formData.get("clientEmail") || formData.get("clientPhoneNr") || formData.get("invoiceEm")){
			console.log("väljad täidetud")
			const dataToSave = {
				clientId: selectedIndex,
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
	};

	  const [companyID, setCompanyID] = useState("");

		const handleChange = (e) => {
			setCompanyID(e.target.value);
			forRows(companyID);
			console.log(companyID);
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
								value={companyID}
								label="companyID"
								onChange={handleChange}
							>
								{options.map((options, index) => (
									
								<MenuItem key={index} value={options.id} placeholder={options.name}>{options.name}</MenuItem>
							))}
							</Select>

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
							Uuenda Klient
						</Button>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}