interface User {
    _id: string;
    first_name?: string;
    last_name?: string;
    account_number?: string;
    account_email: string;
    brexEmail?: string;
    phone_number: string;
    country?: string;
    hasCompliance?: boolean;
    hasComplianceApproved?: boolean;
    hasComplianceError?: boolean;
    complianceErrors?: Object;
    brexId?: string;
    is_activated?: boolean;
    emailVerificationDate?: Date;
    isAccountActive?: string;
    photo: string;
    created_at?: Date;
}

export type TotalUsersType = {
    totalUsers: number;
    totalActiveUsers: number;
}

export default User