import React from 'react';

import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';

import type {
    BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import type {
    BottomTabParamList,
} from '../navigation/types';

import CustomButton from '../components/CustomButton';

import {
    removeToken,
} from '../storage/authStorage';

import { COLORS } from '../constants/colors';

type Props = BottomTabScreenProps<
    BottomTabParamList,
    'Setting'
>;

const SettingScreen = ({
    navigation,
}: Props) => {

    const handleLogout = async () => {
        try {
            await removeToken();

            navigation
                .getParent()
                ?.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Login',
                        },
                    ],
                });

        } catch (error) {
            Alert.alert(
                'Error',
                'Cannot logout.',
            );
        }
    };

    return (
        <View style={styles.container}>
            <CustomButton
                title="Logout"
                onPress={handleLogout}
            />
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 14,
        backgroundColor: COLORS.white,
    },
});