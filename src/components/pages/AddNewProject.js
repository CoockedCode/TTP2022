import { FormControl, FormControlLabel, FormHelperText, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState, useEffect } from 'react';

import axios from "axios";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	//1.
	const [value, setValue] = useState();
	const [error1, setError1] = useState(false);
	const [helperText, setHelperText] = useState();

	//2.
	const [value2, setValue2] = useState();
	const [error2, setError2] = useState(false);
	const [helperText2, setHelperText2] = useState();

	//3.
	const [value3, setValue3] = useState();
	const [error3, setError3] = useState(false);
	const [helperText3, setHelperText3] = useState();

	//4.
	const [value4, setValue4] = useState();
	const [error4, setError4] = useState(false);
	const [helperText4, setHelperText4] = useState();

	//5.
	const [value5, setValue5] = useState();
	const [error5, setError5] = useState(false);
	const [helperText5, setHelperText5] = useState();

	//6.
	const [value6, setValue6] = useState();
	const [error6, setError6] = useState(false);
	const [helperText6, setHelperText6] = useState();


	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post('https://elektrimasinad.digifi.eu/api/localsave.php', {save: `${dataToSave}`})
		.then(function (response) {
			console.log(response);
			return true;
		})
		.catch(function (err) {
			console.log(err);

			return false;
		});

	};

	useEffect(() => {
		console.log(value)
		if(value){
			setHelperText();
			setError1(false);
		}
		if(value2){
			setHelperText2();
			setError2(false);
		}
		if(value3){
			setHelperText3();
			setError3(false);
		}
		if(value4){
			setHelperText4();
			setError4(false);
		}
		if(value5){
			setHelperText5();
			setError5(false);
		}
		if(value6){
			setHelperText6();
			setError6(false);
		}

	}, [value, value2, value3, value4, value5, value6])


	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if(formData.get("projectId") && formData.get("projectName") && formData.get("client") &&
		 formData.get("projectMachineType") && formData.get("projectPriority") && formData.get("projectInfo")){
			console.log("väljad täidetud")

			// php osa siia
			let dataToSave = {
				projectId: value,
				projectName: value2,
				client: value3,
				machineType: value4,
				priority: value5,
				additionalInfo: value6
			};

			// KONTROLLIDA kui saatis ja saatmine õnnestus, siis snäkkkk
			if(saveData(dataToSave)){
				// kui kõik väljad täidetud ja üleslaadimine õnnestus
				dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
			}else{
				dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
			}

		}else{
			//console.log("viga")
			if(!formData.get("projectId")){
				// setHelperText("Projekti number puudu!");
				setError1(true);
			}else{
				setValue(formData.get("projectId"));
			}
			if(!formData.get("projectName")){
				// setHelperText2("Projekti nimi puudu!");
				setError2(true);
			}else{
				setValue2(formData.get("projectName"));
			}
			if(!formData.get("client")){
				// setHelperText3("Klient sisestamata!");
				setError3(true);
			}else{
				setValue3(formData.get("client"));
			}
			if(!formData.get("projectMachineType")){
				// setHelperText4("Masinatüüp kirjutamata!");
				setError4(true);
			}else{
				setValue4(formData.get("projectMachineType"));
			}
			if(!formData.get("projectPriority")){
				setHelperText5("Prioriteet määramata!");
				setError5(true);
			}else{
				setValue5(formData.get("projectPriority"));
			}
			if(!formData.get("projectInfo")){
				// setHelperText6("Lisainfo kirjutamata!");
				setError6(true);
			}else{
				setValue6(formData.get("projectInfo"))
			}
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
					<FormControl sx={{width: "100%"}}>
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
						<FormHelperText>{helperText}</FormHelperText>

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
						<FormHelperText>{helperText2}</FormHelperText>

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
						<FormHelperText>{helperText3}</FormHelperText>

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
						<FormHelperText>{helperText4}</FormHelperText>

						<RadioGroup
							required
							// error={error5}
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
						<FormHelperText>{helperText5}</FormHelperText>

						<TextField
							required
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
						<FormHelperText>{helperText6}</FormHelperText>

						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							margin="dense"
							>
							Lisa Projekt
						</Button>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}