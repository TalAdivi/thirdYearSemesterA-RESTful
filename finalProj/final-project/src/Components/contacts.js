import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, active, completed, subjects) {
  return { name, active, completed, subjects };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
let active=[];
let completed=[];
let sumCompleted=1;
let sumActive=1;
let i=0;

function data(props) {
  let setID = new Set();
  let setName = new Set();
  props.allTasks.map(task => {
    setID.add(task.userID)
    setName.add(task.userName)
  })

  for (let userID of setID) {
    props.allTasks.map(task => {
      if(task.status== "Completed" && task.userID==userID){
        completed[i]=sumCompleted;
        sumCompleted++;
      }
      if(task.status== "Acitve" && task.userID==userID){
        active.push(sumActive);
        sumActive++;
      }
       
    })
    i++;
    sumCompleted=1;
    sumActive=1;
  }
  i=0;
  console.log("active",active)
  for (let name of setName){
    rows.push(createData(name, active[i], completed[i], 24))
    i++;
  }
   


}



export default function SimpleTable(props) {
  const classes = useStyles();
  data(props);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell align="center">Tasks active</TableCell>
            <TableCell align="center">Tasks completed</TableCell>
            <TableCell align="center">Subjects</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.active}</TableCell>
              <TableCell align="center">{row.completed}</TableCell>
              <TableCell align="center">{row.subjects}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

