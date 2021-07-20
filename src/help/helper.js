import React from "react";
import {fire} from '../firebase/Firebase.js';
import {
    addressBSC,
    addressCELO,
    addressTRON, balanceBSC,
    balanceCELO,
    balanceLTC,
    createAddressDeposit,
    createBTCWallet,
    createETH,
    createNewAccount,
    createPrivateKeyBTC,
    createPrivateKeyETH,
    createWalletLTC,
    depositAddressETH,
    depositAddressLTC,
    GetBalanceAddressBTC,
    getBalanceAddressETH,
    keyBSC,
    keyCELO,
    keyTRON,
    privateKeyLtc,
    walletBSC,
    walletCELO,
    walletTRON
} from "./Tatum";


const userRegister = {
    Email: '',
    Phone_Number: '',
    Password: '',
    Conform_Password: ''
};
const userSettings = {
    First_name: '',
    Middle_name: '',
    Last_name: '',
    Date_of_birth: '',
    Nationality: '',
    ID_copy_upload: ''
};
const userBinanceSettings = {
    Api_key: 'c3Wu4MjrpRWsQHdFumsQGBUQ6YFaGvwnqHUit2e2WZhTCGVxABZwEZaBWbutpkJy',
    Secret_key: 'nHGePdeAb8h5hnIdpatfDG4m40Kt3R2PEJm71I4T3uukRe6s11VOn8mMLNj1IgO4'
};
const userAppSettings = {
    app_key_use: false,
    app_key_1: '',
    app_key_2: '',
    app_key_3: '',
    app_key_4: '',
};

/**
 *  In All JSon's objects we use special symbols, after "$"
 *  Dictionary:
 *  I - important*
 *  P - photo array input btn
 *  V - video array input btn
 *  H - hide field
 *
 *
 */
export function generateNormalName(data) {
    // Change name - replace "_"
    let arr = [];
    let newArr = [];
    let optionsValue = [];
    let changedData = data.replaceAll('_', ' ');
    if (!changedData) return [];
    // First letter to UpperCase
    // changedData = changedData[0].toUpperCase() + changedData.slice(1);
    // Divide array to chars and get all options key
    arr = changedData.split('');
    let number$ = changedData.indexOf('$');
    let opt = [];

    for (let i = 0; i < arr.length; i++) {
        if (number$ < 0) {
            return {
                key: arr.join(''),
                type: []
            }
        }
        if (i < number$) {
            //delete space in the end of key
            if (i !== number$ - 1) {
                newArr.push(arr[i])
            }
        }
        if (i > number$) {
            if (arr[i] === " ") {
                optionsValue.push(opt.join(''));
                opt = []
            } else if (i === arr.length - 1) {
                opt.push(arr[i]);
                optionsValue.push(opt.join(''));
                opt = []
            } else {
                opt.push(arr[i])
            }
        }
    }
    return {
        key: newArr.join(''),
        type: optionsValue
    }
}

export function checkProblem(forms) {
    let problems = [];
    let repeatPasswordArr = []
    Object.entries(forms).map((el) => {
        const string = el[1].value
        el[1].options.forEach((o) => {

            if (o === "I" && string === "") {
                problems.push({el: el[1], msg: "Please fill in this field"})
            } else if (o === 'P' && typeof string !== "string") {
                problems.push({el: el[1], msg: "photo array"})
            } else if (o === 'R' && typeof string === "string") {
                //check password repeat
                if (repeatPasswordArr.length === 0 && string) {
                    repeatPasswordArr.push(string)
                } else {
                    repeatPasswordArr.push(string)

                    if (repeatPasswordArr[0] === repeatPasswordArr[1]) {
                        return
                    }
                    if (repeatPasswordArr[0] !== repeatPasswordArr[1]) {
                        problems.push({el: el[1], msg: "password not match"})
                    }
                }
            } else if (o.includes('PW') && typeof string === "string") {
                console.log('PW', string, o)
                const checkedData = o.replace('PW', '').split('')
                let counter = 0
                checkedData.map((el, indx) => {
                    //uppercase case
                    if (el === 'u' && typeof +checkedData[indx + 1] === 'number') {
                        let number = checkedData[indx + 1]

                        string.split('').map(character => {
                            console.log('chars', character)

                            if (character == character.toUpperCase()) {
                                counter = counter + 1
                            }
                        })
                        if (!counter) {
                            console.log('sdfslkfj', counter)
                            problems.push({el: el[1], msg: "need capital letter in your password"})
                        }

                    }
                })

            }

        })
    });
    return problems;
}

export function setDataToFirebase(forms) {
    let result = {}
    forms.map(el => {
            result = {...result, [el.keyText]: el.value}
        }
    )
    return result
}

/*** ================================================================================
 *          Parse Dates
 * ================================================================================*/
export function getDateFromMilliseconds(num) {
    const date = new Date(num);
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getUTCDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}

