export type MetaComplianceBody =  Record<'registrationNumber', string>

export interface MetaCompliance {
    name: string;
    position: string;
    status: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    city: string;
    address: string;
    idType: string;
    idNumber: string;
    shares: string;
    accreditationNumber: string;
}

interface ComplianceType {
    data: Array<MetaCompliance>
}

export default ComplianceType;