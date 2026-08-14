import React from 'react';
import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import CustomerScreen from '../screens/CustomerScreen';
import SettingScreen from '../screens/SettingScreen';

import {
    BottomTabParamList,
} from './types';

import { COLORS } from '../constants/colors';

const Tab =
    createBottomTabNavigator<BottomTabParamList>();

type IconProps = {
    color: string;
    size: number;
};

const HomeIcon = ({
    color,
    size,
}: IconProps) => {
    return (
        <Icon
            source="home"
            size={size}
            color={color}
        />
    );
};

const TransactionIcon = ({
    color,
    size,
}: IconProps) => {
    return (
        <Icon
            source="cash"
            size={size}
            color={color}
        />
    );
};

const CustomerIcon = ({
    color,
    size,
}: IconProps) => {
    return (
        <Icon
            source="account-multiple"
            size={size}
            color={color}
        />
    );
};

const SettingIcon = ({
    color,
    size,
}: IconProps) => {
    return (
        <Icon
            source="cog"
            size={size}
            color={color}
        />
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: true,

                headerStyle: {
                    backgroundColor: COLORS.primary,
                },

                headerTintColor: '#FFFFFF',

                headerTitleStyle: {
                    fontWeight: '600',
                },

                tabBarActiveTintColor:
                    COLORS.primary,

                tabBarInactiveTintColor:
                    '#888888',

                tabBarStyle: {
                    height: 62,
                    paddingTop: 5,
                    backgroundColor:
                        '#FFFFFF',
                },

                tabBarLabelStyle: {
                    fontSize: 10,
                    marginBottom: 4,
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    title: 'HUYỀN TRINH',
                    tabBarLabel: 'Home',
                    tabBarIcon: HomeIcon,
                }}
            />

            <Tab.Screen
                name="Transaction"
                component={TransactionScreen}
                options={{
                    title: 'Transaction',
                    tabBarLabel: 'Transaction',
                    tabBarIcon:
                        TransactionIcon,
                }}
            />

            <Tab.Screen
                name="Customer"
                component={CustomerScreen}
                options={{
                    title: 'Customer',
                    tabBarLabel: 'Customer',
                    tabBarIcon:
                        CustomerIcon,
                }}
            />

            <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                    title: 'Setting',
                    tabBarLabel: 'Setting',
                    tabBarIcon:
                        SettingIcon,
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;