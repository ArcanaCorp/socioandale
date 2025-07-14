import { IconBrandFacebook, IconBrandTiktok, IconMapPin, IconShare3 } from "@tabler/icons-react";
import './styles/header.css'
import { useSlug } from "../../context/SlugContext";
import { toast } from "sonner";

export default function Header ({ info }) {

    const { badge, handleChangeBadges } = useSlug();

    const iconSocials = {
        'fb': <IconBrandFacebook/>,
        'tk': <IconBrandTiktok/>
    }

    const handleNativeShare = () => {
        const text = `Mira mi negocio en *Ándale* 🚀\nÉchale un vistazo:\nhttps://socio.kuyaay.com/${info?.short || info?.sub}`;

        if (navigator.share) {
            navigator.share({
                title: 'Mi negocio en Ándale',
                text,
                url: `https://socio.kuyaay.com/${info?.short || info?.sub}`
            })
            .then(() => toast.success('Compartido con éxito'))
            .catch((err) => toast.error('Error al compartir'));
        } else {
            // Fallback a WhatsApp
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (

        <>
        
            <section className={`__section_header`}>
                <button className="__btn_share" onClick={handleNativeShare}><IconShare3/></button>
                <figure className={`__avatar`} style={{backgroundImage: `url(${info?.photo})`}}>
                    <img src={info?.photo} alt={`${info?.name} | ${info?.text} | ${document.title}`} loading="lazy" style={{display: 'none'}} />
                </figure>
                <div className='__info'>
                    <h2 className="__name">{info?.name}</h2>
                    <p className="__text">{info?.text}</p>
                    <p className="__location"><IconMapPin width={16} height={16}/> {info?.location}</p>
                    <ul className="__socials">
                        {info?.sociales.map((s) => (
                            <li key={s.id} className="__itm"><a href={s.link} className="__itm_a" target="_blank" rel="noreferrer">{iconSocials[s.red]}</a></li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={`__section_categories`}>
                <ul className="__badges">
                    <li className={`__badge ${badge === 'all' ? '__badge--active' : ''}`} onClick={() => handleChangeBadges('all')}><span>Todo</span></li>
                    {info?.categories.map((c) => (
                        <li key={c.id} className={`__badge ${c.txt === badge ? '__badge--active' : ''}`} onClick={() => handleChangeBadges(c.txt)}><span>{c.txt}</span></li>
                    ))}
                </ul>
            </section>

        </>

    )

}