import React, {useEffect, useRef, useState} from 'react';
import {fire} from "../../../../firebase/Firebase";
import Input from "../../../../components/Input";
import ButtonCustom from "../../../../components/ButtonCustom";
import "../../index.scss"

const ChatRoom = () => {

    /**********************************************************
     * STATE
     **********************************************************/
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatRoom, setChatRoom] = useState(localStorage.getItem('crypto__uid'));
    /**********************************************************
     * scroll To Bottom
     **********************************************************/
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    /**********************************************************
     * handle event key
     **********************************************************/
    const handleEventKey = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    /**********************************************************
     * FUNCTION FOR SEND MESSAGE
     **********************************************************/
    const sendMessage = () => {
        if (value !== "") {
            fire.database().ref('chats/' + chatRoom + '/' + messages.length).set({
                toUid:"admin",
                text: value,
                // fromId:localStorage.getItem('uid__trucks')

            }, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    // console.log('SUCCESS')
                    setValue('')
                }
            });
        } else {
            alert("cant send empty message")
        }
    }
    const closeChatRoom = () => {
        fire.database().ref().child("chats/" + chatRoom).off();
    }

    useEffect(() => {
        setMessages([])
        fire.database().ref('chats/' + chatRoom).on("child_added", function (snapshot) {
            if (messages[messages.length - 1] !== snapshot.val()) {
                setMessages(prevState => [...prevState, snapshot.val()])
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }, [])
    /**********************************************************
     * use Effect
     **********************************************************/
    useEffect(() => {
        scrollToBottom(messagesEndRef)
    }, [messages])

    /**********************************************************
     * Render
     **********************************************************/
    return (
        <>
            {/*<div className="chat__messages__container">*/}
                <div className="chat__messages__container__block__user">
                    {!!messages.length ? messages.map((m, index) =>
                            (m.text !== "" ? <div className="chat__messages__container__message" key={index}>
                                    <>
                                        {m.toUid === "admin" ?
                                            <div
                                                className="chat__messages__text__right chat__messages__text__style">{m.text}</div>
                                            :
                                            <div
                                                className="chat__messages__text__left chat__messages__text__style">{m.text}</div>
                                        }
                                    </>
                                    <div>
                                        <div ref={messagesEndRef}/>
                                    </div>

                                </div>
                                : null)
                        )
                        :
                        <h2 className={"chat__messages__empty__title"} >EMPTY</h2>}
                </div>
                <div className="chat__input__container">
                    <Input
                        className={'chat__message__input'}
                        placeholder={'Enter text'}
                        type={'text'}
                        value={value}
                        header={'message'}
                        onKeyPress={(e) => handleEventKey(e)}
                        change={(e) => setValue(e.target.value)}
                    />
                    <ButtonCustom
                        className={'chat__message__btn'}
                        variant={1}
                        text={'SEND'}
                        click={sendMessage}
                    />
                </div>
            {/*</div>*/}
        </>
    );
};

export default ChatRoom;