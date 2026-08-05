import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = '@kami_login_token';

export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.log('Error saving token:', error);
        throw error;
    }
}

export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.log('Error getting token:', error);
        return null;
    }
}

export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.log('Error removing token:', error);
        throw error;
    }
}

