import { createContext,useEffect,useState } from "react";
import authApi from "../../API/Auth";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user,setUser] = useState(null);
    const [userLoading , setUserLoading] = useState(true);
    useEffect(() => {
        const userData = authApi.getUser(); 
        setUser(userData);
        setUserLoading(false);
      }, []);

    return  (
        <>
            <UserContext.Provider value={{ user, setUser , userLoading }}>
                {children}
            </UserContext.Provider>
        </>
    )
}