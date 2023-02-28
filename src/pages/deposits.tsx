import { TargetedEvent } from "preact/compat"
import { useMemo, useState } from "preact/hooks"
import { useNavigate } from "react-router-dom"
import { TxnQueryType } from "../types/txn.type"
import Template from "../components/common/template"
import { PAGE_SIZE, txnDataColumns, txnHeaders } from "../utils/constants"
import { useFetchDepositsQuery } from "../redux/txns/txn-api.slice"

const Deposits = () => {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch()
    const [tab, setTab] = useState('all')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { data, isFetching, error, refetch } = useFetchDepositsQuery<TxnQueryType>(currentPage)

    const statuses = useMemo(() => [
        { status: 'All', tab: 'all', total: data?.totalPageSize },
        { status: 'Sent', tab: 'sent', total: 0 },
        { status: 'Pending', tab: 'pending', total: 0 },
        { status: 'Denied', tab: 'denied', total: 0 },
    ], [data?.totalPageSize])

    const handleView = (e: any, id?: unknown) => {
        e.preventDefault();
        e.stopPropagation();
        // navigate(`${USERS}/${id}`)
    }

    const handleDeny = (e: TargetedEvent<any, Event>, id: unknown) => {
        console.log(id);
    }

    const menuData = useMemo(() =>[
        { label: 'View transaction', action: handleView },
        { label: 'Deny transaction', action: handleDeny },
    ], [])

    const handleCurrentPage = (pgn: number) => {
        refetch()
        setCurrentPage(pgn);
    }

    // useEffect(() => {
    //   switch (tab) {
    //     case value:

    //         break;

    //     default:
    //         break;
    //   }

    //   return () => {

    //   }
    // }, [tab])


    return (
        <Template 
            statuses={statuses} 
            tableHeaders={txnHeaders} 
            columns={txnDataColumns}
            tableData={data?.data}
            tab={tab}
            handleTab={setTab}
            handleNavigate={handleView}
            isFetching={isFetching}
            totalPageSize={data?.totalPageSize}
            pageSize={PAGE_SIZE}
            menuData={menuData}
            getCurrentPage={handleCurrentPage}
            currentPage={currentPage}
            route="Deposits"
        />
    );
}

export default Deposits