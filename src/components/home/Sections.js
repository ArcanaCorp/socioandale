import Shared from './Shared'
import './styles/section.css'
import Tendencies from './Tendencies'
import Visitors from './Visitors'

export default function Sections ({ itm, title }) {

    return (

        <section className={`__section __section_${itm}`}>
            <div className='__section_tit'>
                <h3>{title}</h3>
            </div>
            {itm === 'visitors' && ( <Visitors/> )}
            {itm === 'shared' && ( <Shared/> )}
            {itm === 'tendence' && ( <Tendencies/> )}
        </section>

    )

}