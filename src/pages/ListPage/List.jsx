import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useValues, useActions } from 'kea';
import claimLogic from "../../Logic";

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'reason',
    label: 'Reason',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'state',
    label: 'Approved/Refused',
    minWidth: 170,
    align: 'right',
  },
  { id: 'actions', label: 'Actions', minWidth: 100 },

];



const useStyles = makeStyles({
  root: {
    width: '84%',
    margin: 'auto',
    position: 'relative',
    top: '10rem',
    boxShadow: '0px 3px 58px 9px rgba(0,0,0,0.07)',
  },
  container: {
    maxHeight: 440,
  },
  stickyHeader: {
    border: '1px solid transparent'
  }
});

export default function List() {
  const { claimers, loadingFetchClaimers, claimersNumber } = useValues(claimLogic)
  const { deleteClaimer } = useActions(claimLogic);
    const classes = useStyles();
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);


  if (loadingFetchClaimers) {
    return <p>loading ... </p>
  }

  return (
    <Paper className={classes.root}>
      <h1>List Of Claimers</h1>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.stickyHeader}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {claimers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id=== "actions") {
                      return (
                        <button onClick={() => deleteClaimer({ name: row.name })}>
                          delete
                        </button>
                      )
                    } 
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}