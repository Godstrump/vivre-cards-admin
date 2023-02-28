import Company from "./company.type";

let company: Company

export type DenyType = {
    userId: string;
    body: Partial<typeof company>;
}

type DenyResponse = {
    hasCompliance: boolean;
    hasComplianceError: boolean;
    hasComplianceApproved: boolean;
    is_activated: boolean;
    account_email: string;
    complianceErrors: typeof company;
}

export default DenyResponse