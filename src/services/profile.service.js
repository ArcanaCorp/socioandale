import { URL_API } from "../config"
import Cookies from 'js-cookie'

const user = Cookies.get('andale_socio')

export const serviceUpdateProfile = async (column, value) => {

    const columnsDB = {
        'name': 'name_bussines',
        'short': 'short_bussines',
        'text': 'text_bussines',
        'location': 'direction_bussines'
    }

    try {

        const row = columnsDB[column] || '';
        const response = await fetch(`${URL_API}/account/edit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({column: row, value})
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;
        
    } catch (error) {
        return { ok: false, message: 'Hubo un error inténtalo más tarde.', error: error, code: 500 }
    }

}

export const serviceUpdatePhotoProfile = async (formData) => {
    try {
        
        const response = await fetch(`${URL_API}/account/photo`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user}`,
            },
            body: formData
        })

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

            return data;

    } catch (error) {
        return {ok: false, message: 'Hubo un error interno en el servidor', error: error, code: 500}
    }
}