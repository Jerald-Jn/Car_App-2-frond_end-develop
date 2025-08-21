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

// export const Insurance = {
//     insuranceExpiryDate: '',
//     issueDate: '',
//     typeOfInsurance: ''
// }

// export const Car = {
//     carId: '',
//     make: '',
//     year: '',
//     transmission: '',
//     engineCapacity: '',
//     mileage: '',
//     // registrationNumber:'',
//     vin: '',
//     model: '',
//     fuelType: '',
//     price: '',
//     color: '',
//     carImage: '',
//     carLogo: ''
//     // insurance:Insurance
// }

export const User = {
    userId: '',
    userName: '',
    password: '',
    userInfo: UserInfo,
    // car: Car
}

export interface Cars {
    imageUrl: ""
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
    carLogo: ''
}

export interface  CartData{
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