import { Customer } from "../models/Customer";
import { Service } from "../models/Service";

export type BottomTabParamList = {
    HomeTab: undefined;
    Transaction: undefined;
    Customer: undefined;
    Setting: undefined;
};

export type RootStackParamlist = {
    Login: undefined;
    MainTabs: undefined;
    Home: undefined;
    AddService: undefined;

    ServiceDetail: {
        serviceId: string;
    };

    EditService: {
        service: Service;
    };

    AddCustomer: undefined;

    TransactionDetail: { transactionId: string };

    CustomerDetail: {
        customerId: string;
    };

    EditCustomer: {
        customer: Customer;
    };

    AddTransaction: undefined;
};