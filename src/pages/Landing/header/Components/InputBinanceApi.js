// import React, {useEffect, useState} from 'react';
// import {Col, Row} from "react-bootstrap";
// import Input from "../../../../components/Input";
// import ButtonCustom from "../../../../components/ButtonCustom";
// import {updateDocumentInCollection} from "../../../../help/helper";
//
// const InputBinanceApi = () => {
//     /************************************************
//      *State
//      ************************************************/
// const [apiCredentials, setApiCredentials] = useState({
//        apiKey:'',
//         secretKey:'',
//     });
//     useEffect(() => {
//
//     }, [apiCredentials])
//     /************************************************
//      *Render
//      ************************************************/
//     return (
//         <>
//             <Row className="modal__settings__card__row">
//                 <Col className={"accordion__input__container"}>
//                     <p className="modal__settings__p__text">Api key</p>
//                     <Input className={"modal__settings__input"} type="text" disabled placeholder="Enter Api key" />
//                 </Col>
//             </Row>
//             <Row className="modal__settings__card__row">
//                 <Col className={"accordion__input__container"}>
//                     <p className="modal__settings__p__text">Secret key</p>
//                     <Input className={"modal__settings__input"} type="text" disabled placeholder="Enter Secret key" />
//                 </Col>
//             </Row>
//             <Row className="modal__settings__card__row">
//                 <Col className={"accordion__input__container"}>
//                     <ButtonCustom
//                         className={"form__button__btn"}
//                         text={'Save'}
//                         click={() => console.log('SAVE')}
//                         variant={2}
//                     />
//                 </Col>
//             </Row>
//             <br/>
//         </>
//     );
// };
//
// export default InputBinanceApi;