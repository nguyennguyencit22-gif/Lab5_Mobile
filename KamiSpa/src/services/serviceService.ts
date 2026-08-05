import { API_BASE_URL } from "../api/api";
import { Service } from "../models/Service";
import { getToken } from "../storage/authStorage";

type ServicePayload = {
    name: string;
    price: number;
};

const getAuthHeaders = async () => {
    const token = await getToken();

    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

export const getAllService = async (): Promise<Service[]> => {

    const response = await fetch(`${API_BASE_URL}/services`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Failed to fetch services.');
    };

    return Array.isArray(data) ? data : data.service ?? [];
};

export const getServiceById = async (id: string): Promise<Service> => {

    const response = await fetch(`${API_BASE_URL}/services/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Failed to fetch service by ID.');
    }

    return data.service ?? data;
};

export const addService = async (payload: ServicePayload): Promise<Service> => {

    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/services`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Cannot add service.');
    }

    return data.service ?? data;
};

export const updateService = async (id: string, payload: ServicePayload): Promise<Service> => {

    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/services/${id}`,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify(payload),
        },
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Cannot update service.');
    }

    return data.service ?? data;
}

export const deleteService = async (id: string): Promise<void> => {

    const headers = await getAuthHeaders();

    const response = await fetch(`${API_BASE_URL}/services/${id}`,
        {
            method: 'DELETE',
            headers,
        }
    );

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message ?? 'Cannot delete service.');
    }

}