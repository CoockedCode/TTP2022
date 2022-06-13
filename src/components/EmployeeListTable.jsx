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
import axios from 'axios';

export default function EmployeeListTable() {
    const endpoint = "https://elektrimasinad.digifi.eu/api";
    const [rows, setRows] = useState([]);
    const forRows = async () => {
    const resp = await axios.get(endpoint + "/employee/fnc_read_employees.php?client");
        setRows([]);
        console.log(resp);
        resp.data.forEach(element => {
            setRows(oldArray => [...oldArray, element])
        });
        console.log(rows);
}

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


        return(
            <>
            <TableRow key={key} className="main-table-row">
                <TableCell padding='none'><IconButton aria-label="expand row" size="small" sx={{marginLeft: "0.5rem"}}> </IconButton></TableCell>
                    <TableCell >{row.employeeFname}</TableCell>
                    <TableCell >{row.employeeSname}</TableCell>
                    <TableCell >{row.employeeMail} </TableCell>
                    <TableCell >{row.employeeNumber} </TableCell>
                    <TableCell >{row.employeeUsername} </TableCell>
                    <TableCell >{row.employeeActive} </TableCell>
                    <TableCell >{row.employeeRole} </TableCell>
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
                    <TableCell >Eesnimi</TableCell>
                    <TableCell >Perekonnanimi</TableCell>
                    <TableCell >Meil </TableCell>
                    <TableCell >Number </TableCell>
                    <TableCell >Kasutajanimi </TableCell>
                    <TableCell >Staatus </TableCell>
                    <TableCell >Tööroll </TableCell>
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