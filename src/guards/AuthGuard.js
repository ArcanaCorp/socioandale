import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function AuthGuard ({ children }) {

    const navigate = useNavigate();
    const { contextAuthentication } = useAuth();
    const [ checkingAuth, setCheckingAuth ] = useState(true);

    const checkAuthentication = useCallback(() => {
        try {
            
            const token = Cookies.get('andale_socio')
            if (token) {
                contextAuthentication(token);
            } else {
                navigate('/login', { replace: true })
            }

            setCheckingAuth(false)

        } catch (error) {
            console.error(error);
        }
    }, [contextAuthentication, navigate])

    useEffect(() => {
        checkAuthentication();
    }, [checkAuthentication])

    if (checkingAuth) return <h1>Cargando...</h1>

    return children;

}