export function getDate() {
    const date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getUTCDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}

export function getDateInput(input) {
    if (input === undefined) {
        return "-"
    }
    try {
        const date = new Date(input);
        return date.getUTCDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    } catch (e) {
        return "0"
    }

}

/*** ================================================================================
 * FIREBASE
 * ================================================================================*/
export function getCollection(collection) {
    return new Promise(function (resolve, reject) {
        fire.firestore().collection(collection).get().then(res => {
            const data = [];
            res.forEach(doc => {
                data.push({
                    idPost: doc.id,
                    ...doc.data()
                })
            });
            resolve(data)
        }).catch(err => {
            reject(err);
        });
    });
}

export function getDocInCollection(collection, id) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).doc(id)
                .get()
                .then(querySnapshot => {
                    resolve(querySnapshot.data());
                });
        } catch (e) {
            reject(e);
        }
    })
}

export function getCollectionWhereKeyValue(collection, key, value) {
    return new Promise(function (resolve, reject) {
        fire.firestore().collection(collection).where(key, "==", value).get().then(res => {
            const data = [];
            res.forEach(doc => {
                data.push({
                    idPost: doc.id,
                    ...doc.data()
                })
            });
            resolve(data)
        }).catch(err => {
            reject(err);
        });
    });
}

export function setDocumentToCollection(collection, document) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).add(document)
                .then(r => {
                    resolve({result: r});

                }).catch(e => {
                reject(e);
            })
        } catch (e) {
            reject(e);
        }
    })
}

export function updateDocumentInCollection(collection, document, idDocumnent) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).doc(idDocumnent).update(document).then(r => {
                resolve({result: r})
            }).catch(e => {
                reject(e);
            })
        } catch (e) {
            reject(e);
        }
    })
}

export function deleteDocumentFromCollectionWithID(collection, idPost) {
    return new Promise(function (resolve, reject) {
        try {
            fire.firestore().collection(collection).doc(idPost).delete()
                .then(result => {
                    resolve(result)
                }).catch(function (error) {
                reject(error)
            });
        } catch (e) {
            reject(e)
        }
    })
}

/*** ================================================================================
 * USER
 * ================================================================================*/
