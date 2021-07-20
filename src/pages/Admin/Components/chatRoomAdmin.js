import React, {useEffect, useRef, useState} from 'react';
import {fire} from "../../../firebase/Firebase";
import "../Admin.scss";
import ButtonCustom from "../../../components/ButtonCustom";
import Input from "../../../components/Input";

const ChatRoomAdmin = ({messages, closeChatRoom, toUid, chatRoom}) => {

    /**********************************************************
     * STATE
     **********************************************************/
    const [value, setValue] = useState("");
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
                toUid: toUid,
                text: value,
                fromId: "admin"

            }, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    // console.log('SUCCESS')
                    setValue('')
                }
            });
        } else {
        }
    }
    /**********************************************************
     * use Effect
     **********************************************************/
    useEffect(() => {
        scrollToBottom(messagesEndRef)
        console.log(messages)
    }, [messages])
    /**********************************************************
     * Render
     **********************************************************/
    return (
        <>
            {/*<ButtonCustom variant={2} text={"return"} click={() => closeChatRoom()}  className={"chat__messages__return__button "}/>*/}
            {/*<div className="chat__messages__container">*/}
                <div className="chat__messages__container__block__admin">
                    {!!messages.length ? messages.map((m, index) =>
                            (m.text !== "" ? <div className="chat__messages__container__message" key={index}>
                                    <>
                                        {m.fromId === "admin" ?
                                            <div
                                                className="chat__messages__text__right chat__messages__text__style">{m.text}</div> :
                                            <div
                                                className="chat__messages__text__left chat__messages__text__style">{m.text}</div>}
                                    </>
                                    <div>
                                        <div ref={messagesEndRef}/>
                                    </div>
                                </div>
                                : null)
                        )
                        :
                        <h2>no data</h2>}
                </div>
                <div className="chat__input__container">
                    <Input
                        className=" chat__message__input"
                        type="text"
                        placeholder={"write message"}
                        value={value}
                        change={(e) => setValue(e.target.value)}
                        onKeyPress={(e) => handleEventKey(e)}/>
                    <ButtonCustom variant={2} text={"return"} click={() => closeChatRoom()}  className={"chat__messages__return__button "}/>
                    <ButtonCustom text={"send"} click={sendMessage} className="chat__input__sendMessage__button" variant={1}>
                        {value !== "" && <span className={"chat__input__sendMessage__span"}>
                        </span>}
                    </ButtonCustom>
                </div>
            {/*</div>*/}
        </>
    );
};

export default ChatRoomAdmin;