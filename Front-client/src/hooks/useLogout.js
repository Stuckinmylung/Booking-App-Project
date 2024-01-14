import  { AuthContext } from "../context/AuthContext"
import { useContext } from "react";
import axios from 'axios'

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext);
  
    const logout = async () => {
        try {
            await axios.get("/auth/logout");
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
        } catch (err) {}
    };
  
    return { logout };
};
