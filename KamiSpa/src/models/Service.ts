export type Service = {
    _id: string;
    name: string;
    price: number;
    createdBy: {
        _id?: string;
        name?: string;
    } | string;
    createdAt?: string;
    updatedAt?: string;
}