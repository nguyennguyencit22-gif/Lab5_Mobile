import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamlist } from "./types";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from "../screens/LoginScreen";
import AddServiceScreen from "../screens/AddServiceScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import EditServiceScreen from "../screens/EditServiceScreen";

const Stack = createNativeStackNavigator<RootStackParamlist>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#EF4B6C',
                },
                headerTintColor: '#FFFF',
                headerTitleStyle: {
                    fontWeight: '600'
                }
            }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'HUYỀN TRINH',
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="AddService"
                component={AddServiceScreen}
                options={{
                    title: 'Service',
                }} />
            <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetailScreen}
                options={{
                    title: 'Service Detail',
                }} />

            <Stack.Screen
                name="EditService"
                component={EditServiceScreen}
                options={{
                    title: 'Service',
                }} />

        </Stack.Navigator>
    );
}

export default AppNavigator;