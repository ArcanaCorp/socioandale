import { createContext, useCallback, useContext, useState } from "react";
import { serviceAuth } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";

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

    const contextValue = {
        user,
        setUser,
        contextAuthentication
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)