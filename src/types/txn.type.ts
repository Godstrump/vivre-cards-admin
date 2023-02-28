import User from "./user.type"
import Data from "./data-response.type";
import ApiResponse from "./api-response.type";


interface TxnType {
    owner: User;
    txn_acct_name: string;
    txn_acct_number: string;
    txnRefs: string;
    txn_type: string;
    txn_remarks: string;
    txnCurrency: string;
    balance: number;
    txnAmount: number;
    settlementId: string;
    txn_status: string;
    txnRate: number;
    sessionId: string;
    sourceAccountNumber: string;
    sourceAccountName: string;
    sourceBankName: string;
    txnCoin: string;
    merchantAddress: string;
    txnNetwork: string;
    createdAt: string;
    updatedAt: string;
}

export type TxnQueryType = {
    data: Data<TxnType>;
    isFetching: boolean;
    error: ApiResponse<null>;
    refetch: () => void
}

export type TotalTxnDeposit = {
    totalDeposits: number
}

export default TxnType
