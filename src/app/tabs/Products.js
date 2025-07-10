import Filters from '../../components/products/Filters'
import List from '../../components/products/List'
import './styles/products.css'

export default function Products () {

    return (

        <>
        
            <header className="__header_products">
                <h3>Tus productos</h3>
            </header>

            <main className='__main_products'>

                <Filters/>
                
                <List/>

            </main>

        </>

    )

}