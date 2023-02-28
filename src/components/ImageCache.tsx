// noinspection JSIgnoredPromiseFromCall
import React from "react";
import {useEffect, useState} from "react";
import {getTaskCoverImage} from "../services/taskService";
import {useAppSelector} from "../hooks/customHook";
import {extractMessage} from "../utils/helperFn";
import noImage from "../asset/img/no-image.jpg";

const ImageCache = ({ boardRef, className }: { boardRef: string; className: string }) => {
    const [image, setImage] = useState("");
    const columnId = useAppSelector((state) => state.board.boardTag);

    const awaitTaskImage = async () => {
        let imageData: any;
        if (image) {
            imageData = image;
        } else {
            const cacheKey: string | null = `cached-image-${boardRef}`;
            const cachedImage: string | null = localStorage.getItem(cacheKey);

            if (cachedImage) {
                const isCachedImageValid = await checkImageValidity(cachedImage);

                if (isCachedImageValid) {
                    imageData = cachedImage;
                    setImage(cachedImage);
                } else {
                    imageData = await createNewImageBlobURL(cacheKey);
                }
            } else {
                imageData = await createNewImageBlobURL(cacheKey);
            }
        }

        return () => {
            if (imageData) {
                URL.revokeObjectURL(imageData);
            }
        };
    };

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

    const createNewImageBlobURL = async (cacheKey: string): Promise<string | null> => {
        try {
            const fileUrl = await getTaskCoverImage(columnId, boardRef);
            const response = await fetch(fileUrl + "?asAttachment=true");
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

    return <img src={image || noImage} alt="Cached Image" className={className} />;
};

export default ImageCache;
