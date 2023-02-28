import { memo, useContext, useMemo } from 'preact/compat';
import Table from '@mui/material/Table';
import TableHeader from './table-header';
import TableType from 'src/types/table-type';
import TableData from './table-body';
import LoadingContext from '../../LoaderContext'
import Empty from '../common/empty';

const TableEl = <BodyType,>({ bodyData, headData, loading, columns, ...others }: TableType<BodyType>) => {
    const { Loading } = useContext(LoadingContext);

    const TableBody = useMemo(() => 
        loading ?
        <Loading /> : 
        !loading && !bodyData?.length ? 
        <Empty wdth={200} /> : 
        <TableData {...others} data={bodyData} columns={columns} />,
        [bodyData, columns, loading]
    )

    const TableHead = useMemo(() => 
        !loading && !bodyData?.length ?
        <></> :
        <TableHeader data={headData} />,
        [bodyData, loading]
    )

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {TableHead}
            {TableBody}
        </Table>
    )
}

export default memo(TableEl)