import { createContext, useState } from "react";
const MyContext = createContext();

export const MainContext = () => {
    const [getOptions, setOptions] = useState()
    const [getDays, setDays] = useState()
    const [getCurrentPages, setCurrentPages] = useState({
        page: 1,
        search: "",
        hosts: ""
    })


    return {
        option: { getOptions, setOptions },
        countDays: { getDays, setDays },
        page: { getCurrentPages, setCurrentPages }
    }

}

export default MyContext