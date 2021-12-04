import { ChangeEventHandler, ReactNode } from "react";

export interface ILogin {
    email: string;
    password: string;
}
export interface IIntroduction {
    name: string;
    action: string;
    url?: string;
}

export interface IButtonlink {
    name: string;
    url: string;
    type: 'plus' | 'list-ul'
}

export interface ITable {
    heading: Array<String>;
    data: Array<any>;
    type: 'staff'| 'client' | 'guest' | 'material';
    url?: string;
    noEdit?: boolean;
    onItemClick?: (e:string) => any;
}

export interface IStaff {
    id: number;
    referenceId: string;
    staffId: string;
    surname: string;
    otherName: string;
    email: string;
    joinDate: string;
    contact: string;
    gender: string;
    imageUrl: string;
    bankName: string;
    bankBranch: string;
    accountNumber: string;
    role: string;
}

export interface IClient {
    id: number;
    referenceId: string;
    clientId: string;
    surname: string;
    otherName: string;
    email: string;
    contact: string;
    gender: string;
    imageUrl: string;
    bankName: string;
    bankBranch: string;
    accountNumber: string;
    
}

export interface IGuest {
    id: number;
    referenceId: string;
    guestId: string;
    surname: string;
    otherName: string;
    email: string;
    contact: string;
    country?: string;
    city?: string;
    landmark?: string;
    houseNumber?: string;
    gpAddress?: string;
    dateCreated?: string;
    Orders: Array<IOrder>;
}
export interface ITextField {
    label?: string;
    value?: string;
    placeholder?: string;
    errorMessage?: string;
    type?: 'text' | 'email' | 'tel' | 'number' | 'password';
    onValueChange?: ChangeEventHandler<HTMLInputElement>;
    nextLine?: boolean;
}

export interface ITextArea {
    label: string;
    value: string;
    placeholder: string;
    errorMessage: string;
    onValueChange?: (e: any) => void;
}

export interface IDateField {
    label: string;
    value: string;
    onValueChange?: (e: any) => void;
}

export interface IOptionField {
    label: string;
    value: string;
    item: Array<string>;
    name?: string;
    onValueChange?: React.ChangeEventHandler<HTMLSelectElement>;
    nextLine?: boolean;
}

export interface IButtonField {
    label: string;
    onClick?: () => void;
    isLoading: boolean;
    clearButton?: boolean;
    type?: 'button' | 'reset' | 'submit'
}

export interface IContentWrapper{
    pageName : string;
    action: 'Add' | 'List' | 'Edit' | 'Profile';
    buttonName? : string;
    url?: string;
    buttonIcon?: 'list-ul' | 'plus'
    children: ReactNode;
}

export interface IMarketMaterial {
    id: number;
    referenceId: string;
    marketName: string;
    location: string;
    numberOfEmployees: string;
    marketId: string;
    clientId: string;
    productCount: number;
    balance: number;
    Client: IClient;
}

export interface IProductMaterial {
    id: number;
    referenceId: string;
    materialName: string;
    productId: string;
    marketId: string;
    clientName: string;
    clientId: string;
	price: string;
    Client: IClient;
    category: string;
    tag: string;
    description: string;
    imageUrl: Array<string>
}

export interface IProductAdd {
    id: number;
    clientId: string;
    marketId: string;
    materialName: string;
    manufacturerBrand: string;
    price: string;
    quantity: string;
    category: string;
    tag: string;
    description: string;
}

export interface IOrder {
    id: number;
    referenceId: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: string;
    guestId: string;
    status: string;
}

export interface IOrderSummary {
    id: number;
    referenceId: string;
    orderId: string;
    productId: Array<string>;
    quantity: Array<string>;
    price: Array<string>;
	Guest: IGuest;
    guestId: string;
    status: string;
    city: string;
    gps: string;
    houseNumber: string;
}

export interface IPayment {
    paidAt: string;
    status: string;
    reference: string;
    gateway_response: string;
    channel: string;
    amount: number;
    customer: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
}


export interface IResponse {
    text?: string;
    icon?: string;
    color?: string;
}