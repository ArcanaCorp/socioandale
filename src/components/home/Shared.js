import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconBrandFacebook, IconBrandWhatsapp, IconBrandX, IconCopy } from "@tabler/icons-react";

import './styles/shared.css'

export default function Shared () {

    const { user } = useAuth();

    const handleCopy = () => {
        const url = `https://kuyaay.com/${user?.short || user?.sub}`;
        navigator.clipboard.writeText(url);
        toast.success('Éxito', { description: 'Se copió en el portapapeles' })
    };

    const shareText = encodeURIComponent("Mira mi negocio en Kuyaay 🚀");
    const shareUrl = encodeURIComponent(`https://kuyaay.com/${user?.short || user?.sub}`);

    return (

        <>
        
            <div className="__section_box">

                <div className="__section_content">

                    <h4>Comparte tu página</h4>
                    <div className="__wrp_copy">
                        <input value={`https://kuyaay.com/${user?.short || user?.sub}`} disabled placeholder={`https://kuyaay.com/${user?.sub}`} />
                        <button onClick={handleCopy}><IconCopy/></button>
                    </div>

                    <ul className="__wrp_rrdd">
                        <li>
                            <Link className="__itm_rrdd" to={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer"><IconBrandFacebook/></Link>
                        </li>
                        <li>
                            <Link className="__itm_rrdd" to={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer"><IconBrandWhatsapp/></Link>
                        </li>
                        <li>
                            <Link className="__itm_rrdd" to={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer"><IconBrandX/></Link>
                        </li>
                    </ul>
                
                </div>

            </div>

        </>

    )

}