import { URL_API } from "../config";
import Cookies from "js-cookie";

const token = Cookies.get('andale_socio')

export const serviceAnalyticsSocials = async (domain) => {
    try {
        
        const response = await fetch(`${URL_API}/analytics/socials`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({domain})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {
        console.error(error);
    }
}