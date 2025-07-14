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
                <title>{info?.name} | {info?.text} | {document.title}</title>
            </Helmet>
        
            <Header info={info}/>

        </>

    )

}