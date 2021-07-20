import React, {useEffect, useState} from 'react';
import {fire} from "../../../firebase/Firebase";
import bitcoin from "../../../assets/horsley3.png";
import ButtonCustom from "../../../components/ButtonCustom";
import {Col, Modal, Row} from "react-bootstrap";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "./header.scss"

const HeaderTest = ({isSignedIn, showLanding, handleSign, getUser, loadFunction,loadFunction2}) => {
    /************************************************
     *State
     ************************************************/
    const [modal, setModal] = useState(false);
    /************************************************
     *ui Config
     ************************************************/
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                getUser();
                handleSign();
                setModal(!modal);
                loadFunction();
                loadFunction2();
            },
        },
    };
    /************************************************
     * handle
     ************************************************/
    const removeStorage = () => {
        localStorage.removeItem("crypto__uid")
        localStorage.removeItem("id")
    }
    /************************************************
     *Render
     ************************************************/
    return (
        <>
            <header className="header__landing">
                <div
                    className="headerLanding__logo__triangle"
                    onClick={() => {
                        isSignedIn ? setModal(!modal) : showLanding()
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
                </div>
            </header>
            {/*****************************************************************************************************
             ** MODAL LOGIN
             ****************************************************************************************************/}
            <Modal show={modal} onHide={() => setModal(modal)} animation={true} centered>
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
                                                removeStorage()
                                                fire.auth().signOut();
                                                showLanding();
                                                setModal(!modal);

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

export default HeaderTest;