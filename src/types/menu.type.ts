import { TargetedEvent } from "preact/compat";

export interface MenuData {
    label: string;
    action: (e: TargetedEvent<any, Event>, id: unknown) => void
}

interface MenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: (event?: any) => void;
    data: MenuData[]
    id: unknown;
}

export default MenuProps