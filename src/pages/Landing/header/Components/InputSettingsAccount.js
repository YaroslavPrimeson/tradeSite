import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import Input from "../../../../components/Input";
import ButtonCustom from "../../../../components/ButtonCustom";
import {updateDocumentInCollection} from "../../../../help/helper";
import {Slide, toast, ToastContainer} from "react-toastify";


const InputSettingsAccount = ({user, userIdPost, getUser}) => {
    /************************************************
     *State
     ************************************************/

    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [credentialSettings, setCredentialSettings] = useState({

        email_firebase: user !== undefined && user[0].email_firebase,
        Nationality: user !== undefined && user[0].Nationality,
        Date_of_birth: user !== undefined && user[0].Date_of_birth,
        displayName_firebase: user !== undefined && user[0].displayName_firebase,
        phoneNumber_firebase: user !== undefined && user[0].phoneNumber_firebase,
        ID_copy_upload: user !== undefined && user[0].ID_copy_upload,

        // email_firebase: '',
        // Nationality: '',
        // Date_of_birth: '',
        // displayName_firebase: '',
        // phoneNumber_firebase: '',
        // ID_copy_upload: '',
    });
    // email_firebase: '',
    // Nationality: '',
    // Date_of_birth: '',
    // displayName_firebase: '',
    // phoneNumber_firebase: '',
    // ID_copy_upload: '',

    const [apiCredentials, setApiCredentials] = useState({
        Api_key: user !== undefined && user[0].Api_key,
        Secret_key: user !== undefined && user[0].Secret_key,

        // Api_key: '',
        // Secret_key: '',
    });

    /************************************************
     * handle change state credentials
     ************************************************/
    const handleChangeSettings = (e) => {
        const {name, value} = e.target
        setCredentialSettings(prevState => {
            return {...prevState, [name]: value}
        })
    }
    const handleChangeApi = (e) => {
        const {name, value} = e.target
        setApiCredentials(prevState => {
            return {...prevState, [name]: value}
        })
    }
    /************************************************
     *update document in collection
     ************************************************/

    const setCredentialsInCollection = () => {
        if (credentialSettings.email_firebase === '' ||
            credentialSettings.Nationality === '' ||
            credentialSettings.Date_of_birth === '' ||
            credentialSettings.displayName_firebase === '' ||
            credentialSettings.phoneNumber_firebase === '' ||
            credentialSettings.ID_copy_upload === '') {
            setError(true)
            notify()
        } else {
            setError(false)
            updateDocumentInCollection('users', {
                Nationality: credentialSettings.Nationality,
                phoneNumber_firebase: credentialSettings.phoneNumber_firebase,
                email_firebase: credentialSettings.email_firebase,
                Date_of_birth: credentialSettings.Date_of_birth,
                ID_copy_upload: credentialSettings.ID_copy_upload,
                displayName_firebase: credentialSettings.displayName_firebase
                // }, userIdPost).then(r => {
            }, localStorage.getItem("id")).then(r => {
                console.log(r)
                getUser();
                // window.location.reload()
                notifySuccess()
            }).catch(e => {
                console.log(e)
            });
        }
    }

    const setApiInCollection = () => {
        if (apiCredentials.Api_key === "" || apiCredentials.Secret_key === "") {
            setError(!error)
        } else {
            updateDocumentInCollection('users', {
                Api_key: apiCredentials.Api_key,
                Secret_key: apiCredentials.Secret_key,
            }, localStorage.getItem("id")).then(r => {
                console.log("success")
            }).catch(e => {
                console.log(e)
            });
        }
    }
    /************************************************
     *useEffect
     ************************************************/
    useEffect(() => {
    }, [user, credentialSettings])
    const getInputInfo = () => {
        setCredentialSettings({
            email_firebase: user[0].email_firebase,
            Nationality: user[0].Nationality,
            Date_of_birth: user[0].Date_of_birth,
            displayName_firebase: user[0].displayName_firebase,
            phoneNumber_firebase: user[0].phoneNumber_firebase,
            ID_copy_upload: user[0].ID_copy_upload,
        });
        setApiCredentials({
            Api_key: user[0].Api_key,
            Secret_key: user[0].Secret_key,
        })
        console.log(credentialSettings)
    }
    const notify = () => toast.error('Write empty block', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        transition: Slide,
        limit: 1,
    });
    const notifySuccess = () => toast.success('Change saved', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        transition: Slide,
        limit: 1,
    });
    /************************************************
     *Render
     ************************************************/
    return (
        <>
            {/*{error &&*/}
            {/*<div className={'error__container'}>*/}
            {/*    <h1>Error!</h1>*/}
            {/*    <p>{errorText}</p>*/}
            {/*    <Button className={''} onClick={setError(!error)}>Close</Button>*/}
            {/*</div>*/}
            {/*}*/}
            {user !== undefined &&
                <div className={"input__settings__container"}>
            {/*<Row>*/}
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={1}

                />
                <Col>
                    {/*                                     BINANCE API                                         */}
                    <Accordion defaultActiveKey="0" className="display__none__test">
                        <Card className="card__container display__none__test">
                            <Card.Header className="card__header display__none__test">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">
                                    BINANCE API
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0" className={"display__none__test"}>
                                <Card.Body className={"modal__settings__card__settings__container"}>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Api key</p>
                                            <Input
                                                className={error ? 'chat__message__input__error' : "modal__settings__input chat__message__input"}
                                                type="text"
                                                value={credentialSettings.Api_key}
                                                placeholder={apiCredentials.Api_key === '' ? "Enter Api key" : apiCredentials.Api_key}
                                                name={'Api_key'}
                                                change={handleChangeApi}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Secret key</p>
                                            <Input
                                                className={error ? 'chat__message__input__error' : "modal__settings__input chat__message__input"}
                                                value={credentialSettings.Secret_key}
                                                type="text"
                                                // placeholder={user[0].Secret_key === '' ? "Enter Secret key" : user[0].Secret_key}
                                                placeholder={apiCredentials.Secret_key === '' ? "Enter Secret key" : apiCredentials.Secret_key}
                                                name={'Secret_key'}
                                                change={handleChangeApi}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <ButtonCustom
                                                className={"form__button__btn"}
                                                text={'Save'}
                                                click={() => {
                                                    setApiInCollection()
                                                }}
                                                variant={2}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
                <Col>
                    {/*                                     ACCOUNT SETTINGS                                        */}
                    <Accordion defaultActiveKey="0">
                        <Card className="card__container">
                            <Card.Header className="card__header">
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">
                                    ACCOUNT SETTINGS
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body className={"modal__settings__card__settings__container"}>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Email</p>
                                            <Input
                                                className={error ? 'chat__message__input__error' : " chat__message__input"}
                                                type="text"
                                                change={handleChangeSettings}
                                                placeholder={credentialSettings.email_firebase === '' ? "Enter email" : credentialSettings.email_firebase}
                                                name={'email_firebase'}
                                                value={credentialSettings.email_firebase}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Phone number</p>
                                            <Input
                                                className={error ? 'chat__message__input__error' : " chat__message__input"}
                                                type="tel"
                                                change={handleChangeSettings}
                                                placeholder={credentialSettings.phoneNumber_firebase === '' ? "Enter phone number" : credentialSettings.phoneNumber_firebase}
                                                name={'phoneNumber_firebase'}
                                                value={credentialSettings.phoneNumber_firebase}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Name</p>
                                            <Input
                                                placeholder={credentialSettings.displayName_firebase === '' ? "Enter your name" : credentialSettings.displayName_firebase}
                                                value={credentialSettings.displayName_firebase}
                                                className={error ? 'chat__message__input__error' : " chat__message__input"}
                                                type="text"
                                                name={"displayName_firebase"}
                                                change={handleChangeSettings}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Date of birth</p>
                                            <Input
                                                className={error ? 'chat__message__input__error' : " chat__message__input"}
                                                type="text"
                                                name={"Date_of_birth"}
                                                change={handleChangeSettings}
                                                // placeholder={user[0].Date_of_birth === '' ? "Enter date of birth" : user[0].Date_of_birth}
                                                placeholder={credentialSettings.Date_of_birth === '' ? "Enter date of birth" : credentialSettings.Date_of_birth}
                                                value={credentialSettings.Date_of_birth}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">Nationality</p>
                                            <Input className={error ? 'chat__message__input__error' : " chat__message__input"}
                                                   type="text"
                                                   name={"Nationality"}
                                                   change={handleChangeSettings}
                                                   placeholder={credentialSettings.Nationality === '' ? "Enter nationality" : credentialSettings.Nationality}
                                                   value={credentialSettings.Nationality}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <p className="modal__settings__p__text">ID copy upload</p>
                                            <Input className={error ? 'chat__message__input__error' : " chat__message__input"} type="text"
                                                   name={"ID_copy_upload"}
                                                   change={handleChangeSettings}
                                                   placeholder={credentialSettings.ID_copy_upload === '' ? "Enter ID copy upload" : credentialSettings.ID_copy_upload}
                                                   value={credentialSettings.ID_copy_upload}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="modal__settings__card__row">
                                        <Col className={"accordion__input__container"}>
                                            <ButtonCustom
                                                className={"form__button__btn"}
                                                text={'Save'}
                                                click={() => {
                                                    setCredentialsInCollection()
                                                    // checkProblemSettings()
                                                    // setDocumentInCollection()
                                                }}
                                                variant={2}
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>
            {/*</Row>*/}
                </div>
            }

            <br/>
        </>
    );
};

export default InputSettingsAccount;