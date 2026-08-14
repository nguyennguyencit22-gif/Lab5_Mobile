export type TransactionCustomer = {
    _id: string;
    name: string;
    phone: string;
    loyalty?: string;
    totalSpent?: number
    status?: string;
}

export type TransactionService = {
    _id: string;
    name: number;
    price: number;
    quantity: number;
}

export type Transaction = {
    _id: string;

    id?: string; // Mã giao dịch

    customer?: TransactionCustomer;

    services: TransactionService[];

    priceBeforePromotion: number;

    price: number; // Tiền cuối cùng thanh toán

    status?: string;

    createdAt?: string;
    updateAt?: string;
}