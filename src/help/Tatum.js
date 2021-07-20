const http = require("https");

const API_KEY = process.env.REACT_APP_TATUM_API_KEY;

/*** ================================================================================
 * USER
 ================================================================================*/
export function createNewAccount() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/ledger/account",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                // console.log(body.toString());
                resolve(body.toString());
                console.log(JSON.parse(body.toString()));
            });
        });

        //CUSTOMER ID
        //60b09b6f2bfac4b087a6f967
        //60b09b6f2bfac4b087a6f967
        //60b09b6f2bfac4b087a6f967

        //ACCOUNT ID OR ID
        //60cdc3281e5fc8fd988d084b
        //60c71439804180d0bcb45625
        //60c06bc7e903df3395cdbf8f

        req.write(JSON.stringify({
            // test:,
            currency: 'BTC',
            xpub: 'tpubDEPZ1fUVWfdBom2tm4EKoSoLmFdpRLibizNfCHEYN4uyQbnkKgzEt7o137SJ4V9e2G57DgRXVxZxewhFxjRGmzxpdKhQKcMAwJNvcCJtWya',
            customer: {
                accountingCurrency: 'USD',
                customerCountry: 'UA',
                externalId: '6519161651',
                providerCountry: 'UA'
            },
            compliant: false,
            accountCode: 'AC_1011_B',
            accountingCurrency: 'USD',
            accountNumber: '123456'
        }));
        req.end();
    });
}

export function listAllAccounts() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/ledger/account?pageSize=10&offset=0",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        req.end();
    });
}

/*** ================================================================================
 * Current exchange
 ================================================================================*/
export function GetCurrentExchangeRate(currency) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/tatum/rate/${currency}?basePair=USD`,
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
                // console.log(body.toString());
            });
        });

        req.end();
    });
}


/************************************************
 * BTC
 ************************************************/
export function createBTCWallet() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            // "path": "/v3/bitcoin/wallet?mnemonic=SOME_STRING_VALUE",
            "path": "/v3/bitcoin/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
                // console.log(body.toString())
            });

        });
        req.end();
    })
}


export function createAddressDeposit(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/bitcoin/address/${r.xpub}/0`,
            // "path": `/v3/bitcoin/address/${xpub}/${0}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
                // console.log(body.toString())
            });
        });

        req.end();
    });
}

export function createPrivateKeyBTC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bitcoin/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });
        req.write(JSON.stringify({
            index: 0,
            // mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse'
            mnemonic: r.mnemonic
        }));
        req.end();
    })
}

export function GetBalanceAddressBTC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            // "path": "/v3/bitcoin/address/balance/{address}",
            "path": `/v3/bitcoin/address/balance/${r.address}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });

        req.end();
    });
}


/************************************************
 * Bitcoin cash
 ************************************************/

export function createBitcoinCashWallet() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            // "path": "/v3/bcash/wallet?mnemonic=SOME_STRING_VALUE",
            "path": "/v3/bcash/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        req.end();
    })
}

export function createPrivateKeyBitcoinCash() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bcash/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        req.write(JSON.stringify({
            index: 0,
            mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse'
        }));
        req.end();
    })
}

export function DepositAddressBitcoinCash(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bcash/address/{xpub}/{index}",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.end();
    })
}

export function sendToAddressesBitcoinCash() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bcash/transaction",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "REPLACE_KEY_VALUE"
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
                resolve(body.toString())
            });
        });

        req.write(JSON.stringify({
            fromUTXO: [
                {
                    txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
                    index: 0,
                    privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'
                }
            ],
            to: [
                {
                    address: 'bitcoincash:qrd9khmeg4nqag3h5gzu8vjt537pm7le85lcauzez',
                    value: 0.02969944
                }
            ]
        }));
        req.end();
    })
}

export function sendBTCToAddress(user, to, values) {
    return new Promise(function (resolve, reject) {
        let wallet = user[0].wallets.BTC
        console.log(wallet.privateKey.key)
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bitcoin/transaction",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.write(JSON.stringify({
            fromAddress: [
                {
                    address: wallet.address.address,
                    privateKey: wallet.privateKey.key
                }
            ],
            to: [{address: to, value: values}]
        }));
        req.end();
    })
}

/************************************************
 * ETH
 ************************************************/
export function createETH() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            // "path": "/v3/ethereum/wallet?mnemonic=SOME_STRING_VALUE",
            "path": "/v3/ethereum/wallet?",
            "headers": {
                "x-api-key": API_KEY,
                "useQueryString": true
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });
        req.end();
    });
}

export function createPrivateKeyETH(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/ethereum/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });
        req.write(JSON.stringify({
            index: 0,
            mnemonic: r.mnemonic
        }));
        req.end();
    })
}

export function depositAddressETH(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/ethereum/address/${r.xpub}/0`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });

        req.end();
    });
}

