import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamlist } from './types';

import LoginScreen from '../screens/LoginScreen';
import AddServiceScreen from '../screens/AddServiceScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import EditServiceScreen from '../screens/EditServiceScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';

import MainTabNavigator from './MainTabNavigator';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
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

            <Stack.Screen
                name="CustomerDetail"
                component={CustomerDetailScreen}
                options={{
                    title: 'Customer detail',
                }}
            />

            <Stack.Screen
                name="EditCustomer"
                component={EditCustomerScreen}
                options={{
                    title: 'Edit customer',
                }}
            />

            <Stack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
                options={{
                    title: 'Add transaction',
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;