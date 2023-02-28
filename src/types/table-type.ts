import { MenuData } from "./menu.type";
import Props from "./props.type";

export interface TableHeadType {
    [n: string]: string | number;
}

export type ColumnType = {
    [x: number]: unknown;
}

export type TBProps = {
    menuData?: MenuData[];
    handleNavigate?: (e: any, id: unknown) => void;
    props?: Props;
}

export interface TableBodyType<BodyType> extends TBProps {
    data: Array<BodyType>;
    columns: ColumnType;
}


interface TableType<DataType> extends TBProps {
    headData: Array<TableHeadType>;
    bodyData: Array<DataType>;
    columns: ColumnType;
    loading: boolean;
}

export default TableType