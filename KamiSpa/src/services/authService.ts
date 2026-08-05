import { API_BASE_URL } from "../api/api";

type LoginResponse = {
    token?: string;
    accessToken?: string;
    message?: string;
}

export const login = async (
    phone: string,
    password: string,
): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
    });


    const data: LoginResponse = await response.json();

    if (!response.ok) {
        throw new Error(data.message ?? 'Login failed.');
    }

    const token = data.token ?? data.accessToken;

    if (!token) {
        throw new Error('Login token was not returned by the sever.');
    };

    console.log('Login response:', data);

    return token;

}