import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { serviceListProducts } from "../services/products.service";
import { serviceListCategories } from "../services/categories.service";

const DBContext = createContext();

export const DBProvider = ({ children }) => {

    const [ categories, setCategories ] = useState({
        list: [],
        length: 0,
        message: ''
    })
    const [ products, setProducts ] = useState({
        list: [],
        length: 0,
        message: ''
    })

    const getCategories = useCallback( async () => {
        try {
            
            const data = await serviceListCategories();
            if (!data.ok) {
                setCategories(prev => ({ ...prev, message: data.message }))
            } else {
                setCategories({ list: data.categories, length: data.length, message: '' })
            }

        } catch (error) {
            console.error(error);
            setCategories(prev => ({ ...prev, message: error.message }))
        }
    }, [])

    const getProducts = useCallback( async () => {
        try {
            const data = await serviceListProducts();
            if (!data.ok) {
                setProducts(prev => ({ ...prev, message: data.message }))
            } else {
                setProducts({ list: data.products, length: data.length, message: '' })
            }

        } catch (error) {
            console.error(error);
            setProducts(prev => ({ ...prev, message: error.message }))
        }
    }, [])

    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
    }, [categories.length, getCategories])

    useEffect(() => {
        if (products.length === 0) {
            getProducts();
        }
    }, [products.length, getProducts])

    const contextValue = {
        categories,
        products
    }

    return (
        <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
    )

}

export const useDB = () => useContext(DBContext)