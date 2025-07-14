import { Toaster } from "sonner";
import { Link, Outlet, useLocation } from "react-router-dom"
import { IconListDetails, IconShoppingBag, IconSmartHome, IconUserCircle } from "@tabler/icons-react";

import { useUI } from "../../context/UIContext";

import FilterModal from "../../components/modals/FilterModal";
import NewProductModal from "../../components/modals/NewProductModal";
import DeleteProductModal from "../../components/modals/DeleteProductModal";

import './styles/layout.css'
import EditProductModal from "../../components/modals/EditProductModal";

export default function TabLayout () {

    const location = useLocation();

    const { viewModal } = useUI();

    return (

        <>
        
            <div className="__container_tab">
                <Outlet/>
            </div>

            <nav className="__tabs">
                <ul className="__tabs_items">
                    <li className="__tab_item">
                        <Link to={'/'} viewTransition className={`__tab_a ${location.pathname === '/' ? '__tab_a--active' : ''}`}>
                            <span className="__tab_icon"><IconSmartHome/></span>
                            <span className="__tab_text">Inicio</span>
                        </Link>
                    </li>
                    <li className="__tab_item">
                        <Link to={'/products'} viewTransition className={`__tab_a ${location.pathname === '/products' ? '__tab_a--active' : ''}`}>
                            <span className="__tab_icon"><IconListDetails/></span>
                            <span className="__tab_text">Productos</span>
                        </Link>
                    </li>
                    <li className="__tab_item">
                        <Link to={'/orders'} viewTransition className={`__tab_a ${location.pathname === '/orders' ? '__tab_a--active' : ''}`}>
                            <span className="__tab_icon"><IconShoppingBag/></span>
                            <span className="__tab_text">Pedidos</span>
                        </Link>
                    </li>
                    <li className="__tab_item">
                        <Link to={'/profile'} viewTransition className={`__tab_a ${location.pathname === '/profile' ? '__tab_a--active' : ''}`}>
                            <span className="__tab_icon"><IconUserCircle/></span>
                            <span className="__tab_text">Perfil</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={`__overlay ${viewModal.view ? '__overlay--active' : ''}`}>

                <div className={`__modal`}>

                    {viewModal.type === 'filters' && ( <FilterModal/> )}
                    {viewModal.type === 'deleteProduct' && ( <DeleteProductModal/> ) }
                    {viewModal.type === 'newProduct' && ( <NewProductModal/> )}
                    {viewModal.type === 'editProduct' && ( <EditProductModal/> )}
                    
                </div>

            </div>

            <Toaster position="top-center" richColors />

        </>

    )

}