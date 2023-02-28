import { VariantType } from "notistack";

export const DRAWER_WIDTH = 240;

export const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

//Labels to stack user details
export const userLabels = [
    { label: 'First Name', icon: ''},
    { label: 'Last Name', icon: ''},
    { label: 'Phone number', icon: ''},
    { label: 'Email ', icon: ''},
    { label: 'Email Verified', icon: ''},
    { label: 'Email Verification Data', icon: '' },
    { label: 'Brex Email', icon: ''},
    { label: 'Country', icon: ''},
    { label: 'Account Compliance', icon: ''},
    { label: 'Compliance Approved', icon: ''},
    { label: 'Compliance Error', icon: ''},
    { label: 'User Compliance Errors', icon: ''},
    { label: 'Date joined', icon: ''},
]

//Columns to stack columns
export const userColumns = {
    1: 'first_name',
    2: 'last_name',
    3: 'phone_number',
    4: 'account_email',
    5: 'is_activated',
    6: 'emailVerificationDate-date',
    7: 'brexEmail',
    8: 'country',
    9: 'hasCompliance',
    10: 'hasComplianceApproved',
    11: 'hasComplianceError',
    12: 'first_name',
    13: 'created_at_date',
}

export const companyColumns = {
    1: 'first_name',
    2: 'last_name',
    3: 'phone_number',
    4: 'dob',
    5: 'company_name',
    6: 'company_sector',
    7: 'isIncorporated',
    8: 'country',
    9: 'usRegisted',
    10: 'ein',
    11: 'businessAddress',
    12: 'addressProof',
    13: 'documentId',
    14: 'created_at_date',
}


export const companyLabels =[
    { label: 'First Name', icon: ''},
    { label: 'Last Name', icon: ''},
    { label: 'Phone number', icon: ''},
    { label: 'D.O.B ', icon: ''},
    { label: 'Company Name', icon: ''},
    { label: 'Company Sector', icon: '' },
    { label: 'Company Incorporated', icon: ''},
    { label: 'Country', icon: ''},
    { label: 'Registered in US', icon: ''},
    { label: 'Ein', icon: ''},
    { label: 'Business Address', icon: ''},
    { label: 'Address Proof', icon: ''},
    { label: 'Document URL', icon: ''},
    { label: 'Date Approved', icon: ''},
]

//Users Table headers 
export const userTableHeaders = [
    { label: 'S/N', id: 1 },
    { label: 'First name', id: 2 },
    { label: 'Last name', id: 3 },
    { label: 'Email', id: 4 },
    { label: 'Phone number', id: 5 },
    { label: 'Brex Email', id: 6 },
    { label: 'Compliance', id: 7 },
    { label: "Compliance Error", id: 8 },
    { label: "Status", id: 9 },
    { label: "Actions", id: 10 }
]

export const txnHeaders = [
    { label: 'S/N', id: 1 },
    { label: 'Account name', id: 2 },
    { label: 'Account number', id: 3 },
    { label: 'Amount', id: 4 },
    { label: 'Transaction Ref', id: 5 },
    { label: 'Currency', id: 6 },    
    { label: 'Type', id: 6 },
    { label: 'Date', id: 6 },
    { label: "Status", id: 9 },
    { label: "Actions", id: 10 }
]

export const txnDataColumns = {
    0: '_id',
    1: 'txn_acct_name',
    2: 'txn_acct_number',
    3: 'txnAmount',
    4: 'txnRefs',
    5: 'txnCurrency',
    6: 'txn_type',
    7: 'created_at',
    8: 'txn_status',
}

//Users Table Body Data columns
export const userDataColumns = {
    0: '_id',
    1: 'first_name',
    2: 'last_name',
    3: 'account_email',
    4: 'phone_number',
    5: 'brexEmail',
    6: 'hasCompliance',
    7: 'hasComplianceError',
    8: 'hasComplianceApproved',
}


//Cards Table Headers
export const cardsTableHeaders = [
    { label: 'S/N', id: 1 },
    { label: 'Card name', id: 2 },
    { label: 'Card email', id: 3 },
    { label: 'Last four', id: 4 },
    { label: 'Card type', id: 5 },
    { label: 'Limit type', id: 6 },
    { label: 'Spend limit', id: 7 },
    { label: "Spend Available", id: 8 },
    { label: "Status", id: 9 },
    { label: "Actions", id: 10 }
]

//Cards Data Columns
export const cardsDataColumns = {
    0: '_id',
    1: 'card_name',
    2: 'card_email',
    3: 'last_four',
    4: 'card_type',
    5: 'limit_type',
    6: 'spend_limit/amount',
    7: 'spend_available/amount',
    8: 'status',
}

export const cardTxnsDataColumn = {
    0: '_id',
    1: 'txnType',
    2: 'txnDesc',
    3: 'amount/amount',
    4: 'merchant/raw_descriptor',
    5: 'created_at'
}

export const cardTxnHeader = [
    { label: 'S/N', id: 1 },
    { label: 'Transaction Type', id: 2 },
    { label: 'Transaction Desc', id: 3 },
    { label: 'Amount', id: 4 },
    { label: 'Merchant', id: 5 },
    { label: 'Date', id: 6 },
]

export const LOG_STATE = {
    msg: '',
    location: '',
    variant: 'error' as Partial<VariantType>
}

export const AUTH_TOKEN = "VendgramAuthToken"
export const ADMIN_INFO = "VendgramAdminInfo"
export const PAGE_SIZE = 15
