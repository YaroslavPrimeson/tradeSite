import React, {useEffect, useState} from 'react';
import {getCollection} from "../../../help/helper";
import {Row, Col, Pagination} from "react-bootstrap";
import ButtonCustom from "../../../components/ButtonCustom";
import Filter from "../../App/Components/MainApp/Filter";

const Statistics = ({users,filterUser,filterUsers}) => {
    /**********************************************************
     *State
     **********************************************************/
    // const [inputFilterState, setInputFilterState] = useState('');
    // const [filterUser, setFilterUser] = useState([]);
    // /**********************************************************
    //  * Filter
    //  **********************************************************/
    // const filterUsers = (input) => {
    //     const newFilter = users.filter((p) =>(p.displayName_firebase?.toLowerCase().includes(input) ||
    //         p.uid_firebase?.toLowerCase().includes(input) ||
    //         p.Api_key?.toLowerCase().includes(input) ||
    //         p.Secret_key?.toLowerCase().includes(input) ||
    //         p.email_firebase?.toLowerCase().includes(input) ||
    //         p.phoneNumber_firebase?.toLowerCase().includes(input) ||
    //         p.ID_copy_upload?.toLowerCase().includes(input)
    //     ))
    //     setFilterUser(newFilter)
    // }
    // useEffect(() => {
    //     // const filterUsers = users.filter((p) =>(p.displayName_firebase?.toLowerCase().includes(inputFilterState) ||
    //     //     p.uid_firebase?.toLowerCase().includes(inputFilterState)
    //     // ))
    //     setFilterUser(users)
    // }, [users]);
    // // }, [users,inputFilterState]);
    // // const inputFilter = (e) => {
    // //     setInputFilterState(e.target.value)
    // //     console.log(e.target.value.toLowerCase())
    // // }
    // useEffect(() => {
    // }, [ filterUser])


    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div className={'admin__tab__container'}>
            {/*<Pagination onClick={(e) => console.log(e)}>{users}</Pagination>*/}
            <Filter filterUsers={filterUsers} />
            {/*{users.map( (u, index) => (*/}
            {filterUser.map( (u, index) => (
                <>
                <Row key={index} className={'admin__statistic__card'}>
                    <Col>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'id: '}</div>{u.idPost}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'displayName_firebase: '}</div>{u.displayName_firebase}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'email_firebase: '}</div>{ u.email_firebase}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'emailVerified_firebase: '}</div>{ u.emailVerified_firebase}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'phoneNumber_firebase: '}</div>{ u.phoneNumber_firebase}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'photoURL_firebase: '}</div>{ u.photoURL_firebase}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'Api_key: '}</div>{ u.Api_key}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'Secret_key: '}</div>{ u.Secret_key}</Row>

                    {/*</Col>*/}
                    {/*<Col>*/}
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'First_name: '}</div>{ u.First_name}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'Middle_name: '}</div>{ u.Middle_name}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'Last_name: '}</div>{ u.Last_name}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'Date_of_birth: '}</div>{ u.Date_of_birth}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'Nationality: '}</div>{ u.Nationality}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'ID_copy_upload: '}</div>{ u.ID_copy_upload}</Row>

                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'app_key_use: '}</div>{ u.app_key_use ? ' Yes' : ' No'}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'app_key_1: '}</div>{ u.app_key_1}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'app_key_2: '}</div>{ u.app_key_2}</Row>
                        <Row className={'admin__statistic__row__container'}><div className={'admin__statistic__row__header'}>{'app_key_3: '}</div>{ u.app_key_3}</Row>
                    </Col>
                    <Row>

                        <Col>
                            <Row><ButtonCustom text={'See operations'} variant={1} className={'admin__statistic__row__btn'}/></Row>
                            <Row><ButtonCustom text={'Block user'} variant={1} className={'admin__statistic__row__btn'}/></Row>
                            <Row><ButtonCustom text={'Delete user'} variant={1} className={'admin__statistic__row__btn'}/></Row>
                        </Col>
                    </Row>
                </Row>
                </>
            ))}
        </div>
    );
};

export default Statistics;