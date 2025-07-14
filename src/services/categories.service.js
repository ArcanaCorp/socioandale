import { URL_API } from "../config"
import Cookies from "js-cookie";

const token = Cookies.get('andale_socio');

export const serviceListCategories = async () => {

    try {
        
        const response = await fetch(`${URL_API}/categories`, {
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

export const serviceNewCategory = async (category) => {
    try {
        const response = await fetch(`${URL_API}/category/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({category})
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);

            return data;
    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }
}

export const serviceDeleteCategory = async (id) => {
    try {
        const response = await fetch(`${URL_API}/category/${id}`, {
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

export const serviceUpdateCategory = async (id, category) => {
    try {
        const response = await fetch(`${URL_API}/category/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({category})
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {
        return {ok: false, message: error, error: error, code: 500}
    }
}