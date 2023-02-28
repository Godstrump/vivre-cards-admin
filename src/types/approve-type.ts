export type ApproveType = {
    userId: string;
    email: string;
}

export type ApproveResponse = {
    hasComplianceApproved: boolean,
    account_number: string;
    account_name: string;
    balance: number;
    brexEmail: string;
}