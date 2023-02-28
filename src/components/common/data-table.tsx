import { Fragment } from "preact/jsx-runtime"
import TableType from '../../types/table-type'
import PaginateProps from '../../types/pagination.type'
import Table from '../ui/table'
import Pagination from './pagination'

interface DataTableProps<DataType> extends TableType<DataType>, PaginateProps {}

const DataTable = <DataType,>({ ...props }: DataTableProps<DataType>) => {
  return (
    <Fragment>
        <Table {...props} />
        <Pagination {...props } />
    </Fragment>
  )
}

export default DataTable