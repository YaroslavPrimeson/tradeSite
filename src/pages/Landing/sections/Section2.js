import React from 'react';
import pc from "../../../assets/pc.png";
import phone from "../../../assets/phone.png";

const Section2 = () => {
    return (
        <section className={"section2__container"}>
            <img src={pc} alt="pc" className={"section2__img1"}/>
            <img src={phone} alt="phone" className={"section2__img2"}/>
        </section>
    );
};

export default Section2;