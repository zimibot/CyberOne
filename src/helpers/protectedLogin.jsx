import { useContext } from "react"
import MyContext from "./contex"
import { Navigate, } from "react-router-dom"


export const ProtectedLogin = ({ children }) => {
    const token = useContext(MyContext)

    let tkn = token.configSettings.config.token


    return !tkn ? children : <Navigate to="/user/assets-list"></Navigate>
}