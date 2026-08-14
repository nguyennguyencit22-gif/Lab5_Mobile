export type Customer = {
    _id: string;
    name: string;
    phone: string;
    loyalty?: string;
    totalSpent?: number;
    createdBy?: string;
    updatedBy?: string;
};