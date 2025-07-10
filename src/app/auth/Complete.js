import { useState } from "react";
import { bussinesList, typesBuss } from "../../utils/bussinesType";
import { toast } from "sonner";
import { serviceComplete } from "../../services/auth.service";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export default function Complete () {

    const navigate = useNavigate();

    const [ name, setName ] = useState('')
    const [ text, setText ] = useState('')
    const [ type, setType ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ location, setLocation ] = useState('')

    const [ loading, setLoading ] = useState(false)

    const handleSavedInfo = async () => {

        if (!name || !text || !type || !category || !location) return toast.warning('Alerta', { description: 'Por favor completa los campos necesarios' })

            try {
                
                setLoading(true);

                const phone = localStorage.getItem('phone')

                const formData = {phone, name, text, type, category, location}

                const data = await serviceComplete(formData);

                if (!data.ok) return toast.warning('Alerta', { description: data.message })

                    toast.success('Éxito', { description: data.message })
                    Cookies.set('andale_socio', data.token, { expires: 365 })
                    localStorage.removeItem('phone')
                    localStorage.removeItem('step')
                    navigate('/', { replace: true })

            } catch (error) {
                toast.error('Error', { description: error.message })
            } finally {
                setLoading(false)
            }
            
    }

    return (

        <>
        
            <div className="__login_form">

                <div className="__login_form_group">
                    <label className="__label" htmlFor="entryName">Ingresa el nombre de tu negocio</label>
                    <div className="__login_form_control">
                        <input type="text" id="entryName" className="__login_form_entry" minLength={3} placeholder="Ingresa el nombre de tu negocio" onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="__login_form_group">
                    <label className="__label" htmlFor="entryName">Ingresa una descripción de tu negocio</label>
                    <div className="__login_form_control">
                        <input type="text" id="entryName" className="__login_form_entry" minLength={3} placeholder="Ingresa una descripción de tu negocio" onChange={(e) => setText(e.target.value)} />
                    </div>
                </div>
                <div className="__login_form_group">
                    <label className="__label" htmlFor="entryName">Selecciona el tipo de negocio</label>
                    <div className="__login_form_control">
                        <select className="__login_form_entry" defaultValue={''} onChange={(e) => setType(e.target.value)}>
                            <option value={''} selected hidden>Selecciona el tipo de negocio</option>
                            {bussinesList.map((b) => (
                                <option key={b.id} value={b.key}>{b.txt}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="__login_form_group">
                    <label className="__label" htmlFor="entryName">Selecciona la categoria de tu negocio</label>
                    <div className="__login_form_control">
                        <select className="__login_form_entry" defaultValue={''} onChange={(e) => setCategory(e.target.value)}>
                            <option value={''} selected hidden>Selecciona la categoria de tu negocio</option>
                            {type !== '' && typesBuss[type]?.map((c) => (
                                <option key={c.slug}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="__login_form_group">
                    <label className="__label" htmlFor="entryName">Ingresa la dirección de tu negocio</label>
                    <div className="__login_form_control">
                        <input type="text" id="entryName" className="__login_form_entry" minLength={3} placeholder="Ingresa la dirección de tu negocio" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                </div>

                <div className="__login_form_group">
                    <button className={`__btn __btn_block __btn_primary __btn_rounded_md`} onClick={handleSavedInfo}>{loading ? 'Completando...' : 'Completar'}</button>
                </div>

            </div>

        </>

    )

}