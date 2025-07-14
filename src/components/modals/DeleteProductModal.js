import { IconX } from "@tabler/icons-react";
import { useUI } from "../../context/UIContext";
import { useDB } from "../../context/DBContext";
import { toast } from "sonner";
import { serviceDeleteProduct } from "../../services/products.service";
import { useState } from "react";

export default function DeleteProductModal () {

    const { toogleModal } = useUI();
    const { products, productChoosed, getProducts } = useDB();

    const [ loading, setLoading ] = useState();

    const findProduct = products?.list.find((p) => p.id === productChoosed);

    const handleDelete = async () => {
        try {
            setLoading(true)
            const data = await serviceDeleteProduct(productChoosed)
            if (!data.ok) return toast.warning(data.message)
                toast.success(data.message)
                toogleModal('')
                getProducts()
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
        
            <div className="__modal_head">
                <h3>Eliminar producto</h3>
                <button className="__btn_close" onClick={() => toogleModal('')}><IconX/></button>
            </div>

            <div className="__modal_body">
                <p className="__text">¿Estás seguro que deseas eliminar el producto <b>{findProduct?.name}</b>?</p>
                <div className="__actions">
                    <button onClick={() => toogleModal('')}>No, cancelar</button>
                    <button className="__btn_delete" onClick={handleDelete}>{loading ? 'Eliminando...' : 'Sí, eliminar'}</button>
                </div>
            </div>

        </>

    )

}