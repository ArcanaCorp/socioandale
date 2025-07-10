import { useUI } from '../../context/UIContext';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import './styles/productcard.css'

export default function ProductCard ({ image, name }) {

    const { toogleModal } = useUI();

    const productImage = image.find((i) => i.is_main === true);
    
    return (

        <div className="__card">
            <div className='__card_img'>
                <img src={productImage.filename} alt={`${name}`} loading='lazy' />
            </div>
            <div className='__card_txt'>
                <h2>{name}</h2>
                <div className='__card_actions'>
                    <button className='__btn_delete' onClick={() => toogleModal('deleteProduct')}><IconTrash/></button>
                    <button className='__btn_edit'><IconEdit/></button>
                </div>
            </div>
        </div>

    )

}