import { IconX } from "@tabler/icons-react";
import { useUI } from "../../context/UIContext";

export default function DeleteProductModal () {

    const { toogleModal } = useUI();

    return (

        <>
        
            <div className="__modal_head">
                <h3>Eliminar producto</h3>
                <button className="__btn_close" onClick={() => toogleModal('')}><IconX/></button>
            </div>

            <div className="__modal_body">
                <p className="__text">¿Estás seguro que deseas eliminar el producto?</p>
                <div className="__actions">
                    <button onClick={() => toogleModal('')}>No, cancelar</button>
                    <button className="__btn_delete">Sí, eliminar</button>
                </div>
            </div>

        </>

    )

}