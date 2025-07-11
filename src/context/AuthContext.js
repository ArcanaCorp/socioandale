import { createContext, useCallback, useContext, useState } from "react";
import { serviceAuth } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)

    const contextAuthentication = useCallback( async (token) => {
        try {
            const data = await serviceAuth(token)
            if (data.ok) {
                const decoded = jwtDecode(data.token)
                if (decoded) {
                    const decodeUser = decoded?.bussines[0]
                    setUser(decodeUser)
                }
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [])

    const contextLogout = () => {
        try {
            Cookies.remove('andale_socio')
            return { ok: true, message: 'Se cerró la sesión con éxito', code: 200 }
        } catch (error) {
            return { ok: false, message: 'Error al cerrar la sesión', error: error, code: 500 }
        }
    }

    const contextValue = {
        user,
        setUser,
        contextLogout,
        contextAuthentication
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)