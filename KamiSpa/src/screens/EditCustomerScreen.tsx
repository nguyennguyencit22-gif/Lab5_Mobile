import React, {
    useState,
} from 'react';

import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';

import type {
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type {
    RootStackParamlist,
} from '../navigation/types';

import CustomInput
    from '../components/CustomInput';

import CustomButton
    from '../components/CustomButton';

import {
    updateCustomer,
} from '../services/customerService';

import {
    COLORS,
} from '../constants/colors';

type Props =
    NativeStackScreenProps<
        RootStackParamlist,
        'EditCustomer'
    >;

const EditCustomerScreen = ({
    navigation,
    route,
}: Props) => {

    const { customer } =
        route.params;

    const [name, setName] =
        useState(customer.name);

    const [phone, setPhone] =
        useState(customer.phone);

    const [loading, setLoading] =
        useState(false);

    const handleUpdate =
        async () => {

            if (!name.trim()) {
                Alert.alert(
                    'Validation',
                    'Customer name is required.',
                );

                return;
            }

            if (!phone.trim()) {
                Alert.alert(
                    'Validation',
                    'Phone is required.',
                );

                return;
            }

            try {
                setLoading(true);

                await updateCustomer(
                    customer._id,
                    name.trim(),
                    phone.trim(),
                );

                Alert.alert(
                    'Success',
                    'Customer updated successfully.',
                    [
                        {
                            text: 'OK',
                            onPress: () =>
                                navigation.goBack(),
                        },
                    ],
                );

            } catch (error) {

                const message =
                    error instanceof Error
                        ? error.message
                        : 'Cannot update customer.';

                Alert.alert(
                    'Error',
                    message,
                );

            } finally {
                setLoading(false);
            }
        };

    return (
        <View style={styles.container}>

            <CustomInput
                label="Customer name *"
                value={name}
                placeholder="Input customer name"
                onChangeText={setName}
            />

            <CustomInput
                label="Phone *"
                value={phone}
                placeholder="Input phone number"
                keyboardType="phone-pad"
                onChangeText={setPhone}
            />

            <CustomButton
                title="Update"
                loading={loading}
                onPress={handleUpdate}
            />

        </View>
    );
};

export default EditCustomerScreen;

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,

            backgroundColor:
                COLORS.white,
        },
    });