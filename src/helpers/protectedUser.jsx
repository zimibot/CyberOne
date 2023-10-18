import { useContext } from "react"
import MyContext from "./contex"
import { Navigate } from "react-router-dom"


export const ProtectedUser = ({ children }) => {
    const token = useContext(MyContext)

    let tkn = token.configSettings.config.token


    return tkn ? <div className="protected">
        {children}
    </div> : <Navigate to="/"></Navigate>
}