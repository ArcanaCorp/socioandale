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