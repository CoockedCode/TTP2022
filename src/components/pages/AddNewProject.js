import { FormControl, FormControlLabel, FormHelperText, InputLabel, RadioGroup, Select } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as dayjs from 'dayjs';
import et from 'dayjs/locale/et';
import { Menu, MenuItem } from '@mui/material';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

	// TODO
	// machineType üle vaadata
	// transport - kui klient tõi ise ss transpordi dropdown disabled
	// transport - õige salvestus ABsse
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
	//4. machine type
	const [valueMachineType, setValueMachineType] = useState();
	const [errorMachineType, setErrorMachineType] = useState(false);
	//5. planned end
	const [valuePlannedEnd, setValuePlannedEnd] = useState();
	const [errorPlannedEnd, setErrorPlannedEnd] = useState(false);

	useEffect(() => {
		if(valueProjectNumber){setErrorProjectNumber(false);}
		if(valueProjectName){setErrorProjectName(false);}
		if(valueMachineType){setErrorMachineType(false);}
		if(valuePlannedEnd){setErrorPlannedEnd(false);}
	}, [valueProjectNumber, valueProjectName, valueMachineType, valuePlannedEnd])

	// klient dropdown menu algus
	const [companyID, setCompanyID] = useState("");
	const handleChange = (e) => {
		setCompanyID(e.target.value);
		//console.log(e.target.value);
	}
	const [options, setOptions] = useState([]);
	const getOptions = async () => {
		const resp = await axios.get(`${endpoint}/client/fnc_get_clients_name_id.php?client`);
		setOptions([]);
		resp.data.forEach(element => {
			setOptions(oldArray => [...oldArray, element]);
			//console.log(options);
		});
	};

	useEffect(() => {
		getOptions();
  	}, []);

	// transpordifirma dropdown
	const [selectedArrivalFirm, setSelectedArrivalFirm] = useState("");
	const selectArrivalFirmHandler = (value) => setSelectedArrivalFirm(value);

	const [selectedReturnFirm, setSelectedReturnFirm] = useState("");
	const selectReturnFirmHandler = (value) => setSelectedReturnFirm(value);

	const [firmsArr, setFirmArr] = useState([]);
	const getFirms = async() => {
		const resp = await axios.get(`${endpoint}/project/fnc_get_all_transport.php?transport`);
		setFirmArr([]);
		resp.data.forEach(element => {
			setFirmArr(oldFirmArray => [...oldFirmArray, element]);
			//console.log(firmsArr);
		});
	}

	useEffect(() => {
		getFirms();
	}, []);

	// viimase projekti nr
	const [lastProjectNum, setLastProjectNum] = useState("");
	const getLastProjectNum = () => {
		axios.get(`${endpoint}/project/fnc_get_last_project_num.php`)
			.then(function(response) {
				// console.log(response.data);
				setLastProjectNum(response.data);
			})
	}

	useEffect(() => {
		getLastProjectNum();
	});

	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(`${endpoint}/project/fnc_save_project.php`, dataToSave)
		.then(function(response){
			console.log(dataToSave)
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

	// kuupäeva valik
	const [selectedDate, setDate] = useState(new Date());
	const handleDateChange = (newDate) => {
		setDate(newDate);
		//console.log(`${selectedDate.$y}-${selectedDate.$M + 1}-${selectedDate.$D}`);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if(formData.get("projectId") && formData.get("projectName") && options &&
		 formData.get("projectMachineType") && formData.get("projectPriority") && formData.get("projectInfo")){
			console.log("väljad täidetud")
			// php osa siia
			const dataToSave = {
				projectId: formData.get("projectId"),
				projectName: formData.get("projectName"),
				client: companyID,
				machineType: formData.get("projectMachineType"),
				priority: formData.get("projectPriority"),
				//plannedEnd: formData.get("projectPlannedEnd"),
				plannedEnd: `${selectedDate.$y}-${selectedDate.$M + 1}-${selectedDate.$D}`,
				projectArrivedBy: formData.get("projectArrivedBy"),
				projectArrivedTransport: selectedArrivalFirm,
				projectReturnBy: formData.get("projectReturnBy"),
				projectReturnTransport: selectedReturnFirm,
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
			if(!formData.get("projectMachineType")){
				setErrorMachineType(true);
			}else{setValueMachineType(formData.get("projectMachineType"));}
			if(!formData.get("projectPriority")){
				setErrorPlannedEnd(true);
			}else{setValuePlannedEnd(formData.get("projectPriority"));}
		}
	};
	return(
		<>
		<main>
			<section style={{width: "50%"}}>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Lisa uus projekt</h3>
				</div>
				<div>
					<p>Viimase projekti nr: {lastProjectNum}</p>
				</div>
				<Box  component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: "100%"}} >
						<TextField
							error={!!errorProjectNumber}
							value={parseInt(lastProjectNum) + 1}
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
							error={!!errorProjectName}
							autoFocus
							id="projectName"
							label="Projekti nimi"
							name="projectName"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						
						<p>Klient: </p>
						<Select
							id="client"
							value={companyID}
							label="Klient"
							onChange={handleChange}
						>
							{options.map((options, index) => (
								<MenuItem
									key={index}
									value={options.id}
									placeholder={options.name}
								>
									{options.name}
								</MenuItem>
							))}
						</Select>

						<TextField
							required
							error={!!errorMachineType}
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

						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={et}>
							<DatePicker
								id="projectPlannedEnd"
								name="projectPlannedEnd"
								label="Kokkulepitud lõpp"
								invalidDateMessage="Viga kuupäeva sisestamisel"
								inputFormat="DD.MM.YYYY"
								error={!!errorPlannedEnd}
								value={selectedDate}
								onChange={date => handleDateChange(date)}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						
						<div className='add-project-label'>
							<h4>Transpordi info</h4>
							<p>Saabunud:</p>
						</div>
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

						{/* <InputLabel id="transport-firm-label">Vali transpordifirma ↓</InputLabel> */}
						<Select
							// labelId="transport-firm-label"
							label="Vali transpordifirma ↓"
							id="transportArrivalFirmId"
							value={selectedArrivalFirm}
							onChange={(e) => selectArrivalFirmHandler(e.target.value)}
						>
							{firmsArr.map((firmsArr, index) => (
								<MenuItem
									key={index}
									value={firmsArr.id}
									placeholder={firmsArr.name}									
								>
									{firmsArr.name}
								</MenuItem>
							))}
						</Select>

						<p>Tagastus:</p>
						<RadioGroup
							required
							error={false}
							id='projectReturnBy'
							label="Tagastus:"
							name='projectReturnBy'
							row
						>
							<FormControlLabel value="klient" control={<Radio />} label="Klient viib ise" />
							<FormControlLabel value="transpordifirma" control={<Radio />} label="Transpordifirma" />
						</RadioGroup>

						<Select
							// labelId="transport-firm-label"
							label="Vali transpordifirma ↓"
							id="transportReturnFirmId"
							value={selectedReturnFirm}
							onChange={(e) => selectReturnFirmHandler(e.target.value)}
						>
							{firmsArr.map((firmsArr, index) => (
								<MenuItem
									key={index}
									value={firmsArr.id}
									placeholder={firmsArr.name}								
								>
									{firmsArr.name}
								</MenuItem>
							))}
						</Select>

						<TextField
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