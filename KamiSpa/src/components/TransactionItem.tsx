import { Pressable } from "react-native";
import { Transaction } from "../models/Transaction";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
    transaction: Transaction;
    onPress: () => void;
};

const formatPrice = (value?: number): string => {
    return `${(value ?? 0).toLocaleString('vi-VN')} đ`
};

const formatDate = (date?: string): string => {
    if (!date) {
        return '';
    }

    return new Date(date).toLocaleString('vi-VN');
};

const TransactionItem = ({ transaction, onPress }: Props) => {

    const customerName = transaction.customer?.name ?? '';

    const isCancelled = transaction.status?.toLowerCase() === 'cancalled';

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed
            ]}
        >
            <View style={styles.row}>
                <View style={styles.info}>
                    <View style={styles.header}>
                        <Text style={styles.idText}>
                            {transaction.id ?? transaction._id}
                            {' - '}
                            {formatDate(transaction.createdAt)}
                        </Text>
                        {isCancelled && (
                            <Text style={styles.cancle}>
                                Cancelled
                            </Text>
                        )}
                    </View>
                    {transaction.services
                        ?.slice(0, 3)
                        .map(service => (
                            <Text

                                key={service._id}
                                numberOfLines={1}>
                                - {service.name}
                            </Text>
                        ))
                    }
                    <Text style={styles.customerName}>
                        Customer: {customerName}
                    </Text>
                </View>
                <Text
                    style={styles.price}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    {formatPrice(transaction.price)}
                </Text>
            </View>
        </Pressable >
    );
}

export default TransactionItem;

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#919191',
        borderRadius: 10,
    },
    pressed: {

    },
    header: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 6
    },
    info: {
        flex: 1,
        minWidth: 0,
    },
    idText: {
        fontSize: 14,
        fontWeight: '700',
    }
    ,
    cancle: {
        color: COLORS.danger,
        fontWeight: '100',
    },
    customerName: {
        color: '#b5b5b5',
        fontSize: 14,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        marginLeft: 15,
        maxWidth: 110,
        flexShrink: 1,
        color: '#ad5656',
        fontSize: 16,
        fontWeight: '700'
    }
});