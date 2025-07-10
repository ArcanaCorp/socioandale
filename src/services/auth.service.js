import { URL_API } from "../config"

export const serviceLogin = async (phone) => {

    try {
        
        const response = await fetch(`${URL_API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({phone})
        })

        const data = await response.json();

        if (!data.ok) throw new Error(data.message);
        
            return data

    } catch (error) {
        return { ok: false, message: error, error: error, code: 500 }
    }

}

export const serviceVerify = async (phone, code) => {

    try {
        
        const response = await fetch(`${URL_API}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({phone, code})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
       
            return data

    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }

}

export const serviceComplete = async (formData) => {
    try {
        
        const response = await fetch(`${URL_API}/auth/completed`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {
        return {ok: false, message: error.message, error: error, code: 500}        
    }
}

export const serviceAuth = async (token) => {
    try {
        
        const response = await fetch(`${URL_API}/auth/account`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })

        const data = await response.json()

        if (!response.ok) throw new Error(data.message);
        
            return data

    } catch (error) {
        return {ok: false, message: error.message, error: error, code: 500}        
    }
}