// export function createNewUser(user) {
//     return new Promise(function (resolve, reject) {
//         getCollectionWhereKeyValue('users', 'uid_firebase', user.uid).then(r => {
//             localStorage.setItem('crypto__uid', user.uid);
//             if (r.length === 0) {
//                 setDocumentToCollection('users', {
//                     // ...userSettings,
//                     // ...userBinanceSettings,
//                     // ...userAppSettings,
//                     uid_firebase: user.uid,
//                     displayName_firebase: user.displayName,
//                     email_firebase: user.email,
//                     emailVerified_firebase: user.emailVerified,
//                     phoneNumber_firebase: user.phoneNumber,
//                     photoURL_firebase: user.photoURL,
//                     favoritePairs: [],
//                     account: {}
//                 }).then((r) => {
//                     localStorage.setItem('id', r.id)
//                 }).catch(e => {
//                     reject(e)
//                 })
//             } else {
//                 getCollectionWhereKeyValue('users', 'uid_firebase', localStorage.getItem('crypto__uid')).then(r => {
//                     console.log(r)
//                     localStorage.setItem('id', r[0].idPost)
//                 }).catch(e => {
//                     console.log(e)
//                 })
//             }
//         }).catch(e => {
//             reject(e)
//         })
//     });
// }
export function createNewUser(user,getUser) {
    return new Promise(function (resolve, reject) {
        getCollectionWhereKeyValue('users', 'uid_firebase', user.uid).then(r => {
                // localStorage.setItem('crypto__uid', user.uid);
                if (r.length === 0) {
                    // localStorage.setItem('id', r[0].idPost);
                    createNewAccount().then(accountUser => {
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
                                accountId:JSON.parse(accountUser).id
                            };
                            createBTCWallet().then(walletBTC => {
                                createPrivateKeyBTC(JSON.parse(walletBTC)).then(keyBTC => {
                                    createAddressDeposit(JSON.parse(walletBTC)).then(addressBTC => {
                                        GetBalanceAddressBTC(JSON.parse(addressBTC)).then(balanceBTC => {
                                            let BTC = {
                                                wallet: JSON.parse(walletBTC),
                                                privateKey: JSON.parse(keyBTC),
                                                address: JSON.parse(addressBTC),
                                                balance: JSON.parse(balanceBTC)
                                            };
                                            console.log("start1")
                                            createETH().then(walletETH => {
                                                createPrivateKeyETH(JSON.parse(walletETH)).then(keyETH => {
                                                    depositAddressETH(JSON.parse(walletETH)).then(addressETH => {
                                                        getBalanceAddressETH(JSON.parse(addressETH)).then(balanceETH => {
                                                            let ETH = {
                                                                wallet: JSON.parse(walletETH),
                                                                privateKey: JSON.parse(keyETH),
                                                                address: JSON.parse(addressETH),
                                                                balance: JSON.parse(balanceETH)
                                                            };
                                                            // console.log("start2")
                                                            // createWalletLTC().then(WalletLTC => {
                                                            //     privateKeyLtc(JSON.parse(WalletLTC)).then(KeyLtc => {
                                                            //         depositAddressLTC(JSON.parse(WalletLTC)).then(AddressLTC => {
                                                            //             balanceLTC(JSON.parse(AddressLTC)).then(balanceLTC => {
                                                            //                 let LTC = {
                                                            //                     wallet: JSON.parse(WalletLTC),
                                                            //                     privateKey: JSON.parse(KeyLtc),
                                                            //                     address: JSON.parse(AddressLTC),
                                                            //                     balance: JSON.parse(balanceLTC)
                                                            //                 }
                                                            //                 console.log("start3")
                                                                            // walletTRON().then(walletT => {
                                                                            //     keyTRON(JSON.parse(walletT)).then(keyT => {
                                                                            //         addressTRON(JSON.parse(walletT)).then(addressT => {
                                                                            //             let TRON = {
                                                                            //                 wallet: JSON.parse(walletT),
                                                                            //                 privateKey: JSON.parse(keyT),
                                                                            //                 address: JSON.parse(addressT),
                                                                            //                 // balance: JSON.parse(balanceLTC)
                                                                            //             }
                                                                            //             console.log("start4")
                                                                            //             walletCELO().then(walletCELO => {
                                                                            //                 keyCELO(JSON.parse(walletCELO)).then(keyCELO => {
                                                                            //                     addressCELO(JSON.parse(walletCELO)).then(addressCELO => {
                                                                            //                         balanceCELO(JSON.parse(addressCELO)).then(balanceCELO => {
                                                                            //                             let CELO = {
                                                                            //                                 wallet: JSON.parse(walletCELO),
                                                                            //                                 privateKey: JSON.parse(keyCELO),
                                                                            //                                 address: JSON.parse(addressCELO),
                                                                            //                                 balance: JSON.parse(balanceCELO)
                                                                            //                             }
                                                                            //                             walletBSC().then(walletBSC => {
                                                                            //                                 keyBSC(JSON.parse(walletBSC)).then(keyBSC => {
                                                                            //                                     addressBSC(JSON.parse(walletBSC)).then(addressBSC => {
                                                                            //                                         balanceBSC(JSON.parse(addressBSC)).then(balanceBSC => {
                                                                            //
                                                                            //                             let BSC={
                                                                            //                                 wallet: JSON.parse(walletBSC),
                                                                            //                                 privateKey: JSON.parse(keyBSC),
                                                                            //                                 address: JSON.parse(addressBSC),
                                                                            //                                 balance: JSON.parse(balanceBSC)
                                                                            //                             }
                                                                            //             console.log("BSC")
                                                                                        let user_to_firebase = {
                                                                                            ...userSettings,
                                                                                            ...userBinanceSettings,
                                                                                            ...userAppSettings,
                                                                                            uid_firebase: user.uid,
                                                                                            displayName_firebase: user.displayName === null ? '' : user.displayName,
                                                                                            email_firebase: user.email === null ? '' : user.email,
                                                                                            emailVerified_firebase: user.emailVerified,
                                                                                            phoneNumber_firebase: user.phoneNumber === null ? '' : user.phoneNumber,
                                                                                            photoURL_firebase: user.photoURL === null ? '' : user.photoURL,
                                                                                            favoritePairs: [],
                                                                                            account,
                                                                                            wallets: {
                                                                                                BTC,
                                                                                                ETH,
                                                                                                // LTC,
                                                                                                // TRON,
                                                                                                // CELO,
                                                                                                // BSC,

                                                                                            },
                                                                                        };
                                                                                        setDocumentToCollection('users', user_to_firebase).then(r => {
                                                                                            localStorage.setItem('id', r.id)
                                                                                            resolve(r)
                                                                                        }).catch(e => {
                                                                                            reject(e)
                                                                                        })
                                                                                        // });});});
                                                                                        //  });});});});});
                                                                                    // });
                                                                                // });
                                                                            // });
                                                                        // });
                                                                    // });
                                                                // });
                                                            // });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    ).catch(e => {
                        console.log(e)
                    });
                } else {
                    getCollectionWhereKeyValue('users', 'uid_firebase', user.uid).then(r => {
                        if (r[0]) {
                            localStorage.setItem('id', r[0].idPost)
                            // console.log("setItem id")
                        }
                        getUser()
                    }).catch(e => {
                        console.log(e)
                    })
                }
            }
        ).catch(e => {
            reject(e)
        })
    })
}



