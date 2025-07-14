import { IconPencil, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { serviceUpdateProfile } from "../../services/profile.service";
import { toast } from "sonner";

export default function EditInfo() {

    const { user, contextAuthentication } = useAuth();

    const [form, setForm] = useState({
        name: user?.name || "",
        short: user?.short || user?.sub || "",
        text: user?.text || "",
        location: user?.location || ""
    });

    const [editState, setEditState] = useState({
        name: false,
        short: false,
        text: false,
        location: false
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const toggleEdit = async (field) => {
        const isEditing = editState[field];
        if (isEditing) {
            const data = await serviceUpdateProfile(field, form[field]);
            if (!data.ok) return toast.warning(data.message)
                toast.success(data.message)
                contextAuthentication(data.token)
        }
        setEditState(prev => ({ ...prev, [field]: !isEditing }));
    };

    const renderField = (label, field, value, placeholder = '') => (
        <div className='__form_new'>
            <label htmlFor={field}>{label}</label>
            <div className='__form_new_group'>
                <input
                    type='text'
                    id={field}
                    value={form[field]}
                    readOnly={!editState[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={placeholder}
                />
                <button onClick={() => toggleEdit(field)} type="button">
                    {editState[field] ? <IconCheck /> : <IconPencil />}
                </button>
            </div>
        </div>
    );

    return (
        <section className='__section_info'>
            <h3>Información</h3>
            {renderField('Ingresa tu nuevo nombre', 'name', form.name, user?.name)}
            {renderField('Ingresa tu nuevo URL', 'short', form.short, user?.short)}
            {renderField('Ingresa tu nueva descripción', 'text', form.text, user?.text)}
            {renderField('Ingresa tu nueva dirección', 'location', form.location, user?.location)}
        </section>
    );
}
