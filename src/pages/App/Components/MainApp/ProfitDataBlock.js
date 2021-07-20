import React, {useEffect, useState} from 'react';
import {Row, Col} from "react-bootstrap";
import {fire} from "../../../../firebase/Firebase";

const ProfitDataBlock = () => {
    const [actions , setActions] = useState([]);

    useEffect( () => {
        fire.database().ref('actions/' + localStorage.getItem('crypto__uid') ).on('value', (snapshot) => {
            try {
                const array = Object.entries(snapshot.val());
                const last = array[array.length -1];
                if (last['1']){
                    const data = Object.entries(last['1'])
                    setActions(data)
                    console.log('NEW ACTIONS' )
                    console.log(data)
                }
            }catch (e) {

            }

        });
    }, [])
    return (
        <div className={"profit__data__block__container"}>
            <Row className="profit__data__block__row__border">
                {actions.map( (a, index) => (
                    <Col key={index} className="profit__data__block__col profit__data__block__col__border">
                        <p className="profit__data__block__header">{a[0]}</p>
                        <span className="profit__data__block__count">{a[1]}</span>
                    </Col>
                ))}



                {/*<Col className="profit__data__block__col profit__data__block__col__border">*/}
                {/*    <p className="profit__data__block__header">Profit/Loss in %</p>*/}
                {/*    <span className="profit__data__block__count">0</span>*/}
                {/*</Col>*/}
                {/*<Col className="profit__data__block__col">*/}
                {/*    <p className="profit__data__block__header">Profit/Loss in $</p>*/}
                {/*    <span className="profit__data__block__count">0</span>*/}
                {/*</Col>*/}
            </Row>
            {/*<Row className="profit__data__block__row__border">*/}
            {/*    <Col className="profit__data__block__col profit__data__block__col__border">*/}
            {/*        <p className="profit__data__block__header">Profit counter </p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*    <Col className="profit__data__block__col profit__data__block__col__border">*/}
            {/*        <p className="profit__data__block__header"> Loss counter </p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*    <Col className="profit__data__block__col">*/}
            {/*        <p className="profit__data__block__header"> Total</p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Row className="profit__data__block__row">*/}
            {/*    <Col className="profit__data__block__col profit__data__block__col__border">*/}
            {/*        <p className="profit__data__block__header">Current price</p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*    <Col className="profit__data__block__col profit__data__block__col__border">*/}
            {/*        <p className="profit__data__block__header">Current stop loss</p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*    <Col className="profit__data__block__col profit__data__block__col__border">*/}
            {/*        <p className="profit__data__block__header">Next buy at</p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*    <Col className="profit__data__block__col">*/}
            {/*        <p className="profit__data__block__header">Safely line value</p>*/}
            {/*        <span className="profit__data__block__count">0</span>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    );
};

export default ProfitDataBlock;