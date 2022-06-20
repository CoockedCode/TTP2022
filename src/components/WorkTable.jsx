import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import WorkBox from	'./WorkBox';
import WorkPrio from	'./WorkPrio';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { ButtonBase, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setSnackbar } from "../redux/ducks/snackbar";
import {useNavigate} from 'react-router-dom';
import { endpoint } from "../endpoint";

export default function WorkTable({queryOption, searchQuery}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const FetchAllData = async (query) =>{
		const resp = await axios.get(endpoint + "/view/mainview/mainview.php?fetch=" + query)
		setRows([]);
		resp.data.forEach( element => {
			setRows(oldArray => [...oldArray, element])
		});
	};

  useEffect(() => {
	if(queryOption == 0){
		FetchAllData(false);
	}else{
		FetchAllData(1);
	}
  }, [queryOption])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const saveData = (dataToSave) => {
		axios.post(`${endpoint}/view/mainview/MainView.php`, dataToSave)
		.then(function(response){
			console.log(dataToSave)
			console.log(response);
			if(response.status === 200){
				dispatch(setSnackbar(true, response.data[0].type, response.data[0].notice));
			}
		})
	};

function Row(row, key){
 	const [open, setOpen] = useState(false);
	const [idDB, setIdDB] = useState(row.id_DB);

	const handleArchive = (e) => {
		e.preventDefault();
		saveData(idDB);
	}

	return(
		<>
		<TableRow key={key} className="main-table-row">
			<TableCell padding='none'><IconButton aria-label="expand row" size="small" sx={{marginLeft: "0.5rem"}} onClick={() => {setOpen(!open)}}>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton></TableCell>
			<TableCell sx={{mx: "4px"}} width="12px"><ButtonBase onClick={()=>navigate("/digidokk?id=" + row.id_DB)}><FileOpenIcon /></ButtonBase></TableCell>
			<TableCell ><WorkPrio prio={row.PT} /></TableCell>
			<TableCell padding='none' sx={{px: "6px"}} >{row.ID}</TableCell>
			<TableCell >xx.xx.xxxx</TableCell>
			<TableCell >{row.Klient}</TableCell>
			<TableCell >{row.Too_nimetus}</TableCell>
			<TableCell>EL.Mootor</TableCell>
			<TableCell >53</TableCell>
			<TableCell >1000</TableCell>
			<TableCell>fA3-90S4</TableCell>
			<TableCell>ABB</TableCell>
			<TableCell ><WorkBox workName={row.Progress}/></TableCell>
		</TableRow>

		<TableRow key={key + 'dropDown'}>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box sx={{ mb: 2 }}>

						<Table size="small">
						<TableHead>
							<TableRow>

								<TableCell ></TableCell>
								<TableCell >Kokkulepitud tähtaeg</TableCell>
								<TableCell >Lõpetatud</TableCell>
								<TableCell >Väljaviidud</TableCell>
								<TableCell >Arhiivi</TableCell>
								<TableCell >Kustuta</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow >
								<TableCell ></TableCell>
								<TableCell >xx.xx.xxxx</TableCell>
								<TableCell >xx.xx.xxxx</TableCell>
								<TableCell >xx.xx.xxxx</TableCell>
								{(queryOption == 1) ? <TableCell  ><Button type="small" variant='contained' sx={{py: "4px", my: "6px"}} onClick={(e)=>{handleArchive(e)}}>Aktiveeri</Button></TableCell> :<TableCell  ><Button type="small" variant='contained' sx={{py: "4px", my: "6px"}} onClick={(e)=>{handleArchive(e)}}>Arhiivi</Button></TableCell>}
								<TableCell  ><Button type="small" variant='contained' sx={{ml: "4px", py: "4px", my: "6px"}}>Kustuta</Button></TableCell>
							</TableRow>
						</TableBody>
						</Table>
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
		</>
	);
}

  return (
	<Paper sx={{width: "100%"}} elevation={2} >
		<TableContainer sx={{ maxHeight: "78vh", width: '100%'}}  >
		<Table stickyHeader aria-label="sticky collapsible table" size="small">
			<TableHead >
				<TableRow>
					<TableCell align="justify" padding='none' width={"12px"} />
					<TableCell padding='none' sx={{mx: "4px"}} width="12px">DigiDokk</TableCell>
					<TableCell align="justify" >PT</TableCell>
					<TableCell align="justify" padding='none' >NR.</TableCell>
					<TableCell >Avatud</TableCell>
					<TableCell >Kliendi nimi</TableCell>
					<TableCell >Töö nimetus</TableCell>
					<TableCell>Seadme liik</TableCell>
					<TableCell >kW</TableCell>
					<TableCell >p/min</TableCell>
					<TableCell>Seadme tüüp</TableCell>
					<TableCell >Tootja</TableCell>
					<TableCell >Progress</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
			{rows.filter((rows) => {
				// console.log(rows);
				if(searchQuery == ""){
					return rows;
				}else if(rows.ID.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.Klient.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.Seadme_liik.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.Too_nimetus.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.Tootja.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}
			}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rows, key) => (
				<Row {...rows} key={key} />
			))}
        	</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
