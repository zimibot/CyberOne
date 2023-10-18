import { createContext, useState } from "react";
const MyContext = createContext();

export const MainContext = () => {
    const [getOptions, setOptions] = useState()
    const [getDays, setDays] = useState()
    const [config, setConfig] = useState({
        token: localStorage.getItem("token")
    })
    const [getCurrentPages, setCurrentPages] = useState({
        page: 1,
        search: "",
        hosts: ""
    })


    return {
        option: { getOptions, setOptions },
        countDays: { getDays, setDays },
        configSettings: { config, setConfig },
        page: { getCurrentPages, setCurrentPages }
    }

}

export default MyContext