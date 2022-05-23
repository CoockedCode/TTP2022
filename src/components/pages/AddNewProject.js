import { FormControl, FormControlLabel, FormHelperText, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	// TODO
	// klient dropdown menu vastavalt olemasolevatele
	// kuupäevade sisestused normaliseerida
	// machineType üle vaadata

	// info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post('http://cookedcode.tk/api/fnc/fnc_save_project.php', {dataToSave})
		.then(function (response) {
			console.log(response);
			return true;
		})
		.catch(function (err) {
			console.log(err);
			return false;
		});

	};

	//const [color, setColor] = useState();
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState();	

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
			console.log(dataToSave);

			// KONTROLLIDA kui saatis ja saatmine õnnestus, siis snäkkkk
			if(saveData(dataToSave)){
				// kui kõik väljad täidetud ja üleslaadimine õnnestus
				dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
			} else {
				dispatch(setSnackbar(true,"error","Salvestamisel tekkis viga!"))
			}

		} else {
			//HelperText useEffect ja useState, kysi Siimult
			console.log("viga")
			if(!formData.get("projectId")){
				//setHelperText("Projekti number puudu!");
				setError(true);
				//setColor("error");
			}
			if(!formData.get("projectName")){
				//setHelperText("Projekti nimi puudu!");
				setError(true);
				//setColor("error");
			}
			if(!formData.get("client")){
				//setHelperText("Klient sisestamata!");
				setError(true);
				//setColor("error");
			}
			if(!formData.get("projectMachineType")){
				//setHelperText("Masinatüüp kirjutamata!");
				setError(true);
				//setColor("error");
			}
			if(!formData.get("projectPriority")){
				//setHelperText("Prioriteet määramata!");
				setError(true);
				//setColor("error");
			}
			if(!formData.get("projectInfo")){
				//setHelperText("Lisainfo kirjutamata!");
				setError(true);
				//setColor("error");
			}
			setHelperText("Kontrolli väljad üle!");
			
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
					<FormControl sx={{width: "100%"}} error={error}>
						<TextField
							error={false}
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
							error={false}
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
							error={false}
							id="client"
							label="Tellija nimi"
							name="client"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							required
							error={false}
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
							error={false}
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
							label="Planeeritud lõpp pp/kk/aa"
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
							error={false}
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
						<FormHelperText>{helperText}</FormHelperText>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}