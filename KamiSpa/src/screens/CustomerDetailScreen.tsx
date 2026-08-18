import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';

import type {
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type {
    RootStackParamlist,
} from '../navigation/types';

import type {
    Customer,
} from '../models/Customer';

import {
    deleteCustomer,
    getCustomerById,
} from '../services/customerService';

import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<
    RootStackParamlist,
    'CustomerDetail'
>;

const formatPrice = (
    value?: number,
): string => {
    return `${(value ?? 0)
        .toLocaleString('vi-VN')} đ`;
};

const formatDate = (
    value?: string,
): string => {
    if (!value) {
        return 'N/A';
    }

    return new Date(value)
        .toLocaleString('vi-VN');
};



const CustomerDetailScreen = ({
    navigation,
    route,
}: Props) => {

    const { customerId } =
        route.params;

    const [
        customer,
        setCustomer,
    ] = useState<Customer | null>(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const loadCustomer =
        useCallback(async () => {
            try {
                setLoading(true);

                const result =
                    await getCustomerById(
                        customerId,
                    );

                setCustomer(result);

            } catch (error) {

                const message =
                    error instanceof Error
                        ? error.message
                        : 'Cannot load customer.';

                Alert.alert(
                    'Error',
                    message,
                );

            } finally {
                setLoading(false);
            }
        }, [customerId]);

    useEffect(() => {
        loadCustomer();
    }, [loadCustomer]);

    const handleEdit =
        useCallback(() => {

            if (!customer) {
                return;
            }

            navigation.navigate(
                'EditCustomer',
                {
                    customer,
                },
            );

        }, [
            navigation,
            customer,
        ]);

         const handleDelete =
        useCallback(async () => {

            try {
                await deleteCustomer(
                    customerId,
                );

                Alert.alert(
                    'Success',
                    'Customer deleted successfully.',
                    [
                        {
                            text: 'OK',
                            onPress: () =>
                                navigation.popToTop(),
                        },
                    ],
                );

            } catch (error) {

                const message =
                    error instanceof Error
                        ? error.message
                        : 'Cannot delete customer.';

                Alert.alert(
                    'Error',
                    message,
                );
            }

        }, [
            customerId,
            navigation,
        ]);

    const confirmDelete =
        useCallback(() => {

            Alert.alert(
                'Alert',
                'Are you sure you want to remove this client? This will not be possible to return',
                [
                    {
                        text: 'CANCEL',
                        style: 'cancel',
                    },
                    {
                        text: 'DELETE',
                        style: 'destructive',
                        onPress: handleDelete,
                    },
                ],
            );

        }, [handleDelete]);


    const renderMenu =
        useCallback(() => (
            <Menu>
                <MenuTrigger>
                    <Text
                        style={
                            styles.menuTrigger
                        }>
                        ⋮
                    </Text>
                </MenuTrigger>

                <MenuOptions>
                    <MenuOption
                        text="Edit"
                        onSelect={
                            handleEdit
                        }
                    />

                    <MenuOption
                        text="Delete"
                        onSelect={confirmDelete}
                    />
                </MenuOptions>
            </Menu>
        ), [handleEdit, confirmDelete,]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: renderMenu,
        });
    }, [
        navigation,
        renderMenu,
    ]);

    useEffect(() => {
        const unsubscribe =
            navigation.addListener(
                'focus',
                loadCustomer,
            );

        return unsubscribe;

    }, [
        navigation,
        loadCustomer,
    ]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                />
            </View>
        );
    }

    if (!customer) {
        return (
            <View style={styles.center}>
                <Text>
                    Customer not found.
                </Text>
            </View>
        );
    }

   
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={
                styles.content
            }
        >

            <View style={styles.card}>
                <Text
                    style={
                        styles.sectionTitle
                    }>
                    General information
                </Text>

                <Text style={styles.info}>
                    Name:{' '}
                    <Text style={styles.bold}>
                        {customer.name}
                    </Text>
                </Text>

                <Text style={styles.info}>
                    Phone:{' '}
                    <Text style={styles.bold}>
                        {customer.phone}
                    </Text>
                </Text>

                <Text style={styles.info}>
                    Total spent:{' '}
                    <Text
                        style={
                            styles.money
                        }>
                        {formatPrice(
                            customer.totalSpent,
                        )}
                    </Text>
                </Text>

                <Text style={styles.info}>
                    Time:{' '}
                    {formatDate(
                        customer.createdAt,
                    )}
                </Text>

                <Text style={styles.info}>
                    Last update:{' '}
                    {formatDate(
                        customer.updatedAt,
                    )}
                </Text>
            </View>

            <View style={styles.card}>
                <Text
                    style={
                        styles.sectionTitle
                    }>
                    Transaction history
                </Text>

                {customer.transactions?.length
                    ? customer.transactions.map(
                        transaction => (
                            <View
                                key={
                                    transaction._id
                                }
                                style={
                                    styles.transactionCard
                                }
                            >
                                <Text
                                    style={
                                        styles.transactionCode
                                    }>
                                    {transaction.id ??
                                        transaction._id}
                                </Text>

                                {transaction.services
                                    ?.slice(0, 3)
                                    .map(service => (
                                        <Text
                                            key={
                                                service._id
                                            }
                                            style={
                                                styles.service
                                            }
                                            numberOfLines={
                                                1
                                            }
                                        >
                                            - {service.name}
                                        </Text>
                                    ))}

                                <Text
                                    style={
                                        styles.transactionPrice
                                    }>
                                    {formatPrice(
                                        transaction.price,
                                    )}
                                </Text>
                            </View>
                        ),
                    )
                    : (
                        <Text style={styles.empty}>
                            No transaction history.
                        </Text>
                    )}
            </View>

        </ScrollView>
    );
};

export default CustomerDetailScreen;

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
        padding: 14,

        backgroundColor:
            COLORS.white,

        borderRadius: 10,
    },

    sectionTitle: {
        marginBottom: 12,

        color: COLORS.primary,

        fontSize: 16,
        fontWeight: '700',
    },

    info: {
        marginBottom: 7,
        color: COLORS.text,
    },

    bold: {
        fontWeight: '600',
    },

    money: {
        color: COLORS.primary,
        fontWeight: '700',
    },

    transactionCard: {
        position: 'relative',

        marginBottom: 12,
        padding: 12,

        borderWidth: 1,
        borderColor: '#E0E0E0',

        borderRadius: 8,
    },

    transactionCode: {
        marginBottom: 5,

        fontWeight: '700',

        color: COLORS.text,
    },

    service: {
        marginBottom: 3,

        color: COLORS.text,
    },

    transactionPrice: {
        marginTop: 6,

        textAlign: 'right',

        color: COLORS.primary,

        fontWeight: '700',
    },

    empty: {
        color: '#888888',
    },

    menuTrigger: {
        paddingHorizontal: 12,

        color: COLORS.white,

        fontSize: 28,
        fontWeight: '700',
    },
});