import React from "react";
import SettingsApp from "../../pages/App/Components/MainApp/SettingsApp";
import ButtonsBlock from "../../pages/App/Components/MainApp/ButtonsBlock";
import ProfitBlock from "../profitBlock/profitBlock";
import CurrentPrice from "../currentPriceBlock/currentPrice";
import "./mainComponent.scss"

const MainComponent =() => {
    return (
        <section className="main-component__container">
            <div className="foot__container">
                {/* ACCORDION*/}
                <SettingsApp/>
                {/*BUTTONS BLOCK */}
                <ButtonsBlock/>
                {/*PROFIT BLOCK*/}
                <ProfitBlock/>
                {/*CURRENT BLOCK*/}
                <CurrentPrice/>
            </div>
        </section>
    )
}
export default MainComponent;