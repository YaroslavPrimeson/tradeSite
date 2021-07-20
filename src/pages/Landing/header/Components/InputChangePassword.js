import React from 'react';
import {Col, Row} from "react-bootstrap";
import Input from "../../../../components/Input";
import ButtonCustom from "../../../../components/ButtonCustom";

const InputChangePassword = () => {
    return (
        <>
            <Row className="modal__settings__card__row">
                <Col className={"accordion__input__container"}>
                    <p className="modal__settings__p__text">Old  password</p>
                    <Input className={"modal__settings__input"} type="text" disabled placeholder="Enter old password" />
                </Col>
            </Row>
            <Row className="modal__settings__card__row">
                <Col className={"accordion__input__container"}>
                    <p className="modal__settings__p__text">New password</p>
                    <Input className={"modal__settings__input"} type="text" disabled placeholder="Enter new password" />
                </Col>
            </Row>
            <Row className="modal__settings__card__row">
                <Col className={"accordion__input__container"}>
                    <p className="modal__settings__p__text">Repeat new password</p>
                    <Input className={"modal__settings__input"} type="text" disabled placeholder="Enter new password" />
                </Col>
            </Row>
            <Row className="modal__settings__card__row">
                <Col className={"accordion__input__container"}>
                    <ButtonCustom
                        className={"form__button__btn"}
                        text={'Save'}
                        click={() => console.log('SAVE')}
                        variant={2}
                    />
                </Col>
            </Row>
            <br/>
        </>
    );
};

export default InputChangePassword;