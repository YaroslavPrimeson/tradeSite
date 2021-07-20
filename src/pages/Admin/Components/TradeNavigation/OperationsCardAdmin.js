import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import "../../Admin.scss";

const OperationsCardAdmin = ({data, index}) => {
    /*************************************************************************************************
     *  useEffect
     ************************************************************************************************/
    useEffect(() => {
    }, [data])
    /*************************************************************************************************
     *  Render
     ************************************************************************************************/
    return (
        <div className={"operations__card__container"} key={index} style={{color:"white"}}>
            <Row className={"operations__card__header__container"}>
                <Col md={4}>
                    <p>{data.buyPrice}</p>
                    <p>{data.buyPrice}</p>
                </Col>
                <Col md={8}>
                    <p>{new Date(data.time).toISOString().substring(0, 19).replace('T', ' ')}</p>
                </Col>
            </Row>
            <Row>
                <div
                    className={data.operation === 'buy' ? "operations__card__status__green" : "operations__card__status__red"}>
                    <div className={"operations__card__status__text"}>{data.operation !== 'buy' ? "SELL" : "BUY"}</div>
                </div>
                <Col md={7}>
                    <div>Amount: {data.amount?.toFixed(2)}</div>
                    <div>Currency: {data?.currency}</div>
                    <div>Operation: {data?.operation}</div>
                    <div>Price: {data?.price}</div>
                    <div>Profit: {data?.profit}</div>
                    <div>Time: {data?.time}</div>
                    <div>User: {data?.user}</div>
                </Col>
            </Row>
        </div>
    );
};

export default OperationsCardAdmin;