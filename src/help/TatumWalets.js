const API_KEY = process.env.REACT_APP_TATUM_API_KEY;
const http = require("https");

export function createDifferentWallets(currency) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/${currency}/wallet`,
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
    })
}

export function createDifferentAddressDeposit(r,currency) {

    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/${currency}/address/${r.xpub}/0`,
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

export function createDifferentPrivateKeyBTC(r,currency) {
    return new Promise(function (resolve, reject) {
        const options = {
            "method": "POST",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": `/v3/${currency}/wallet/priv`,
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

export function balanceAddressDifferent(r,currency) {
    let path;
switch(currency){
    case "bitcoin":{
       path = `/v3/${currency}/address/balance/${r.address}`;
    }
        break
    case"ethereum":{
      path = `/v3/${currency}/account/balance/${r.address}`;
    }
        break
    case"litecoin":{
        path = `/v3/${currency}/address/balance/${r.address}`;
    }
        break
    case"tron":{
        // path = `/v3/${currency}/account/${r.address}`;
        path = `/v3/tron/account/${r.address}`;

    }
        break
    case"celo":{
        path =  `/v3/${currency}/account/balance/${r.address}`;
    }
        break
    case"bsc":{
        path =  `/v3/${currency}/account/balance/${r.address}`;
    }
        break
    case"scrypta":{
        // path =  `/v3/${currency}/account/balance/${r.address}`;
        path =  "/v3/scrypta/info";
    }
        break
    case"vet":{
        path =  `/v3/${currency}/account/balance/${r.address}`;
    }
        break
    case"xdc":{
        path =  `/v3/${currency}/account/balance/${r.address}`;
    }
        break

    default:
        break
}

    return new Promise(function (resolve, reject) {
        const options = {
            "method": "GET",
            "hostname": "api-eu1.tatum.io",
            "port": null,
            "path": path,
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



// /************************************************
//  * BTC
//  ************************************************/
//
//
// export function createBTCWallet() {
//     return new Promise(function (resolve, reject) {
//         const options = {
//             "method": "GET",
//             "hostname": "api-eu1.tatum.io",
//             "port": null,
//             // "path": "/v3/bitcoin/wallet?mnemonic=SOME_STRING_VALUE",
//             "path": "/v3/bitcoin/wallet",
//             "headers": {
//                 "x-api-key": API_KEY
//             }
//         };
//         const req = http.request(options, function (res) {
//             const chunks = [];
//             res.on("data", function (chunk) {
//                 chunks.push(chunk);
//             });
//             res.on("end", function () {
//                 const body = Buffer.concat(chunks);
//                 resolve(body.toString())
//                 // console.log(body.toString())
//             });
//
//         });
//         req.end();
//     })
// }
//
//
// export function createAddressDeposit(r) {
//     return new Promise(function (resolve, reject) {
//         const options = {
//             "method": "GET",
//             "hostname": "api-eu1.tatum.io",
//             "port": null,
//             "path": `/v3/bitcoin/address/${r.xpub}/0`,
//             // "path": `/v3/bitcoin/address/${xpub}/${0}`,
//             "headers": {
//                 "x-api-key": API_KEY
//             }
//         };
//
//         const req = http.request(options, function (res) {
//             const chunks = [];
//
//             res.on("data", function (chunk) {
//                 chunks.push(chunk);
//             });
//
//             res.on("end", function () {
//                 const body = Buffer.concat(chunks);
//                 resolve(body.toString());
//                 // console.log(body.toString())
//             });
//         });
//
//         req.end();
//     });
// }
//
// export function createPrivateKeyBTC(r) {
//     return new Promise(function (resolve, reject) {
//         const options = {
//             "method": "POST",
//             "hostname": "api-eu1.tatum.io",
//             "port": null,
//             "path": "/v3/bitcoin/wallet/priv",
//             "headers": {
//                 "content-type": "application/json",
//                 "x-api-key": API_KEY
//             }
//         };
//         const req = http.request(options, function (res) {
//             const chunks = [];
//             res.on("data", function (chunk) {
//                 chunks.push(chunk);
//             });
//             res.on("end", function () {
//                 const body = Buffer.concat(chunks);
//                 resolve(body.toString())
//             });
//         });
//         req.write(JSON.stringify({
//             index: 0,
//             // mnemonic: 'urge pulp usage sister evidence arrest palm math please chief egg abuse'
//             mnemonic: r.mnemonic
//         }));
//         req.end();
//     })
// }
//
// export function GetBalanceAddressBTC(r) {
//     return new Promise(function (resolve, reject) {
//         const options = {
//             "method": "GET",
//             "hostname": "api-eu1.tatum.io",
//             "port": null,
//             // "path": "/v3/bitcoin/address/balance/{address}",
//             "path": `/v3/bitcoin/address/balance/${r.address}`,
//             "headers": {
//                 "x-api-key": API_KEY
//             }
//         };
//         const req = http.request(options, function (res) {
//             const chunks = [];
//
//             res.on("data", function (chunk) {
//                 chunks.push(chunk);
//             });
//
//             res.on("end", function () {
//                 const body = Buffer.concat(chunks);
//                 resolve(body.toString())
//             });
//         });
//
//         req.end();
//     });
// }
//
//