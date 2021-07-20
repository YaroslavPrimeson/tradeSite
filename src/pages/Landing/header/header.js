import bitcoin from "../../../assets/horsley3.png"
import "./header.scss";
import '../../App/index.scss'
import {Button, Modal, Accordion, Card} from "react-bootstrap";
import {Row, Col} from 'react-bootstrap'
import React, {useState, useEffect, useContext} from "react";
import ButtonCustom from '../../../components/ButtonCustom'
import Svg from "../../../components/Svg/Svg";
import SettingsIcon from "../../../components/Svg/Image/SettingsIcon";
import ChatIcon from "../../../components/Svg/Image/ChatIcon";
import CloseIcon from "../../../components/Svg/Image/CloseIcon";
import InputBinanceApi from "./Components/InputBinanceApi";
import InputSettingsAccount from "./Components/InputSettingsAccount";
import InputChangePassword from "./Components/InputChangePassword";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {fire} from '../../../firebase/Firebase';
import firebase from "firebase";
import {createNewUser} from "../../../help/helper";
import Input from "../../../components/Input";
import ChatRoom from "../../App/Components/Chat/chatRoom";
import {createNewAccount} from "../../../help/Tatum";


const HeaderLanding = (props) => {
    const [modal, setModal] = useState(false);
    const [modalSettings, setModalSettings] = useState(false);
    const [modalChat, setModalChat] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    // Listen to the Firebase Auth state and set the local state.


    useEffect(() => {
        const unregisterAuthObserver = fire.auth().onAuthStateChanged(user => {
            // console.log(user)
            setIsSignedIn(!user);
            if (modal) {
                setModal(!modal);

            }
            if (user) {
                createNewUser(user)
            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    const uiConfig = {
        signInFlow: 'popup',
        // signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // console.log(authResult)
                // console.log(redirectUrl)
                // console.log('CALLBACK')
                setIsSignedIn(!isSignedIn);
                setModal(!modal);
                props.clickEnterAccount();

            },
        },
        // forceSameDevice: false,
        // tosUrl: '/terms',
        // privacyPolicyUrl: '/policy'
    };

useEffect(()=>{
    console.log(props.user)
})
    /************************************************
     *Render
     ************************************************/
    return (
        <>
            <header className="header__landing">
                <div
                    className="headerLanding__logo__triangle"
                    onClick={() => {
                        props.clickEnterAccount();
                    }}
                >
                    <img src={bitcoin} alt="bitcoin" className="headerLanding__logo__img"/>
                </div>
                <div className={"header__landing__text"}>
                    HORSLEY
                </div>
                <div className="headerLanding__btn__login__container">
                    <ButtonCustom
                        variant={1}
                        text={isSignedIn ? 'SIGN IN' : 'SIGN OUT'}
                        click={() => setModal(!modal)}
                    />
                    {!isSignedIn && (
                        <div onClick={() => setModalSettings(!modalSettings)}>
                            <Svg
                                className={"headerLanding__btn__settings"}
                                viewBox="0 0 512 512"
                                path={<SettingsIcon/>}
                            />
                        </div>
                    )}
                </div>
            </header>
            {/*****************************************************************************************************
             ** MODAL CHAT
             ****************************************************************************************************/}
            <div onClick={() => setModalChat(!modalChat)} className={'btn__chat__container'}>
                <Svg
                    className={"btn__chat"}
                    viewBox="-30 -30 493.664 493.664"
                    path={<ChatIcon/>}
                />
            </div>
            {modalChat && (
                <div className={"modal__settings__container"}>
                    <div className={"modal__settings__close__container"}>
                        <div className={'chat__header__left'}>
                        </div>
                        <div className={'chat__header'}>CHAT WITH ADMIN</div>
                        <div onClick={() => setModalChat(!modalChat)}>
                            <Svg
                                className={"modal__settings__close__btn"}
                                viewBox="0 0 365.696 365.696"
                                path={<CloseIcon/>}
                            />

                        </div>
                    </div>
                    <div className={"modal_settings_settings__container"}>
                        <Row>
                            <Col md={12}>
                                {/*<Chat/>*/}
                                <ChatRoom/>
                            </Col>
                        </Row>
                    </div>
                    <div className={'chat__input__container'}>
                        {/*<Input*/}
                        {/*    className={'chat__message__input'}*/}
                        {/*    placeholder={'Enter text'}*/}
                        {/*    type={'text'}*/}
                        {/*    change={() => console.log('')}*/}
                        {/*    header={'message'}*/}
                        {/*/>*/}
                        {/*<ButtonCustom*/}
                        {/*    className={'chat__message__btn'}*/}
                        {/*    variant={1}*/}
                        {/*    text={'SEND'}*/}
                        {/*    click={() => console.log('')}*/}
                        {/*/>*/}
                    </div>
                </div>
            )}
            {/*****************************************************************************************************
             ** MODAL SETTINGS
             ****************************************************************************************************/}
            {modalSettings && (
                <div className={"modal__settings__container"}>
                    <div className={"modal__settings__close__container"}>
                        <div></div>
                        <div onClick={() => setModalSettings(!modalSettings)}>
                            <Svg
                                className={"modal__settings__close__btn"}
                                viewBox="0 0 365.696 365.696"
                                path={<CloseIcon/>}
                            />
                        </div>
                    </div>
                    <div className={"modal_settings_settings__container"}>

                        <InputSettingsAccount/>

                        {/*<Row>*/}
                        {/*<Col md={6}>*/}
                        {/*<Accordion defaultActiveKey="0">*/}
                        {/*    <Card className="card__container">*/}
                        {/*        <Card.Header className="card__header">*/}
                        {/*            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">*/}
                        {/*                BINANCE API*/}
                        {/*            </Accordion.Toggle>*/}
                        {/*        </Card.Header>*/}
                        {/*        <Accordion.Collapse eventKey="0">*/}
                        {/*            <Card.Body className={"modal__settings__card__settings__container"}>*/}
                        {/*                /!*<InputBinanceApi/>*!/*/}
                        {/*            </Card.Body>*/}
                        {/*        </Accordion.Collapse>*/}
                        {/*    </Card>*/}
                        {/*</Accordion>*/}
                        <br/>
                        {/* PASSWORD*/}
                        {/*<Accordion defaultActiveKey="0">*/}
                        {/*    <Card className="card__container">*/}
                        {/*        <Card.Header className="card__header">*/}
                        {/*            <Accordion.Toggle as={Button} variant="link" eventKey="1" className="button__accordion">*/}
                        {/*                CHANGE PASSWORD*/}
                        {/*            </Accordion.Toggle>*/}
                        {/*        </Card.Header>*/}
                        {/*        <Accordion.Collapse eventKey="1">*/}
                        {/*            <Card.Body className={"modal__settings__card__settings__container"}>*/}
                        {/*                <InputChangePassword/>*/}
                        {/*            </Card.Body>*/}
                        {/*        </Accordion.Collapse>*/}
                        {/*    </Card>*/}
                        {/*</Accordion>*/}
                        {/**/}
                        {/*</Col>*/}
                        {/*<Col md={6}>*/}
                        {/*<Accordion defaultActiveKey="0">*/}
                        {/*    <Card className="card__container">*/}
                        {/*        <Card.Header className="card__header">*/}
                        {/*            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">*/}
                        {/*                ACCOUNT SETTINGS*/}
                        {/*            </Accordion.Toggle>*/}
                        {/*        </Card.Header>*/}
                        {/*        <Accordion.Collapse eventKey="0">*/}
                        {/*            <Card.Body className={"modal__settings__card__settings__container"}>*/}
                        {/*                <InputSettingsAccount/>*/}
                        {/*            </Card.Body>*/}
                        {/*        </Accordion.Collapse>*/}
                        {/*    </Card>*/}
                        {/*</Accordion>*/}
                        {/*</Col>*/}
                        {/*</Row>*/}
                    </div>
                </div>


            )}
            {/*****************************************************************************************************
             ** MODAL LOGIN
             ****************************************************************************************************/}
            <Modal show={modal} onHide={() => setModal(!modal)} animation={true} centered>
                <div className="modal__form">
                    {isSignedIn ? (
                        <div className="form__container">
                            <div className="form__title">
                                <h3 className="title__login">SIGN IN</h3>
                            </div>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()}/>
                        </div>
                    ) : (
                        <div className="form__container">
                            <div className="form__title">
                                <h3 className="title__login">ARE YOU SURE</h3>
                                <Row className="form__button">
                                    <Col>
                                        <ButtonCustom
                                            className={"form__button__btn"}
                                            text={'YES'}
                                            click={() => {
                                                setModal(!modal);
                                                fire.auth().signOut();
                                                props.clickEnterAccount();
                                            }}
                                            variant={1}
                                        />
                                    </Col>
                                    <Col>
                                        <ButtonCustom
                                            className={"form__button__btn"}
                                            text={'NO'}
                                            click={() => {
                                                setModal(!modal)
                                            }}
                                            variant={1}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}
export default HeaderLanding;