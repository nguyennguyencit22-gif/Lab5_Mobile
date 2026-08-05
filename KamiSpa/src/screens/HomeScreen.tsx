import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../navigation/types";
import { useCallback, useState } from "react";
import { Service } from "../models/Service";
import { getAllService } from "../services/serviceService";
import { Alert, Pressable, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { COLORS } from "../constants/colors";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import ServiceItem from "./ServiceItem";

type Props = NativeStackScreenProps<RootStackParamlist, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {

    const [services, setServices] = useState<Service[]>([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const loadServices = useCallback(async (showLoading = true) => {
        try {
            if (showLoading) {
                setLoading(true);
            }

            const result = await getAllService();

            setServices(result);
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'Cannot load service';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadServices();
        }, [loadServices]),
    );

    const handleRefresh = () => {
        setRefreshing(true);
        loadServices(false);
    };

    if (loading) {
        return (
            <View>
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary} />
                <Text style={styles.loadingText}>
                    Loading services...
                </Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>
                    KAMI SPA
                </Text>
            </View>
            <View style={styles.headingRow}>
                <Text style={styles.heading}>
                    Danh sách dịch vụ.
                </Text>
                <Pressable
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddService')}>
                    <Text style={styles.addText}>
                        +
                    </Text>
                </Pressable>
            </View>
            <FlatList
                data={services}
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
                    <Text style={styles.emptyText}>
                        No service found.
                    </Text>
                }
                renderItem={({ item }) => (
                    <ServiceItem
                        service={item}
                        onPress={() => navigation.navigate(
                            'ServiceDetail',
                            {
                                serviceId: item._id
                            }
                        )} />
                )
                }
            />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },

    loadingText: {
        marginTop: 12,
        color: COLORS.secondaryText,
    },

    logoContainer: {
        alignItems: 'center',
        paddingVertical: 22,
    },

    logo: {
        color: COLORS.primary,
        fontSize: 27,
        fontWeight: '700',
        fontStyle: 'italic',
    },

    headingRow: {
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },

    heading: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
    },

    addButton: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addText: {
        color: COLORS.white,
        fontSize: 24,
        lineHeight: 27,
    },

    listContent: {
        paddingBottom: 24,
    },

    emptyText: {
        marginTop: 50,
        color: COLORS.secondaryText,
        textAlign: 'center',
    },
});