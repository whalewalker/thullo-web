import {useEffect, useState} from "react";
import {getTaskCoverImage} from "../services/taskService";
import {useAppSelector} from "../hooks/customHook";
import noImage from "../asset/img/no-image.jpg";
import axios from "axios";

interface ImageCacheProps {
    boardRef: string;
    className: string;
    img?: string;
}

const ImageCache = ({boardRef, className, img}: ImageCacheProps) => {
    const [image, setImage] = useState("");
    const columnId = useAppSelector((state) => state.board.boardTag);

    const awaitTaskImage = async () => {
        const cacheKey: string | null = `cached-image-${boardRef}`;
        const cachedImage: string | null = localStorage.getItem(cacheKey);
        if (cachedImage) {
            const isCachedImageValid = await checkImageValidity(cachedImage);
            if (isCachedImageValid) {
                setImage(cachedImage);
            } else {
                await createNewImageBlobURL(cacheKey);
            }
        } else await createNewImageBlobURL(cacheKey);
    };

    const createNewImageBlobURL = async (cacheKey: string): Promise<void> => {
        const fileUrl = await getTaskCoverImage(columnId, boardRef);
        axios.get(`${fileUrl}`, {responseType: 'blob'})
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                localStorage.setItem(cacheKey, url);
                setImage(url);
            }).catch(err => {
            console.log(err);
        });
    }

    const checkImageValidity = async (imageUrl: string): Promise<boolean> => {
        try {
            const img = new Image();
            img.src = imageUrl;
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject();
            });
            return true;
        } catch (e) {
            return false;
        }
    };

    useEffect(() => {
        awaitTaskImage();
    }, [boardRef, columnId, image]);

    return (
        <img src={img || image || noImage} alt="task cover" className={className}/>
    );
};

ImageCache.defaultProps = {
    img: null,
};

export default ImageCache;
