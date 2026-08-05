import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../navigation/types";
import { useState } from "react";
import { updateService } from "../services/serviceService";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamlist, 'EditService'>;

const EditServiceScreen = ({
    navigation,
    route,
}: Props) => {
    const { service } = route.params;

    const [name, setName] = useState(service.name);

    const [price, setPrice] = useState(service.price.toString(),);

    const [nameError, setNameError] = useState('');

    const [priceError, setPriceError] = useState('');

    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        let isValid = true;

        setNameError('');
        setPriceError('');

        if (!name.trim()) {
            setNameError('Service name is required.');

            isValid = false;
        }

        const numericPrice = Number(price);

        if (!price.trim()) {
            setPriceError('Price is required.');

            isValid = false;
        } else if (
            Number.isNaN(numericPrice) ||
            numericPrice <= 0
        ) {
            setPriceError(
                'Price must be greater than 0.',
            );

            isValid = false;
        }

        return isValid;
    };

    const handleUpdate = async () => {
        if (!validate() || loading) {
            return;
        }

        try {
            setLoading(true);

            await updateService(
                service._id,
                {
                    name: name.trim(),
                    price: Number(price),
                },
            );

            Alert.alert(
                'Success',
                'Service updated successfully.',
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
                    : 'Cannot update service.';

            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }>
            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                keyboardShouldPersistTaps="handled">
                <CustomInput
                    label="Service name *"
                    value={name}
                    placeholder="Input a service name"
                    error={nameError}
                    onChangeText={setName}
                />

                <CustomInput
                    label="Price *"
                    value={price}
                    placeholder="0"
                    keyboardType="numeric"
                    error={priceError}
                    onChangeText={setPrice}
                />

                <CustomButton
                    title="Update"
                    loading={loading}
                    onPress={handleUpdate}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    content: {
        padding: 16,
    },
});