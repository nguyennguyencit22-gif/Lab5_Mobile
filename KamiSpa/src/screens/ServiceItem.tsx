import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Service } from "../models/Service";
import { COLORS } from "../constants/colors";

type ServiceItemProps = {
    service: Service;
    onPress: () => void;
}

const formatPrice = (
    price: number
): string => {
    return `${price.toLocaleString('vi-VN')} đ`;
};

const ServiceItem = ({
    service,
    onPress
}: ServiceItemProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <Text
                style={styles.name}
                numberOfLines={1}>
                {service.name}
            </Text>
            <Text style={styles.price}>
                {formatPrice(service.price)}
            </Text>
        </Pressable>
    );
}

export default ServiceItem;

const styles = StyleSheet.create({
    container: {
        minHeight: 62,
        marginBottom: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
    },

    pressed: {
        opacity: 0.7,
    },

    name: {
        flex: 1,
        marginRight: 10,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '500',
    },

    price: {
        color: COLORS.secondaryText,
        fontSize: 13,
    },
});