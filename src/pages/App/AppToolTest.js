import React, {useEffect, useState} from 'react';
import {Col, Row, Tab, Tabs} from "react-bootstrap";
import SettingsApp from "./Components/MainApp/SettingsApp";
import Wallet from "./Components/Wallet/Wallet";
import InputSettingsAccount from "../Landing/header/Components/InputSettingsAccount";
import ChatRoom from "./Components/Chat/chatRoom";
import {fire} from "../../firebase/Firebase";
import ButtonCustom from "../../components/ButtonCustom";

const AppToolTest = ({
                         handleLanding,
                         account,
                         user,
                         currentUserId,
                         getUser,
                         isSignedIn,
                         setIsSignedIn,
                         handleLoadingFalse,
                         handleLoadingTrue
                     }) => {


    const [currentKey, setCurrentKey] = useState("SettingsApp")


    const eventKeyLogOut = () => {
        console.log("test")
        alert("waaw")
    }
    const removeStorage = () => {
        localStorage.removeItem("crypto__uid")
        localStorage.removeItem("id")
    }
    useEffect(() => {
        // console.log(user)
    }, [user])
    /************************************************
     *Render
     ************************************************/
    return (
        <main className="main">
            <section>
                <div className={"table__menu__container__app__nd"}>
                    <Tabs
                        // defaultActiveKey="SettingsApp"
                        id="uncontrolled-tab-example"
                        className="table__menu__tabs__app__nd"
                        // onSelect={()=>eventKeyLogOut(1)}
                        activeKey={currentKey}
                        onSelect={(k) => setCurrentKey(k)}
                    >
                        <Tab eventKey="SettingsApp" title="" tabClassName={"analysis__ico general__rules__table__tabs"}>
                            <SettingsApp/>
                        </Tab>
                        <Tab eventKey="admin" title=""
                             tabClassName="wallet__page__ico general__rules__table__tabs general__rules__table__tabs">
                            <div className="app__tabs__container ">
                                <Wallet getUser={getUser} account={account} currentUserId={currentUserId} user={user}
                                        handleLoadingFalse={handleLoadingFalse} handleLoadingTrue={handleLoadingTrue}/>
                            </div>
                        </Tab>
                        <Tab eventKey="analysis" title="" tabClassName=" settings__ico general__rules__table__tabs">
                            <div className="app__tabs__container">
                                <InputSettingsAccount user={user} currentUserId={currentUserId} getUser={getUser}/>
                            </div>
                        </Tab>
                        <Tab eventKey="history" title="" tabClassName=" history__ico general__rules__table__tabs">
                            <div className="app__tabs__container">
                                <h1 style={{textAlign: "center"}} className={"test__mode__under__development"}>UNDER
                                    DEVELOPMENT</h1>
                            </div>
                        </Tab>
                        <Tab eventKey="current price" title=" "
                             tabClassName=" current__price__ico general__rules__table__tabs">
                            <div className="app__tabs__container">
                                <h1 style={{textAlign: "center"}} className={"test__mode__under__development"}>UNDER
                                    DEVELOPMENT</h1>
                            </div>
                        </Tab>
                        <Tab eventKey="contact us" title=" "
                             tabClassName=" contact__us__ico general__rules__table__tabs">
                            <div className={'chat__header app__chat__header'}>CHAT WITH ADMIN</div>
                            <div className="app__tabs__container">
                                <ChatRoom/>
                            </div>
                        </Tab>
                        <Tab eventKey="news" title="" tabClassName="news__ico general__rules__table__tabs">
                            <div className="app__tabs__container">
                                <h1 style={{textAlign: "center"}} className={"test__mode__under__development"}>UNDER
                                    DEVELOPMENT</h1>
                            </div>
                        </Tab>
                        <Tab eventKey={'log out'} title="" tabClassName="logout__ico general__rules__table__tabs">
                            <div className="app__tabs__container">
                                <div className="form__container test__mode__under__development">
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
                                                        handleLanding()
                                                        // setModal(!modal);

                                                    }}
                                                    variant={1}
                                                />
                                            </Col>
                                            <Col>
                                                <ButtonCustom
                                                    className={"form__button__btn"}
                                                    text={'NO'}
                                                    click={() => {
                                                    }}
                                                    variant={1}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </main>
    )
};
export default AppToolTest;