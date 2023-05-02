import React, {useEffect, useState} from "react";
import {FiSearch} from "react-icons/fi";
import {getUnsplashPictures} from "../services/taskService";
import ReactLoading from "react-loading";
import {useAppDispatch} from "../hooks/customHook";
import {updateTaskDetails} from "../actions/taskActions";
import axios, {AxiosResponse} from "axios";
import {toastError} from "../utils/helperFn";


interface Image {
    id: string;
    alt: string;
    url: string;
}

const UnsplashModal = ({
                           display,
                           setUrl,
                           boardTag,
                           boardRef,
                       }: {
    display: string;
    setUrl: Function;
    setDisplay: Function;
    boardTag: string;
    boardRef: string;
}) => {
    const [searchImageName, setSearchImageName] = useState("");
    const [images, setImages] = useState<Array<Image>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const searchImageHandler = (e: { target: { value: string } }) => {
        setSearchImageName(e.target.value);
    };

    useEffect(() => {
        if (display === "") {
            setImages([]);
            setSearchImageName("");
        }
    }, [display])

    const setSearchedImage = async (imageUrl: string) => {
        try {
            const response = await axios.get(imageUrl, { responseType: 'blob' });
            const file = new File([response.data], 'image.png', { type: response.headers['content-type'] });
            setUrl(imageUrl);
            dispatch(updateTaskDetails({ boardTag, boardRef, file}));
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitSearchInputHandler = async (e: { preventDefault: Function }) => {
        e.preventDefault();
        setIsLoading(true);
        const result: Array<{ id: string; alt_description: string; urls: { small: string } }> = await getUnsplashPictures(
            searchImageName
        );
        setIsLoading(false);
        const images = await Promise.all(
            result.map(async (item) => {
                try {
                    const response: AxiosResponse = await axios.head(item.urls.small);
                    const sizeInBytes = response.headers['content-length'];
                    const sizeInMB = sizeInBytes ? Number(sizeInBytes) / (1024 * 1024) : 0;
                    if (sizeInMB > 1) {
                        return null;
                    }
                    return {id: item.id, alt: item.alt_description, url: item.urls.small};
                } catch (error) {
                    toastError(`Error fetching image from unsplash`);
                    console.log(`Error fetching image size for ${item.urls.small}`, error)
                    return null;
                }
            })
        );
        setImages(images.filter((image): image is Image => !!image));
    };


    return (
        <div
            className={`w-[16.3rem] h-max transition-all duration-800 ease-linear absolute right-0 top-40  bg-color-white rounded-lg p-2   shadow-4xl cursor-default ${
                display === "Cover" ? " visible" : "delay-300 hidden"}`}
        >
            <p className="text-xs font-semibold text-color-grey-4">Photo Search</p>
            <p className="text-color-grey-3 font-normal text-xs leading-6">Search Unsplash for photos</p>
            <form
                className={`w-full flex shadow-5xl rounded-lg mt-5 p-1 `}
                onSubmit={onSubmitSearchInputHandler}
            >
                <input
                    type="text"
                    placeholder="Keywords..."
                    className="px-2 py-1 border-0 outline-0 w-full !text-[12px]"
                    value={searchImageName}
                    onChange={searchImageHandler}
                />
                <button
                    type="submit"
                    className="bg-color-btn text-color-white p-2 flex justify-center items-center  rounded-lg text-sm flex-1  hover: transition-all duration-300 ease-in"
                >
                    {isLoading ? (
                        <ReactLoading type="spin" color="#fff" width={16} height={16}/>
                    ) : (
                        <FiSearch className="w-4 h-4 text-color-white"/>
                    )}
                </button>
            </form>
            {images && (
                <div className="grid grid-cols-4 gap-2 justify-between mt-5">
                    {images.map((image: { id: string; url: string; alt: string }) => (
                        <img
                            src={image.url}
                            alt={image.alt}
                            key={image.id}
                            className="w-[3.2rem] h-[3.2rem] rounded-lg object-cover cursor-pointer"
                            onClick={() => {
                                setSearchedImage(image.url);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UnsplashModal;
