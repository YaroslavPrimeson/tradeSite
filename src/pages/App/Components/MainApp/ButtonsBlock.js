import React from "react";
import {fire} from "../../../../firebase/Firebase";
import fireSvg from "../../../../assets/fire.svg";
import stop from "../../../../assets/cancel.svg";
import sell from "../../../../assets/no-stopping.svg";
import {Row, Col} from 'react-bootstrap';
import ButtonCustom from "../../../../components/ButtonCustom";

const ButtonsBlock = ({clickStart}) => {
    const start = () => {
        fire.database().ref('orders/gGqo7szHtvgYVJzb44kAHpmIVlw1/').set(
            JSON.stringify({
                'uid__firebase': 'gGqo7szHtvgYVJzb44kAHpmIVlw1',
                'id__user__firestore': 'qoX90WAWEO0VSnOcHBDX',
                'status': true,
                'demo': true,
                'extraExit': false,

                'apiKey': 'c3Wu4MjrpRWsQHdFumsQGBUQ6YFaGvwnqHUit2e2WZhTCGVxABZwEZaBWbutpkJy',
                'secretKey': 'nHGePdeAb8h5hnIdpatfDG4m40Kt3R2PEJm71I4T3uukRe6s11VOn8mMLNj1IgO4',
                'currencyPair': 'ETHUSDT',
                'currencyPairNotSplitted': 'ETH/USDT',
                'taker': 0.01,
                'walletVolume': 20,
                'loss': 0.5,
                'buyNext': 0.01,
                'takerUsd': 5
            }), (error) => {
                if (error) {
                    // The write failed...
                    console.log(error)
                } else {
                    // Data saved successfully!
                    console.log("SUCCESS")
                }
            });
    };
    return (
        <div className="buttons__block">
                <ButtonCustom
                    className={"buttons__block__btn"}
                    variant={3}
                    text={'START'}
                    click={() => start()}
                    image={fireSvg}
                />
                <ButtonCustom
                    className={"buttons__block__btn"}
                    variant={3}
                    text={'STOP'}
                    click={() => console.log('AJNS')}
                    image={stop}
                />
                <ButtonCustom
                    className={"buttons__block__btn"}
                    variant={3}
                    text={'SELL NOW & OFF'}
                    click={() => console.log('AJNS')}
                    image={sell}
                />


            {/*<Row className="">*/}
            {/*    <Col md={4}>*/}
            {/*        <ButtonCustom*/}
            {/*            className={"buttons__block__btn"}*/}
            {/*            variant={3}*/}
            {/*            text={'START'}*/}
            {/*            click={() => start()}*/}
            {/*            image={fireSvg}*/}
            {/*        />*/}
            {/*    </Col>*/}
            {/*    <Col md={4}>*/}
            {/*        <ButtonCustom*/}
            {/*            className={"buttons__block__btn"}*/}
            {/*            variant={3}*/}
            {/*            text={'STOP'}*/}
            {/*            click={() => console.log('AJNS')}*/}
            {/*            image={stop}*/}
            {/*        />*/}
            {/*    </Col>*/}
            {/*    <Col md={4}>*/}
            {/*        <ButtonCustom*/}
            {/*            className={"buttons__block__btn"}*/}
            {/*            variant={3}*/}
            {/*            text={'SELL NOW & OFF'}*/}
            {/*            click={() => console.log('AJNS')}*/}
            {/*            image={sell}*/}
            {/*        />*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}
export default ButtonsBlock;