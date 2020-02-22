import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

<<<<<<< HEAD
function createData(name, active, completed, subjects) {
  return { name, active, completed, subjects };
}

const rows = [];

function analysData(props) {
  let myMap = new Map();
  let userSubjects=[];
  props.allTasks.map(task => {
    userSubjects=[];
   let obj=myMap.get(task.userID);
    if(obj==undefined) {
      userSubjects.push(task.selectedSubject);
      console.log("first",userSubjects.length)
      if(task.status == 'Active') {
        myMap.set(task.userID, { name: task.userName, active : 1, completed: 0,subjects:userSubjects})
      }
      else if(task.status == 'Completed')
        myMap.set(task.userID, { name: task.userName, active : 0, completed: 1,subjects:userSubjects})
    } 
    else {
      console.log("sec",task.selectedSubject)
      if(task.status=='Active'){
        obj.active += 1
      }
      else if(task.status=='Completed'){
        obj.completed += 1
        
      }
      
      else if(userSubjects.find(task.selectedSubject) == undefined){
        userSubjects.push(task.selectedSubject);
        console.log("sec",userSubjects.length)
        obj.subjects = userSubjects;
      }
    }
  })
  myMap.forEach(user=>{
    rows.push(createData(user.name, user.active,user.completed,user.subjects))
  })

}

=======
function createData (name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

export default function SimpleTable () {
  const classes = useStyles()
>>>>>>> upstream/master


export default function SimpleTable(props) {
  const classes = useStyles();
  analysData(props);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell align="center">Tasks active</TableCell>
            <TableCell align="center">Tasks completed</TableCell>
            <TableCell align="center">Subjects</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
<<<<<<< HEAD
  );
}

=======
  )
}
>>>>>>> upstream/master
