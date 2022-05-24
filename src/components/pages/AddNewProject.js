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
	// kui võimalik + aega, siis yandere dev kood korda teha
	// kuupäevade sisestused normaliseerida
	// machineType üle vaadata
	// form validation e õiged sisestused ja vea korral vale lahter highlightida
	// error handling save_project axioses

	const endpoint = "http://45.79.250.112/api";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	//1.
	const [value1, setValue1] = useState();
	const [error1, setError1] = useState(false);
	//2.
	const [value2, setValue2] = useState();
	const [error2, setError2] = useState(false);
	//3.
	const [value3, setValue3] = useState();
	const [error3, setError3] = useState(false);
	//4.
	const [value4, setValue4] = useState();
	const [error4, setError4] = useState(false);
	//5.
	const [value5, setValue5] = useState();
	const [error5, setError5] = useState(false);
	//6.
	const [value6, setValue6] = useState();
	const [error6, setError6] = useState(false);

	useEffect(() => {
		if(value1){setError1(false);}
		if(value2){setError2(false);}
		if(value3){setError3(false);}
		if(value4){setError4(false);}
		if(value5){setError5(false);}
		if(value6){setError6(false);}
	}, [value1, value2, value3, value4, value5, value6])

	// klient dropdown menu algus
	const [options, setOptions] = useState([]);
	const getOptions = async ()=>{
		const resp = await axios.get(endpoint + "/fnc/fnc_get_clients.php?client");
		//  console.log(resp.data);
		//  console.log(resp.data.length);
		// const newData = [];
		setOptions([]);
		// for(let i=0; i<resp.data.length; i++){
		// 	newData.push(resp.data[i].name)
		// }
		//newData.forEach(element => {
		resp.data.forEach(element => {
			setOptions(oldArray => [...oldArray, element.name])
		});
	};

	useEffect(() => {
		getOptions();
  	}, []);

	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint + "/fnc/fnc_save_project.php", `${dataToSave}`)
		.then(function(response){
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if(formData.get("projectId") && formData.get("projectName") && formData.get("client") &&
		 formData.get("projectMachineType") && formData.get("projectPriority") && formData.get("projectInfo")){
			console.log("väljad täidetud")

			// php osa siia
			const dataToSave = {
				projectId: formData.get("projectId"),
				projectName: formData.get("projectName"),
				client: formData.get("client"),
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
				setError1(true);
			}else{setValue1(formData.get("projectId"));}
			if(!formData.get("projectName")){
				setError2(true);
			}else{setValue2(formData.get("projectName"));}
			if(!formData.get("client")){
				setError3(true);
			}else{setValue3(formData.get("client"));}
			if(!formData.get("projectMachineType")){
				setError4(true);
			}else{setValue4(formData.get("projectMachineType"));}
			if(!formData.get("projectPriority")){
				setError5(true);
			}else{setValue5(formData.get("projectPriority"));}
			if(!formData.get("projectInfo")){
				setError6(true);
			}else{setValue6(formData.get("projectInfo"));}
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
							error={error1}
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
							error={error2}
							autoFocus
							id="projectName"
							label="Projekti nimi"
							name="projectName"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							required
							error={error3}
							id="client"
							label="Tellija nimi"
							name="client"
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
							id="klient"
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
							error={error4}
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
							error={error5}
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
							error={false}
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
							error={error6}
							// sx={{ width: 'auto'}}
							id="projectInfo"
							label="Projekti info"
							name="projectInfo"
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