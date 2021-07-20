import React, {useEffect, useState} from 'react';
import ButtonCustom from "../../../../components/ButtonCustom";
import {
    accountInfoXRP,
    addressScrypta,
    addressTRON,
    balanceTRON, createAccountXRP, infoScrypta,
    keyScrypta,
    keyTRON, sendBTCToAddress,
    walletScrypta,
    walletTRON
} from "../../../../help/Tatum";
import {
    balanceAddressDifferent,
    createDifferentAddressDeposit,
    createDifferentPrivateKeyBTC,
    createDifferentWallets
} from "../../../../help/TatumWalets";
import {getCollectionWhereKeyValue, updateDocumentInCollection} from "../../../../help/helper";
import Input from "../../../../components/Input";
const WalletMap = ({user, getUser, handleLoadingFalse, handleLoadingTrue, userWallets, setUserWallets}) => {
        /************************************************
         *state crypto coin
         ************************************************/
            //"TRON",// "SCRYPTA",
        const arrayCrypta = ["BITCOIN", "ETHEREUM", "LITECOIN", "CELO", "BSC", "VeChain", "XDC"];
        const [filterArrayCrypta, setFilterArrayCrypta] = useState([])
        const disabledCrypta = ["BITCOIN", "ETHEREUM"];
        const [newWallet, setNewWallet] = useState({});
        const [activeButton, setActiveButton] = useState(true);
        const [inputCrypta, setInputCrypta] = useState('')
        /**************************************************************************************
         *function for create wallet and with switch different wallets, set to firebase
         **************************************************************************************/
        const generalFunctionsWallets = (currency) => {
            createDifferentWallets(currency).then(walletD => {
                createDifferentAddressDeposit(JSON.parse(walletD), currency).then(addressDifferent => {
                    createDifferentPrivateKeyBTC(JSON.parse(walletD), currency).then(secretKey => {
                        balanceAddressDifferent(JSON.parse(addressDifferent), currency).then(balanceDifferent => {
                            switch (currency) {
                                case'bitcoin':
                                    let BTCCOIN = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, BTCCOIN}));
                                    break
                                case'ethereum':
                                    let ETHEREUM = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, ETHEREUM}));
                                    break
                                case'litecoin':
                                    let LITECOIN = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, LITECOIN}));
                                    break
                                case'tron':
                                    let TRON = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, TRON}));
                                    break
                                case'celo':
                                    let CELO = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, CELO}));
                                    break
                                case'bsc':
                                    let BSC = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, BSC}));
                                    break
                                case'scrypta':
                                    let SCRYPTA = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, SCRYPTA}));
                                    break
                                case'vet':
                                    let VeChain = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, VeChain}));
                                    break
                                case'xdc':
                                    let XDC = {
                                        wallet: JSON.parse(walletD),
                                        address: JSON.parse(addressDifferent),
                                        secretKey: JSON.parse(secretKey),
                                        balance: JSON.parse(balanceDifferent)
                                    }
                                    setUserWallets(prevState => ({...prevState, XDC}));
                                    break

                                default:
                                    break
                            }
                        });
                    });
                });
            });
        }
        const createSomeWallet = (r) => {
            handleLoadingTrue()
            switch (r) {
                case 'BITCOIN': {
                    let currency = 'bitcoin';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'ETHEREUM': {
                    let currency = 'ethereum';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'LITECOIN': {
                    let currency = 'litecoin';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'TRON': {
                    let currency = 'tron';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'CELO': {
                    let currency = 'celo';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'BSC': {
                    let currency = 'bsc';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'SCRYPTA': {
                    let currency = 'scrypta';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'VeChain': {
                    let currency = 'vet';
                    generalFunctionsWallets(currency)
                }
                    break
                case 'XDC': {
                    let currency = 'xdc';
                    generalFunctionsWallets(currency)
                }
                    break
                default:
                    break
            }
        }
        /************************************************
         * filter
         ************************************************/
        useEffect(() => {
            const filterCrypta = arrayCrypta.filter(el => (el.includes(inputCrypta)))
            setFilterArrayCrypta(filterCrypta)
        }, [inputCrypta])
        const inputFilter = (e) => {
            // setInputCrypta(e.target.value.toLowerCase())
            setInputCrypta(e.target.value)
        }
        useEffect(() => {
        }, [filterArrayCrypta])
        /************************************************
         *useEffect
         ************************************************/
        useEffect(() => {
            updateDocumentInCollection('users', {
                wallets: userWallets
            }, localStorage.getItem('id')).then(r => {
                if (!!user && user[0].wallets !== userWallets) {
                    getUser()
                }
                handleLoadingFalse()
            }).catch(e => {
                console.log(e)
            });
            // console.log(userWallets)
        }, [userWallets])
        useEffect(() => {
        }, [user])

    const sendToAddress = (user,toAddress,values)=>{
        sendBTCToAddress(user,toAddress,values).then(r=>{
            console.log(r)
        })
    }
const [sendAddress,setSendAddress] = useState();
const [sendNumberToAddress,setSendNumberToAddress] = useState();
const inputInfoForSend = [
    sendAddress,sendNumberToAddress,user
]
        /************************************************
         *Render
         ************************************************/
        return (
            <>
                {/*<form >*/}
                {/*    <input type="text" placeholder={"write address"} value={sendAddress}/>*/}
                {/*    <input type="text" placeholder={"write number"} value={sendNumberToAddress}/>*/}
                {/*    <button onClick={()=>sendToAddress(inputInfoForSend)}>send</button>*/}
                {/*</form>*/}

                <div className="input__wallet__map__container">
                    <Input className=" input__wallet__map input__different"
                           type="text"
                           placeholder={"Search crypto wallet"}
                        // value={value}
                           change={inputFilter}
                        // disabled={true}
                    />
                </div>
                <div className={"wallet__tabs__wrapper"}>
                    {filterArrayCrypta.map(r => (
                        <div className={"create__different__wallets__container"}>
                            <ButtonCustom
                                variant={2}
                                text={'Create wallet' + " " + r}
                                click={() => createSomeWallet(r)}
                                className={activeButton ? "wallet__card__add__wallet__button" : "wallet__card__add__wallet__button__disabled"}
                                // disabled={arrayCrypta[0] === true}
                            />

                        </div>
                    ))}
                </div>
            </>
        );
    }
;

export default WalletMap;