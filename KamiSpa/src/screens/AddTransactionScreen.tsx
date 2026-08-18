import React, {
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamlist, } from '../navigation/types';

import type { Customer } from '../models/Customer';

import type { Service } from '../models/Service';

import { getAllCustomers } from '../services/customerService';

import { getAllService } from '../services/serviceService';

import { addTransaction, } from '../services/transactionService';

import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<
    RootStackParamlist,
    'AddTransaction'
>;

type SelectedService = {
    _id: string;
    name: string;
    price: number;

    quantity: number;

    selected: boolean;

    userID: string;
};

type DropdownItem = {
    label: string;
    value: string;
};

const EXECUTOR_OPTIONS: DropdownItem[] = [
    {
        label: 'Executor 1',
        value: 'PUT_REAL_USER_ID_HERE',
    },
];

const AddTransactionScreen = ({
    navigation,
}: Props) => {

    const [
        customers,
        setCustomers,
    ] = useState<Customer[]>([]);

    const [
        services,
        setServices,
    ] = useState<SelectedService[]>([]);

    const [
        customerId,
        setCustomerId,
    ] = useState('');

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        submitting,
        setSubmitting,
    ] = useState(false);

    useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);

                const [
                    customerResult,
                    serviceResult,
                ] = await Promise.all([
                    getAllCustomers(),
                    getAllService(),
                ]);

                setCustomers(
                    customerResult,
                );

                setServices(
                    serviceResult.map(
                        (service: Service) => ({
                            _id: service._id,
                            name: service.name,
                            price: service.price,

                            quantity: 1,

                            selected: false,

                            userID: '',
                        }),
                    ),
                );

            } catch (error) {

                const message =
                    error instanceof Error
                        ? error.message
                        : 'Cannot load data.';

                Alert.alert(
                    'Error',
                    message,
                );

            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, []);

    const customerOptions =
        useMemo<DropdownItem[]>(() => {

            return customers.map(
                customer => ({
                    label:
                        `${customer.name} - ${customer.phone}`,

                    value:
                        customer._id,
                }),
            );

        }, [customers]);

    const toggleService = (
        id: string,
    ) => {

        setServices(current =>
            current.map(service =>
                service._id === id
                    ? {
                        ...service,
                        selected:
                            !service.selected,
                    }
                    : service,
            ),
        );
    };

    const changeQuantity = (
        id: string,
        amount: number,
    ) => {

        setServices(current =>
            current.map(service => {

                if (
                    service._id !== id
                ) {
                    return service;
                }

                const quantity =
                    Math.max(
                        1,
                        service.quantity +
                        amount,
                    );

                return {
                    ...service,
                    quantity,
                };
            }),
        );
    };

    const changeExecutor = (
        serviceId: string,
        userID: string,
    ) => {

        setServices(current =>
            current.map(service =>
                service._id ===
                    serviceId
                    ? {
                        ...service,
                        userID,
                    }
                    : service,
            ),
        );
    };

    const totalPrice = useMemo(() => {

        return services
            .filter(
                service =>
                    service.selected,
            )
            .reduce(
                (
                    total,
                    service,
                ) =>
                    total +
                    service.price *
                    service.quantity,
                0,
            );

    }, [services]);

    const handleAddTransaction =
        async () => {

            if (!customerId) {

                Alert.alert(
                    'Validation',
                    'Please select a customer.',
                );

                return;
            }

            const selectedServices =
                services.filter(
                    service =>
                        service.selected,
                );

            if (
                selectedServices.length === 0
            ) {

                Alert.alert(
                    'Validation',
                    'Please select at least one service.',
                );

                return;
            }

            const missingExecutor =
                selectedServices.some(
                    service =>
                        !service.userID,
                );

            if (missingExecutor) {

                Alert.alert(
                    'Validation',
                    'Please select an executor for each service.',
                );

                return;
            }

            try {
                setSubmitting(true);

                const payload =
                    selectedServices.map(
                        service => ({
                            _id:
                                service._id,

                            quantity:
                                service.quantity,

                            userID:
                                service.userID,
                        }),
                    );

                console.log(
                    'Add transaction payload:',
                    {
                        customerId,
                        services: payload,
                    },
                );

                await addTransaction(
                    customerId,
                    payload,
                );

                Alert.alert(
                    'Success',
                    'Transaction added successfully.',
                    [
                        {
                            text: 'OK',

                            onPress: () =>
                                navigation
                                    .goBack(),
                        },
                    ],
                );

            } catch (error) {

                const message =
                    error instanceof Error
                        ? error.message
                        : 'Cannot add transaction.';

                Alert.alert(
                    'Error',
                    message,
                );

            } finally {
                setSubmitting(false);
            }
        };
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

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={
                styles.content
            }
        >

            <Text style={styles.label}>
                Customer *
            </Text>

            <Dropdown
                style={styles.dropdown}

                placeholderStyle={
                    styles.placeholder
                }

                selectedTextStyle={
                    styles.selectedText
                }

                data={
                    customerOptions
                }

                labelField="label"
                valueField="value"

                placeholder="Select customer"

                value={customerId}

                onChange={item =>
                    setCustomerId(
                        item.value,
                    )
                }
            />


            {services.map(service => (

                <View
                    key={service._id}
                    style={
                        styles.serviceContainer
                    }
                >

                    <BouncyCheckbox
                        isChecked={
                            service.selected
                        }

                        fillColor={
                            COLORS.primary
                        }

                        text={service.name}

                        textStyle={
                            styles.checkboxText
                        }

                        onPress={() =>
                            toggleService(
                                service._id,
                            )
                        }
                    />


                    {service.selected && (

                        <View
                            style={
                                styles.selectedArea
                            }
                        >

                            <View
                                style={
                                    styles.optionRow
                                }
                            >

                                {/* QUANTITY */}

                                <View
                                    style={
                                        styles.quantityBox
                                    }
                                >

                                    <Pressable
                                        style={
                                            styles.quantityButton
                                        }

                                        onPress={() =>
                                            changeQuantity(
                                                service._id,
                                                -1,
                                            )
                                        }
                                    >
                                        <Text>
                                            -
                                        </Text>
                                    </Pressable>

                                    <View
                                        style={
                                            styles.quantityValue
                                        }
                                    >
                                        <Text>
                                            {
                                                service.quantity
                                            }
                                        </Text>
                                    </View>

                                    <Pressable
                                        style={
                                            styles.quantityButton
                                        }

                                        onPress={() =>
                                            changeQuantity(
                                                service._id,
                                                1,
                                            )
                                        }
                                    >
                                        <Text>
                                            +
                                        </Text>
                                    </Pressable>

                                </View>


                                {/* EXECUTOR */}

                                <Dropdown
                                    style={
                                        styles.executorDropdown
                                    }

                                    data={
                                        EXECUTOR_OPTIONS
                                    }

                                    labelField="label"
                                    valueField="value"

                                    placeholder="Executor"

                                    value={
                                        service.userID
                                    }

                                    onChange={item =>
                                        changeExecutor(
                                            service._id,
                                            item.value,
                                        )
                                    }
                                />

                            </View>


                            <Text
                                style={
                                    styles.price
                                }
                            >
                                Price:{' '}
                                {(
                                    service.price *
                                    service.quantity
                                ).toLocaleString(
                                    'vi-VN',
                                )}{' '}
                                đ
                            </Text>

                        </View>

                    )}

                </View>

            ))}


            <Pressable
                style={[
                    styles.summaryButton,

                    submitting &&
                    styles.disabledButton,
                ]}

                disabled={submitting}

                onPress={
                    handleAddTransaction
                }
            >

                {submitting ? (
                    <ActivityIndicator
                        color={
                            COLORS.white
                        }
                    />
                ) : (
                    <Text
                        style={
                            styles.summaryText
                        }
                    >
                        See summary: (
                        {totalPrice.toLocaleString(
                            'vi-VN',
                        )}{' '}
                        đ)
                    </Text>
                )}

            </Pressable>

        </ScrollView>
    );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:
            COLORS.white,
    },

    content: {
        padding: 16,
        paddingBottom: 40,
    },

    center: {
        flex: 1,

        alignItems:
            'center',

        justifyContent:
            'center',

        backgroundColor:
            COLORS.white,
    },

    label: {
        marginBottom: 8,

        color:
            COLORS.text,

        fontSize: 14,

        fontWeight: '600',
    },

    dropdown: {
        height: 52,

        marginBottom: 20,

        paddingHorizontal: 12,

        borderWidth: 1,

        borderColor:
            '#E0E0E0',

        borderRadius: 8,

        backgroundColor:
            COLORS.white,
    },

    placeholder: {
        color: '#999999',
        fontSize: 14,
    },

    selectedText: {
        color:
            COLORS.text,

        fontSize: 14,
    },

    serviceContainer: {
        marginBottom: 18,
    },

    checkboxText: {
        color:
            COLORS.text,

        textDecorationLine:
            'none',
    },

    selectedArea: {
        marginTop: 10,
        marginLeft: 32,
    },

    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    quantityBox: {
        flexDirection: 'row',

        height: 42,

        borderWidth: 1,

        borderColor:
            '#DDDDDD',
    },

    quantityButton: {
        width: 42,

        alignItems:
            'center',

        justifyContent:
            'center',
    },

    quantityValue: {
        width: 42,

        borderLeftWidth: 1,
        borderRightWidth: 1,

        borderColor:
            '#DDDDDD',

        alignItems:
            'center',

        justifyContent:
            'center',
    },

    executorDropdown: {
        flex: 1,

        height: 42,

        marginLeft: 12,

        paddingHorizontal: 10,

        borderWidth: 1,

        borderColor:
            '#DDDDDD',

        borderRadius: 8,
    },

    price: {
        marginTop: 8,

        color:
            COLORS.primary,

        fontWeight: '700',
    },

    summaryButton: {
        height: 50,

        marginTop: 10,

        borderRadius: 7,

        backgroundColor:
            COLORS.primary,

        alignItems: 'center',

        justifyContent:
            'center',
    },

    summaryText: {
        color:
            COLORS.white,

        fontSize: 15,

        fontWeight: '600',
    },

    disabledButton: {
        opacity: 0.6,
    },
});