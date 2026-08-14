import React, {
    useCallback,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useFocusEffect,
} from '@react-navigation/native';

import CustomerItem from '../components/CustomerItem';

import type {
    Customer,
} from '../models/Customer';

import {
    getAllCustomers,
} from '../services/customerService';

import { COLORS } from '../constants/colors';

const CustomerScreen = ({
    navigation,
}: {
    navigation: any;
}) => {
    const [
        customers,
        setCustomers,
    ] = useState<Customer[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const loadCustomers =
        useCallback(async () => {
            try {
                const result =
                    await getAllCustomers();

                console.log(
                    'Customers:',
                    result,
                );

                setCustomers(result);
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Cannot load customers.';

                Alert.alert(
                    'Error',
                    message,
                );
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        }, []);

    useFocusEffect(
        useCallback(() => {
            loadCustomers();
        }, [loadCustomers]),
    );

    const handleRefresh = () => {
        setRefreshing(true);
        loadCustomers();
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
        <View style={styles.container}>
            <FlatList
                data={customers}
                keyExtractor={item =>
                    item._id
                }
                contentContainerStyle={
                    styles.listContent
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors={[
                            COLORS.primary,
                        ]}
                        onRefresh={
                            handleRefresh
                        }
                    />
                }
                ListEmptyComponent={
                    <Text
                        style={
                            styles.emptyText
                        }>
                        No customer found.
                    </Text>
                }
                renderItem={({ item }) => (
                    <CustomerItem
                        customer={item}
                    />
                )}
            />

            <Pressable
                style={styles.addButton}
                onPress={() =>
                    navigation
                        .getParent()
                        ?.navigate(
                            'AddCustomer',
                        )
                }>
                <Text
                    style={
                        styles.addText
                    }>
                    +
                </Text>
            </Pressable>
        </View>
    );
};

export default CustomerScreen;

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                COLORS.white,
            padding: 12,
        },

        center: {
            flex: 1,
            justifyContent:
                'center',
            alignItems: 'center',
            backgroundColor:
                COLORS.white,
        },

        listContent: {
            paddingBottom: 90,
        },

        emptyText: {
            marginTop: 50,
            textAlign: 'center',
            color: '#888888',
        },

        addButton: {
            position: 'absolute',

            right: 22,
            bottom: 20,

            width: 55,
            height: 55,

            borderRadius: 28,

            backgroundColor:
                COLORS.primary,

            justifyContent:
                'center',

            alignItems: 'center',
        },

        addText: {
            color: COLORS.white,
            fontSize: 34,
            lineHeight: 38,
        },
    });