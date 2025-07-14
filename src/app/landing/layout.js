import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet, useParams } from "react-router-dom";
import { serviceAnalyticsSocials } from "../../services/analytics.service";

export default function SlugLayout () {

    const { slug } = useParams();

    useEffect(() => {
        const analyticSocial = async () => {
            try {
                if (document.referrer) {
                    const domain = new URL(document.referrer).hostname;
                    await serviceAnalyticsSocials(slug, domain)
                } else {
                    console.log("El usuario llegó directamente o el referrer está vacío.");
                    await serviceAnalyticsSocials(slug, 'kuyaay.com')
                }
            } catch (error) {
                console.error("Error al extraer referrer:", error.message);
            }
        }

        analyticSocial();
    }, [slug])

    return (

        <>

            <Helmet>
                <title>{slug} | {document.title}</title>
            </Helmet>
        
            <Outlet/>

        </>

    )

}