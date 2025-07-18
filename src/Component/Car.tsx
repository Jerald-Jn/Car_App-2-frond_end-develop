import { useEffect, useState } from "react";
import { getCarImage } from "../Api";

function Car(){

    const [image,setImage]=useState();

    useEffect(()=>{
        getImage();
        console.log("hi")
        
    },[]
    );

    async function getImage(){
        const tempImage=(await getCarImage()).data;
        console.log(tempImage)
        setImage(tempImage);
        return tempImage;
    }

    return (
        <>
        <div>
            <img src={image} alt="car image" />
        </div>
        {/* <div>
            <img src={`data:image/jpeg;base64,${getImage('Glanza')}`} alt="car image" />
        </div>
        <div>
            <img src={`data:image/jpeg;base64,${getImage('Legender')}`} alt="car image" />
        </div>
        <div>
            <img src={`data:image/jpeg;base64,${getImage('Rumion')}`} alt="car image" />
        </div> */}
        </>
    )
}
export default Car;