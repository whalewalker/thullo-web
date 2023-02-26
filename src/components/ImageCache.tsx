// noinspection JSIgnoredPromiseFromCall

import {useEffect, useState} from "react";
import {getTaskCoverImage} from "../services/taskService";
import {useAppSelector} from "../hooks/customHook";
import {extractMessage} from "../utils/helperFn";
import noImage from "../asset/img/no-image.jpg";

function ImageCache({boardRef, className} : {boardRef: string, className: string}) {
    const [image, setImage] = useState("");
    const columnId = useAppSelector((state) => state.board.boardTag);

    const awaitTaskImage = async () => {
        let imageData: any;
        if (image) {
            imageData = image;
        } else {
            const cacheKey: string | null = `cached-image-${boardRef}`;
            const cachedImage: string | null  = localStorage.getItem(cacheKey);

            if (cachedImage) {
                imageData = cachedImage;
                setImage(cachedImage);
            } else {
                try {
                    const fileUrl = await getTaskCoverImage(columnId, boardRef);
                    fetch(fileUrl )
                        .then(response => response.blob())
                        .then(blob => {
                            const imageUrl : string | null = URL.createObjectURL(blob);
                            localStorage.setItem(cacheKey, imageUrl);
                            setImage(imageUrl);
                        })
                } catch (err) {
                    const errorMsg = extractMessage(err)
                    console.log("Error occurred ==> ", errorMsg);
                }
            }
        }

        return () => {
            if (imageData) {
                URL.revokeObjectURL(imageData);
            }
        };
    }


    useEffect(() => {
        awaitTaskImage()
    }, [boardRef, columnId, image]);

    return <img src={image || noImage} alt="Cached Image" className={className}/>;
}

export default ImageCache;