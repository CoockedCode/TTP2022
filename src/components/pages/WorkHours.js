import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { setSnackbar } from "../../redux/ducks/snackbar";
import DropDown from '../DropDown';
import React, { useState, useEffect } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import et from 'dayjs/locale/et';
import { FormControl } from '@mui/material';import { data } from 'jquery';
;

const endpoint = "https://elektrimasinad.digifi.eu/api";

export default function WorkHours(){
	//snackbar
	const dispatch = useDispatch();
	const date=new Date();
	var currMonth="0";
	var currDay="0";
	if(date.getMonth()<10){
		currMonth=".0"+(date.getMonth()+1);
	}else{
		currMonth="."+date.getMonth()+1;
	}
	if(date.getDate()<10){
		currDay=".0"+(date.getDate());
	}else{
		currDay="."+date.getDate();
	}
	const DateValues = {
		todayDate: date.getFullYear()+currMonth+currDay
	}

	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post(endpoint+"/view/workhours/fnc_set_work_hours.php", dataToSave)
		.then(function (response) {
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true,"success","Töötunnid edukalt sisestatud!"));
			}
		})
		.catch(function (err) {
			// console.log(err);
			dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
		});

	};
	const [workerID, setWorkerID]= useState("");
	const handleWorkerChange = (e) =>{
	  setWorkerID(e.target.value);
	}
	const [workID, setWorkID]= useState("");
	const handleWorkChange = (e) =>{
	  setWorkID(e.target.value);
	}
	const [projectID, setProjecID]= useState("");
	const handleProjectChange = (e) =>{
	  setProjecID(e.target.value);
	}
	const [projectAllHours, setProjectAllHours]= useState("");
	const handleAllHoursChange = (e) =>{
	  setProjectAllHours(e.target.value);

	}
	const [projectNormalHours, setProjectNormalHours]= useState("");
	const handleNormalHoursChange = (e) =>{
	  setProjectNormalHours(e.target.value);

	}
	const [projectOverHours, setProjectOverHours]= useState("");
	const handleOverHoursChange = (e) =>{
	  setProjectOverHours(e.target.value);

	}
	const [workerNormalHours, setWorkerNormalHours]= useState("");
	const handleWorkerNormalHoursChange = (e) =>{
	  setWorkerNormalHours(e.target.value);
	  setProjectNormalHours(parseInt(e.target.value));
	  setDisplayAllHours(e.target.value);
	  setDisplayNormalHours(parseInt(e.target.value));
	}
	const [workerOverHours, setWorkerOverHours]= useState("");
	const handleWorkerOverHoursChange = (e) =>{
	  setWorkerOverHours(e.target.value);
	  setDisplayOverHours(parseInt(e.target.value)*1.5);
	  setProjectOverHours(parseInt(e.target.value));
	  setDisplayAllHours(parseInt(displayAllHours)+parseInt(e.target.value));
	  setProjectAllHours(parseInt(displayAllHours)+parseInt(e.target.value));
	}
	const [displayAllHours, setDisplayAllHours]=useState("")
	const [displayNormalHours, setDisplayNormalHours]=useState("");
	const [displayOverHours, setDisplayOverHours]=useState("")

	const [ workerOptions, setWorkerOptions ] = useState([]);
	const getEmployeeOptions = async() =>{
		const response = await axios.get(endpoint+'/view/workhours/fnc_get_workers.php');
		setWorkerOptions([])
		response.data.forEach(element => {
			setWorkerOptions((oldArray=>[...oldArray, element]));
		})
	}
	useEffect(() => {
		getEmployeeOptions();
	  }, []);
	const [ projectOptions, setProjectOptions ] = useState([]);
	const getProjectOptions = async() =>{
		const response = await axios.get(endpoint+'/view/workhours/fnc_get_project.php');
		console.log(response);
		setProjectOptions([])
		response.data.forEach(element => {
			setProjectOptions((oldArray=>[...oldArray, element]));
		})
	}
	useEffect(() => {
		getProjectOptions();
	  }, []);
	  const [ workOptions, setWorkOptions ] = useState([]);
	  const getWorkOptions = async() =>{
		  const response = await axios.get(endpoint+'/view/workhours/fnc_get_work.php');
		//   console.log(response);
		  setWorkOptions([])
		  response.data.forEach(element => {
			  setWorkOptions((oldArray=>[...oldArray, element]));
		  })
	  }
	  useEffect(() => {
		  getWorkOptions();
		}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target)
		// const formData = new FormData(e.currentTarget);
		//console.log(formData);
		if(projectAllHours && projectNormalHours && projectNormalHours &&
			DateValues.todayDate && workerNormalHours && workerOverHours){
			// console.log("väljad täidetud")
			const dataToSave = {
				projectID: projectID,
				projectAllHours: projectAllHours,
				projectNormalHours: projectNormalHours,
				projectOverHours: projectOverHours,
				workerID: workerID,
				workID: workID,
				projectOpenedDate: DateValues.todayDate,
				projectWorkerNormalHours: workerNormalHours,
				projectWorkerOverHours: workerOverHours,
			};
			console.log(dataToSave);
			saveData(dataToSave);
		}
	}

	return(
		<>
		<main>
			<section style={{width: "50%"}}>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Töötundide sisestus</h3>
				</div>
				<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: "100%"}}>

							<>
								<DropDown
									name="Projekti number" ID="project"
									value={projectID} label="Projekt"
									onChange={handleProjectChange}
									options={projectOptions}
								/>
								<TextField
									required
									fullWidth
									id="projectAllHours"
									label="Kokku tunde projektile"
									name="projectAllHours"
									autoComplete="none"
									onChange={handleAllHoursChange}
									value={displayAllHours}
									type="number"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									// sx={{ width: 'auto'}}
									id="projectNormalHours"
									label="Kokku normaaltunde"
									name="projectNormalHours"
									autoComplete="none"
									onChange={handleNormalHoursChange}
									value={displayNormalHours}
									type="number"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									autoFocus
									id="projectOverHours"
									label="Kokku ületöö tunde"
									name="projectOverHours"
									autoComplete="none"
									onChange={handleOverHoursChange}
									value={displayOverHours}
									type="number"
									margin="dense"
									size="small" />
								<DropDown
									name="Töötaja" ID="worker"
									value={workerID} label="Töötaja"
									onChange={handleWorkerChange}
									options={workerOptions}
								/>
								<DropDown
									name="Töö liik" ID="worker"
									value={workID} label="Töö liik"
									onChange={handleWorkChange}
									options={workOptions}
								/>
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={et}>
							<DatePicker
								id="projectOpenedDate"
								name="projectOpenedDate"
								label="Tänane kuupäev"
								invalidDateMessage="Viga kuupäeva sisestamisel"
								// error={formValues.startDate.error && formValues.startDate.errorMessage}
								inputFormat="DD.MM.YYYY"
								// error={!!errorPlannedEnd}
								value={DateValues.todayDate}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
								<TextField
									required
									fullWidth
									autoFocus
									id="projectWorkerNormalHours"
									label="Töötaja tunnid projektis"
									name="projectWorkerNormalHours"
									autoComplete="none"
									onChange={handleWorkerNormalHoursChange}
									type="text"
									margin="dense"
									size="small" />
								<TextField
									required
									fullWidth
									autoFocus
									id="projectWorkerOverHours"
									label="Töötaja ületöö tunnid projektis"
									name="projectWorkerOverHours"
									autoComplete="none"
									onChange={handleWorkerOverHoursChange}
									type="text"
									margin="dense"
									size="small" />
							</>
						<Button
							type="submit"

							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							margin="dense"
							onClick={handleSubmit}
							>
							Sisesta töötunind
						</Button>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}