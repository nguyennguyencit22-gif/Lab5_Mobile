import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../navigation/types";
import { useEffect, useState } from "react";
import { getToken, saveToken } from "../storage/authStorage";
import { login } from "../services/authService";
import { Alert, Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { removeToken, } from '../storage/authStorage';
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamlist, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const clearOldToken = async () => {
            await removeToken();
        };

        clearOldToken();
    }, []);

    useEffect(() => {
        const checkStoredToken = async () => {
            const token = await getToken();

            if (token) {
                navigation.replace('Home');
            }
        };
        checkStoredToken();
    }, [navigation]);

    const validate = (): boolean => {
        let isValid = true;

        setPhoneError('');
        setPasswordError('');

        if (!phone.trim()) {
            setPhoneError('Phone number is required.');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required.');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (!validate() || loading) {
            return;
        }

        try {
            setLoading(true);

            const token = await login(phone.trim(), password);

            saveToken(token);

            navigation.replace('Home');

        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Login failed.';

            Alert.alert('Login Error', message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
            >
                <View style={styles.content}>
                    <Text style={styles.title}>
                        Login
                    </Text>
                    <View style={styles.text}>
                        <CustomInput
                            value={phone}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                            error={phoneError}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.text}>
                        <CustomInput
                            value={password}
                            placeholder="Password"
                            secureTextEntry
                            error={passwordError}
                            onChangeText={setPassword}
                        />
                    </View>

                    <CustomButton
                        title="Login"
                        loading={loading}
                        onPress={handleLogin}
                    />

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    content: {
        paddingHorizontal: 30,
        marginTop: 70,
    },

    title: {
        fontSize: 38,
        fontWeight: '700',
        marginBottom: 45,
        color: COLORS.primary,
        textAlign: 'center'
    },
    text: {
        marginBottom: 10
    },

})