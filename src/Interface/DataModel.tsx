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
    registrationNumber:'',
    vin:'',
    model:'',
    fuelType:'',
    price:'',
    color:'',
    insurance:Insurance
}

export const User={
    userId:'',
    userName:'',
    password:'',
    userInfo:UserInfo,
    car:Car
}
