import {authAction} from "../slice/authSlice";
import {loginHandler} from "../services/authService";

export const login = (data: {}) => {
 return (dispatch: Function) => {
     dispatch(authAction.setIsLoading(true));
     try{
         const res: any = loginHandler(data);
         console.log(res)
         localStorage.setItem("ACCESS_TOKEN", res.data.jwtToken);
         dispatch(authAction.setIsLoading(false));
         dispatch(authAction.setData(res.data))
     }catch (err){
         console.log(err);
         dispatch(authAction.setIsLoading(false));
         dispatch(authAction.setError(true))
         dispatch(authAction.setErrorMsg(err));
     }
 }
}