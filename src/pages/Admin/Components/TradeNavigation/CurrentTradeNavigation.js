import React, {useEffect} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import OperationsCardAdmin from "./OperationsCardAdmin";
import "../../Admin.scss";
import ActionsCardAdmin from "./ActionsCardAdmin";
import ButtonCustom from "../../../../components/ButtonCustom";
import TestPagination from "./testPagination";

const CurrentTradeNavigation = ({closeUserOperations, operations, actions, orders, state}) => {
    /**********************************************************
     * useEffect
     **********************************************************/
    useEffect(() => {

    }, [operations, actions, orders, state])

    /**********************************************************
     * Render
     **********************************************************/
    return (
        <>
            <div className="current__room__operations__container" style={{color: "white"}}>
                <ButtonCustom variant={2} text={"return"} click={() => closeUserOperations()}  className={"trade__navigation__return__button "}/>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab tabClassName="operations__block__admin" eventKey="operations" title="Operations">
                        {operations.map((el, index) => (
                            <>
                                <OperationsCardAdmin data={el[1]} index={index}/>
                            </>
                        ))}
                    </Tab>
                    <Tab tabClassName="actions__block__admin" eventKey="actions" title="Actions">
                        {actions.map((el, index) => (
                            <ActionsCardAdmin actions={el[1]} index={index}/>
                        ))}
                    </Tab>
                    <Tab tabClassName="orders__block__admin" eventKey="orders" title="Orders">
                        <div className={"orders__container__admin"}>
                            <div>ApiKey: {orders.apiKey}</div>
                            <div>Secret Key: {orders.secretKey}</div>
                            <div>Buy Next: {orders.buyNext}</div>
                            <div>Currency Pair: {orders.currencyPair}</div>
                            <div>Currency Pair Not Splited: {orders.currencyPairNotSplitted}</div>
                            <div>Demo: {orders.demo}</div>
                            <div>Extra Exit: {orders.extraExit}</div>
                            <div>Extra Price: {orders.extraPrice}</div>
                            <div>Extra Taker: {orders.extraTaker}</div>
                            <div>Loss: {orders.loss}</div>
                            <div>Status: {orders.status}</div>
                            <div>Taker: {orders.taker}</div>
                            <div>Taker Usd: {orders.takerUsd}</div>
                            <div>WalletVolume: {orders.walletVolume}</div>
                            <div>uid__firebase: {orders.uid__firebase}</div>

                        </div>
                    </Tab>
                    <Tab tabClassName="state__block__admin" eventKey="state" title="State">
                        <div className="state__container__admin">
                            <div>Commission: {state?.commission}</div>
                            <div>Currency: {state?.currency}</div>
                            <div>CurrencyValue: {state?.currencyValue}</div>
                            <div>status: {state?.status}</div>
                            <div>takerDollar: {state?.takerDollar}</div>
                            <div>time: {state?.time}</div>
                            <div>user: {state?.user}</div>
                            <div>walletVolume: {state?.walletVolume}</div>
                        </div>
                    </Tab>
                    {/*<Tab tabClassName="state__block__admin" eventKey="test" title="test">*/}
                    {/*    /!*{operations.map((d, index) => (*!/*/}
                    {/*        <>*/}
                    {/*            <TestPagination operations={operations}*/}
                    {/*                            // data={d[1]} index={index}*/}
                    {/*            />*/}
                    {/*        </>*/}
                    {/*    /!*))}*!/*/}
                    {/*</Tab>*/}
                </Tabs>
            </div>
        </>

    );
};

export default CurrentTradeNavigation;