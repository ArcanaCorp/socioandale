import { IconEdit } from '@tabler/icons-react'
import { useUI } from '../../context/UIContext'
import { useDB } from '../../context/DBContext';

import './styles/filters.css'

export default function Filters () {

    const { filter, changeFilter, toogleModal } = useUI();
    const { categories } = useDB();

    return (

        <ul className='__filters'>
            <li className='__filter' onClick={() => toogleModal('filters')}>
                <IconEdit/>
            </li>
            <li className={`__filter ${filter === 'all' ? '__filter--active' : ''}`} onClick={() => changeFilter('all')}>
                <span>Todo</span>
            </li>
            {categories?.list.map((c) => (
                <li key={c.id} className={`__filter ${filter === c.category ? '__filter--active' : ''}`} onClick={() => changeFilter(c.category)}>
                    <span>{c.category}</span>
                </li>
            ))}
        </ul>

    )

}