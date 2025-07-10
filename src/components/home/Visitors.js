import { useAuth } from '../../context/AuthContext'
import './styles/visitors.css'

export default function Visitors () {

    const { user } = useAuth();

    return (

        <div className="__section_box">

            <div className='__section_content'>

                <div className='__wrp'>
                    <h3 className='__wrp_number'>{user?.insights?.visitors || 0}</h3>
                    <p className='__wrp_text'>Total de visitas</p>
                </div>

                <div className='__wrp'>
                    <h3 className='__wrp_number'>{user?.insights?.orders || 0}</h3>
                    <p className='__wrp_text'>Total de pedidos</p>
                </div>

                <div className='__wrp'>
                    <h3 className='__wrp_number'>{user?.insights?.visitors || 0}%</h3>
                    <p className='__wrp_text'>Tasa de conversión</p>
                </div>

                <div className='__wrp'>
                    <h3 className='__wrp_number'>s/{user?.insights?.visitors || 0}.00</h3>
                    <p className='__wrp_text'>Ingreso promedio</p>
                </div>

            </div>

        </div>

    )

}