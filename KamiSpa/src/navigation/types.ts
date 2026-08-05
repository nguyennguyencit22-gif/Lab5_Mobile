import { Service } from "../models/Service";

export type BottomTabParamList = {
    HomeTab: undefined;
    Transaction: undefined;
    Customer: undefined;
    Setting: undefined;
};

export type RootStackParamlist = {
    Login: undefined;
    Home: undefined;
    AddService: undefined;

    ServiceDetail: {
        serviceId: string;
    };

    EditService: {
        service: Service;
    };
};