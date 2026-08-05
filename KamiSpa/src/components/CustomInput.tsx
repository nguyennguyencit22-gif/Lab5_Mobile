import { Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { COLORS } from "../constants/colors";

type CustomInputProps = {
    label?: string;
    value: string;
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'phone-pad' | 'numeric';
    error?: string;
}

const CustomInput = ({
    label,
    value,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    error
}: CustomInputProps) => {
    return (
        <View>
            {label ? (
                <Text>{label}</Text>
            ) : null}
            <TextInput
                style={[
                    error && styles.errorInput,
                ]}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#9999"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
            />
            {error ? (
                <Text style={styles.error}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
}

export default CustomInput;

const styles = {
    errorInput: {
        color: COLORS.danger
    },
    error: {
        color: COLORS.danger
    }
}