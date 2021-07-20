import React from 'react';
import {Col, Row} from "react-bootstrap";
import ButtonCustom from "../../../components/ButtonCustom";

const Section1 = () => {
    return (
        <section className={"first__section"}>
            <Row className={"first__section__header"}>
                <Col md={12}>
                    <h3>We save every your coin</h3>
                </Col>
            </Row>
            <Row className={"first__section__text"}>
                <Col md={6}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur <br/>
                        eius explicabo maxime obcaecati.Autem consectetur ea <br/>
                        praesentium quidem. Ad iste nesciunt quasi rem totam! Cupiditate <br/>
                        delectus dignissimos id perferendis saepe!
                    </p>
                </Col>
                <Col md={6}>

                </Col>
            </Row>
            <Row className={"first__section__btn__container"}>
                <Col className="first__section__btn__col" md={6}>
                    <Row>
                        <Col>
                            <a href="#pricing">
                            <ButtonCustom
                                className={"form__button__btn"}
                                text={'VIEW PRICING'}
                                click={() => console.log("Hello World")}
                                variant={1}
                            />
                            </a>
                        </Col>
                        <Col>
                            <ButtonCustom
                                className={"form__button__btn"}
                                text={'REGISTRATION'}
                                click={() => console.log("Hello World")}
                                variant={2}
                            />
                        </Col>
                    </Row>
                </Col>
                {/*<Col md={6}></Col>*/}
            </Row>
        </section>
    );
};

export default Section1;