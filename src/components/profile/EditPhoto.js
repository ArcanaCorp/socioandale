import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../utils/cropImage';
import { IconCamera, IconCheck } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';
import { serviceUpdatePhotoProfile } from '../../services/profile.service';
import { toast } from 'sonner';

export default function EditPhoto() {

    const { user, contextAuthentication } = useAuth();

    const [imageSrc, setImageSrc] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [preview, setPreview] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isCropping, setIsCropping] = useState(false);

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageSrc(reader.result);
                setIsCropping(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const handleCropConfirm = async () => {
        try {
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels);

            const formData = new FormData();
            formData.append('photo', blob);

            const data = await serviceUpdatePhotoProfile(formData);

            if (!data.ok) return toast.warning(data.message);
                contextAuthentication(data.token)
                const previewURL = URL.createObjectURL(blob);
                setPreview(previewURL);
                setIsCropping(false);
            toast.success(data.message);
        } catch (error) {
            console.error('Error al cortar o subir la imagen', error);
            toast.error('Error al procesar la imagen');
        }
    };
    

    return (
        <section className="__section_avatar">

            <figure className="__avatar" style={{backgroundImage: `url(${preview === '' ? user?.photo : preview})`}}>
                <img src={preview === '' ? user?.photo : preview} alt="Preview" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                <label htmlFor="newImage" className="__edit">{isCropping ? <IconCheck onClick={handleCropConfirm} /> : <IconCamera />}</label>
                <input type="file" id="newImage" style={{ display: 'none' }} accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange}/>
            </figure>

            <h2>{user?.name}</h2>

            {isCropping && (
                <div className="__crop_modal">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    <button onClick={handleCropConfirm} className="__btn_crop_confirm"><IconCheck/></button>
                </div>
            )}
        </section>
    );
}
