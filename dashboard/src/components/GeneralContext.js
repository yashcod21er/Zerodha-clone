import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid, mode = "BUY", defaultPrice = null) => { },
    closeBuyWindow: () => { },
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [orderMode, setOrderMode] = useState("BUY");
    const [selectedStockPrice, setSelectedStockPrice] = useState(null);

    const handleOpenBuyWindow = (uid, mode = "BUY", defaultPrice = null) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
        setOrderMode(mode);
        setSelectedStockPrice(defaultPrice);
    };

    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setSelectedStockUID("");
        setOrderMode("BUY");
        setSelectedStockPrice(null);
    };

    return (
        <GeneralContext.Provider
            value={{
                openBuyWindow: handleOpenBuyWindow,
                closeBuyWindow: handleCloseBuyWindow,
            }}
        >
            {props.children}
            {isBuyWindowOpen && (
                <BuyActionWindow
                    uid={selectedStockUID}
                    mode={orderMode}
                    defaultPrice={selectedStockPrice}
                />
            )}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;