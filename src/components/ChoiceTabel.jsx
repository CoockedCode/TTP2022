import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ChoiceTable() {
    const endpoint = "https://elektrimasinad.digifi.eu/api";
    const [rows, setRows] = useState([]);
    const forRows = async () => {
    const resp = await axios.get(endpoint + "/client/fnc_get_all_clients.php?client");
        console.log(resp);
        setRows([]);
        resp.data.forEach(element => {
            setRows(oldArray => [...oldArray, element])
        });
        console.log(rows);
}
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

useEffect(() => {
    forRows();
  }, []);

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

                    <TableCell >{row.name}</TableCell>
                    <TableCell >{row.regNum} </TableCell>
                    <TableCell >{row.postInd} </TableCell>
                    <TableCell >{row.kontakt} </TableCell>
                    <TableCell >{row.mail} </TableCell>
                    <TableCell >{row.telefon} </TableCell>
                    <TableCell >{row.invoiceEm}  </TableCell>
                    <TableCell >{row.addInf} </TableCell>
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
                                    <TableCell>Muu 1</TableCell>
                                    <TableCell>Muu 2</TableCell>
                                    <TableCell align="right">Muu 3</TableCell>
                                    <TableCell align="right">Muu 4</TableCell>
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
            <TableContainer sx={{ maxHeight: "80vh", width: '100%' }} >
            <Table stickyHeader aria-label="sticky collapsible table" size="small">
                <TableHead>
                <TableRow>

                    <TableCell padding='none' width={"12px"} />
                    <TableCell >Seadme liik
                    <Button
							type="button"
							variant="contained"
							sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
							onClick={handleClickOpen}
							>
							Lisa
						</Button>
                    </TableCell>
                    <TableCell >Võimsus kW</TableCell>
                    <TableCell >p/min </TableCell>
                    <TableCell >Tootja</TableCell>
                    <TableCell >Võlli kõrgus </TableCell>
                    <TableCell >Toite liik </TableCell>
                    <TableCell >Sagedus Hz</TableCell>
                    <TableCell >Isol.klass </TableCell>
                    <TableCell >IP Klass</TableCell>
                    <TableCell >Transpordi firma</TableCell>
                    <TableCell >Tarnija</TableCell>
                    <TableCell >Tunnihind</TableCell>
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
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {"Kustuta klient?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Andmete lisamine
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, bgcolor: 'main',
                width: 'auto' }}
                margin="dense"
                onClick={handleClose}>
                Cancel
            </Button>
            <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, bgcolor: 'main', width: 'auto' }}
                onClick={handleClose} autoFocus>
                Lisa!
            </Button>
            </DialogActions>
            </Dialog>
        </Paper>

      );
    }