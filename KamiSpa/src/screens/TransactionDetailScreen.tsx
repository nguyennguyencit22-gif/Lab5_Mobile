import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../navigation/types";
import { useCallback, useEffect, useState } from "react";
import { Transaction } from "../models/Transaction";
import { getTransactionById } from "../services/transactionService";
import { Alert, StyleSheet } from "react-native";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { COLORS } from "../constants/colors";
import { ScrollView } from "react-native";

type Props = NativeStackScreenProps<RootStackParamlist, 'TransactionDetail'>;

const formatPrice = (value?: number): string => {
    return (
        `${(value ?? 0).toLocaleString('vi-VN')} đ`
    );
}

const formatDate = (date?: string): string => {
    if (!date) {
        return 'N/A';
    }
    return new Date(date).toLocaleString('vi-VN');
};

const TransactionDetailScreen = ({ route }: Props) => {

    const { transactionId } = route.params;

    const [transaction, setTransaction] = useState<Transaction | null>(null);

    const [loading, setLoading] = useState(true);

    const loadTransaction = useCallback(async () => {
        try {
            setLoading(true);

            const result = await getTransactionById(transactionId);

            console.log('Transaction detail', result);

            setTransaction(result);

        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'Cannot load transaction detail.';

            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    }, [transactionId]);

    useEffect(() => {
        loadTransaction();
    }, [loadTransaction])

    if (loading) {
        return (
            <View>
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary} />
            </View>
        )
    }

    if (!transaction) {
        return (
            <View>
                <Text>
                    Transaction not found.
                </Text>
            </View>
        );
    }

    const customer = transaction.customer;

    const amount = transaction.priceBeforePromotion ?? 0;

    const payment = transaction.price ?? 0;

    const discount = payment - amount;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    General information
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>
                        Transaction code
                    </Text>
                    <Text style={styles.value}>
                        {transaction.id ?? transaction._id}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Customer</Text>
                    <Text style={styles.value}>
                        {customer ? `${customer.name} - ${customer.phone}` : 'N/A'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>
                        Creation time
                    </Text>
                    <Text style={styles.value}>
                        {formatDate(transaction.createdAt)}
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Service list
                </Text>

                {transaction.services?.map(service => {

                    const quantity = service.quantity ?? 1;

                    const total = service.price * quantity;

                    return (
                        <View
                            key={service._id}
                            style={styles.serviceRow}>
                            <Text style={styles.serviceName}>
                                {service.name}
                            </Text>

                            <Text style={styles.quantity}>
                                X{quantity}
                            </Text>

                            <Text style={styles.servicePrice}>
                                {formatPrice(total)}
                            </Text>
                        </View>
                    );
                })}

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                        {formatPrice(amount)}
                    </Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Cost</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        Amount of money
                    </Text>
                    <Text style={styles.value}>
                        {formatPrice(amount)}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>
                        Discount
                    </Text>
                    <Text style={styles.value}>
                        {formatPrice(discount)}
                    </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.paymentLabel}>
                        Total payment
                    </Text>
                    <Text style={styles.paymentValue}>
                        {formatPrice(payment)}
                    </Text>
                </View>
            </View>

        </ScrollView>
    )
}

export default TransactionDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    content: {
        padding: 12,
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },

    card: {
        marginBottom: 14,
        padding: 16,

        backgroundColor: COLORS.white,

        borderRadius: 10,
    },

    sectionTitle: {
        marginBottom: 16,

        color: COLORS.primary,

        fontSize: 16,
        fontWeight: '700',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 12,
    },

    label: {
        flex: 1,

        color: '#777777',

        fontSize: 14,
    },

    value: {
        flex: 1.3,

        textAlign: 'right',

        color: COLORS.text,

        fontSize: 14,
        fontWeight: '600',
    },

    serviceRow: {
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: 14,
    },

    serviceName: {
        flex: 1,

        color: COLORS.text,

        fontSize: 14,
    },

    quantity: {
        width: 45,

        textAlign: 'center',

        color: '#999999',

        fontSize: 13,
    },

    servicePrice: {
        width: 110,

        textAlign: 'right',

        color: COLORS.text,

        fontSize: 14,
        fontWeight: '600',
    },

    divider: {
        height: 1,

        marginVertical: 10,

        backgroundColor: '#EEEEEE',
    },

    totalLabel: {
        flex: 1,

        color: '#777777',

        fontWeight: '600',
    },

    totalValue: {
        color: COLORS.text,

        fontWeight: '700',
    },

    paymentLabel: {
        flex: 1,

        color: COLORS.text,

        fontSize: 15,
        fontWeight: '700',
    },

    paymentValue: {
        color: COLORS.primary,

        fontSize: 20,
        fontWeight: '700',
    },
});