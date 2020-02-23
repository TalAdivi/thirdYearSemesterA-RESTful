import * as React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

import Paper from '@material-ui/core/Paper'
import {
  DataTypeProvider
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui'

// import {
//   generateRows,
//   employeeValues
// } from '../../../demo-data/generator'

// const rows = generateRows({ length: 8, columnValues: employeeValues });
const rows = [

  { id: 0, firstName: 'Tal', lastName: 'Adivi', position: 'bla', state: 'blabla' },
]

const columns = [
  { name: 'firstName', title: 'First Name' },
  { name: 'lastName', title: 'Last Name' },
  { name: 'position', title: 'Position' },
  { name: 'state', title: 'State' }
]

const TooltipFormatter = ({ row: { phone, birthDate }, value }) => (
  <Tooltip title={(
    <span>
      {`phone: ${phone}`}
      <br />
      {`birth date: ${birthDate}`}
    </span>
  )}
  >
    <span>
      {value}
    </span>
  </Tooltip>
)

const CellTooltip = props => (
  <DataTypeProvider
    for={columns.map(({ name }) => name)}
    formatterComponent={TooltipFormatter}
    {...props}
  />
)

export default () => (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
    >
      <CellTooltip />
      <Table />
      <TableHeaderRow />
    </Grid>
  </Paper>
)
