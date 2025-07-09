function Service({showService,setShowService}:{showService:boolean,setShowService:React.Dispatch<React.SetStateAction<boolean>>}){
    return (
        <>
        { showService &&
            (
                <div className="hidden md:block w-32 absolute transform flex-col top-0 md:right-2/3 md:translate-x-11  md:px-4 md:pb-2 bg-white/80" onMouseLeave={()=>{setShowService(false)}}>
                    <div><a href="" className="text-black text-sm font-medium tracking-wide">Service</a></div>
                    <div><a href="" className="text-black text-sm font-medium tracking-wide">Safety Recall</a></div>
                </div>
        
            )
        }
        </>
    );
}
export default Service;