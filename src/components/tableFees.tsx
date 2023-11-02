import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import Fee from '../types/fee';
import '../assets/home.css';

const columns: GridColDef[] = [
    {
        field: 'min',
        headerName: 'De',
        type: 'number',
        flex: 0.3,
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params: GridValueGetterParams) => `${params.row.min} ${' Fcfa'}`,
    },
    {
        field: 'max',
        headerName: 'A',
        type: 'number',
        flex: 0.3,
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params: GridValueGetterParams) => `${params.row.max} ${' Fcfa'}`,
    },
    {
        field: 'fee',
        headerName: 'Frais',
        type: 'number',
        flex: 0.4,
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params: GridValueGetterParams) => `${params.row.fee} ${' Fcfa'}`,
    },
];

type Props = {
    data: Fee[]
}

export default function TableFees({data} : Props) {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        slots={{
            toolbar: GridToolbar,
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
