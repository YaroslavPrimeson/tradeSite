import React, {useEffect, useState, useRef} from "react";
import {Accordion, Button, Card, Tab, Tabs} from "react-bootstrap";
import OperationsCard from "./OperationsCard";
import {fire} from "../../../../firebase/Firebase";

const OperationsBlock = () => {
    const [operations, setOperations] = useState([]);
    useEffect(() => {
        fire.database().ref('operations/' + localStorage.getItem('crypto__uid')).on('value', (snapshot) => {
            // fire.database().ref('operations/' + localStorage.getItem('crypto__uid')).on('child_added', (snapshot) => {
            if (snapshot.val()) {
                const data = Object.entries(snapshot.val());
                setOperations(data.reverse())
                // console.log(data)
            } else {
                console.log('error')
            }
        });
    }, [])

    // const messagesEndRef = useRef(null);

    // const scrollToBottom = () => {
    //     // messagesEndRef.current && messagesEndRef.current.scrollIntoView();
    //     messagesEndRef.current.scrollIntoView();
    // };

    useEffect(() => {
        // scrollToBottom()
    }, [operations]);

    return (
        <>
            <Card.Body className="operations__block__container">
                {operations.map((o, index) => (
                    <OperationsCard data={o[1]} index={index}/>
                ))}
                {/*<div ref={messagesEndRef}>*/}
                {/*</div>*/}
            </Card.Body>
        </>

    )
}
export default OperationsBlock;



