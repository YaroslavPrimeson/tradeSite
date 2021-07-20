import React from 'react';

const SmallCard = ({header, text, icon}) => {
    return (
        <div className={"section3__small__card__container"}>
            <img src={icon} alt="icon" className={"section3__small__card__img"}/>
            <h3 className={"section3__small__card__header"}>{header}</h3>
            <p className={"section3__small__card__text"}>{text}</p>
        </div>
    );
};

export default SmallCard;