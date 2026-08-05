import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamlist } from "../navigation/types";
import { useState } from "react";
import { addService } from "../services/serviceService";
import { Alert, Platform, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamlist, 'AddService'>;

const AddServiceScreen = ({ navigation, }: Props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
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
        };

        const numbericPrice = Number(price);

        if (!price.trim()) {

            setPriceError('Price is required.');

            isValid = false;

        } else if (Number.isNaN(numbericPrice) || numbericPrice <= 0) {

            setPriceError('Price must be greater than 0.');

            isValid = false;
        };

        return isValid;
    }

    const handleAdd = async () => {
        if (!validate() || loading) {
            return;
        }

        try {
            setLoading(true);

            await addService({
                name: name.trim(),
                price: Number(price),
            });

            Alert.alert('Success', 'Service added successfully.',
                [
                    {
                        text: 'Ok',
                        onPress: () => navigation.goBack(),
                    }
                ]
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Cannot add Service';

            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={styles.content}
            >
                <CustomInput
                    label="Service name *"
                    value={name}
                    placeholder="Input a service name"
                    error={nameError}
                    onChangeText={setName} />

                <CustomInput
                    label="Price"
                    value={price}
                    placeholder="0"
                    error={priceError}
                    onChangeText={setPrice} />

                <CustomButton
                    title="Add"
                    loading={loading}
                    onPress={handleAdd} />

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default AddServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    content: {
        padding: 16,
    },
});