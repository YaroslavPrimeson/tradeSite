import React from "react";
import "./index.scss"
import {Tab, Tabs} from "react-bootstrap";
import SettingsApp from "./Components/MainApp/SettingsApp";
import Svg from "../../components/Svg/Svg";
import CloseIcon from "../../components/Svg/Image/CloseIcon";
import InputSettingsAccount from "../Landing/header/Components/InputSettingsAccount";
import ChatRoom from "./Components/Chat/chatRoom";
import Wallet from "./Components/Wallet/Wallet";


const AppTool = () => {


    /************************************************
     *Render
     ************************************************/
    return (
        <main className="main">
            <section>
                <div className={"table__menu__container__app__nd"}>
                    <Tabs defaultActiveKey="wallet page" id="uncontrolled-tab-example"
                          className="table__menu__tabs__app__nd">
                        <Tab eventKey="wallet page" title="" tabClassName=" analysis__ico">
                                <SettingsApp/>
                        </Tab>
                        <Tab eventKey="admin" title="" tabClassName=" wallet__page__ico">
                            <div className="app__tabs__container">
                                <Wallet/>
                            </div>
                        </Tab>
                        <Tab eventKey="analysis" title="" tabClassName=" settings__ico ">
                            <div className="app__tabs__container">
                                <InputSettingsAccount/>
                            </div>

                        </Tab>
                        <Tab eventKey="history" title="" tabClassName=" history__ico">
                            <div className="app__tabs__container">

                            </div>
                        </Tab>
                        <Tab eventKey="current price" title=" " tabClassName=" current__price__ico">
                            <div className="app__tabs__container">

                            </div>
                        </Tab>
                        <Tab eventKey="contact us" title=" " tabClassName=" contact__us__ico">
                            <div className={'chat__header app__chat__header'}>CHAT WITH ADMIN</div>
                            <div className="app__tabs__container">
                                <ChatRoom/>
                            </div>

                        </Tab>
                        <Tab eventKey="news" title="" tabClassName="news__ico">
                            <div className="app__tabs__container">

                            </div>
                        </Tab>
                        <Tab eventKey="chat" title="" tabClassName="logout__ico">
                            <div className="app__tabs__container">

                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </section>
            {/*<section className="main-component__container">*/}
            {/*    <Row>*/}
            {/*        <Col md={8}>*/}
            {/*            <SettingsApp/>*/}
            {/*            <ProfitDataBlock/>*/}
            {/*        </Col>*/}
            {/*        <Col md={4}>*/}
            {/*            <OperationsBlock/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*    <Row>*/}
            {/*        <Col>*/}
            {/*            <ExchangeChart/>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</section>*/}
        </main>
    )
};
export default AppTool;
