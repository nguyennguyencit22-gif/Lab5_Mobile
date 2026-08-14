import { API_BASE_URL } from "../api/api";
import { Transaction } from "../models/Transaction";

export const getAllTransaction = async (): Promise<Transaction[]> => {

    const response = await fetch(`${API_BASE_URL}/transactions`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Cannot load transaction.')
    };

    return Array.isArray(data) ? data : data.transaction ?? [];
};

export const getTransactionById = async (id: string): Promise<Transaction> => {

    const response = await fetch(`${API_BASE_URL}/transactions/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Cannot load transaction detail.')
    };

    return data.transaction ?? data;
}