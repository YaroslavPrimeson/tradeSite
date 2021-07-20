import React from 'react';
import {Row, Col} from 'react-bootstrap'
import pc from '../../../assets/pc.png'
import bitcoin from '../../../assets/bitcoin-coin.svg'

const Section5 = () => {
    return (
        <section className={"section5__container"}>
            <Row>
                <Col md={6} className={"section5__content__container"}>
                    <h3 className={"section4__content__header"}>Built on a robust and powerful platform</h3>
                    <p className={"section4__content__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet consectetur eget suspendisse in. Adipiscing vitae dignissim facilisi ut.</p>
                    <div className={"section4__content__icons__container"}>
                        <div className={"section4__content__icon"}>
                            <img src={bitcoin} alt="bitcoin" className={"section4__content__icon__img"}/>
                            <p className={"section4__content__icon__text"}>100% Private data</p>
                        </div>
                        <div className={"section4__content__icon"}>
                            <img src={bitcoin} alt="bitcoin" className={"section4__content__icon__img"}/>
                            <p className={"section4__content__icon__text"}>99.99% Uptime guarantee</p>
                        </div>
                        <div className={"section4__content__icon"}>
                            <img src={bitcoin} alt="bitcoin" className={"section4__content__icon__img"}/>
                            <p className={"section4__content__icon__text"}>24/7 Dedicated support</p>
                        </div>

                    </div>
                </Col>
                <Col md={6} className={"section5__image__container"}>
                    <img src={pc} alt="phone" className={"section5__img"}/>
                </Col>
            </Row>
        </section>
    );
};

export default Section5;