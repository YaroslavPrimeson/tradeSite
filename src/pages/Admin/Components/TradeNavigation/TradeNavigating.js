import React, {useEffect, useState} from 'react';
import {fire} from "../../../../firebase/Firebase";
import Input from "../../../../components/Input";
import CurrentTradeNavigation from "./CurrentTradeNavigation";
import "../../Admin.scss";
import Filter from "../../../App/Components/MainApp/Filter";

const TradeNavigating = ({users,filterUsers,filterUser}) => {
    /**********************************************************
     * State
     **********************************************************/
    const [visibleOperations, setVisibleOperations] = useState(false)
    // const [inputFilterState, setInputFilterState] = useState('');
    // const [filterUser, setFilterUser] = useState([]);
    const [currentUserRoom, setCurrentUser] = useState('');
    const [operations, setOperations] = useState([]);
    const [actions, setActions] = useState([]);
    const [orders, setOrders] = useState([]);
    const [state, setState] = useState();
    /**********************************************************
     * current operations block
     **********************************************************/
    const closeUserOperations = () => {
        setVisibleOperations(!visibleOperations)
        setCurrentUser('')
        fire.database().ref().child("operations/" + currentUserRoom).off();
        fire.database().ref().child("actions/" + currentUserRoom).off();
        fire.database().ref().child("orders/" + currentUserRoom).off();
        fire.database().ref().child("state/" + currentUserRoom).off();
    }
    const clickCurrentUser = (uid) => {
        let currentUserRoom = uid;
        setCurrentUser(currentUserRoom)
        fire.database().ref().child("operations/" + currentUserRoom).get().then((snapshot) => {
            if (snapshot.val()) {
                const data = Object.entries(snapshot.val())
                // console.log([snapshot.val()])
                // console.log(snapshot.val())
                setOperations(data.reverse())
            }
        }).catch((error) => {
            console.error(error);
        });
        fire.database().ref('actions/' + currentUserRoom).on("value", (snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val();
                setActions(Object.entries(snapshot.val()))
            } else {
                console.log('error')
            }
        })
        fire.database().ref('orders/' + currentUserRoom).on("value", (snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val();
                setOrders(JSON.parse(data))
            } else {
                console.log('error')
            }
        })
        fire.database().ref('state/' + currentUserRoom).on("value", (snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val();
                setState(data)
            } else {
                console.log('error')
            }
        })
        setVisibleOperations(!visibleOperations)
    }
    /**********************************************************s
     * Filter
     **********************************************************/
    // useEffect(() => {
    //     const filterUsers = users.filter((p) =>(p.displayName_firebase?.toLowerCase().includes(inputFilterState) ||
    //         p.uid_firebase?.toLowerCase().includes(inputFilterState)
    //     ))
    //     setFilterUser(filterUsers)
    // }, [users,inputFilterState]);
    //
    //
    // const inputFilter = (e) => {
    //     setInputFilterState(e.target.value)
    //     console.log(e.target.value.toLowerCase())
    // }
    // useEffect(() => {
    // }, [ filterUser])


    /**********************************************************
     * Render
     **********************************************************/
    return (
        <>

            {!visibleOperations ?
                <div className="trade__navigation__container">
                    <div>
                        <Filter filterUsers={filterUsers}  />
                    </div>

                    <div className="navigation__users__container">
                        {filterUser.map(u => (
                            <>
                                <div className="navigation__users__wrapper"
                                     onClick={() => clickCurrentUser(u.uid_firebase)}>
                                    <div className="navigation__users__name">name: {u.displayName_firebase}</div>
                                    <div className="navigation__users__name">id: {u.uid_firebase}</div>
                                </div>
                            </>

                        ))}
                    </div>
                </div>
                :
                <CurrentTradeNavigation
                    closeUserOperations={closeUserOperations}
                    currentUserRoom={currentUserRoom}
                    operations={operations}
                    actions={actions}
                    orders={orders}
                    state={state}
                />
            }
        </>
    );
};

export default TradeNavigating;