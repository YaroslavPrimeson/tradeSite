import React, {useEffect} from 'react';
import {Col, Row} from "react-bootstrap";

const ActionsCardAdmin = ({actions,index}) => {
    /**********************************************************
     * useEffect
     **********************************************************/
    useEffect(()=>{
    },[actions])
    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div>
            <div className={"actions__card__container"} key={index} style={{color:"white"}}>
                <Row>
                    <Col md={7}>action
                        <div>action: {actions?.action}</div>
                        <div>amountCoins: {actions?.amountCoins}</div>
                        <div>buyPrice: {actions?.buyPrice}</div>
                        <div>nextBuyAt: {actions?.nextBuyAt}</div>
                        <div>prevPrice: {actions?.prevPrice}</div>
                        <div>price: {actions?.price}</div>
                        <div>profit: {actions?.profit}</div>
                        <div>realTimePercentage: {actions?.realTimePercentage}</div>
                        <div>safetyLine: {actions?.safetyLine}</div>
                        <div>sellPrice: {actions?.sellPrice}</div>
                        <div>spentDollars: {actions?.spentDollars}</div>
                        <div>stopPrice: {actions?.stopPrice}</div>
                        <div>time: {actions?.time}</div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ActionsCardAdmin;