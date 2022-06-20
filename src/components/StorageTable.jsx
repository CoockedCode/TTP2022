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
import { endpoint } from "../endpoint";

export default function ClientListTable({searchQuery}) {
    const [rows, setRows] = useState([]);
    const forRows = async () => {
    const resp = await axios.get(endpoint + "/view/storage/fnc_get_storage.php?storage");
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
                        <TableCell >{row.type} </TableCell>
                        <TableCell >{row.price} </TableCell>
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
                    <TableCell >Nimetus</TableCell>
                    <TableCell >Tüüp</TableCell>
                    <TableCell >Ühiku hind </TableCell>
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