import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const [ online, setOnline ] = useState(navigator.onLine);
    const [ tab, setTab ] = useState('index');
    const [ filter, setFilter ] = useState('all')
    const [ viewModal, setViewModal ] = useState({
        view: false,
        type: ''
    })

    const changeTab = (t) => setTab(tab)
    const changeFilter = (f) => setFilter(f)
    const toogleModal = (type) => setViewModal({
        view: !viewModal.view,
        type: type
    })

    useEffect(() => {
        const handleOnline = () => setOnline(true);
        const handleOffline = () => setOnline(false);
    
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
    
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const contextValue = {
        online,
        tab,
        filter,
        viewModal,
        changeTab,
        toogleModal,
        changeFilter,
    }

    return (
        <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
    )

}

export const useUI = () => useContext(UIContext)