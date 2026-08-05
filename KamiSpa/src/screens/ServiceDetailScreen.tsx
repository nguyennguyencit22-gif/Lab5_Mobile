import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../navigation/types";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Service } from "../models/Service";
import { deleteService, getServiceById } from "../services/serviceService";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { MenuOption, MenuOptions, MenuTrigger, Menu } from "react-native-popup-menu";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamlist, 'ServiceDetail'>;

const formatPrice = (price: number): string => {
    return `${price.toLocaleString('vi-VN')} đ`;
}

const formatDate = (date?: string): string => {
    if (!date) {
        return 'N/A';
    }

    return new Date(date).toLocaleDateString('vi-VN');
};

const ServiceDetailScreen = ({ navigation, route }: Props) => {

    const { serviceId } = route.params;

    const [service, setService] = useState<Service | null>(null);

    const [loading, setLoading] = useState(true);

    const loadService = useCallback(
        async () => {
            try {
                setLoading(true);

                const result = await getServiceById(serviceId);

                setService(result);

            } catch (error) {
                const message = error instanceof Error ? error.message : 'Cannot load service.';

                Alert.alert('Error', message);
            } finally {
                setLoading(false);
            }
        }, [serviceId]
    );

    useEffect(() => {
        loadService();
    }, [loadService]);

    const handleDelete = useCallback(async () => {
        try {
            await deleteService(serviceId);

            Alert.alert(
                'Success',
                'Service deteled successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.popToTop()
                    }
                ]
            )
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Cannot delete service.'

            Alert.alert('Error', message);
        }
    }, [navigation, serviceId]);

    const confirmDelete = useCallback(() => {
        Alert.alert(
            'Warning',
            'Are you sure you want to remove this service? This operation cannot be returned.',
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

    const handleEdit = useCallback(() => {
        if (!service) {
            return;
        }
        navigation.navigate('EditService', { service });
    }, [navigation, service])

    const renderHeaderMenu = useCallback(
        () => (
            <Menu>
                <MenuTrigger>
                    <Text style={styles.menuTrigger}>
                        ⋮
                    </Text>
                </MenuTrigger>

                <MenuOptions>
                    <MenuOption
                        text="Edit"
                        onSelect={handleEdit}
                    />

                    <MenuOption
                        text="Delete"
                        onSelect={confirmDelete}
                    />
                </MenuOptions>
            </Menu>
        ),
        [handleEdit, confirmDelete],
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: renderHeaderMenu,
        });
    }, [navigation, renderHeaderMenu,]);

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'focus', () => {
                loadService();
            }
        );

        return unsubscribe;
    }, [navigation, loadService]);


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

    if (!service) {
        return (
            <View style={styles.center}>
                <Text>
                    Service not found.
                </Text>
            </View>
        );
    }

    const creator =
        typeof service.createdBy === 'string'
            ? service.createdBy
            : service.createdBy?.name ??
            service.createdBy?._id ??
            'Unknown';


    return (
        <View style={styles.container}>

            <Text style={styles.line}>
                <Text style={styles.label}>
                    Service name:{' '}
                </Text>

                {service.name}
            </Text>

            <Text style={styles.line}>
                <Text style={styles.label}>
                    Price:{' '}
                </Text>

                {formatPrice(service.price)}
            </Text>

            <Text style={styles.line}>
                <Text style={styles.label}>
                    Creator:{' '}
                </Text>

                {creator}
            </Text>

            <Text style={styles.line}>
                <Text style={styles.label}>
                    Time:{' '}
                </Text>

                {formatDate(service.createdAt)}
            </Text>

            <Text style={styles.line}>
                <Text style={styles.label}>
                    Final update:{' '}
                </Text>

                {formatDate(service.updatedAt)}
            </Text>
        </View>
    );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: COLORS.white,
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },

    line: {
        marginBottom: 8,
        color: COLORS.text,
        fontSize: 15,
        lineHeight: 21,
    },

    label: {
        fontWeight: '700',
    },

    menuTrigger: {
        paddingHorizontal: 12,
        color: COLORS.white,
        fontSize: 28,
        fontWeight: '700',
    },
});