import User from "./user.type";

export type CardDetails = {
        id: string;
        number: string;
        cvv: string;
        expiration_date: {
                month: number;
                year: number;
        }
}

type SpendLimit = {
        amount: number;
        currency: string;
}

type BillingAddress = {
        [x: string]: string;
}

type BrexOwner = {
        id: string;
        type: string;
}

interface CardType {
        owner: User
        card_name: string;
        card_email: string;
        card_type: string
        card_id: string;
        idempotencyKey: string;
        brex_owner: BrexOwner;
        limit_type: string;
        spend_limit: SpendLimit;
        spend_available: SpendLimit;
        spend_duration: string;
        reason: string, //Spend control reason
        card_details: CardDetails,
        billing_address: BillingAddress,
        last_four: string,
        status: string,
        card_locked: boolean
}

export default CardType
