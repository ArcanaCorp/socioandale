import { URL_API } from "../config"
import Cookies from "js-cookie";

const token = Cookies.get('andale_socio');

export const serviceListProducts = async () => {

    try {
        
        const response = await fetch(`${URL_API}/product/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }

}

export const serviceNewProduct = async (formData) => {

    try {
        
        const response = await fetch(`${URL_API}/product/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
            return data;

    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }

}

export const serviceUpdateProduct = async (id, column, value) => {
    try {
        const response = await fetch(`${URL_API}/product/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({column, value})
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);

            return data;
    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }
}

export const serviceDeleteProduct = async (id) => {
    try {
        
        const response = await fetch(`${URL_API}/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }
}

export const serviceDeletePhotoProduct = async (productId, id) => {
    try {
        const response = await fetch(`${URL_API}/product/photo/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);

            return data;
    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }
}