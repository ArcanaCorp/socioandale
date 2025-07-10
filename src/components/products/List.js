import { useDB } from "../../context/DBContext"
import ProductCard from "../Cards/ProductCard";

export default function List () {

    const { products } = useDB();

    return (

        <div className="__grd_list">
        
            {products?.list.map((p) => (
                <ProductCard key={p.id} image={p.images} name={p.name} />
            ))}
        
        </div>

    )

}