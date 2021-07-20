import React from 'react';
import {Row, Col} from 'react-bootstrap'
import phone from '../../../assets/phone.png'
import bitcoin from '../../../assets/bitcoin-coin.svg'

const Section4 = () => {
    return (
        <section className={"section4__container"}>
            <Row>
                {/*<Col md={6}>*/}
                <Col className="section4__phone__container">
                    {/*<div >*/}
                        <img src={phone} alt="phone" className={"section4__img1"}/>
                        <img src={phone} alt="phone" className={"section4__img2"}/>
                    {/*</div>*/}
                </Col>
                <Col md={6} className={"section4__content__container"}>
                    <h3 className={"section4__content__header"}>A crypto wallet from the future</h3>
                    <p className={"section4__content__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sit non neque orci amet, amet consectetur eget suspendisse in. Adipiscing vitae dignissim
                        facilisi ut.</p>
                    <div className={"section4__content__icons__container"}>
                        <div className={"section4__content__icon"}>
                            <img src={bitcoin} alt="bitcoin" className={"section4__content__icon__img"}/>
                            <p className={"section4__content__icon__text"}>Lowest fees in market</p>
                        </div>
                        <div className={"section4__content__icon"}>
                            <img src={bitcoin} alt="bitcoin" className={"section4__content__icon__img"}/>
                            <p className={"section4__content__icon__text"}>Fast and secure transactions</p>
                        </div>
                        <div className={"section4__content__icon"}>
                            <img src={bitcoin} alt="bitcoin" className={"section4__content__icon__img"}/>
                            <p className={"section4__content__icon__text"}>256-bit secure encryption</p>
                        </div>

                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default Section4;