import { IconCirclePlus } from '@tabler/icons-react'
import Filters from '../../components/products/Filters'
import List from '../../components/products/List'
import './styles/products.css'
import { useUI } from '../../context/UIContext'

export default function Products () {

    const { toogleModal } = useUI();

    return (

        <>
        
            <header className="__header_products" style={{justifyContent: 'space-between', padding: '0 1rem'}}>
                <h3>Tus productos</h3>
                <button onClick={() => toogleModal('newProduct')} style={{display: 'grid', width: 30, height: 30, background: 'none', placeItems: 'center'}}><IconCirclePlus/></button>
            </header>

            <main className='__main_products'>

                <Filters/>
                
                <List/>

            </main>

        </>

    )

}