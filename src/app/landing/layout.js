import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { serviceAnalyticsSocials } from "../../services/analytics.service";

export default function SlugLayout () {

    useEffect(() => {
        const analyticSocial = async () => {
            try {
                if (document.referrer) {
                    const domain = new URL(document.referrer).hostname;
                    console.log("Dominio de origen:", domain);
                    await serviceAnalyticsSocials(domain)
                } else {
                    console.log("El usuario llegó directamente o el referrer está vacío.");
                    await serviceAnalyticsSocials('kuyaay.com')
                }
            } catch (error) {
                console.error("Error al extraer referrer:", error.message);
            }
        }

        analyticSocial();
    }, [])

    return (

        <>
        
            <Outlet/>

        </>

    )

}