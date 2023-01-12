export const extractErrorMessage = (error: any) => {
    return (
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
    );
};

export const fileHandler = (e: any) => {
    if (e.target.files && e.target.files[0])
        return URL.createObjectURL(e.target.files[0]);
};