import { TargetedEvent } from "preact/compat";
import Props from "./props.type";

interface PaginationProps {
    count: number;
    currentPage: number;
    handleChange: (event: TargetedEvent<any, Event>, page: number) => void;
    isLoading: boolean;
    isData: unknown;
    props?: Props;
}

export default PaginationProps