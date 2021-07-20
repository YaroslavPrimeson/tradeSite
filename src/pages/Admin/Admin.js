import React, {useEffect, useState} from 'react';
import {Tab, Nav, Row, Col} from 'react-bootstrap';
import Statistics from "./Components/Statistics";
import ChatAdmin from "./Components/ChatAdmin";
import TradeNavigating from "./Components/TradeNavigation/TradeNavigating";
import {getCollection, getCollectionWhereKeyValue, updateDocumentInCollection} from "../../help/helper";
import {createNewAccount} from "../../help/Tatum";
// import ChatRoomAdmin from "./Components/ChatAdmin/ChatRoomAdmin";

const Admin = () => {
    /**********************************************************
     * state
     **********************************************************/
    const [users, setUsers] = useState([]);
    const [accountAdmin, setAccountAdmin] = useState();
    /**********************************************************
     * useEffect
     **********************************************************/
    useEffect(() => {
        getCollection('users').then(r => {
            // console.log(r.find(r=>(r.idPost === 'Admin')))
            // console.log(r.filter(r=>(r.idPost !== 'Admin')))
            setUsers(r)
            setUsers(r.filter(r => (r.idPost !== 'Admin')))
        }).catch(e => {
        })
    }, []);
    useEffect(() => {
        // getCollectionWhereKeyValue('users', 'uid_firebase', 'Admin').then(r => {
        //     if (r[0]) {
        //         createNewAccount().then(r => {
        //             console.log(JSON.parse(r))
        //             let account = {
        //                 currency: JSON.parse(accountUser).currency,
        //                 active: JSON.parse(accountUser).active,
        //                 balance: {
        //                     accountBalance: JSON.parse(accountUser).balance.accountBalance,
        //                     availableBalance: JSON.parse(accountUser).balance.availableBalance
        //                 },
        //                 accountCode: JSON.parse(accountUser).accountCode,
        //                 accountNumber: JSON.parse(accountUser).accountNumber,
        //                 frozen: JSON.parse(accountUser).frozen,
        //                 xpub: JSON.parse(accountUser).xpub,
        //                 accountingCurrency: JSON.parse(accountUser).accountingCurrency,
        //                 customerId: JSON.parse(accountUser).customerId,
        //                 accountId:JSON.parse(accountUser).id
        //             }
        //             updateDocumentInCollection('users', {
        //                 account: account
        //             }, 'Admin').then(r => {
        //             }).catch(e => {
        //                 console.log(e)
        //             });
        //         })
        //     }
        // })

    }, [])

    const lllll = () => {
        getCollectionWhereKeyValue('users', 'uid_firebase', 'Admin').then(r => {
            if (r[0]) {
                createNewAccount().then(accountUser => {
                    // console.log(JSON.parse(accountUser))
                    let account = {
                        currency: JSON.parse(accountUser).currency,
                        active: JSON.parse(accountUser).active,
                        balance: {
                            accountBalance: JSON.parse(accountUser).balance.accountBalance,
                            availableBalance: JSON.parse(accountUser).balance.availableBalance
                        },
                        accountCode: JSON.parse(accountUser).accountCode,
                        accountNumber: JSON.parse(accountUser).accountNumber,
                        frozen: JSON.parse(accountUser).frozen,
                        xpub: JSON.parse(accountUser).xpub,
                        accountingCurrency: JSON.parse(accountUser).accountingCurrency,
                        customerId: JSON.parse(accountUser).customerId,
                        accountId: JSON.parse(accountUser).id
                    }
                    console.log(account)
                    // updateDocumentInCollection('users', {
                    //     account: account
                    // }, 'Admin').then(r => {
                    //     console.log('success')
                    // }).catch(e => {
                    //     console.log(e)
                    // });
                })
            }
        })
    }


    const [filterUser, setFilterUser] = useState([]);
    /**********************************************************
     * Filter
     **********************************************************/
    const filterUsers = (input) => {
        const newFilter = users.filter((p) => (p.displayName_firebase?.toLowerCase().includes(input) ||
            p.uid_firebase?.toLowerCase().includes(input) ||
            p.Api_key?.toLowerCase().includes(input) ||
            p.Secret_key?.toLowerCase().includes(input) ||
            p.email_firebase?.toLowerCase().includes(input) ||
            p.phoneNumber_firebase?.toLowerCase().includes(input) ||
            p.ID_copy_upload?.toLowerCase().includes(input)
        ))
        setFilterUser(newFilter)
    }
    useEffect(() => {
        // const filterUsers = users.filter((p) =>(p.displayName_firebase?.toLowerCase().includes(inputFilterState) ||
        //     p.uid_firebase?.toLowerCase().includes(inputFilterState)
        // ))
        setFilterUser(users)
    }, [users]);
    // }, [users,inputFilterState]);
    // const inputFilter = (e) => {
    //     setInputFilterState(e.target.value)
    //     console.log(e.target.value.toLowerCase())
    // }
    useEffect(() => {
    }, [filterUser])

    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div className={'admin__container'}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="Statistics">
                <Row>
                    <Col>
                        <Nav variant="pills" className="flex-row tabs__container">
                            <Nav.Item>
                                <Nav.Link eventKey="Statistics" className={'custom__btn'}>Statistics</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Trade settings" className={'custom__btn'}>Trade settings</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Trade navigating" className={'custom__btn'}>Trade
                                    navigating</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Administration" className={'custom__btn'}>Administration</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="Inbox" className={'custom__btn'}>Inbox</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Tab.Content>
                            <Tab.Pane eventKey="Statistics">
                                <Statistics users={users}
                                            filterUser={filterUser}
                                            filterUsers={filterUsers}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Trade settings">
                                <h1>settings</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Trade navigating">
                                <TradeNavigating users={users}
                                                 filterUser={filterUser}
                                                 filterUsers={filterUsers}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Administration">
                                <h1>Administration</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Inbox">
                                <ChatAdmin users={users}
                                           filterUser={filterUser}
                                           filterUsers={filterUsers}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default Admin;