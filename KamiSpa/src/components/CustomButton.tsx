import { Pressable } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { COLORS } from "../constants/colors";
import { StyleSheet } from "react-native";

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
};

const CustomButton = ({
    title, onPress, loading = false, disabled = false,
}: CustomButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}
            disabled={disabled || loading}
            onPress={onPress}
        >
            {loading ? (
                <ActivityIndicator color={COLORS.white} />
            ) : (
                <Text style={styles.buttonText}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 10,
        marginTop: 10,
    },
    pressed: {
        opacity: 0.85,
    },
    disabled: {
        opacity: 0.55,
    },
    buttonText: {
        color: COLORS.background,
        fontWeight: '700',
        fontSize: 20,
    }
})