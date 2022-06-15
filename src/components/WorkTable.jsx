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
import FileOpenIcon from '@mui/icons-material/FileOpen';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { ButtonBase } from '@mui/material';
import { rows } from "./WorkTableData";

export default function StickyHeadTable() {
const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


function Row(row, key){

 	const [open, setOpen] = useState(false);

	return(
		<>
		<TableRow key={key} className="main-table-row">
			<TableCell padding='none'><IconButton aria-label="expand row" size="small" sx={{marginLeft: "0.5rem"}} onClick={() => {setOpen(!open)}}>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton></TableCell>
			<TableCell padding='none' width="48px" sx={{paddingLeft: "4px"}} >{row.ID}</TableCell>
			<TableCell >{row.PT}</TableCell>
			<TableCell padding='none' sx={{paddingLeft: "4px"}} width="12px" href={row.DigiDokk}><ButtonBase href={row.DigiDokk}><FileOpenIcon /></ButtonBase></TableCell>

			<TableCell >{row.Avatud}</TableCell>
			<TableCell >{row.Klient}</TableCell>
			<TableCell >{row.Too_nimetus}</TableCell>
			<TableCell ><WorkBox workName={row.Progress}/></TableCell>

		</TableRow>

		<TableRow key={key + 'dropDown'}>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<Box sx={{ margin: 1 }}>
						{/* <Typography variant="h6" gutterBottom component="div">
						History
						</Typography> */}
						<Table size="small" aria-label="muu">
						<TableHead>
							<TableRow>
								<TableCell>Tootja</TableCell>
								<TableCell>Seadme liik</TableCell>
								<TableCell>Seadme tüüp</TableCell>
								<TableCell align="right">kW</TableCell>
								<TableCell align="right">p/min</TableCell>
								<TableCell >Kokkulepitud tähtaeg</TableCell>
								<TableCell >Lõpetatud</TableCell>
								<TableCell >Väljaviidud</TableCell>
								<TableCell >Arhiivi</TableCell>
								<TableCell >Kustuta</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow key={1}>
								<TableCell component="th" scope="row">
								asdsad
								</TableCell>
								<TableCell>asd</TableCell>
								<TableCell align="right">asd</TableCell>
								<TableCell align="right">
								asd
								</TableCell>
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
	<Paper sx={{ width: '100%'}} elevation={2} >
		<TableContainer sx={{ maxHeight: "78vh", width: '100%' }} >
		<Table stickyHeader aria-label="sticky collapsible table" size="small">

			<TableHead sx={{ display: { xs: 'none', md: 'table-header-group' }}}>
				<TableRow>
					<TableCell padding='none' width={"12px"} />
					<TableCell padding='none' width="48px" sx={{paddingLeft: "4px"}} >Projekti NR.</TableCell>
					<TableCell >PT</TableCell>
					<TableCell padding='none' sx={{paddingLeft: "4px"}} width="12px">DigiDokk</TableCell>
					<TableCell >Avatud</TableCell>
					<TableCell >Kliendi nimi</TableCell>
					<TableCell >Töö nimetus</TableCell>
					<TableCell >Progress</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
			{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => (
				<Row {...row} key={key} />
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
