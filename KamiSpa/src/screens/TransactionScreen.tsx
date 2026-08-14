import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/types";
import { useCallback, useState } from "react";
import { Transaction } from "../models/Transaction";
import { getAllTransaction } from "../services/transactionService";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../constants/colors";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import TransactionItem from "../components/TransactionItem";
import { StyleSheet } from "react-native";

type Props = BottomTabScreenProps<BottomTabParamList, 'Transaction'>;

const TransactionScreen = ({ navigation }: Props) => {

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const loadTransactions = useCallback(async () => {
        try {
            const result = await getAllTransaction();

            console.log('Transactions: ', result);

            setTransactions(result);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Cannot load transactions.';

            Alert.alert('Error', message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, [loadTransactions]));

    const handleRefresh = () => {
        setRefreshing(true);
        loadTransactions();
    };

    if (loading) {
        return (
            <View>
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
                data={transactions}

                keyExtractor={item => item._id}

                contentContainerStyle={styles.listContent}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}

                        colors={[COLORS.primary]}

                        onRefresh={handleRefresh}
                    />
                }
                ListEmptyComponent={
                    <Text>
                        No transaction found.
                    </Text>
                }
                renderItem={({ item }) => (
                    <TransactionItem
                        transaction={item}

                        onPress={() =>
                            navigation
                                .getParent()
                                ?.navigate(
                                    'TransactionDetail',
                                    {
                                        transactionId:
                                            item._id,
                                    },
                                )
                        }
                    />
                )}
            />
        </View>
    );
}

export default TransactionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 12
    },
    listContent: {
        paddingBottom: 80
    }
});