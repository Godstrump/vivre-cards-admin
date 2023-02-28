import CardType from "./card.type";
import User from "./user.type"

interface CardTxnType {
    owner: User | string;
    txnId: string
    card_id: CardType | string;
    txnDesc: String;
    amount: {
        amount: number,
        currency: string
    };
    txnType: string;
    createdAt: string;
    updatedAt: string;
    merchant: {
        raw_descriptor: string;
    }
}

export type CardsTotalSpent = {
    totalSpent: number
}

export default CardTxnType;