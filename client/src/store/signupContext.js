
import { createContext, useState } from "react";
export const SignupContext = createContext()
const UserDetails = ({ children }) => {
    const [userData, setUserData] = useState("")
    return (
        <SignupContext.Provider value={{ userData, setUserData }}>
            {children}
        </SignupContext.Provider>
    )
}
export default UserDetails