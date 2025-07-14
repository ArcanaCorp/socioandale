import { IconCheck, IconEdit, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { useUI } from "../../context/UIContext";
import { useDB } from "../../context/DBContext";
import { toast } from "sonner";
import { useState } from "react";

import './styles/newProduct.css'
import { serviceDeletePhotoProduct, serviceUpdateProduct } from "../../services/products.service";

export default function EditProductModal () {

    const { toogleModal } = useUI();
    const { productChoosed, products, getProducts } = useDB();

    const product = products?.list.find((p) => p.id === productChoosed);

    const [editingField, setEditingField] = useState(null);
    const [form, setForm] = useState({ ...product });
    const [images, setImages] = useState(product.images || []);
    //const [newImages, setNewImages] = useState([]);

    const toggleEdit = (field) => {
        if (editingField === field) {
            handleEdit();
        } else {
            setEditingField(field);
        }
    };

    const handleQuestionRemoveImage = (photoId) => {
        toast('¿Estás seguro de eliminar esta imagen?', {
            action: {
                label: 'Sí, eliminar',
                onClick: () => handleRemoveImage(photoId)
            },
            cancel: {
                label: 'Cancelar',
                onClick: () => toast.dismiss()
            }
        })
    }

    const handleRemoveImage = async (photoId) => {
        try {
            const data = await serviceDeletePhotoProduct(productChoosed, photoId)
            if (!data.ok) return toast.warning(data.message)
                setImages(prev => prev.filter((i) => i.id !== photoId));
                toast.success(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    };

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        //setNewImages(prev => [...prev, ...previews]);
    };

    const handleEdit = async () => {
        try {
            toast.loading('Cargando...')
            const value = form[editingField];
            const column = editingField;
            const data = await serviceUpdateProduct(productChoosed, column, value);
            if (!data.ok) return toast.warning(data.message)
                toast.success(data.message)
                getProducts();
        } catch (error) {
            toast.error(error.message)
        } finally {
            toast.dismiss()
            setEditingField(null)
        }
    }

    return (

        <>
        
            <div className="__modal_head">
                <h3>Nuevo Producto</h3>
                <button className="__btn_close" onClick={() => toogleModal('')}><IconX/></button>
            </div>

            <div className="__modal_body">

                <div className="__form_modal">
                    <div className="__form_group_modal">
                    <label>Imágenes</label>
                    <div className="__form_flex_images">
                        <label htmlFor="addImage" className="__charge"><IconPlus /></label>
                        {images.map((img) => (
                            <div key={img.id} className="__image_preview" style={{ backgroundImage: `url(${img.filename})` }}>
                                <button className="__image_delete" onClick={() => handleQuestionRemoveImage(img.id)}><IconTrash /></button>
                            </div>
                        ))}
                        <input type="file" id="addImage" style={{ display: 'none' }} multiple accept="image/*" onChange={handleAddImage} />
                    </div>
                </div>

                {["name", "text", "category", "price", "amount"].map((field) => (
                    <div className="__form_group_modal" key={field}>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <div className="__form_control_modal">
                            <input
                                type="text"
                                className="__entry_edit"
                                value={form[field]}
                                readOnly={editingField !== field}
                                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            />
                            <button className="__btn_edit" onClick={() => toggleEdit(field)}>
                                {editingField === field ? <IconCheck /> : <IconEdit />}
                            </button>
                        </div>
                    </div>
                ))}
                </div>

            </div>

        </>

    )

}