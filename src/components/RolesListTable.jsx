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

const rows = [
    {Töönimetus:'Hooldus'},
    {Töönimetus:'Remont'},
    {Töönimetus:'Müük'},
    {Töönimetus:'Defekteerimine'},
    {Töönimetus:'Garantii'},
    {Töönimetus:'Välitöö/Diagnostika'},
    {Töönimetus:'Välitöö/Laagrite vahetus'},
    {Töönimetus:'Välitöö/Remont'},
    {Töönimetus:'Välitöö/Tasakaalustus'},
    {Töönimetus:'Välitöö/Joondamine'},
    {Töönimetus:'Välitöö/Seadme vahetus'},
    {Töönimetus:'Välitöö/Joondamine'},
    {Töönimetus:'Grundfosi garant. käsitlemine'}


]

export default function RolesListTable() {
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
                <TableCell padding='none'><IconButton aria-label="expand row" size="small" sx={{marginLeft: "0.5rem"}}></IconButton></TableCell>

                    <TableCell >{row.Töönimetus}</TableCell>

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
                    <TableCell >Töönimetus</TableCell>
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