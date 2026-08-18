export type CustomerTransactionService = {
    _id: string;
    name: string;
    price: number;
    quantity?: number;
};

export type CustomerTransaction = {
    _id: string;
    id?: string;

    services?: CustomerTransactionService[];

    price?: number;
    priceBeforePromotion?: number;

    status?: string;

    createdAt?: string;
    updatedAt?: string;
};

export type Customer = {
    _id: string;
    name: string;
    phone: string;

    loyalty?: string;
    totalSpent?: number;
    status?: string;

    createdBy?: string;
    updatedBy?: string;

    createdAt?: string;
    updatedAt?: string;

    transactions?: CustomerTransaction[];
};