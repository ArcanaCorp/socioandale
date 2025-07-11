import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function SlugLayout () {

    useEffect(() => {
        const reff = document.referrer;
        console.log(reff);
    }, [])

    return (

        <>
        
            <Outlet/>

        </>

    )

}