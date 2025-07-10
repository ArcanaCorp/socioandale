import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

import { isValidPhone } from '../../utils/validPhone'
import { serviceLogin } from '../../services/auth.service'

import './styles/login.css'

export default function Login () {

    const navigate = useNavigate();
    const [ entryPhone, setEntryPhone ] = useState({
        value: '',
        message: ''
    })
    const [ loading, setLoading ] = useState(false)

    const handleChangePhone = (e) => {
        const { value } = e.target;
        if (!isValidPhone(value)) {
            setEntryPhone({message: '* Ingresa un número válido por favor.'})
        } else {
            setEntryPhone({value: value, message: ''})
        }
    }

    const handleLogin = async () => {
        
        if (!isValidPhone(entryPhone.value) || entryPhone.value === '') return toast.warning('Alerta', { description: 'Ingresa un número válido antes de continuar.' });

        try {
            
            setLoading(true)

            const data = await serviceLogin(entryPhone.value)
            if (!data.ok) return toast.warning('Alerta', { description: data.message })
                
                toast.success('Éxito', {description: data.message})
                localStorage.setItem('phone', entryPhone.value)
                navigate('/login/verify', { state: { phone: entryPhone.value } })

        } catch (error) {
            toast.error('Error', { description: error.message })
        } finally {
            setEntryPhone({value: '', message: ''})
            setLoading(false)
        }

    }

    return (

        <>

            <div className='__login_form'>

                <div className='__login_form_group'>
                    <label className='__label' htmlFor='entryPhone'>Ingresa tu número telefónico</label>
                    <div className='__login_form_control'>
                        <input type='tel' inputMode='numeric' value={entryPhone.value} pattern='[0-9]*' id='entryPhone' className='__login_form_entry' disabled={loading} placeholder='Ingresa tu número telefónico' minLength={9} maxLength={9} autoComplete='off' onChange={handleChangePhone} />
                    </div>
                    {entryPhone.message !== '' && ( <span className='__login_form_message'>{entryPhone.message}</span> )}
                </div>

                <div className='__login_form_group'>
                    <button className={`__btn __btn_block __btn_primary __btn_rounded_md ${loading ? '__btn_disabled' : ''}`} disabled={loading} onClick={handleLogin}>{loading ? 'Continuando...' : 'Continuar'}</button>
                </div>
            
            </div>

            <div className="__login_terms">
                <p>Al <b>continuar</b> estás aceptando nuestros <a href="/">Términos y condiciones</a>, <a href="/">Políticas de privacidad</a> y <a href="/">Políticas de Cookies y Publicidad</a></p>
            </div>

        </>

    )

} 