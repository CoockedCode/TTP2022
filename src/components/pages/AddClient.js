import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { Box } from '@mui/material';
import { setSnackbar } from "../../redux/ducks/snackbar";

export default function AddClient(){
	//snackbar
	const dispatch = useDispatch();

	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData);
		console.log(e.target.clientName);
		dispatch(setSnackbar(true,"success","Klient edukalt lisatud!"));		
	};
	
	return(
		<>
		<main>
			<section>
				<br />			
				<div id="header-wrapper">
					<h3 style={{margin: '0', marginBottom: '0.5rem'}}>Lisa uus klient</h3>
				</div>			
				<Box component = "form" noValidate autoComplete="off" onSubmit={(e) => {handleSubmit(e)}}>
					<FormControl fullWidth>

						<TextField					
							required
							fullWidth
							autoFocus						
							id="clientName"
							label="Kliendi nimi"
							name="clientNam"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField					
							required
							fullWidth					
							id="clientRegNum"
							label="Kliendi registrinumber"
							name="clientRegNum"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField					
							required
							fullWidth
							// sx={{ width: 'auto'}}
							id="clientAddr"
							label="Kliendi address"
							name="clientAddr"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField					
							required
							fullWidth
							autoFocus						
							id="postIndex"
							label="Postiindeks"
							name="postIndex"
							autoComplete="none"
							type="number"
							margin="dense"
							size="small"
							/>
						<TextField					
							required
							fullWidth
							autoFocus						
							id="contPers"
							label="Kontakt isik"
							name="contPers"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField					
							required
							fullWidth						
							id="clientEmail"
							label="Kliendi e-mail"
							name="clientEmail"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
					
						<TextField					
							required
							fullWidth						
							id="clientPhoneNr"
							label="Kliendi tel nr"
							name="clientPhoneNr"
							autoComplete="none"
							type="number"
							margin="dense"
							size="small"
							/>
						
						<TextField					
							required
							fullWidth
							autoFocus						
							id="invoiceEm"
							label="Arve e-mail"
							name="invoiceEm"
							autoComplete="none"
							type="text"
							margin="dense"
							size="small"
							/>
						<TextField					
							optional
							fullWidth
							autoFocus						
							id="addInfo"
							label="Lisa info"
							name="addInfo"
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
							//onClick={handleSubmit}
							>
							Lisa Klient
						</Button>
					</FormControl>
				</Box>
			</section>
		</main>
		</>
	);
}