export function getBalanceAddressETH(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/ethereum/account/balance/${r.address}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });
        req.end();
    });
}

/************************************************
 * Litecoin
 ************************************************/

export function createWalletLTC() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            // "path": "/v3/litecoin/wallet?mnemonic=SOME_STRING_VALUE",
            "path": "/v3/litecoin/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString())
            });
        });
        req.end();
    });
}

export function privateKeyLtc(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/litecoin/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
                // console.log(body.toString());
            });
        });
        req.write(JSON.stringify({
            index: 0,
            mnemonic: r.mnemonic
        }));
        req.end();
    })
}

export function depositAddressLTC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/litecoin/address/${r.xpub}/0`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
                // console.log(body.toString());
            });
        });
        req.end();
    });
}

export function balanceLTC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/litecoin/address/balance/${r.address}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                // console.log(body.toString());
                resolve(body.toString());
            });
        });
        req.end();
    })
}

export function sendToAddressesLTC() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/litecoin/transaction",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.write(JSON.stringify({
            fromAddress: [
                {
                    address: '2N9bBiH2qrTDrPCzrNhaFGdkNKS86PJAAAS',
                    privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf'
                }
            ],
            to: [{address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7', value: 0.02969944}]
        }));
        req.end();
    })
}

/************************************************
 * XRP
 ************************************************/
export function createAccountXRP() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/xrp/account",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });
        req.end();
    });
}

export function informationXRP(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/xrp/info",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });
        req.end();
    });
}

export function accountInfoXRP(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/xrp/account/${r.account}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    })
}

export function balanceXRP(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            // "path": "/v3/xrp/account/{account}/balance",
            "path": `/v3/xrp/account/${r}/balance`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function sendToAddressesXRP(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/xrp/transaction",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        req.write(JSON.stringify({
            fromAccount: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
            to: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
            amount: '10000',
            fromSecret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
            fee: '10000',
            sourceTag: 12355,
            destinationTag: 12355
        }));
        req.end();
    });
}

/************************************************
 * Binance
 ************************************************/

export function createBinance(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bnb/account",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
                console.log(body.toString());
            });
        });

        req.end();
    });
}

/************************************************
 * CELO
 ************************************************/
export function walletCELO() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/celo/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function keyCELO(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/celo/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.write(JSON.stringify({
            index: 0,
            // mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse'
            mnemonic: r.mnemonic
        }));
        req.end();
    });
}

export function addressCELO(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/celo/address/${r.xpub}/0`,
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function balanceCELO(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/celo/account/balance/${r.address}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });
        req.end();
    });
}

/************************************************
 * BSC
 ************************************************/
export function walletBSC() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bsc/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function keyBSC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/bsc/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.write(JSON.stringify({
            index: 0,
            // mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse'
            mnemonic: r.mnemonic
        }));
        req.end();
    });
}

export function addressBSC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/bsc/address/${r.xpub}/0`,
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function balanceBSC(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/bsc/account/balance/${r.address}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });
        req.end();
    });
}

/************************************************
 * Scrypta
 ************************************************/
export function walletScrypta() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/scrypta/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });
        req.end();
    });
}

export function keyScrypta(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/scrypta/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.write(JSON.stringify({
            index: 0,
            mnemonic: r.mnemonic
        }));
        req.end();
    });
}

export function addressScrypta(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/scrypta/address/${r.xpub}/0`,
            "headers": {
                "x-api-key": API_KEY
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());

            });
        });
        req.end();
    });
}

export function infoScrypta() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/scrypta/info",
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

/************************************************
 * TRON
 ************************************************/

export function walletTRON() {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/tron/wallet",
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function keyTRON(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": "/v3/tron/wallet/priv",
            "headers": {
                "content-type": "application/json",
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.write(JSON.stringify({
            index: 0,
            // mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse'
            mnemonic: r.mnemonic
        }));
        req.end();
    });
}

export function addressTRON(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/tron/address/${r.xpub}/0`,
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });

        req.end();
    });
}

export function balanceTRON(r) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/tron/account/${r.address}`,
            "headers": {
                "x-api-key": API_KEY
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                resolve(body.toString());
            });
        });
        req.end();
    });
}