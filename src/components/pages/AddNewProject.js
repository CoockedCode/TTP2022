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
	// projekti nr sisestus korda teha (hektel fikseeritud eelmine projekti nr + 1)
	// uued lahtrid error control
	// form validation e õiged sisestused ja vea korral vale lahter highlightida
	// machineType üle vaadata
	// fotode ja failide lisamine
	// tööliigi salvestamine ABsee
	// transport - kui klient tõi ise ss transpordi dropdown disabled
	// error handling save_project axioses
	// vormi lõppu vaata mirost milline väljastus on


const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	//1. projekt nr error
	const [projectNumber, setProjectNumber] = useState("");
	const [errorProjectNumber, setErrorProjectNumber] = useState(false);
	//2. avamise kuupäeva error
	const [errorStartDate, setErrorStartDate] = useState(false);
	//3. klient error
	const [errorClient, setErrorClient] = useState(false);
	//4. tööliik error
	const [errorWorkType, setErrorWorkType] = useState(false);
	//5. planned end
	const [errorPlannedEnd, setErrorPlannedEnd] = useState(false);
	//6. saabumis transport error
	const [errorArrivedTransport, setErrorArrivedTransport] = useState(false);
	//7. tagastus transport error
	const [errorReturnTransport, setErrorReturnTransport] = useState(false);
	

	useEffect(() => {
		if(projectNumber){setErrorProjectNumber(false);}
		// if(valueProjectName){setErrorProjectName(false);}
		// if(valueMachineType){setErrorMachineType(false);}
		if(plannedEnd){setErrorPlannedEnd(false);}
	}, [projectNumber, plannedEnd])

	// form validation
	const formValues = {
		nr:{
			value: "",
			error: false,
			errorMessage: "Projekti nr sisestamata"
		},
		startDate:{
			value: "",
			error: false,
			errorMessage: "Alustamise kuupäev valimata!"
		},
		client:{
			value: "",
			error: false,
			errorMessage: "Klient valimata!"
		},
		workType:{
			value: "",
			error: false,
			errorMessage: "Töö liik valimata!"
		},
		priority:{
			value: "",
			error: false,
			errorMessage: "Prioriteet valimata!"
		},
		endDate:{
			value: "",
			error: false,
			errorMessage: "Kokkulepitud lõpp valimata!"
		}

	}

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

	// töö liigi dropdown
	const [workID, setWorkID] = useState("");
	const handleWorkChange = (e) => {
		setWorkID(e.target.value);
	}
	const [workOptions, setWorkOptions] = useState([]);
	const getWorkOptions = async () => {
		const resp = await axios.get(`${endpoint}/project/fnc_get_work_types.php?work`);
		console.log(resp);
		setWorkOptions([]);
		resp.data.forEach(element => {
			setWorkOptions(oldArray => [...oldArray, element]);
		});
	};

	useEffect(() => {
		getWorkOptions();
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
		axios.get(`${endpoint}/project/fnc_get_last_project_num.php?last_project`)
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
	const [selectedEndDate, setEndDate] = useState(new Date());
	const handleEndDateChange = (newEndDate) => {
		setEndDate(newEndDate);
	};
	const [selectedStartDate, setStartDate] = useState(new Date());
	const handleStartDateChange = (newStartDate) => {
		setStartDate(newStartDate);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if(formData.get("projectId") && companyID && formData.get("workType") && formData.get("projectPriority") 
			&& selectedEndDate && selectedStartDate && formData.get("projectArrivedBy") 
			&& formData.get("projectReturnBy") && formData.get("projectInfo") && formData.get("offerNr")
			&& formData.get("agreedPrice") && formData.get("clientPO") && formData.get("orderer") 
			&& formData.get("ordererPhoneNR") && formData.get("contractNr") && formData.get("firstDefecting")
			&& formData.get("acceptedBy")){
			console.log("väljad täidetud")
			// json objekti loomine
			const dataToSave = {
				projectId: formData.get("projectId"),
				//projectName: formData.get("projectName"),
				client: companyID,
				workType: formData.get("workType"),
				//machineType: formData.get("projectMachineType"),
				priority: formData.get("projectPriority"),
				plannedEndDate: `${selectedEndDate.$y}-${selectedEndDate.$M + 1}-${selectedEndDate.$D}`,
				startDate: `${selectedStartDate.$y}-${selectedStartDate.$M + 1}-${selectedStartDate.$D}`,
				projectArrivedBy: formData.get("projectArrivedBy"),
				projectArrivedTransport: selectedArrivalFirm,
				projectReturnBy: formData.get("projectReturnBy"),
				projectReturnTransport: selectedReturnFirm,
				offerNr: formData.get("offerNr"),
				agreedPrice: formData.get("agreedPrice"),
				clientPO: formData.get("clientPO"),
				orderer: formData.get("orderer"),
				ordererPhoneNr: formData.get("ordererPhoneNr"),
				contractNr: formData.get("contractNr"),
				firstDefecting: formData.get("firstDefecting"),
				acceptedBy: formData.get("acceptedBy"),
				additionalInfo: formData.get("projectInfo")
			};
			//console.log(dataToSave);
			saveData(dataToSave);
		} else {
			if(!formData.get("projectId")){
				setErrorProjectNumber(true);
			}else{setProjectNumber(formData.get("projectId"));}
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
							// error={formValues.nr.error && formValues.nr.errorMessage}
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

						{/* <TextField
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
							/> */}

						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={et}>
							<DatePicker
								id="projectOpenedDate"
								name="projectOpenedDate"
								label="Avamise kuupäev"
								invalidDateMessage="Viga kuupäeva sisestamisel"
								error={formValues.startDate.error && formValues.startDate.errorMessage}
								inputFormat="DD.MM.YYYY"
								// error={!!errorPlannedEnd}
								value={selectedStartDate}
								onChange={startDate => handleStartDateChange(startDate)}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						
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

						{/* <TextField
							required
							error={!!errorMachineType}
							id="projectMachineType"
							label="Masina tüüp"
							name="projectMachineType"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/> */}
						<p>Töö liik: </p>
						<Select
							id="workType"
							value={workID}
							label="Töö liik"
							onChange={handleWorkChange}
						>
							{workOptions.map((workOptions, index) => (
								<MenuItem
									key={index}
									value={workOptions.id}
									placeholder={workOptions.name}
								>
									{workOptions.name}
								</MenuItem>
							))}
						</Select>

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
								value={selectedEndDate}
								onChange={endDate => handleEndDateChange(endDate)}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						
						<div className='transport-label'>
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

						<div className='bill-label'>
							<h4>Arve info</h4>
						</div>
						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="offerNr"
							label="Pakkumise nr"
							name="offerNr"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="agreedPrice"
							label="Kokkulepitud hind"
							name="agreedPrice"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="clientPO"
							label="Kliendi PO nr"
							name="clientPO"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="orderer"
							label="Tellimuse esitaja nimi"
							name="orderer"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="ordererPhoneNr"
							label="Telefoni nr"
							name="ordererPhoneNr"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="contractNr"
							label="Lepingu nr"
							name="contractNr"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<div className='first-defecting-label'>
							<h4>Esmase defekteerimise info</h4>
						</div>
						<RadioGroup
							required

							// error={false}
							id='firstDefecting'
							label="Esmase defekteerimise info"
							name='firstDefecting'

							row
						>
							<FormControlLabel value="1" control={<Radio />} label="Teostatav" />
							<FormControlLabel value="0" control={<Radio />} label="Mitte teostatav" />
						</RadioGroup>
						
						<TextField
							// error={!!errorProjectNumber}
							// value={parseInt(lastProjectNum) + 1}
							required
							autoFocus
							id="acceptedBy"
							label="Vastuvõtja"
							name="acceptedBy"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							id="projectInfo"
							label="Projekti lisainfo"
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