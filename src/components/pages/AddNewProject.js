import { FormControl, FormControlLabel, FormHelperText, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

	// TODO
	// kuupäevade sisestused normaliseerida
	// machineType üle vaadata
	// form validation e õiged sisestused ja vea korral vale lahter highlightida
	// error handling save_project axioses

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	//1. projekt nr
	const [valueProjectNumber, setValueProjectNumber] = useState();
	const [errorProjectNumber, setErrorProjectNumber] = useState(false);
	//2. projekt name
	const [valueProjectName, setValueProjectName] = useState();
	const [errorProjectName, setErrorProjectName] = useState(false);
	//3. client
	// const [value3, setValue3] = useState();
	// const [error3, setError3] = useState(false);
	//4. machine type
	const [valueMachineType, setValueMachineType] = useState();
	const [errorMachineType, setErrorMachineType] = useState(false);
	//5. planned end
	const [valuePlannedEnd, setValuePlannedEnd] = useState();
	const [errorPlannedEnd, setErrorPlannedEnd] = useState(false);
	//6. additional info
	// const [value6, setValue6] = useState();
	// const [error6, setError6] = useState(false);

	useEffect(() => {
		if(valueProjectNumber){setErrorProjectNumber(false);}
		if(valueProjectName){setErrorProjectName(false);}
		//if(value3){setError3(false);}
		if(valueMachineType){setErrorMachineType(false);}
		if(valuePlannedEnd){setErrorPlannedEnd(false);}
		//if(value6){setError6(false);}
	}, [valueProjectNumber, valueProjectName, valueMachineType, valuePlannedEnd])

	// klient dropdown menu algus
	const [options, setOptions] = useState([]);
	const getOptions = async ()=>{
		const resp = await axios.get(endpoint + "/fnc/fnc_get_clients.php?client");
		setOptions([]);

		resp.data.forEach(element => {
			setOptions(oldArray => [...oldArray, element.name])
		});
	};

	useEffect(() => {
		getOptions();
  	}, []);

	const[anchorEl, setAnchorEl] = useState(null);
	const[selectedIndex, setSelectedIndex] = useState(1);
	const open = Boolean(anchorEl);

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	}

	const handleClose = () => {
		setAnchorEl(null);
	}
	//klient dropdown menu osa lõpp

		// info salvestamine php kaudu
		const saveData = (dataToSave) => {
			axios.post(endpoint + "/fnc/fnc_save_project.php", dataToSave)
			.then(function(response){
				// console.log(dataToSave)
				console.log(response);
				if(response.status === 200){
					dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
				}
			})
			.catch(function (err) {
				console.log(err);
				// TODO error handling
				dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
			});

		};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if(formData.get("projectId") && formData.get("projectName") && selectedIndex &&
		 formData.get("projectMachineType") && formData.get("projectPriority") && formData.get("projectInfo")){
			console.log("väljad täidetud")

			// php osa siia
			const dataToSave = {
				projectId: formData.get("projectId"),
				projectName: formData.get("projectName"),
				client: selectedIndex,
				machineType: formData.get("projectMachineType"),
				priority: formData.get("projectPriority"),
				plannedEnd: formData.get("projectPlannedEnd"),
				projectArrivedBy: formData.get("projectArrivedBy"),
				additionalInfo: formData.get("projectInfo")
			};
			//console.log(dataToSave);
			saveData(dataToSave);
		} else {
			if(!formData.get("projectId")){
				setErrorProjectNumber(true);
			}else{setValueProjectNumber(formData.get("projectId"));}
			if(!formData.get("projectName")){
				setErrorProjectName(true);
			}else{setValueProjectName(formData.get("projectName"));}
			// if(!formData.get("client")){
			// 	setError3(true);
			// }else{setValue3(formData.get("client"));}
			if(!formData.get("projectMachineType")){
				setErrorMachineType(true);
			}else{setValueMachineType(formData.get("projectMachineType"));}
			if(!formData.get("projectPriority")){
				setErrorPlannedEnd(true);
			}else{setValuePlannedEnd(formData.get("projectPriority"));}
			// if(!formData.get("projectInfo")){
			// 	setError6(true);
			// }else{setValue6(formData.get("projectInfo"));}
			//setHelperText("Kontrolli väljad üle!");

		}

	};
	return(
		<>
		<main>
			<section>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Lisa uus projekt</h3>
				</div>
				<Box  component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: "100%"}} >
						<TextField
							error={errorProjectNumber}
							required
							autoFocus
							id="projectId"
							label="Projekti number"
							name="projectId"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							required
							error={errorProjectName}
							autoFocus
							id="projectName"
							label="Projekti nimi"
							name="projectName"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<List
							component="nav"
							aria-label="Klient"
							sx={{ bgcolor: "Background.paper" }}
						>
							<ListItem
								button
								id="client"
								aria-haspopup="listbox"
								aria-controls="lock-menu"
								aria-label="Klient"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClickListItem}
							>
								<ListItemText
									primary="Vali klient ↓"
									secondary={options[selectedIndex]}
								/>
							</ListItem>
						</List>
						<Menu
							id="client"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": 'client',
								role: "listbox",
							}}
						>
							{options.map((option, index) => (
								<MenuItem
									key={option}
									//disabled={index === 0}
									selected={index === selectedIndex}
									onClick={(event) => handleMenuItemClick(event, index)}
								>
									{option}
								</MenuItem>
							))}
						</Menu>

						<TextField
							required
							error={errorMachineType}
							id="projectMachineType"
							label="Masina tüüp"
							name="projectMachineType"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<RadioGroup
							required
							id='projectPriority'
							label="Projekti prioriteet"
							name='projectPriority'
							row
						>
							<FormControlLabel value="1" control={<Radio />} label="Kiire" />
							<FormControlLabel value="2" control={<Radio />} label="Tähtajaline" />
							<FormControlLabel value="3" control={<Radio />} label="Määramata" />
							<FormControlLabel value="4" control={<Radio />} label="Lõpetatud" />
						</RadioGroup>

						<TextField
							required
							error={errorPlannedEnd}
							id="projectPlannedEnd"
							label="Planeeritud lõpp aaaa-kk-pp"
							name="projectPlannedEnd"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<RadioGroup
							required
							error={false}
							id='projectArrivedBy'
							label="Saabunud:"
							name='projectArrivedBy'
							row
						>
							<FormControlLabel value="klient" control={<Radio />} label="Klient tõi ise" />
							<FormControlLabel value="transpordifirma" control={<Radio />} label="Transpordifirma" />
						</RadioGroup>

						<TextField
							//error={error6}
							// sx={{ width: 'auto'}}
							id="projectInfo"
							label="Projekti info"
							name="projectInfo"
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
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							margin="dense"
							>
							Lisa Projekt
						</Button>
						{/* <FormHelperText>{helperText}</FormHelperText> */}
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}