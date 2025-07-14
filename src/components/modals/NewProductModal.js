import { IconPlus, IconX } from "@tabler/icons-react";
import { useUI } from "../../context/UIContext"

import './styles/newProduct.css'
import { useDB } from "../../context/DBContext";
import { useState } from "react";
import { toast } from "sonner";
import { serviceNewProduct } from "../../services/products.service";

export default function NewProductModal () {

    const { toogleModal } = useUI();
    const { categories, getProducts } = useDB();
    const [images, setImages] = useState([]);
    const [ form, setForm ] = useState({
        name: '',
        text: '',
        category: '',
        amount: '',
        price: ''
    })

    const [ loading, setLoading ] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type.startsWith('image/') && images.length < 5);

        if ((images.length + validFiles.length) > 5) return toast.warning('Solo puedes subir hasta 5 imágenes');

            const previews = validFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file),
                id: crypto.randomUUID() // ID único
            }));

            setImages(prev => [...prev, ...previews]);
    };

    const handleRemoveImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const handleNewProduct = async () => {
        const { name, text, category, amount, price } = form;

        if (!name || !text || !category || !amount || !price) return toast.warning('Completa todos los campos del formulario');
        
            try {
                
                setLoading(true)

                const formData = new FormData();
                formData.append('name', name);
                formData.append('text', text);
                formData.append('category', category);
                formData.append('amount', amount);
                formData.append('price', price);

                // Añadir imágenes si existen
                images.forEach((img) => {
                    formData.append('images', img.file);
                });

                const data = await serviceNewProduct(formData);

                if (!data.ok) return toast.warning(data.message);
                    toast.success(data.message);
                    toogleModal('');

            } catch (error) {
                toast.error(error)
            } finally {
                getProducts()
                setLoading(false)
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
                        <label>Selecciona hasta 5 imágenes de tu producto</label>
                        <input id="images" type="file" multiple style={{display: 'none'}} accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange}/>
                        <div className="__form_flex_images">
                            <label htmlFor="images" className="__charge"><IconPlus/></label>
                            {images.map((img) => (
                                <div key={img.id} className={`__image_preview`} style={{backgroundImage: `url(${img.preview})`}}>
                                    <img src={img.preview} alt="Preview" style={{display: 'none'}} />
                                    <button className="__image_delete" onClick={() => handleRemoveImage(img.id)}><IconX/></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="__form_group_modal">
                        <label>Ingresa el nombre de tu producto o servicio</label>
                        <div className="__form_control_modal">
                            <input type="text" value={form.name} placeholder="Ingresa el nombre de tu producto o servicio" onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} />
                        </div>
                    </div>

                    <div className="__form_group_modal">
                        <label>Ingresa la descripción de tu producto o servicio</label>
                        <div className="__form_control_modal __form_control_modal-area">
                            <textarea type="text" value={form.text} placeholder="Ingresa la descripción de tu producto o servicio" onChange={(e) => setForm(prev => ({ ...prev, text: e.target.value }))} />
                        </div>
                    </div>

                    <div className="__form_group_modal">
                        <label>Selecciona la categoria de tu producto o servicio</label>
                        <div className="__form_control_modal">
                            <select defaultValue={''} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))} >
                                <option value={''} selected hidden>Selecciona la categoria de tu producto o servicio</option>
                                {categories?.list.map((c) => (
                                    <option key={c.id} value={c.category}>{c.category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="__form_group_modal">
                        <label>Ingresa la cantidad de tu producto o servicio</label>
                        <div className="__form_control_modal">
                            <input type="text" value={form.amount} placeholder="Ingresa la cantidad de tu producto o servicio"  onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))} />
                        </div>
                    </div>

                    <div className="__form_group_modal">
                        <label>Ingresa el precio de tu producto o servicio</label>
                        <div className="__form_control_modal">
                            <input type="text" value={form.price} placeholder="Ingresa el precio de tu producto o servicio" onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}  />
                        </div>
                    </div>

                    <div className="__form_group_modal">
                        <button className="__btn" onClick={handleNewProduct}>{loading ? 'Creando...' : 'Crear'}</button>
                    </div>

                </div>

            </div>

        </>

    )

}