import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TablePagination from '@material-ui/core/TablePagination';
//import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));




export default function SimpleTable(props) {
  const classes = useStyles();
  const editRowID = props.editRowID;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
              {props.headers && props.headers.map( header => (
                  <TableCell>{header}</TableCell>
              ))}
              <TableCell>{"Edit"}</TableCell>
              <TableCell>{"Delete"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows && props.rows
          .map(row => (
            editRowID !== row.name ?
              <TableRow key={row.name}>
              
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{row.protein}</TableCell>
              
              <TableCell>
                <EditIcon onClick={() => props.triggerEdit(row.name)}></EditIcon>
              </TableCell>
              <TableCell>
                <DeleteIcon onClick={() => props.delete(row.name)}></DeleteIcon>
              </TableCell>
            </TableRow> 
            :
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                <TextField
                  value={row.calories}
                  onChange={(e)=>props.edit(e,'calories',editRowID)}
                >
                  {row.calories}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  value={row.fat}
                  onChange={(e)=>props.edit(e,'fat',editRowID)}
                >{row.fat}
                </TextField> 
              </TableCell>
              <TableCell>
                <TextField
                  value={row.carbs}
                  onChange={(e)=>props.edit(e,'carbs',editRowID)}
                >{row.carbs}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  value={row.protein}
                  onChange={(e)=>props.edit(e,'protein',editRowID)}
                >{row.protein}
                </TextField>
              </TableCell>
            
              <TableCell>
                <EditIcon onClick={() => props.stopEdit(row.name)}></EditIcon>
              </TableCell>
              <TableCell>
                <DeleteIcon onClick={() => props.delete(row.name)}></DeleteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*
        In a perfect scenario we would create new component called PagedTable, where the table will be supporting
        pagination, but since this is a tiny project the pagination will be added to an already existing component (Table)
      */}
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.recordsCount}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={props.handleChangePage}
          onChangeRowsPerPage={props.handleChangeRowsPerPage}
      ></TablePagination>
    </Paper>
  );
}

