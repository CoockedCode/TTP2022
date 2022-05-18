import { FormControl, FormControlLabel, FormHelperText, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState } from 'react';

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);


		if(formData.get("projectId") && formData.get("projectName") && formData.get("client") &&
		 formData.get("projectMachineType") && formData.get("projectPriority") && formData.get("projectInfo")){
			console.log("väljad täidetud")

			// php osa siia
			
			// kui kõik väljad täidetud ja üleslaadimine õnnestus
			dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
		} else {
			console.log("viga")
			setError(true);
			if(!formData.get("projectId")){
				setHelperText("Projekti number puudu!");
			}
			if(!formData.get("projectName")){
				setHelperText("Projekti nimi puudu!");
			}
			if(!formData.get("client")){
				setHelperText("Klient sisestamata!");
			}
			if(!formData.get("projectMachineType")){
				setHelperText("Masinatüüp kirjutamata!");
			}
			if(!formData.get("projectPriority")){
				setHelperText("Prioriteet määramata!");
			}
			if(!formData.get("projectInfo")){
				setHelperText("Lisainfo kirjutamata!");
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

							autoFocus
							id="projectName"
							label="Projekti nimi"
							name="projectName"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<FormHelperText>{helperText}</FormHelperText>

						<TextField
							required

							id="client"
							label="Tellija nimi"
							name="client"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<FormHelperText>{helperText}</FormHelperText>

						<TextField
							required

							id="projectMachineType"
							label="Masina tüüp"
							name="projectMachineType"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<FormHelperText>{helperText}</FormHelperText>

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
						<FormHelperText>{helperText}</FormHelperText>

						<TextField
							required

							// sx={{ width: 'auto'}}
							id="projectInfo"
							label="Projekti info"
							name="projectInfo"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<FormHelperText>{helperText}</FormHelperText>
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