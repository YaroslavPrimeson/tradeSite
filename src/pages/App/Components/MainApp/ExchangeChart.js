import {Accordion, Card, Button, Row, Col} from "react-bootstrap";
import React, {useEffect, useLayoutEffect, useState} from "react";
import RadioSwitch from "../../../../components/radioSwitch/RadioSwitch";
import {fire} from "../../../../firebase/Firebase";

const ExchangeChart =({pair, setDemoValue, demoValue, activeTrade,handleTrade}) => {
    /*************************************************************************************************
     *  State
     ************************************************************************************************/
    const [inputs, setInputs] = useState({
        uid__firebase: localStorage.getItem('crypto__uid'),
        id__user__firestore: '',
        status: true,
        demo: demoValue,
        extraExit: false,

        apiKey: '',
        secretKey: '',
        currencyPair: '',
        currencyPairNotSplitted: '',
        taker: 0.01,
        walletVolume: 20,
        loss: 0.5,
        buyNext: 0.01,
        takerUsd: 5
    });


    const [datas, setDatas] = useState();
    const [walletVolume, setWalletVolume] = useState([]);
    const [total, setTotal] = useState([]);
    // const [currentPrice, setCurrentPrice] = useState('')
    const [cPrice, setCPrice] = useState();
    const [conditional, setConditional] = useState();
    const [demoWallet,setDemoWallet] = useState();
    // useEffect(() => {
    //     // fire.database().ref('data/' + localStorage.getItem('crypto__uid')).on("child_added", (snapshot) => {
    //     fire.database().ref('data/' + localStorage.getItem('crypto__uid')).on("value", (snapshot) => {
    //         if (snapshot.val()) {
    //             const data = snapshot.val();
    //             // console.log(data)
    //             setCurrentPrice(data)
    //         } else {
    //             console.log('error')
    //         }
    //     });
    // }, [])

useEffect(()=>{
    fire.database().ref('conditionals/' + localStorage.getItem('crypto__uid')).on("value", (snapshot) => {
        if (snapshot.val()) {
            const data = snapshot.val();
            setConditional(data)
        } else {
            console.log('error')
        }
    });
},[])
    useEffect(()=>{

    },[conditional])
    useEffect(() => {
        fire.database().ref('actions/' + localStorage.getItem('crypto__uid')).on("child_added", (snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val();
                setDatas(data)
            } else {
                console.log('error')
            }
        });
    }, [])
    useEffect(() => {
        fire.database().ref('actions/' + localStorage.getItem('crypto__uid')).on("child_added", (snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val();
                setTotal(prevState => [...prevState, data])
            } else {
                console.log('error')
            }
        })
    }, [])
    useEffect(() => {
        console.log(total)
    }, [total])
    useEffect(() => {
        fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`).then(response => response.json()).then(data => {
            setCPrice(data)
        }).catch(e => {
            console.log(e)
        });
    }, [cPrice, pair])

    /************************************************
     *current wallet volume
     ************************************************/
    useEffect(() => {
        fire.database().ref('state/' + localStorage.getItem('crypto__uid')).on("child_added", (snapshot) => {
        // fire.database().ref('state/' + localStorage.getItem('crypto__uid')).on("value", (snapshot) => {
            if (snapshot.val()) {
                const wallet = snapshot.val();
                setWalletVolume(wallet)
            } else {
                console.log('error')
            }
        });
    }, [])
    useEffect(() => {
        fire.database().ref('demoBalance/' + localStorage.getItem('crypto__uid')).on("value", (snapshot) => {
        // fire.database().ref('demoBalance/' + localStorage.getItem('crypto__uid')).on("child_added", (snapshot) => {
            if (snapshot.val()) {
                const demoWallet = snapshot.val();
                setDemoWallet(demoWallet)
            } else {
                console.log('error')
            }
        });
    }, [])

useEffect(()=>{
    console.log(demoWallet?.walletVolume)
},[demoWallet])
    useEffect(() => {
    }, [demoValue, datas])

    /*************************************************************************************************
     *  Render
     ************************************************************************************************/
    return (
        <div  className="exchange__chart__container"  >
            <Row className="exchange__chart__subBlock__container first__row__container" style={!activeTrade ? { justifyContent:"space-between",height:"80px",alignItems:"center" } : {height:"auto"}}>
                <div className="exchange__chart__subBlock ">PriceBinance:<br/><p>{Number(cPrice?.price)}</p></div>
                {/*<div className="exchange__chart__subBlock">Price:<br/>{currentPrice}</div>*/}
                <div className={activeTrade ? "exchange__chart__subBlock " : "noneBlock"}>Stop:<br/><p>{conditional?.stopPrice.toFixed(2)}</p></div>
                <div className={activeTrade ? "exchange__chart__subBlock " : "noneBlock"}>Next:<br/><p>{datas?.nextBuyAt.toFixed(2)}</p></div>
                <div className={activeTrade ? "exchange__chart__subBlock " : "noneBlock"}>Safe Zone:<br/><p>{conditional?.safetyLine.toFixed(2)}</p></div>
                <div className={ "exchange__chart__subBlock " }
                >
                    <p>Demo</p>
                    <div className="form-radio-switch ">
                        <RadioSwitch isOn={demoValue}
                                     handleToggle={() => {
                                         setDemoValue(!demoValue)
                                         setInputs({...inputs, demo: !demoValue})
                                     }}/>
                    </div>
                </div>
            </Row>
            <Row className="exchange__chart__subBlock__container second__row__container">
                <div className={activeTrade ? "exchange__chart__subBlock second_row" : "noneBlock"}>Profit: <br/> <p>{datas?.profit.toFixed(2)}</p></div>
                <div
                    className={activeTrade ? "exchange__chart__subBlock second_row" : "noneBlock"}>Lose:<br/><p>{datas?.profit < 0 ? datas?.profit.toFixed(2) : 0}</p>
                </div>
                {/*<div className="exchange__chart__subBlock second_row">Lose:<br/>{datas?.profit.toFixed(2) } </div>*/}
                <div className={activeTrade ? "exchange__chart__subBlock second_row" : "noneBlock"}>Total:<br/><p>{total.length}</p> </div>
                {demoValue  ?
                    <div className={activeTrade ? "exchange__chart__subBlock second_row" : "noneBlock"}>Demo Balance:<br/><p>{demoWallet?.walletVolume.toFixed(2)}</p></div>
                    :
                    <div className={activeTrade ? "exchange__chart__subBlock second_row" : "noneBlock"}>Balance:<br/><p>{walletVolume}</p></div>
                }


            </Row>
            <Row className="third__row__container">
                <iframe
                    className="iframe"
                    // src={"https://s.tradingview.com/widgetembed/?frameElementId=tradingview_0b8b0&symbol=BINANCE%3A" + String.valueOf(pair) + "&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=Dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=BINANCE%3ABTCUSDT"}
                    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_0b8b0&symbol=BINANCE%3A${pair}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=Dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=BINANCE%3ABTCUSDT`}
                    frameBorder="0">
                </iframe>
            </Row>
            <Row className="exchange__chart__subBlock__container fourth__row__container">
                <div className={activeTrade ? "exchange__chart__subBlock third__row" : "noneBlock"}>Profit/loss %
                    <br/> <p>{conditional?.realTimePercentage.toFixed(2)}</p>
                </div>
                <div className={activeTrade ? "exchange__chart__subBlock third__row" : "noneBlock"}>Profit/loss $<br/>
                    <p>{conditional?.realTimeCash.toFixed(2)}</p>
                </div>

            </Row>

        </div>

    )
};
export default ExchangeChart

