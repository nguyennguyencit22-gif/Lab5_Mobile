import React from 'react';

import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type {
    Customer,
} from '../models/Customer';

import { COLORS } from '../constants/colors';
import { Icon } from 'react-native-paper';

type Props = {
    customer: Customer;
    onPress: () => void;
};

const CustomerItem = ({
    customer, onPress
}: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && {
                    opacity: 0.7,
                },
            ]}
            onPress={onPress}
        >
            <View style={styles.info}>
                <Text style={styles.text}>
                    Customer: {customer.name}
                </Text>

                <Text style={styles.text}>
                    Phone: {customer.phone}
                </Text>

                <Text style={styles.text}>
                    Total money:{' '}
                    <Text style={styles.money}>
                        {(customer.totalSpent ?? 0)
                            .toLocaleString('vi-VN')} đ
                    </Text>
                </Text>
            </View>

            <View style={styles.loyaltyContainer}>
                <Icon
                    source="crown"
                    size={22}
                    color={COLORS.primary}
                />

                <Text style={styles.loyalty}>
                    {customer.loyalty ?? 'Guest'}
                </Text>
            </View>
        </Pressable>
    );
};

export default CustomerItem;

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        padding: 14,

        borderWidth: 1,
        borderColor: '#E0E0E0',

        borderRadius: 8,

        backgroundColor:
            COLORS.white,

        flexDirection: 'row',
        alignItems: 'center',
    },

    info: {
        flex: 1,
    },

    text: {
        marginBottom: 5,
        fontSize: 14,
        color: COLORS.text,
    },

    money: {
        color: COLORS.primary,
        fontWeight: '700',
    },

    loyaltyContainer: {
        alignItems: 'center',
        marginLeft: 10,
    },
    loyalty: {
        marginTop: 3,
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600',
    },
});