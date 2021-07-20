import React from 'react';
import {Row, Col} from 'react-bootstrap'
import SmallCard from "./Components/SmallCard";
import BigCard from "./Components/BigCard";
import dollar from '../../../assets/bitcoin-coin.svg'
import phone from '../../../assets/phone.png'

const Section3 = () => {
    return (
        <section className={"section3__container"}>
            <div className={"section3__container__background"}></div>
            <Row className={"section3__container__inner"}>
                <Col md={4}>
                    <Row>
                        <SmallCard
                            header={"SEND & RECEIVE"}
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."}
                            icon={dollar}
                        />
                    </Row>
                    <Row>
                        <SmallCard
                            header={"100% SECURE WALLET"}
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."}
                            icon={dollar}
                        />
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <BigCard
                            header={"IOS & ANDROID APP"}
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."}
                            icon={phone}
                        />
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <SmallCard
                            header={"TRADING CHARTS"}
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."}
                            icon={dollar}
                        />
                    </Row>
                    <Row>
                        <SmallCard
                            header={"REAL TIME TRADING"}
                            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene."}
                            icon={dollar}
                        />
                    </Row>
                </Col>
            </Row>
        </section>
    );
};

export default Section3;