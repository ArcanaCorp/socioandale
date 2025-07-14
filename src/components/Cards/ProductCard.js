import { useUI } from '../../context/UIContext';
import { useDB } from '../../context/DBContext';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import notFound from '../../images/not-found.png'

import './styles/productcard.css'

export default function ProductCard ({ image, p }) {

    const { toogleModal } = useUI();
    const { choosedProduct } = useDB();

    const productImage = image.find((i) => i.is_main === true);

    const handleDeleteModal = (txt, id) => {
        toogleModal(txt)
        choosedProduct(id)
    }
    
    const handleEditModal = (txt, id) => {
        toogleModal(txt)
        choosedProduct(id)
    }

    return (

        <div className="__card">
            <div className='__card_img'>
                <img src={productImage?.filename || notFound} alt={`${p?.name}`} loading='lazy' />
            </div>
            <div className='__card_txt'>
                <h2>{p?.name}</h2>
                <pre>{p?.text}</pre>
                <p>{`S/.${(p?.price)}`}</p>
            </div>
            <div className='__card_actions'>
                <button className='__btn_delete' onClick={() => handleDeleteModal('deleteProduct', p?.id)}><IconTrash/> Eliminar</button>
                <button className='__btn_edit' onClick={() => handleEditModal('editProduct', p?.id)}><IconEdit/> Editar</button>
            </div>
        </div>

    )

}