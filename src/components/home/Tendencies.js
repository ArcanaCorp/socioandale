import { useAuth } from "../../context/AuthContext"

import './styles/tendence.css'

export default function Tendencies () {

    const { user } = useAuth();

    const tendenceLength = user?.tendece || 0;

    return (

        <>
        
            <div className="__section_box">

                <div className="__section_content">

                    {tendenceLength === 0 ? (

                        <>
                            <h3 style={{textAlign: 'center'}}>No hay información aún</h3>
                            <p style={{textAlign: 'center', fontSize: '.8rem'}}>Cuando se mueva tu catálogo tendras más información disponible.</p>
                        </>

                    ) : (

                        <></>
                    
                    )}

                </div>

            </div>

        </>

    )

}