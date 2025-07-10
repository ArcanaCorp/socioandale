import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useAuth } from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout () {

    const navigate = useNavigate();
    const { contextAuthentication } = useAuth();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuthentication = () => {
            try {
                const token = Cookies.get('andale_socio')
                if (token) {
                    contextAuthentication(token);
                } else {
                    navigate("/login", { replace: true });
                }
                setCheckingAuth(false)
            } catch (error) {
                console.error(error);
            }
        }
        checkAuthentication();
    }, [navigate, contextAuthentication]);

    if (checkingAuth) return <h1>Cargando...</h1>; // Previene render antes de redirigir

    return <Outlet/>

}