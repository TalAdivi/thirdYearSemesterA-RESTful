import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../Components/loader'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
})

export default function SimpleTable(props) {
  const { allTasks } = props
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    desc: ''
  });
  const { vertical, horizontal, open } = state;

  const handleHover = newState => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  useEffect(() => {
    analysData(allTasks)
  },[allTasks]);

  const analysData = (allTasks) => {
    let myMap = new Map();
    let array = [];
    allTasks.map(task => {
      let obj = myMap.get(task.userID);
      if (obj == undefined) {
        task.status == 'Active' ? myMap.set(task.userID, { name: task.userName, active: 1, completed: 0, subjects: [task.selectedSubject + ' '] })
          : myMap.set(task.userID, { name: task.userName, active: 0, completed: 1, subjects: [task.selectedSubject + ' '] });
      }
      else {
        task.status == 'Active' ? obj.active += 1 : obj.completed += 1;
        if (obj.subjects.indexOf(task.selectedSubject + ' ') == -1) {
          obj.subjects.push(task.selectedSubject + ' ');
        }
      }
    })
    myMap.forEach(user => {
      array.push({ name: user.name, active: user.active, completed: user.completed, len: user.subjects.length, subjects: user.subjects })
    })
    if(array.length!=0){
      setRows(array)
    }

  }

  if (rows.length == 0) {
    return <Loader />
  }
  else {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Tasks active</TableCell>
              <TableCell align="center">Tasks completed</TableCell>
              <TableCell align="center">Subjects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.active}</TableCell>
                <TableCell align="center">{row.completed}</TableCell>
                <TableCell style={{ cursor: "help" }} onMouseOver={handleHover({ vertical: 'top', horizontal: 'center', desc: row.subjects })} onMouseLeave={handleClose} align="center">{row.len}</TableCell>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  key={`${vertical},${horizontal}`}
                  open={open}
                  message={state.desc}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
