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

const rows=[
    {Nimi:'Heidi Kuusk', Mail:'heidi.kuusk@elktrm.ee', Number:'58585858', Roll:'Tööline'}

]

export default function WorkerListTable() {
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
    
                    <TableCell >{row.Nimi}</TableCell>
                    <TableCell >{row.Mail} </TableCell>
                    <TableCell >{row.Number} </TableCell>
                    <TableCell >{row.Roll} </TableCell>
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
                    <TableCell >Mail </TableCell>
                    <TableCell >Number </TableCell>
                    <TableCell >Roll </TableCell>
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