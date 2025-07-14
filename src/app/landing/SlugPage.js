import { toast } from "sonner";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { serviceGetInfo } from "../../services/partners.service";
import Header from "../../components/landing/Header";
export default function SlugPage () {

    const { slug } = useParams();
    const [ info, setInfo ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const getInfo = async () => {
            try {
                const data = await serviceGetInfo(slug)
                if (!data.ok) return toast.warning(data.message)
                    setInfo(data.bussines)
            } catch (error) {
                toast.error(error)
            } finally {
                setLoading(false)
            }
        }
        getInfo();
    }, [slug])

    if (loading) return <Loading/>;

    return (

        <>

            <Helmet>
                <meta name="description" content={`${info?.name} | ${info?.text} | ${document.title}`} />
                <meta name="keywords" content={`${info?.name}, ${info?.text}, ${info?.category}, ${info?.sub_category}, ándale, socio, negocios, whatsapp, pedidos, catálogo, tienda online, emprendedores`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://socio.kuyaay.com/${info.short || info?.sub}`} />
                <meta property="og:title" content="Ándale Socio - Tu negocio en línea" />
                <meta property="og:description" content={`${info?.name} - ${info?.text} - ${info?.sub_category} Publica tu catálogo y recibe pedidos directo a tu WhatsApp. Fácil, rápido y gratis.`} />
                <meta property="og:image" content={info?.photo} />
                <meta property="og:site_name" content="Ándale Socio" />
                <meta property="og:locale" content="es_ES" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${info?.name} | ${info?.text} | Ándale Socio - Tu negocio en línea`} />
                <meta name="twitter:description" content={`${info?.name} - ${info?.text} - ${info?.sub_category} Publica tu catálogo y recibe pedidos directo a tu WhatsApp. Fácil, rápido y gratis.`} />
                <meta name="twitter:image" content="https://socio.kuyaay.com/og-image.png" />
                <meta name="twitter:site" content="@andalesocio" />
                <title>{info?.name} | {info?.text} | {document.title}</title>
            </Helmet>
        
            <Header info={info}/>

        </>

    )

}