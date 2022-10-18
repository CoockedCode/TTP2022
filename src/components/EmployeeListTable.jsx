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
import { endpoint } from '../endpoint';

export default function EmployeeListTable({searchQuery}) {

    const [rows, setRows] = useState([]);

    const forRows = async () => {
    const resp = await axios.get(endpoint + "/view/employee/fnc_read_employees.php?client");
        setRows([]);
        resp.data.forEach(element => {
            setRows(oldArray => [...oldArray, element])
        });
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


        return(
            <>
            <TableRow key={key} className="main-table-row">
                    <TableCell padding='none' width={"18px"} ></TableCell>
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
            <Table stickyHeader aria-label="sticky collapsible table" size="normal">
                <TableHead>
                <TableRow>

                    <TableCell padding='none' width={"18px"} ></TableCell>
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
                {rows.filter((rows) => {
                     console.log(rows);
                    if(searchQuery == ""){
                      return rows;
                    }else if(rows.employeeFname.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                      return rows;
                    }else if(rows.employeeSname.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                      return rows;
                    }else if(rows.employeeNumber.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                      return rows;
                    }else if(rows.employeeUsername.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                      return rows;
                    }else if(rows.employeeMail.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                      return rows;
                    }else if(rows.employeeActive.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
                      return rows;
                    }else if(rows.employeeRole.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())){
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