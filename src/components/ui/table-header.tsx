import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { TableHeadType } from '../../types/table-type';
import { Tablecell } from '../../theme/styles';


const TableHeader = ({ data }: { data: Array<TableHeadType> }) => {
  return (
    <TableHead>
      <TableRow>
        {data.length && data.map((row, idx) =>
          <Tablecell show={true} fw="600" align={row.label === 'Actions' ? "right" : "left"} key={row.label}>{row.label}</Tablecell>)
        }
      </TableRow>
    </TableHead>
  )
}

export default TableHeader