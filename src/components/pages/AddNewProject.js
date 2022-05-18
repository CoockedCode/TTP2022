import { FormControl, FormControlLabel, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Radio } from '@mui/material';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData.get("projectNam"))
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
				<FormControl fullWidth>
					<TextField
						required
						fullWidth
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
						fullWidth
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
						fullWidth						
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
						fullWidth						
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
						fullWidth
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
						fullWidth
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
						onClick={handleSubmit}
						>
						Lisa Projekt
					</Button>
				</FormControl>
			</section>
		</main>
		</>
	);
}