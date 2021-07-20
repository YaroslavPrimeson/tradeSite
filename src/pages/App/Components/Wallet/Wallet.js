import React, {useEffect, useState} from 'react';
import {
    addressBSC,
    addressCELO,
    addressScrypta,
    addressTRON,
    balanceBSC,
    balanceCELO,
    balanceTRON,
    createAccountXRP,
    GetCurrentExchangeRate,
    informationXRP,
    infoScrypta,
    keyBSC,
    keyCELO,
    keyScrypta,
    keyTRON,
    walletBSC,
    walletCELO,
    walletScrypta,
    walletTRON
} from "../../../../help/Tatum";
import WalletMap from "./WalletMap";
import {Accordion, Card, Tab, Tabs, Button} from "react-bootstrap";
import btcCoin from "../../../../assets/bitcoin-coin-black.svg";

const Wallet = ({currentUserId, user,getUser,handleLoadingFalse,handleLoadingTrue}) => {
    /************************************************
     *state
     ************************************************/
    const [userWallets, setUserWallets] = useState();
    /************************************************
     *useEffect
     ************************************************/

    useEffect(() => {
        if (!!user) {
            setUserWallets(user[0].wallets)
        }
    }, [user, currentUserId])
    useEffect(()=>{
    },[userWallets])
    /************************************************
     *Render
     ************************************************/
    return (
        <>
            <div className="wallet__container__wallet">
                <Accordion defaultActiveKey="0">
                    <Card className="card__container">
                        <Card.Header className="card__header">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">
                                <h2>Create wallet</h2>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className={"wallet__card__container"}>
                                {/*<div className="wallet__tabs__wrapper">*/}
                                <div>
                                    <WalletMap setUserWallets={setUserWallets} userWallets={userWallets} handleLoadingFalse={handleLoadingFalse} handleLoadingTrue={handleLoadingTrue} user={user} getUser={getUser}/>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion defaultActiveKey="0" style={{marginTop:"10px"}}>
                    <Card className="card__container">
                        <Card.Header className="card__header">
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">
                                <h2>Your wallet </h2>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className={"wallet__card__container wallets__rendering"}>
                                <>
                                    {!!userWallets && Object.entries(userWallets).map(r => (
                                        <>
                                            {/*<div >{r[0]}</div>*/}
                                            {/*<div>{r[1].address?.address}</div>*/}
                                            {/*<div>BALANCE : {r[1].balance?.balance === undefined? r[1].balance?.incoming && r[1].balance?.outgoing : r[1].balance?.balance }</div>*/}
                                            {/*{ r[1].balance?.balance === undefined &&*/}
                                            {/*<div>BALANCE : { r[1].balance?.incoming}</div>*/}
                                            {/*}*/}
                                            {/*<div>{r[1].privateKey?.key}</div>*/}
                                            {/*<div>{r[1].wallet?.mnemonic}</div>*/}
                                            {/*<div>{r[1].wallet?.xpub}</div>*/}
                                    <div className={"wallet__container__wallets"}>
                                        <Card className="wallet__card__container__wrapper"
                                        >
                                            <Card.Body>
                                                <Card.Title>{r[0]}</Card.Title>
                                                <img src={btcCoin} alt="#"
                                                     style={{
                                                         width: '60px',
                                                         position: "absolute",
                                                         right: "70px",
                                                         top: "25px",
                                                     }}/>
                                                <Card.Text>
                                                    <div className="wallet__card__wrapper">
                                                        <div
                                                            className="wallet__card__wrapper__header">
                                                            <h3>info</h3>
                                                            <p>mnemonic:{r[1].wallet?.mnemonic}</p>
                                                            <p>xpub:{r[1].wallet?.xpub}</p>
                                                        </div>

                                                        <div className="wallet__card__wrapper__body">
                                                            <h3>address</h3>
                                                            <p>address:{r[1].address?.address}</p>
                                                        </div>
                                                        <div className="wallet__card__wrapper__footer">
                                                            <h3>balance wallet</h3>
                                                            <div>BALANCE : {r[1].balance?.balance === undefined? r[1].balance?.incoming && r[1].balance?.outgoing : r[1].balance?.balance }</div>
                                                            { r[1].balance?.balance === undefined &&
                                                            <div>BALANCE incoming : { r[1].balance?.incoming}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                        </>
                                        ))}
                                </>



                                {/*<div className="wallet__tabs__wrapper">*/}
                                {/*<>*/}
                                {/*    <div className="wallet__wrapper">*/}
                                {/*        {user !== undefined && (*/}
                                {/*            <div>*/}
                                {/*                {!!user[0]?.wallets && user.map((el, index) => (*/}
                                {/*                    <>*/}
                                {/*                        <div style={{padding: '2rem'}}>*/}
                                {/*                            <Card className="wallet__card__container__wrapper"*/}
                                {/*                                // style={{width: '18rem'}}*/}
                                {/*                            >*/}
                                {/*                                <Card.Body>*/}
                                {/*                                    <Card.Title>BTC Wallet</Card.Title>*/}
                                {/*                                    <img src={btcCoin} alt="#"*/}
                                {/*                                         style={{*/}
                                {/*                                             width: '60px',*/}
                                {/*                                             position: "absolute",*/}
                                {/*                                             right: "70px",*/}
                                {/*                                             top: "25px",*/}
                                {/*                                         }}/>*/}
                                {/*                                    <Card.Text>*/}
                                {/*                                        <div key={index}*/}
                                {/*                                             className="wallet__card__wrapper">*/}
                                {/*                                            <div*/}
                                {/*                                                className="wallet__card__wrapper__header">*/}
                                {/*                                                <h3>info</h3>*/}
                                {/*                                                <p>mnemonic:{el.wallets?.BTC?.wallet.mnemonic}</p>*/}
                                {/*                                                <p>xpub:{el.wallets?.BTC?.wallet.xpub}</p>*/}
                                {/*                                            </div>*/}
                                {/*                                            <div*/}
                                {/*                                                className="wallet__card__wrapper__body">*/}
                                {/*                                                <h3>address</h3>*/}
                                {/*                                                <p>address:{el.wallets?.BTC?.address.address}</p>*/}
                                {/*                                            </div>*/}
                                {/*                                            <div*/}
                                {/*                                                className="wallet__card__wrapper__footer">*/}
                                {/*                                                <h3>balance</h3>*/}
                                {/*                                                <p>incoming:{el.wallets?.BTC?.balance.incoming}</p>*/}
                                {/*                                                <p>outgoing:{el.wallets?.BTC?.balance.outgoing}</p>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </Card.Text>*/}
                                {/*                                </Card.Body>*/}
                                {/*                            </Card>*/}
                                {/*                        </div>*/}
                                {/*                    </>*/}
                                {/*                ))}*/}
                                {/*            </div>*/}
                                {/*        )}*/}
                                {/*    </div>*/}
                                {/*</>*/}
                                {/*</div>*/}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>

            </div>
        </>
    );
};

export default Wallet;