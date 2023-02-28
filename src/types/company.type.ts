import User from "./user.type";

interface Company {
    _id: string,
    owner: User;
    first_name: string;
    last_name: string;
    country: string;
    phone_number: string;
    dob: Date;
    //percentage of stake ownned
    stakeOwned: string;
    //How did you learn about us
    mediaAwareness: string;
    company_name: string;
    company_sector: string;
    //Is business incorporated
    isIncorporated: boolean;
    //is it US Registered
    usRegisted: boolean;
    utilityAmount: number;
    //Business Registration Number
    ein: string;
    businessAddress: string;
    //Proof of address
    addressProof: string;
    documentId: string;
    created_at: string;
}

export default Company
