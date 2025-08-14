export const UserInfo={
    phoneNo:'',
    email:'',
    gender:'',
    pincode:'',
    state:'',
    address:''
} 

export const Insurance={
    insuranceExpiryDate:'',
    issueDate:'',
    typeOfInsurance:''
}

export const Car={
    carId:'',
    make:'',
    year:'',
    transmission:'',
    engineCapacity:'',
    mileage:'',
    // registrationNumber:'',
    vin:'',
    model:'',
    fuelType:'',
    price:'',
    color:'',
    carImage:'',
    carLogo:''
    // insurance:Insurance
}

export const User={
    userId:'',
    userName:'',
    password:'',
    userInfo:UserInfo,
    car:Car
}

export interface Cars{
    carId:'',
    make:'',
    year:'',
    transmission:'',
    engineCapacity:'',
    mileage:'',
    vin:'',
    model:'',
    fuelType:'',
    price:0,
    color:'',
    carImage:'',
    carLogo:''
}

export interface CartData{
    id:'',
    items:Map<String,number>
}

export const Order ={
     id:'',
     first_name:'',
     last_name:'',
     amount:'',
     userInfo:UserInfo,
     transactionId:'',
     latest_charge:'',
     status:'',
     paymentMethod:'',
     clientSecret:''
}