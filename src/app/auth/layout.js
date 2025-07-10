import { Toaster } from "sonner";
import { Helmet } from "react-helmet";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import './styles/layout.css'
import { useEffect } from "react";

export default function AuthLayout () {

    const location = useLocation();
    const navigate = useNavigate();

    const routesInfo = {
        '/login': {
            tit: 'Iniciar',
            txt: 'Sesión',
            description: 'Accede ingresando tu número de teléfono que usas para tu negocio.'
        },
        '/login/verify': {
            tit: 'Vamos a',
            txt: 'Verificar',
            description: 'Hemos enviado un código de 6 dígitos al número que ingresaste para verificar tu cuenta.'
        },
        '/login/complete': {
            tit: 'Completa',
            txt: 'Tu información',
            description: 'Completa tu información para que tus clientes puedan reconocerte de manera más rápido.'
        }
    };

    // Devuelve el objeto correspondiente o valores por defecto
    const { tit, txt, description } = routesInfo[location.pathname] || {tit: '', txt: '', description: ''};

    useEffect(() => {
        const redirect = () => {
            const step = localStorage.getItem('step');
            if (step === 'complete') {
                navigate('/login/complete')
            }
        }

        redirect();
    }, [navigate])

    return (

        <>

            <Helmet>
                <title>Únete - {document.title}</title>
            </Helmet>
        
            <header className="__auth_header">
                <h1 className="__tit">
                    <p className="__tit_primary">{tit}</p>
                    <p className="__tit_secondary">{txt}</p>
                </h1>
                <p className="__txt">{description}</p>
            </header>
            <main className="__auth_main">
                <Outlet/>
            </main>

            <Toaster position="top-center" richColors />

        </>

    )

}