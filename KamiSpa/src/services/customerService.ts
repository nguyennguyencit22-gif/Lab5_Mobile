import { API_BASE_URL } from '../api/api';
import type { Customer } from '../models/Customer';
import { getToken } from '../storage/authStorage';

export const getAllCustomers =
    async (): Promise<Customer[]> => {
        const response = await fetch(
            `${API_BASE_URL}/customers`,
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ??
                'Cannot load customers.',
            );
        }

        return Array.isArray(data)
            ? data
            : data.customers ?? [];
    };

export const addCustomer = async (
    name: string,
    phone: string,
): Promise<void> => {
    const token = await getToken();

    if (!token) {
        throw new Error(
            'Token not found. Please login again.',
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/customers`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                name,
                phone,
            }),
        },
    );

    const responseText =
        await response.text();

    console.log(
        'Add customer status:',
        response.status,
    );

    console.log(
        'Add customer response:',
        responseText,
    );

    if (!response.ok) {
        throw new Error(
            `Cannot add customer. Status: ${response.status}`,
        );
    }
};

export const getCustomerById = async (id: string): Promise<Customer> => {

    const response = await fetch(`${API_BASE_URL}/customers/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Cannot load customer detail.');
    }
    return data.customer ?? data;
}

export const updateCustomer = async (
    id: string,
    name: string,
    phone: string,
): Promise<void> => {
    const token = await getToken();

    if (!token) {
        throw new Error(
            'Token not found. Please login again.',
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/customers/${id}`,
        {
            method: 'PUT',

            headers: {
                'Content-Type':
                    'application/json',

                Authorization:
                    `Bearer ${token}`,
            },

            body: JSON.stringify({
                name,
                phone,
            }),
        },
    );

    const responseText =
        await response.text();

    console.log(
        'Update customer status:',
        response.status,
    );

    console.log(
        'Update customer response:',
        responseText,
    );

    if (!response.ok) {
        throw new Error(
            `Cannot update customer. Status: ${response.status}`,
        );
    }
};

export const deleteCustomer = async (
    id: string,
): Promise<void> => {
    const token = await getToken();

    if (!token) {
        throw new Error(
            'Token not found. Please login again.',
        );
    }

    const response = await fetch(
        `${API_BASE_URL}/customers/${id}`,
        {
            method: 'DELETE',

            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        },
    );

    const responseText =
        await response.text();

    console.log(
        'Delete customer status:',
        response.status,
    );

    console.log(
        'Delete customer response:',
        responseText,
    );

    if (!response.ok) {
        throw new Error(
            `Cannot delete customer. Status: ${response.status}`,
        );
    }
};