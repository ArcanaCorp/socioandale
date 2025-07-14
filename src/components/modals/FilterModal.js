import { useState } from "react";
import { toast } from "sonner";
import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { useUI } from "../../context/UIContext";
import { useDB } from "../../context/DBContext";

import { serviceDeleteCategory, serviceNewCategory, serviceUpdateCategory } from "../../services/categories.service";

import './styles/filtermodal.css'

export default function FilterModal () {

    const { toogleModal } = useUI();
    const { categories, getCategories } = useDB();

    const [ newCategory, setNewCategory ] = useState('')

    const [editingId, setEditingId] = useState(null);
    const [editedValue, setEditedValue] = useState('');

    const handleNew = async () => {
        if (!newCategory) return toast.warning('Ingresa un categoria antes de enviar')

        try {
            const data = await serviceNewCategory(newCategory);
            if (!data.ok) return toast.warning(data.message)
                toast.success(data.message)
                toogleModal('');
                getCategories();
        } catch (error) {
            toast.error(error)
        } finally {
            setNewCategory('')
        }
    }

    const handleDelete = async (id) => {
        try {
            const data = await serviceDeleteCategory(id)
            if (!data.ok) return toast.warning(data.message)
                toast.success(data.message)
                getCategories()
        } catch (error) {
            toast.error(error)
        }
    }

    const handleEditToggle = async (id, currentValue) => {
        if (editingId === id) {
            // Guardar nuevo valor
            if (!editedValue.trim()) return toast.warning('La categoría no puede estar vacía');
            if (editedValue.trim() === currentValue.trim()) {
                setEditingId(null);
                setEditedValue('');
                return;
            }
            try {
                const data = await serviceUpdateCategory(id, editedValue.trim())
                if (!data.ok) return toast.warning(data.message)
                    toast.success(data.message)
                    getCategories()
            } catch (error) {
                toast.error(error)
            } finally {
                setEditingId(null);
                setEditedValue('');
            }
        } else {
            // Activar modo edición
            setEditingId(id);
            setEditedValue(currentValue);
        }
    };

    return (

        <>
        
            <div className="__modal_head">
                <h3>Filtros</h3>
                <button className="__btn_close" onClick={() => toogleModal('')}><IconX/></button>
            </div>

            <div className="__modal_body">

                <div className="__filters_create">

                    <h4>Crear nueva categoria</h4>
                    
                    <div className="__form_created">
                        <input type="text" value={newCategory} placeholder="Ingresar nueva categoria" onChange={(e) => setNewCategory(e.target.value)} />
                        <button onClick={handleNew}><IconCheck/></button>
                    </div>

                </div>

                <div className="__filters_edit">

                    <h4>Lista de categorias</h4>

                    {categories?.list.map((c) => (
                        <div className="__filter_edit" key={c.id}>
                            <div className="__filter_edit_group">
                                <input type="text" value={editingId === c.id ? editedValue : c.category} placeholder={c.category} onChange={(e) => setEditedValue(e.target.value)} disabled={editingId !== c.id} onKeyDown={(e) => {if (e.key === 'Enter') handleEditToggle(c.id, c.category);}} />
                                <button onClick={() => handleEditToggle(c.id, c.category)}>{editingId === c.id ? <IconCheck/> : <IconEdit/>}</button>
                            </div>
                            <button onClick={() => handleDelete(c.id)}><IconTrash/></button>
                        </div>
                    ))}

                </div>

            </div>

        </>

    )

}