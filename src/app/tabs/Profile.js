import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { IconBook, IconCookie, IconDatabase, IconShare3 } from '@tabler/icons-react';

import { useAuth } from '../../context/AuthContext'

import './styles/profile.css'
import EditInfo from '../../components/profile/EditInfo';
import EditPhoto from '../../components/profile/EditPhoto';

export default function Profile () {

    const navigate = useNavigate();
    const { user, contextLogout } = useAuth();

    const handleNativeShare = () => {
        
        const shareData = `Mira mi negocio en *Ándale*\nÉchale un vistazo a mi negocio en *Ándale*\n🚀https://kuyaay.com/${user?.short || user?.sub}`;

        if (navigator.share) {
            navigator.share(shareData)
            .then(() => toast.success('Compartido con éxito'))
            .catch((err) => toast.error('Error al compartir:', err));
        } else {
            toast('La función de compartir no es compatible en este dispositivo.');
        }
    };

    const handleLogout = async () => {
        try {
            
            const data = await contextLogout();
            if (!data.ok) return toast.warning('Alerta', { description: data.message })

                toast.success('Éxito', { description: data.message })
                navigate('/login', { replace: true })

        } catch (error) {
            toast.error('Error', { description: error.message })
        }
    }

    return (

        <>

            <main className='__main_profile'>

                <header className='__header_profile'>
                    <button onClick={handleNativeShare}><IconShare3/></button>
                </header>
            
                <EditPhoto/>

                <EditInfo/>

                <section className='__section_faqs'>
                    <h3>Normas comunitarias y políticas legales</h3>
                    <ul>
                        <li>
                            <IconBook/>
                            <span>Condiciones del servicio</span>
                        </li>
                        <li>
                            <IconDatabase/>
                            <span>Políticas de privacidad</span>
                        </li>
                        <li>
                            <IconCookie/>
                            <span>Políticas de Cookies</span>
                        </li>
                    </ul>
                </section>

                <button className={`__btn __btn_block __btn_primary __btn_rounded_md`} onClick={handleLogout}>Cerrar sesión</button>
                
            </main>

        </>

    )

}