import { IconCheck, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { useUI } from "../../context/UIContext";
import { useDB } from "../../context/DBContext";

import './styles/filtermodal.css'

export default function FilterModal () {

    const { toogleModal } = useUI();

    const { categories } = useDB();

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
                        <input type="text" placeholder="Ingresar nueva categoria" />
                        <button><IconCheck/></button>
                    </div>

                </div>

                <div className="__filters_edit">

                    <h4>Lista de categorias</h4>

                    {categories?.list.map((c) => (
                        <div className="__filter_edit" key={c.id}>
                            <div className="__filter_edit_group">
                                <input type="text" placeholder={c.category} />
                                <button><IconEdit/></button>
                            </div>
                            <button><IconTrash/></button>
                        </div>
                    ))}

                </div>

            </div>

        </>

    )

}