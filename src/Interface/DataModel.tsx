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

export const Car={
    make:"Toyota",
        year:"",
        transmission:"",
        engineCapacity:"",
        mileage:"",
        vin:"",
        model:"",
        fuelType:"",
        price:"",
        color:"",
}

export interface Cars {
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

export const aboutMe = {
    Birthday : '09 June 2001',
    Degree : 'MCA',
    Location : 'Bengaluru'
}

export const skils = [
    'Java / Spring Boot', 'Rest API / JWT', 'React / Tailwind', 'MongoDB / Cloudinary', 'Postman', 'Docker Desktop', 'Stripe'
]

export const technologies = {
    Backend: 'Java, Spring Boot',
    API : 'REST API',
    Authentication: 'JWT',
    Frontend: 'React, Tailwind.CSS',
    Database: 'MongoDB',
    Cloud: 'Cloudinary',
    Payment_Gateway: 'Stripe',
    Deploy: 'Docker, Render'
}