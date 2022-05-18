import { FormControl, FormControlLabel, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio, Box } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";
import React, { useState } from 'react';
import axios from "axios";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();

	const [value, setValue] = useState();
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState();


	//info salvestamine php kaudu
	const saveData = (dataToSave) => {
		axios.post('https://elektrimasinad.digifi.eu/api/localsave.php', {save: `${dataToSave}`})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});

	};

	//GET test
    const fetchUsr = async (usrNam) => {
      const { status, data } = await axios.get("https://elektrimasinad.digifi.eu/api/test_get.php?usrNam=" + usrNam );
      if (status === 200) {
        if (data.length > 0) {
          console.log(data);
      }
    }
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		//console.log(formData.get("projectId"));

		//php slavestamise osa
		let dataToSave = {
			projectId: formData.get("projectId"),
			projectNam: formData.get("projectNam")
		};
		saveData(dataToSave);

		// fetchUsr("Teet");

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
				<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
					<FormControl sx={{width: 1}}>
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
							id="projectNam"
							label="Projekti nimi"
							name="projectNam"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>

						<TextField
							required

							id="projectOrdererNam"
							label="Tellija nimi"
							name="projectOrdererNam"
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

							id='projectPrio'
							label="Projekti prioriteet"
							name='projectPrio'
							row
						>
							<FormControlLabel value="kiire" control={<Radio />} label="Kiire" />
							<FormControlLabel value="tahtajaline" control={<Radio />} label="Tähtajaline" />
							<FormControlLabel value="maaramata" control={<Radio />} label="Määramata" />
							<FormControlLabel value="lopetatud" control={<Radio />} label="Lõpetatud" />
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