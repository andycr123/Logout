import { useContext } from "react";
import { Context } from "../Context";

export const Register = () => {
    const {isLogin} = useContext(Context) 
    console.log(isLogin);
}