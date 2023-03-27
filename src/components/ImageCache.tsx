
import {useEffect, useState} from "react";
import {getTaskCoverImage} from "../services/taskService";
import {useAppSelector} from "../hooks/customHook";
import {extractMessage} from "../utils/helperFn";
import noImage from "../asset/img/no-image.jpg";

const ImageCache = ({boardRef, className, img}: { boardRef: string; className: string, img: string }) => {
    const [image, setImage] = useState("");
    const columnId = useAppSelector((state) => state.board.boardTag);

    const awaitTaskImage = async () => {
        const cacheKey: string | null = `cached-image-${boardRef}`; // cached-image-GOP-1
        const cachedImage: string | null = localStorage.getItem(cacheKey);
        if (cachedImage) setImage(cachedImage);
        else await createNewImageBlobURL(cacheKey);
    }

    const createNewImageBlobURL = async (cacheKey: string): Promise<string | null> => {
        try {
            const fileUrl = await getTaskCoverImage(columnId, boardRef);
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const imageUrl: string | null = URL.createObjectURL(blob);
            localStorage.setItem(cacheKey, imageUrl);
            setImage(imageUrl);
            return imageUrl;
        } catch (err) {
            const errorMsg = extractMessage(err);
            console.log("Error occurred ==> ", errorMsg);
            return null;
        }
    };

    useEffect(() => {
        awaitTaskImage();
    }, [boardRef, columnId, image]);

    return <img src={image || img || noImage} alt="task cover" className={className}/>;
};

export default ImageCache;
