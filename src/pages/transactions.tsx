import { TargetedEvent } from "preact/compat"
import { useMemo, useState } from "preact/hooks"
import Template from "../components/common/template"
import { useFetchAllCardTxnsQuery } from "../redux/cards/card-api.slice"
import UseQueryType from "../types/query.type";
import CardTxnType from "../types/card-txns.type"
import { cardTxnHeader, cardTxnsDataColumn, PAGE_SIZE } from "../utils/constants"
import Data from "../types/data-response.type";

cardTxnHeader?.push({ label: 'Actions', id: 7 })

const Transactions = () => {
    // const dispatch = useAppDispatch()
    const [tab, setTab] = useState('all')
    const { data, isFetching, error, refetch } = useFetchAllCardTxnsQuery<UseQueryType<Data<CardTxnType>>>({pgs: 15, pgn: 1})
    const [currentPage, setCurrentPage] = useState<number>(1)

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
            tableHeaders={cardTxnHeader} 
            columns={cardTxnsDataColumn}
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
            route="Transactions"
        />
    );
}

export default Transactions