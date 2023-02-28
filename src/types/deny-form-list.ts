import { TargetedEvent } from "preact/compat";
import Company from "./company.type";

let company: Company;

export type DenyModalOptions = Record<'value' | 'label', string>

type DenyFormList = {
    id: number;
    name?: keyof typeof company;
    handleSelect?: (e: any, idx: number) => void;
    handleInput?: (e: any, item: DenyFormList, idx: number) => void;
    handleDelete?: (item: DenyFormList, idx: number) => void;
    handleDisabled?: (item: DenyFormList) => void;
    inputValue?: typeof company;
    selectedValue?: Array<DenyModalOptions>;
}

export default DenyFormList;