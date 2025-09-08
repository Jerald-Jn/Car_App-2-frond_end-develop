export const UserInfo = {
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    pincode: '',
    city: '',
    state: '',
    address: ''
}

export const User = {
    userId: '',
    userName: '',
    password: '',
    userInfo: UserInfo,
}

export interface Cars {
    // imageUrl: ""
    carId: '',
    make: '',
    year: '',
    transmission: '',
    engineCapacity: '',
    mileage: '',
    vin: '',
    model: '',
    fuelType: '',
    price: 0,
    color: '',
    carImage: '',
    carLogo: '',
    images: any
}

export interface CartData {
    items: {
        [key: string]: {
            model: '',
            imageUrl: '',
            price: 0,
            quantity: 0
        }
    };
}


export const PaymentDetails = {
    transcationId: '',
    amount: 0,
    userInfo: UserInfo,
    latest_charge: '',
    status: '',
    paymentMethod: ''
}

export const PaymentRequest = {
    amount: 0,
    userInfo: UserInfo,
}

export const Payment_Resp = {
    id: '',
    paymentDetails: PaymentDetails,
}