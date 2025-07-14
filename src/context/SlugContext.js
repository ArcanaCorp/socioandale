import { createContext, useContext, useState } from "react";

const SlugContext = createContext();

export const SlugProvider = ({ children }) => {

    const [ badge, setBadge ] = useState('all')

    const handleChangeBadges = (bdg) => setBadge(bdg)

    const contextValue = {
        badge,
        handleChangeBadges
    }

    return (
        <SlugContext.Provider value={contextValue}>{children}</SlugContext.Provider>
    )

}

export const useSlug = () => useContext(SlugContext)