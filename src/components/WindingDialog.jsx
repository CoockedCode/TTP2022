import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Paper, TableBody, TableCell, TableHead } from '@mui/material';

export default function WindingDialog(){

    // const useStyles = makeStyles(theme => ({
    //     root: {
    //       width: "100%",
    //       marginTop: theme.spacing(3),
    //       overflowX: "auto"
    //     },
    //     table: {
    //       minWidth: 650
    //     },
    //     selectTableCell: {
    //       width: 60
    //     },
    //     tableCell: {
    //       width: 130,
    //       height: 40
    //     },
    //     input: {
    //       width: 130,
    //       height: 40
    //     }
    // }));

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function createData(name, stator, rotor){
        return { name, stator, rotor};
    }

    const CustomTableCell = ({ row, name, onChange }) => {
        // const classes = useStyles();
        return (
        //   <TableCell align="left" className={classes.tableCell}>
          <TableCell align="left" className={classes.tableCell}>
              <Input
                value={row[name]}
                name={name}
                onChange={e => onChange(e, row)}
                // className={classes.input}
              />
          </TableCell>
        );
    };

    const [rows, setRows] = useState([
        createData("Pooluste arv", "-", "-"),
        createData("Mähise liik", "-", "-"),
        createData("Ühendusviis", "-", "-"),
        createData("Mähise samm","-", "-"),
        createData("Uurete arv", "-", "-"),
        createData("Keerdude arv", "-", "-"),
        createData("Raua mõõdud", "-", "-"),
        createData("Traatide arv keerus", "-", "-"),
        createData("Traadi mõõdud", "-", "-")
    ])
    //const classes = useStyles();

    const onChange = (e, row) => {
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
    
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
                return row;
        });
    }
    

    return(
        <>
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Mähise andmed
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Mähise andmed</DialogTitle>
                <DialogContent>
                    <Paper className={classes.root}>
                        <Table className={classes.table} aria-label="caption table">
                            <caption>Mähise andmed</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" />
                                    <TableCell align="left">Staator</TableCell>
                                    <TableCell align="left">Rootor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell className={classes.selectTableCell}></TableCell>
                                        <CustomTableCell {...{ row, name: "Pooluste arv", onChange}} />
                                        <CustomTableCell {...{ row, name: "Mähise liik", onChange}} />
                                        <CustomTableCell {...{ row, name: "Ühendusviis", onChange}} />
                                        <CustomTableCell {...{ row, name: "Mähise samm", onChange}} />
                                        <CustomTableCell {...{ row, name: "Uurete arv", onChange}} />
                                        <CustomTableCell {...{ row, name: "Keerdude arv", onChange}} />
                                        <CustomTableCell {...{ row, name: "Raua mõõdud", onChange}} />
                                        <CustomTableCell {...{ row, name: "Traatide arv keerus", onChange}} />
                                        <CustomTableCell {...{ row, name: "Traadi mõõdud", onChange}} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Katkesta</Button>
                    <Button onClick={handleClose}>Salvesta</Button>
                </DialogActions>

            </Dialog>
        </div>
        </>
    )
}