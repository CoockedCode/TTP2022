import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/ducks/snackbar";

export default function AddNewProject(){
	//snackbar
	const dispatch = useDispatch();
	
	const handleSubmit = (e) => {
		e.preventDefault();	
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
				
					<TextField					
						required
						fullWidth					
						id="projectPrio"
						label="Projekti prioriteet"
						name="projectPrio"
						autoComplete="none"
						type="text"
						margin="dense"
						size="small"
					/>
					
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