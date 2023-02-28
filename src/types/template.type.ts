import { ColumnType, TableHeadType, TBProps } from "./table-type";

type RouteStatus = {
    status: string;
    tab: string;
    total: number;
}

interface TemplateProps extends TBProps {
    columns: ColumnType;
    isFetching: boolean;
    tab: string;
    totalPageSize: number;
    pageSize: number;
    handleTab: (tab: string) => void;
    getCurrentPage?: (pgn: number) => void;
    currentPage?: number;
    route: string;
}

interface Template<RouteData> extends TemplateProps {
    statuses: RouteStatus[];
    tableHeaders: TableHeadType[];
    tableData: RouteData[];
}

export default Template;