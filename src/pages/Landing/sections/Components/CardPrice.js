import React from 'react';
import ButtonCustom from "../../../../components/ButtonCustom";

const CardPrice = ({variant, header, text, img}) => {
    return (
        <div
            className={variant ? "section__price__card__container" : "section__price__card__container2"}
        >
            <img src={img} alt="img" className={"section__price__card__img"}/>
            <div className={"section__price__card__content"}>
                <h3 className={"section__price__card__header"}>{header}</h3>
                <p className={"section__price__card__text"}>{text}</p>
                <div className={"section__price__card__btn__container"}>
                    <ButtonCustom
                        className={"section__price__card__btn"}
                        text={'REGISTRATION'}
                        click={() => console.log("Hello World")}
                        variant={variant ? 2 : 1}
                    />
                </div>
            </div>
        </div>
    );
};

export default CardPrice;