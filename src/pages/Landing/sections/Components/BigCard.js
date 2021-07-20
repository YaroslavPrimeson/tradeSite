import React from 'react';

const BigCard = ({header, text, icon}) => {
    return (
        <div className={"section3__big__card__container"}>
            <h3 className={"section3__big__card__header"}>{header}</h3>
            <p className={"section3__big__card__text"}>{text}</p>
            <img src={icon} alt="icon" className={"section3__big__card__img"}/>
        </div>
    );
};

export default BigCard;