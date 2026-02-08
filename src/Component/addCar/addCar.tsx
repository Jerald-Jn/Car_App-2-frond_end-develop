import { useState, type ChangeEvent, type FormEvent } from "react";
import { addCar_Api } from "../../Api";
import { Car } from "../../Interface/DataModel";

function Add_Car(){
    const [car,setCar]=useState(Car);
    const [car_Image,setCar_Image]=useState('');
    const [car_logo,setCar_logo]=useState('');


    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const temp = event.target.value;
        const name = event.target.name;
        setCar({ ...car, [name]: temp });
    }

     const addCar=(event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append("car",JSON.stringify(car));
        formData.append('car_logo',car_logo);
        formData.append("car_Image",car_Image);
        const response=addCar_Api(formData);
    }
    return (
        <>
            <div className="relative bg-[url('../../camry-banner.jpg')] bg-cover bg-center min-h-screen">
                <form onSubmit={(event)=>addCar(event)} className="md:mx-[30rem] mx-3 my-5 text-center md:my-16 absolute top-0 bg-slate-200/70 rounded-2xl">
                    <h1 className="text-blue-600 font-bold text-3xl text-center my-5">Add Car</h1>
                        <div className="grid grid-flow-row grid-cols-2  gap-5 mt-8 items-center mx-14 md:text-left text-center">
                            <div className="flex flex-col md:ml-10 ">
                            <label htmlFor="model" className="">Model</label>
                            <input type="text" name="model" className="text-center p-0.5 rounded-lg md:w-2/5 bg-white/80" id="model" required value={car.model} 
                            onChange={(event)=>changeHandler(event)} />
                             </div>
                            <div className="flex flex-col md:ml-10">
                            <label className=" ">Price</label>
                            <input type="number" name="price" className="text-center p-0.5 rounded-lg md:w-2/5" min={300000} step={10000} required value={car.price} 
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} />
                           </div>  
                           <div className="flex flex-col md:ml-10">
                            <label className="">Color</label>
                            <input type="color" name="color" className="text-center p-0.5 rounded-lg md:w-14 md:ml-0 ml-8" required value={car.color}
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} />
                            </div> 
                             <div className="flex flex-col md:ml-10">
                            <label className=" " htmlFor="fuelType">FuelType</label>
                            <select id='fuelType' className="text-center p-0.5 rounded-lg  md:w-3/5" name="fuelType" value={car.fuelType} 
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} >
                                <option value=''>Select fuel type</option>
                                <option value="petrol" >Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="charge">Charge</option>
                            </select>
                            </div> 
                             <div className="flex flex-col md:ml-10">
                            <label className=" ">Vin</label>
                            <input type="text" className="text-center p-0.5 rounded-lg  md:w-2/5" name="vin" required value={car.vin } 
                            onChange={(e)=>
                                setCar({...car,[e.target.name]:e.target.value})
                                } />
                            </div>
                            <div className="flex flex-col md:ml-10">
                            <label className=" ">Mileage</label>
                            <input type="number" className="text-center p-0.5 rounded-lg  md:w-2/5" name="mileage" min={18} required value={car.mileage} 
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} />
                            </div>
                            <div className="flex flex-col md:ml-10">
                            <label className=" ">Engine Capacity</label>
                            <input type="number" className="text-center p-0.5 rounded-lg  md:w-2/5" name="engineCapacity" min={24} required value={car.engineCapacity} 
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} />
                            </div>
                            <div className="flex flex-col md:ml-10">
                            <label className=" " htmlFor="transmission">Transmission</label>
                            <select id="transmission" className="text-center p-0.5 rounded-lg md:w-3/5 " name="transmission" value={car.transmission} 
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} >
                                <option value=''>Select Transmission</option>
                                <option value="auto">Auto</option>
                                <option value="manual">Manual</option>
                            </select>
                            </div> 
                            <div className="flex flex-col md:ml-10"> 
                            <label className=" ">Year</label>
                            <input type="number" className="text-center p-0.5 rounded-lg md:w-2/5" required name="year" min={2000} value={car.year} 
                            onChange={(e)=>setCar({...car,[e.target.name]:e.target.value})} />
                            </div>
                             
                            <div className="  flex flex-col md:ml-10">
                            <label className=" ">Car Image</label>
                            <input type="file" className="" required value={car_Image} name="car_Image"
                            onChange={(e)=>setCar_Image(e.target.value)} />
                            </div> 
                             
                            <div className="  flex flex-col md:ml-10">
                            <label htmlFor="car_logo" className="">Car logo</label>
                            <input type="file" id="car_logo" className="" value={car_logo} name="car_logo"
                            onChange={(e)=>setCar_logo(e.target.value)} />
                            </div>
                            
                        </div>
                        <button type="submit" className="bg-blue-500 rounded-md px-3 h-8 my-8 hover:bg-blue-500/50">Add</button>
                </form>
            </div>
        </>
    )
}
export default Add_Car;