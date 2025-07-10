import { useState } from "react"
import { toast } from "sonner";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

import { serviceVerify } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function Verify () {

    const navigate = useNavigate()
    const { contextAuthentication } = useAuth();
    const [ entryCode, setEntryCode ] = useState({
        value: '',
        message: ''
    })
    const [ loading, setLoading ] = useState(false)

    const changeCode = (e) => {
        const { value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // elimina todo lo que no sea número
        const isValidCode = /^\d{6}$/.test(numericValue);
        if (!isValidCode) {
            setEntryCode({value: '', message: 'Ingresa un código válido de 6 dígitos.'});
        } else {
            setEntryCode({value: numericValue, message: ''})
        }
    }

    const handleVerify = async () => {

        const phone = localStorage.getItem('phone')
        if (!phone || !entryCode.value) return toast.warning('Alerta', { description: 'Hubo un error' })

        try {
            
            setLoading(true)
            const data = await serviceVerify(phone, entryCode.value);

            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                if (data.completed) {
                    Cookies.set('andale_socio', data.token, { expires: 365 })
                    contextAuthentication(data.token)
                    navigate('/')
                } else {
                    navigate('/login/complete')
                    localStorage.setItem('step', 'complete')
                }

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setLoading(false)
            setEntryCode({value: '', message: ''})
        }

    }

    return (

        <>
        
            <div className="__login_form">

                <div className="__login_form_group">
                    <label className='__label' htmlFor='entryCode'>Ingresa el código de 6 dígitos</label>
                    <div className="__login_form_control">
                        <input type="tel" inputMode="numeric" pattern="[0-9]*" className="__login_form_entry" id="entryCode" minLength={6} maxLength={6} placeholder="Ingresa el código de 6 dítgitos" disabled={loading} onChange={changeCode} />
                    </div>
                    {entryCode.message !== '' && ( <span className='__login_form_message'>{entryCode.message}</span> )}
                </div>

                <div className="__login_form_group">
                    <button className={`__btn __btn_block __btn_primary __btn_rounded_md ${loading ? '__btn_disabled' : ''}`} disabled={loading} onClick={handleVerify}>{loading ? 'Verificando...' : 'Verificar'}</button>
                </div>

            </div>

        </>

    )

}