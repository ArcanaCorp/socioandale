import { URL_API } from "../config"

export const serviceGetInfo = async (id) => {
    try {
        
        const response = await fetch(`${URL_API}/partners/${id}`)
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
            return data;
    } catch (error) {
        return { ok: false, message: error.message, error: error, code: 500 }
    }
}