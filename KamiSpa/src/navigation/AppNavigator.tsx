import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamlist } from './types';

import LoginScreen from '../screens/LoginScreen';
import AddServiceScreen from '../screens/AddServiceScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import EditServiceScreen from '../screens/EditServiceScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';

import MainTabNavigator from './MainTabNavigator';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';

const Stack =
    createNativeStackNavigator<RootStackParamlist>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#EF4B6C',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: '600',
                },
            }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="MainTabs"
                component={MainTabNavigator}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="AddService"
                component={AddServiceScreen}
                options={{
                    title: 'Service',
                }}
            />

            <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetailScreen}
                options={{
                    title: 'Service Detail',
                }}
            />

            <Stack.Screen
                name="EditService"
                component={EditServiceScreen}
                options={{
                    title: 'Service',
                }}
            />

            <Stack.Screen
                name="AddCustomer"
                component={AddCustomerScreen}
                options={{
                    title: 'Add customer',
                }}
            />

            <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{
                    title: 'Transaction detail',
                }}
            />

        </Stack.Navigator>
    );
};

export default AppNavigator;