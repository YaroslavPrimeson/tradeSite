import React, {useState, useEffect} from "react";
import {Row, Col, Tabs, Tab} from "react-bootstrap";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import ButtonCustom from "../../../../components/ButtonCustom";
import fireSvg from "../../../../assets/fire.svg";
import stop from "../../../../assets/cancel.svg";
import sell from "../../../../assets/no-stopping.svg";
import {fire} from "../../../../firebase/Firebase";
import {getCollectionWhereKeyValue, updateDocumentInCollection} from "../../../../help/helper";
import "react-resizable/css/styles.css";
import {ResizableBox} from "react-resizable";
import ExchangeChart from "./ExchangeChart";
import OperationsBlock from "./OperationsBlock";
import PairsBlock from './Pairs/PairsBlock';
import {ToastContainer, toast, Slide} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SettingsApp = () => {
    /*************************************************************************************************
     * State:
     * currentPrice
     * demo
     * favoritePairs
     * pairs from binance API
     * error
     ************************************************************************************************/
    const [sizes, setSizes] = useState({
        h: 0,
        h_inner: 0,
        w: 0,
        l_c_h: 0,
        l_c_w: 0,
        r_c_h: 0,
        r_c_w: 0,
        r_c_t_h: 0,
        r_c_t_w: 0,
        r_c_b_h: 0,
        r_c_b_w: 0,
    });
    const [disabled, setDisabled] = useState(false)
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentPair, setCurrentPair] = useState('BTCUSDT')
    const [demoValue, setDemoValue] = useState(true);
    const [pairsFavorite, setPairsFavorite] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [id__user__firestore, setId__user__firestore] = useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [inputs, setInputs] = useState({
        uid__firebase: localStorage.getItem('crypto__uid'),
        id__user__firestore: '',
        status: true,
        // demo: true,
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
        // taker: '',
        // walletVolume: '',
        // loss: '',
        // buyNext: '',
        // takerUsd: ''
    });
    const [eventKeyTab, setEventKeyTab] = useState();
    const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
    const [activeTrade, setActiveTrade] = useState(false)
    /*************************************************************************************************
     * Start Component
     ************************************************************************************************/
    useEffect(()=>{
    },[demoValue])

    useEffect(()=>{
        let h = window.innerHeight;
        // let h_inner = h - h * 0.25;
        let h_inner = h - h * 0.15;
        let w = window.innerWidth * 0.95;

        setSizes({
            h: h,
            h_inner: h_inner,
            w: w,

            l_c_h: h_inner,
            l_c_w: w * 0.8,

            r_c_h: h_inner,
            r_c_w: w * 0.2,
            // r_c_w:  w -  w * 0.8 ,

            r_c_t_h: h_inner * 0.5,
            r_c_t_w: w * 0.2,

            r_c_b_h: h_inner * 0.5,
            r_c_b_w: w * 0.2,
        })
        window.addEventListener("resize", updateWidth);
    },[sizeWindow])
    const updateWidth =()=>{
        setSizeWindow(window.innerWidth)
    }
    useEffect(()=>{
        // console.log(sizes)
    },[sizes])
    useEffect(() => {
        // Set sizes for resizable elements
        // let h = window.innerHeight;
        // // let h_inner = h - h * 0.25;
        // let h_inner = h - h * 0.15;
        // let w = window.innerWidth * 0.95;
        // setSizes({
        //     h: h,
        //     h_inner: h_inner,
        //     w: w,
        //
        //     l_c_h: h_inner,
        //     l_c_w: w * 0.8,
        //
        //     r_c_h: h_inner,
        //     r_c_w: w * 0.2,
        //
        //     r_c_t_h: h_inner * 0.5,
        //     r_c_t_w: w * 0.2,
        //
        //     r_c_b_h: h_inner * 0.5,
        //     r_c_b_w: w * 0.2,
        //
        // })
        // Get pairs from binance API
        fetch('https://api.binance.com/api/v1/exchangeInfo').then(response => response.json()).then(data => {
            setPairs(data.symbols)
        }).catch(e => {
            console.log('error')
            // setError(true);
            // setErrorText(e);
        });
        // Get user idPost
        getCollectionWhereKeyValue('users', 'uid_firebase', localStorage.getItem('crypto__uid')).then(r => {
            if (r[0]) {
                setId__user__firestore(r[0].idPost)
                setInputs({
                    ...inputs,
                    id__user__firestore: r[0].idPost,
                    apiKey: r[0].Api_key,
                    secretKey: r[0].Secret_key
                })
                setPairsFavorite(r[0].favoritePairs)
            }
        }).catch(e => {
            setError(true);
            setErrorText(e);
        })
    }, []);
    /*************************************************************************************************
     * Current price socket connection from old version
     ************************************************************************************************/
    // useEffect(() => {
    //     const eventHandler = (response) => CurrentPriceEvent(response.currentPrice);
    //
    //     socket.once("connect", () => {
    //         let optionsFromLocalStorage = localStorage.getItem(getCookie('userId'));
    //         if(optionsFromLocalStorage){
    //             socket.emit('binanceApp', {
    //                 'status': false,
    //             });
    //             console.log(socket.connected);
    //             let optionsFromLocalStorageObj=JSON.parse(optionsFromLocalStorage);
    //             optionsFromLocalStorageObj.restarted = true;
    //             socket.emit('binanceApp', optionsFromLocalStorageObj);
    //             startEvent(true)
    //         }
    //     });
    //     //Тут обработка когда приходит нам с бэка
    //     socket.on('currentPrice', eventHandler);
    //     //Тут когда мы открываем страницу либо меняем пару валют
    //     socket.emit('currentPrice', {
    //         'currencyPair': currencyPairsValue ? currencyPairsValue : 'BTCUSDT'
    //     });
    //
    //     //
    //
    //     socket.once("disconnect", () => {
    //         socket.emit('binanceApp', {
    //             'status': false,
    //         });
    //     });
    //
    //     return () => socket.off('binanceApp', eventHandler)
    // }, [currencyPairsValue])
    /*************************************************************************************************
     *  Handle inputs
     ************************************************************************************************/
    const handleInput = (e, type) => {
        switch (type) {
            case 'Wallet volume in %':
                setInputs({...inputs, walletVolume: parseFloat(e.target.value)})
                return;
            case 'Wallet volume in $':
                setInputs({...inputs, walletVolume: parseFloat(e.target.value)})
                return;
            case 'Taker commission in %':
                setInputs({...inputs, taker: parseFloat(e.target.value)})
                return;
            case 'Taker USD for Safety zone':
                setInputs({...inputs, takerUsd: parseFloat(e.target.value)})
                return;
            case 'Stop loss':
                setInputs({...inputs, loss: parseFloat(e.target.value)})
                return;
            case 'Buy next in percentage':
                setInputs({...inputs, buyNext: parseFloat(e.target.value)})
                return;
            default:
                return;
        }
    };

    const handleSelectPair = (pair) => {
        setInputs({...inputs, currencyPair: pair.replace('/', ''), currencyPairNotSplitted: pair})
        setCurrentPair(pair.replace('/', ''))
        saveNewFavoritePairs(pair)
        // Set Pair to CHART!!!!
    };

    // const handleSelect = (key) => {
    //     if(key){}
    // }
    /*************************************************************************************************
     *  Buttons
     ************************************************************************************************/
    const start = () => {
        if (inputs?.buyNext === false ||
            inputs?.takerUsd === false ||
            inputs?.loss === false ||
            inputs?.taker === false) {
            setError(!error)
        } else if (inputs?.currencyPair === '') {
            notify()
        } else {
            // saveNewFavoritePairs()
            setDisabled(true)
            //Send Task to RTDB
            fire.database().ref('orders/' + localStorage.getItem('crypto__uid')).set(
                JSON.stringify(inputs), (error) => {
                    if (error) {
                        setError(true);
                        setErrorText(error);
                        console.log(error)
                    } else {
                        console.log("SUCCESS")
                    }
                })
            setActiveTrade(true)
        }
        // open currentPrice getting
        // fire.database().ref('data/' + localStorage.getItem('crypto__uid')).on('value', (snapshot) => {
        //     if (snapshot.val()) {
        //         const data = snapshot.val();
        //         setCurrentPrice(data)
        //     }
        // });
    };
    const stopWork = () => {
        setDisabled(false)
        fire.database().ref('orders/' + localStorage.getItem('crypto__uid')).set(
            JSON.stringify({...inputs, status: false}), (error) => {
                if (error) {
                    setError(true);
                    setErrorText(error);
                } else {
                    console.log("SUCCESS")
                    // console.log(inputs)
                }
            });

    };
    const extraStopWork = () => {
        setDisabled(false)
        fire.database().ref('orders/' + localStorage.getItem('crypto__uid')).set(
            JSON.stringify({
                ...inputs,
                extraExit: true,
                status: false,
                extraPrice: currentPrice,
                extraTaker: inputs.takerUsd,
                currencyPair: inputs.currencyPair
            }), (error) => {
                if (error) {
                    setError(true);
                    setErrorText(error);
                } else {
                    console.log("SUCCESS")
                    // console.log(inputs)
                }
            });
        setActiveTrade(false)
    };
    /*************************************************************************************************
     *  Save new Favorite Pairs
     *  with parse firestore on repeat
     ************************************************************************************************/
    const saveNewFavoritePairs = (pair) => {
        // Save new favorite pair
        getCollectionWhereKeyValue('users', 'uid_firebase', localStorage.getItem('crypto__uid')).then(r => {
            if (r[0] && r[0].favoritePairs) {
                let favoritePairs = r[0].favoritePairs;
                // let favoritePairs = {...r[0].favoritePairs,pair};
                if (favoritePairs.indexOf(pair) === -1) {
                    favoritePairs.push(pair)
                    updateDocumentInCollection('users', {
                        favoritePairs: favoritePairs
                    }, id__user__firestore).then(r => {
                        setPairsFavorite(favoritePairs)
                    }).catch(e => {
                        console.log(e)
                        setError(true);
                        setErrorText(e);
                    });
                }
            }
        }).catch(e => {
            setError(true);
            setErrorText(e);
        });
    };

    /*************************************************************************************************
     *  Resize
     ************************************************************************************************/
    const resize = (e) => {
        setSizes({...sizes, r_c_w: sizes.w - e.x})
    };
    /*************************************************************************************************
     * function toast container
     ************************************************************************************************/
    const notify = () => toast.error('Choose current pair', {
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
    const handleTrade = () =>{
        setActiveTrade(!activeTrade)
    }
    /*************************************************************************************************
     *  Render
     ************************************************************************************************/
    return (
        <>
            <Row>
                {/*         ResizableBox                 ExchangeChart              */}
                <ResizableBox
                    onResize={(e) => resize(e)}
                    // className="resize__block__container border-none"
                    className="resize__block__container resize__block__container__exchange__chart"
                    width={sizes.l_c_w}
                    height={sizes.l_c_h}
                    minConstraints={[sizes.w * 0.2, sizes.r_c_h]}
                    maxConstraints={[sizes.w * 0.8, sizes.r_c_h]}
                >
                    <ExchangeChart activeTrade={activeTrade} handleTrade={handleTrade} pair={currentPair} demoValue={demoValue}
                                   setDemoValue={setDemoValue}/>
                </ResizableBox>
                {/*         ResizableBox                 tabs              */}
                <ResizableBox
                    // className="resize__block__container border-none"
                    className="resize__block__container resize__block__container__margin "
                    width={sizes.r_c_w}
                    // width={sizes.w - sizes.l_c_w }
                    height={sizes.r_c_h}
                    // minConstraints={[sizes.w * 0.2, sizes.r_c_h]}
                    minConstraints={[sizes.r_c_w , sizes.r_c_h]}
                    // maxConstraints={[sizes.w * 0.8, sizes.r_c_h]}
                    maxConstraints={[sizes.r_c_w, sizes.r_c_h]}
                >
                    <div className={'app__nd__right__container'}>
                        <ResizableBox
                            className="resize__block__container__pairs border-none"
                            // className="resize__block__container__pairs "
                            width={sizes.r_c_w}
                            // height={sizes.r_c_h * 0.3}
                            height={sizes.r_c_h * 0.4}
                            // minConstraints={[sizes.w * 0.2, sizes.r_c_h * 0.1]}
                            // maxConstraints={[sizes.w * 0.8, sizes.r_c_h * 0.9]}
                            maxConstraints={[sizes.r_c_w, sizes.r_c_h * 0.91]}
                            minConstraints={[sizes.r_c_w, sizes.r_c_h * 0.09]}
                        >
                            <div className={'app__nd__right__top__container'}>
                                <Tabs defaultActiveKey="Pairs" id="uncontrolled-tab-example"
                                      tabClassName="app__nd__half__container">
                                    <Tab eventKey="Pairs" title="Pairs" tabClassName="app__nd__half">
                                        <div
                                            className={'Pairs__container'}>
                                            <PairsBlock pairs={pairs} click={handleSelectPair}
                                                        currentPair={currentPair} pairsFavorite={pairsFavorite}/>
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
                                            />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Favorite pairs" title="Favorite pairs" tabClassName="app__nd__half">
                                        <div style={{overflow: 'scroll'}} className={'Pairs__container'}>
                                            {/*<PairsBlock pairs={pairs} click={handleSelectPair}/>*/}
                                            {/*<PairsBlock pairs={pairsFavorite} setPairsFavorite={setPairsFavorite} click={handleSelectPair}/>*/}
                                            <PairsBlock pairs={pairsFavorite} pairsFavorite={pairsFavorite}
                                                        saveNewFavoritePairs={saveNewFavoritePairs}
                                                        click={handleSelectPair}/>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </ResizableBox>
                        <div className={'app__nd__right__bottom__container'}>
                            <Tabs defaultActiveKey="Settings" id="uncontrolled-tab-example"
                                  tabClassName="app__nd__half__container">
                                <Tab eventKey="Settings" title="Settings" tabClassName="app__nd__half">
                                    <Row>
                                        <Col className={"accordion__input__container"}>
                                            <Input header={'Wallet volume in %'}
                                                   change={handleInput}
                                                   type="number"
                                                // className={disabled === true && "disabled__input"}
                                                   className={disabled === true && "disabled__input" || error === true && "empty__input"}
                                                   disabled={disabled}
                                                   placeholder="Wallet volume in %"/>
                                        </Col>
                                        <Col className={"accordion__input__container"}>
                                            <Input header={'Wallet volume in $'} change={handleInput} type="number"
                                                   disabled={disabled}
                                                   className={disabled === true && "disabled__input" || error === true && "empty__input"}
                                                   placeholder="Wallet volume in $"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={"accordion__input__container"}>
                                            <Input header={'Taker commission in %'} change={handleInput}
                                                   type="number"
                                                   disabled={disabled}
                                                   className={disabled === true && "disabled__input" || error === true && "empty__input"}
                                                   placeholder="Taker commission in %"/>
                                        </Col>
                                        <Col className={"accordion__input__container"}>
                                            <Input header={'Taker USD for Safety zone'} change={handleInput}
                                                   type="number" disabled={disabled}
                                                   className={disabled === true && "disabled__input" || error === true && "empty__input"}
                                                   placeholder="Taker USD for Safety zone"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className={"accordion__input__container"}>
                                            <Input header={'Stop loss'} change={handleInput} type="number"
                                                   disabled={disabled}
                                                   className={disabled === true && "disabled__input" || error === true && "empty__input"}
                                                   placeholder="Stop loss"/>
                                        </Col>
                                        <Col className={"accordion__input__container"}>
                                            <Input header={'Buy next in percentage'} change={handleInput}
                                                   type="number"
                                                   disabled={disabled}
                                                   className={disabled === true && "disabled__input" || error === true && "empty__input"}
                                                   placeholder="Buy next in percentage"/>
                                        </Col>
                                    </Row>
                                    <div className="buttons__block">
                                        <button onClick={() => start()} className="accordion__btn__container">START
                                        </button>
                                        <button onClick={() => stopWork()} className="accordion__btn__container">STOP
                                        </button>
                                        <button onClick={() => extraStopWork()}
                                                className="accordion__btn__container long__button">SELL NOW & OFF
                                        </button>
                                        {/*<ButtonCustom*/}
                                        {/*    className={"buttons__block__btn"}*/}
                                        {/*    variant={3}*/}
                                        {/*    text={'START'}*/}
                                        {/*    click={() => start()}*/}
                                        {/*    image={fireSvg}*/}
                                        {/*/>*/}
                                        {/*<ButtonCustom*/}
                                        {/*    className={"buttons__block__btn"}*/}
                                        {/*    variant={3}*/}
                                        {/*    text={'STOP'}*/}
                                        {/*    click={() => stopWork()}*/}
                                        {/*    image={stop}*/}
                                        {/*/>*/}
                                        {/*<ButtonCustom*/}
                                        {/*    className={"buttons__block__btn"}*/}
                                        {/*    variant={3}*/}
                                        {/*    text={'SELL NOW & OFF'}*/}
                                        {/*    click={() => extraStopWork()}*/}
                                        {/*    image={sell}*/}
                                        {/*/>*/}
                                    </div>
                                </Tab>
                                <Tab eventKey="Operations" title="Operations" tabClassName="app__nd__half">
                                    <OperationsBlock/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </ResizableBox>
            </Row>


            {/*<Accordion defaultActiveKey="0">*/}
            {/*    <Card className="card__container">*/}
            {/*        <Card.Header className="card__header">*/}
            {/*            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="button__accordion">*/}
            {/*                SETTINGS {' ' + currentPrice}*/}
            {/*            </Accordion.Toggle>*/}
            {/*        </Card.Header>*/}
            {/*        <Accordion.Collapse eventKey="0">*/}
            {/*            <Card.Body>*/}
            {/*                <Row className="accordion-block__container">*/}
            {/*                    <Col md={3} className="select__wrapper accordion__input__container">*/}
            {/*                        <p className="p__text">Currency pairs</p>*/}
            {/*                        <Select fromBinance={true} pairs={pairs} returnPair={handleSelectPair}/>*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className="select__wrapper accordion__input__container">*/}
            {/*                        <p className="p__text">Favorite pairs</p>*/}
            {/*                        <Select fromBinance={false} pairs={pairsFavorite} returnPair={handleSelectPair}/>*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className={"accordion__input__container"}>*/}
            {/*                        <p className="p__text">Wallet volume in %</p>*/}
            {/*                        <Input header={'Wallet volume in %'} change={handleInput} type="number" placeholder="0" />*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className={"accordion__input__container"}>*/}
            {/*                        <p className="p__text">Wallet volume in $</p>*/}
            {/*                        <Input header={'Wallet volume in $'} change={handleInput} type="number" placeholder="0" />*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className={"accordion__input__container"}>*/}
            {/*                        <p className="p__text">Taker commission in %</p>*/}
            {/*                        <Input header={'Taker commission in %'} change={handleInput} type="number" placeholder="0" />*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className={"accordion__input__container"}>*/}
            {/*                        <p className="p__text">Taker USD for Safety zone</p>*/}
            {/*                        <Input header={'Taker USD for Safety zone'} change={handleInput} type="number" placeholder="0" />*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className={"accordion__input__container"}>*/}
            {/*                        <p className="p__text">Stop loss</p>*/}
            {/*                        <Input header={'Stop loss'} change={handleInput} type="number" placeholder="0" />*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className={"accordion__input__container"}>*/}
            {/*                        <p className="p__text">Buy next in percentage</p>*/}
            {/*                        <Input header={'Buy next in percentage'} change={handleInput} type="number" placeholder="0" />*/}
            {/*                    </Col>*/}
            {/*                    <Col md={3} className="tools__container accordion__input__container">*/}
            {/*                        <p className="p__text">DEMO TOOL</p>*/}
            {/*                        <div className="form-radio-switch ">*/}
            {/*                            <RadioSwitch isOn={demoValue} handleToggle={() => {*/}
            {/*                                setDemoValue(!demoValue)*/}
            {/*                                setInputs({...inputs, demo: !demoValue})*/}
            {/*                            }} />*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Card.Body>*/}
            {/*        </Accordion.Collapse>*/}
            {/*    </Card>*/}
            {/*</Accordion>*/}
            {/*<div className="buttons__block">*/}
            {/*    <Row className="">*/}
            {/*        <Col md={4}>*/}
            {/*            <ButtonCustom*/}
            {/*                className={"buttons__block__btn"}*/}
            {/*                variant={3}*/}
            {/*                text={'START'}*/}
            {/*                click={() => start()}*/}
            {/*                image={fireSvg}*/}
            {/*            />*/}
            {/*        </Col>*/}
            {/*        <Col md={4}>*/}
            {/*            <ButtonCustom*/}
            {/*                className={"buttons__block__btn"}*/}
            {/*                variant={3}*/}
            {/*                text={'STOP'}*/}
            {/*                click={() => stopWork()}*/}
            {/*                image={stop}*/}
            {/*            />*/}
            {/*        </Col>*/}
            {/*        <Col md={4}>*/}
            {/*            <ButtonCustom*/}
            {/*                className={"buttons__block__btn"}*/}
            {/*                variant={3}*/}
            {/*                text={'SELL NOW & OFF'}*/}
            {/*                click={() => extraStopWork()}*/}
            {/*                image={sell}*/}
            {/*            />*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</div>*/}
        </>

    )
}
export default SettingsApp;