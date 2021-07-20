import React from 'react';
import {Row, Col} from 'react-bootstrap'
import CardPrice from "./Components/CardPrice";
import img from '../../../assets/price2.jpeg'

const SectionPrice = () => {
    return (
        <section className={"section__price__container"} id={"pricing"}>
            <Row>
                <Col>
                    <h3 className={"section__price__container__header"}>Browse our price</h3>
                </Col>
                <Col>
                    <p className={"section__price__container__header__text"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardPrice
                        img={img}
                        header={'FREE'}
                        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .'}
                        variant={true}
                    />
                </Col>
                <Col>
                    <CardPrice
                        img={img}
                        header={'10$/month'}
                        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .'}
                        variant={false}
                    />
                </Col>
                <Col>
                    <CardPrice
                        img={img}
                        header={'50/month'}
                        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .'}
                        variant={true}
                    />
                </Col>
                <Col>
                    <CardPrice
                        img={img}
                        header={'200/month'}
                        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non neque orci amet, amet .'}
                        variant={true}
                    />
                </Col>

            </Row>
        </section>
    );
};

export default SectionPrice;