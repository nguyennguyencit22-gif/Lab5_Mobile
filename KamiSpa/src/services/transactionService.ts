import { API_BASE_URL } from "../api/api";
import { Transaction } from "../models/Transaction";
import { getToken } from "../storage/authStorage";

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

    console.log(
        'Transaction object _id:',
        data._id,
    );

    console.log(
        'Transaction code:',
        data.id,
    );

    if (!response.ok) {
        throw new Error(data.message ?? 'Cannot load transaction detail.')
    };

    return data.transaction ?? data;
}

export type AddTransactionService = {
    _id: string;
    quantity: number;
    userID: string;
};

export const addTransaction = async (
    customerId: string,
    services: AddTransactionService[],
): Promise<void> => {

    const token = await getToken();

    if (!token) {
        throw new Error(
            'Token not found. Please login again.',
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/transactions`,
        {
            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json',

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify({
                customerId,
                services,
            }),
        },
    );

    const responseText =
        await response.text();

    console.log(
        'Add transaction status:',
        response.status,
    );

    console.log(
        'Add transaction response:',
        responseText,
    );

    if (!response.ok) {
        throw new Error(
            `Cannot add transaction. Status: ${response.status}`,
        );
    }
};

export const cancelTransaction = async (
    id: string,
): Promise<void> => {

    const token = await getToken();

    if (!token) {
        throw new Error(
            'Token not found. Please login again.',
        );
    }

    const url =
        `${API_BASE_URL}/transactions/${id}`;

    console.log(
        'DELETE URL:',
        url,
    );

    console.log(
        'DELETE ID:',
        id,
    );

    const response = await fetch(
        url,
        {
            method: 'DELETE',

            headers: {
                'Content-Type':
                    'application/json',

                Authorization:
                    `Bearer ${token}`,
            },
        },
    );

    const responseText =
        await response.text();

    console.log(
        'DELETE status:',
        response.status,
    );

    console.log(
        'DELETE response:',
        responseText,
    );

    if (!response.ok) {
        throw new Error(
            responseText ||
            `Cannot cancel transaction. Status: ${response.status}`,
        );
    }
};