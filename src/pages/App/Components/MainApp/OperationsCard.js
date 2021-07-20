import React, {useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap'
import {fire} from "../../../../firebase/Firebase";

const OperationsCard = ({data, index}) => {
    /*************************************************************************************************
     *  state
     ************************************************************************************************/
    const [val, setVal] = useState([]);
    const [actions, setActions] = useState();

    // useEffect(() => {
    //     fire.database().ref('actions/' + localStorage.getItem('crypto__uid')).on("child_added", (snapshot) => {
    //         if (snapshot.val()) {
    //             // console.log(snapshot.val())
    //             const actions = snapshot.val();
    //             setActions(actions)
    //             // console.log(actions)
    //         } else {
    //             console.log('error')
    //         }
    //     });
    // }, [])
    // useEffect(() => {
    // }, [actions])
    useEffect(() => {
        setVal(Object.entries(data))
    }, [])
    useEffect(() => {
    }, [val])
    /*************************************************************************************************
     *  Render
     ************************************************************************************************/
    return (
        <div className={"operations__card__container"} key={index}>
            <Row className={"operations__card__header__container"}>
                {/*<Col md={4}>*/}
                {/*    <p>{data.buyPrice}</p>*/}
                {/*    <p>{data.buyPrice}</p>*/}
                {/*</Col>*/}
                {/*<Col md={8}>*/}
                    <p>{new Date(data.time).toISOString().substring(0, 19).replace('T', ' ')}</p>
                {/*</Col>*/}
            </Row>
            <Row>
                <div
                    className={data.operation === 'buy' ? "operations__card__status__green" : "operations__card__status__red"}>
                    <div className={"operations__card__status__text"}>{data.operation !== 'buy' ? "SELL" : "BUY"}</div>
                </div>
                <Col md={7}>
                    {/*<div>{val?.amount}</div>*/}
                    {/*<div>{val?.currency}</div>*/}
                    {/*<div>{val?.operation}</div>*/}
                    {/*<div>buy Price: {actions?.buyPrice?.toFixed(2)}</div>*/}
                    {/*<div>Amount: {data.amount?.toFixed(2)}</div>*/}
                    {/*<div>Price: {data.price?.toFixed(2)}</div>*/}
                    {/*<div>Profit: {data.profit?.toFixed(2)}</div>*/}

                    <div>Amount: {data.amount?.toFixed(2)}</div>
                    <div>Currency: {data?.currency}</div>
                    <div>Operation: {data?.operation}</div>
                    <div>Price: {data?.price}</div>
                    <div>Profit: {data?.profit?.toFixed(2)}</div>

                </Col>
            </Row>
        </div>
    );
};

export default OperationsCard;