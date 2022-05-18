import { FormControl, FormControlLabel, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState } from 'react';

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	const [value, setValue] = useState();
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData.get("projectName"));

		/*
		const formData = new FormData(e.currentTarget);
		for(let [key, value] of formData.entries()){
			console.log(key, value);
		}
		*/


		// kui kõik väljad täidetud, siis edukas
		dispatch(setSnackbar(true,"success","Projekt edukalt lisatud!"));
	};
	return(
		<>
		<main>
			<section>
				<br />
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Lisa uus projekt</h3>
				</div>
				<Box fullwidth component = "form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl>
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

						<TextField
							required

							id="projectMachineTypes"
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
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}