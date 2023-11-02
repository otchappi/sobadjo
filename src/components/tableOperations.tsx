import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Path from '../types/path';
import { sumFee } from '../utils/utils';
import Fee from '../types/fee';

type Props = {
    datas: Path[],
    fees: Fee[]
}

export default function TableOperations({datas, fees} : Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Opérations">
        <TableHead>
          <TableRow>
            <TableCell><strong>Retrait</strong></TableCell>
            <TableCell align="right"><strong>Frais</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {data.amount.toLocaleString('fr-FR') + " Fcfa"}
              </TableCell>
              <TableCell align="right">{fees[data.index].fee.toLocaleString('fr-FR') + " Fcfa"}</TableCell>
            </TableRow>
          ))}
          <TableRow
            key={-1}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <strong>Total</strong>
            </TableCell>
            <TableCell align="right"><strong>{sumFee(datas, fees).toLocaleString('fr-FR') + " Fcfa"}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
