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

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import {
    addCustomer,
} from '../services/customerService';

import { COLORS } from '../constants/colors';

type Props =
    NativeStackScreenProps<
        RootStackParamlist,
        'AddCustomer'
    >;

const AddCustomerScreen = ({
    navigation,
}: Props) => {
    const [name, setName] =
        useState('');

    const [phone, setPhone] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const handleAdd = async () => {
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

            await addCustomer(
                name.trim(),
                phone.trim(),
            );

            Alert.alert(
                'Success',
                'Customer added successfully.',
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
                    : 'Cannot add customer.';

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
                placeholder="Input your customer's name"
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
                title="Add"
                loading={loading}
                onPress={handleAdd}
            />
        </View>
    );
};

export default AddCustomerScreen;

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor:
                COLORS.white,
        },
    });