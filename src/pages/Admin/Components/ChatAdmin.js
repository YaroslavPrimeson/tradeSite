import React, {useEffect, useRef, useState} from "react";
import {getCollection} from "../../../help/helper";
import {fire} from "../../../firebase/Firebase";
import ChatRoomAdmin from "./chatRoomAdmin";
import "../Admin.scss";
import user from "../../../assets/user.svg"
import Filter from "../../App/Components/MainApp/Filter";


const ChatAdmin = ({users,filterUser, filterUsers}) => {
    /**********************************************************
     * STATE
     **********************************************************/
    const [chatRoom, setChatRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [toUid, setToUid] = useState("");
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [tripsFilterSearch, setTripsFilterSearch] = useState([]);

    useEffect(()=>{
    },[users])
    /**********************************************************
     * Handle
     **********************************************************/
    useEffect(() => {
        setMessages([])
        fire.database().ref('chats/' + chatRoom).on("child_added", function (snapshot) {
            if (messages[messages.length - 1] !== snapshot.val()) {
                setMessages(prevState => [...prevState, snapshot.val()])
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }, [chatRoom])
    const clickChat = (uid) => {
        let chatRoom = uid
        setChatRoom(chatRoom)
        fire.database().ref().child("chats/" + chatRoom).get().then((snapshot) => {
            if (snapshot.exists()) {
                setMessages(snapshot.val())
            } else {
                fire.database().ref('chats/' + chatRoom + '/0').set({
                    fromUid: "admin",
                    text: ''
                })
            }
        }).catch((error) => {
            console.error(error);
        });
        setToUid(uid)
        setVisibleDialog(!visibleDialog)
    }
    const closeChatRoom = () => {
        setVisibleDialog(!visibleDialog)
        setChatRoom('')
        fire.database().ref().child("chats/" + chatRoom).off();
    }

    useEffect(() => {
        setTripsFilterSearch(users)
    }, [messages, users,filterUser,filterUsers])

    /**********************************************************
     * Render
     **********************************************************/
    return (
        <div className="chat__container__admin">
            <div>
                <Filter users={users} filterUsers={filterUsers} />
            </div>
            {!visibleDialog ?
                <div className="chat__messenger__allUser__list__container__admin">
                    {/*{tripsFilterSearch.map((el, index) => (*/}
                    {filterUser.map((el, index) => (
                        <div onClick={() => clickChat(el.uid_firebase)} className="chat__messenger__allUser__list__admin__admin "
                             key={index}>
                            {el?.photoURL_firebase ===  null ?
                                <div className="chat__messenger__admin__container">
                                    <img src={user} alt="user logo" className="chat__messenger__list__logo__admin"/>
                                    <p>{el?.phoneNumber_firebase}</p>
                                </div>
                                :
                                <div className="chat__messenger__admin__container">
                                    <img src={el?.photoURL_firebase ? user : el?.photoURL_firebase } alt="user logo"
                                         className="chat__messenger__list__logo__admin "/>
                                    <p className="chat__messenger__list__logo__text__admin">{el.displayName_firebase}</p>
                                </div>
                            }
                        </div>
                    ))}
                </div>
                :
                <>
                <ChatRoomAdmin
                    closeChatRoom={closeChatRoom}
                    messages={messages}
                    toUid={toUid}
                   chatRoom={chatRoom} />
                </>
            }
        </div>
    );
};

export default ChatAdmin;