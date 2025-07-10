import Sections from "../../components/home/Sections";
import { useAuth } from "../../context/AuthContext"

import './styles/home.css'

export default function Home () {

    const { user } = useAuth();

    return (

        <>
        
            <header className="__header_home">
                <h1 className="__header_tit_home">
                    <p className="__header_wlc_home">Bienvenido,</p>
                    <p className="__header_nmd_home">{user?.name}</p>
                </h1>
            </header>

            <main className="__main_home">

                <Sections itm={'visitors'} title={'Estadísticas'} />
                <Sections itm={'tendence'} title={'Tendencias'} />

            </main>

        </>

    )

}