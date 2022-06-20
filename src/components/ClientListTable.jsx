import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

export default function ClientListTable({searchQuery}) {
    const endpoint = "https://elektrimasinad.digifi.eu/api";
    const [rows, setRows] = useState([]);
    const forRows = async () => {
    const resp = await axios.get(endpoint + "/view/client/fnc_get_all_clients.php?client");
        console.log(resp);
        setRows([]);
        resp.data.forEach(element => {
            setRows(oldArray => [...oldArray, element])
        });
        //console.log(rows);
}

useEffect(() => {
    forRows();
  }, [!rows]);

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
                <TableRow key={key}>
                        <TableCell >{row.name}</TableCell>
                        <TableCell >{row.regNum} </TableCell>
                        <TableCell >{row.postInd} </TableCell>
                        <TableCell >{row.kontakt} </TableCell>
                        <TableCell >{row.mail} </TableCell>
                        <TableCell >{row.telefon} </TableCell>
                        <TableCell >{row.invoiceEm}  </TableCell>
                        <TableCell >{row.addInf} </TableCell>
                </TableRow>
            </>
        );
    }

      return (
        <Paper sx={{ width: '100%'}} elevation={3} >
            <TableContainer sx={{ maxHeight: "78vh", width: '100%' }} >
            <Table stickyHeader size="normal">
                <TableHead>
                <TableRow>
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
                {rows.filter((rows) => {
				// console.log(rows);
				if(searchQuery == ""){
					return rows;
				}else if(rows.name.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.regNum.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.addInf.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.kontakt.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.mail.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.telefon.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.mail.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
					return rows;
				}else if(rows.address.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
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