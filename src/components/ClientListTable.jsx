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

const endpoint = "'http://172.105.88.19/api";

const rows=axios.post(endpoint + '/fnc/read_client_fnc.php',{read_clients:""})
.then(function (response) {
    console.log(response);
    return true;
})
.catch(function (err) {
    console.log(err);
    return false;
});
//[
   // {Nimi:'Firma 1', RegistriNR:'6654765746', Aadress:'Narva mnt 25', Postiindeks:'541524', KontaktIsik:'Andrus Seep', //Mail:'firma1@tartu.ee', Telefon:'5636573657', ArveMail:'lmao@tlu.ee', Lisainfo:'Lmao kek'}

//]

export default function ClientListTable() {
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
    
                    <TableCell >{row.Nimi}</TableCell>
                    <TableCell >{row.RegistriNR} </TableCell>
                    <TableCell >{row.Postiindeks} </TableCell>
                    <TableCell >{row.KontaktIsik} </TableCell>
                    <TableCell >{row.Mail} </TableCell>
                    <TableCell >{row.Telefon} </TableCell>
                    <TableCell >{row.ArveMail}  </TableCell>
                    <TableCell >{row.Lisainfo} </TableCell>
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
                    <TableCell >Nimi</TableCell>
                    <TableCell >Registri NR </TableCell>
                    <TableCell >Postiindeks </TableCell>
                    <TableCell >Kontakt isik </TableCell>
                    <TableCell >Mail </TableCell>
                    <TableCell >Telefon </TableCell>
                    <TableCell >Arve mail </TableCell>
                    <TableCell >Lisainfo </TableCell>
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