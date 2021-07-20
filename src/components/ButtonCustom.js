import React from 'react';

const ButtonCustom = ({variant, text, click, className, image,disabled}) => {
    return (
        <>
            {variant === 1 && (
                <button className={"custom__btn " + className} onClick={() => click()}>
                    {text}
                </button>
            )}
            {variant === 2 && (
                <button disabled={disabled} className={"custom__btn2 " + className} onClick={() => click()}>
                    {text}
                </button>
            )}
            {variant === 3 && (
                <button className={"custom__btn2 " + className} onClick={() => click()}>
                    <img src={image} alt="image" className="custom__btn__img" />
                    {text}
                </button>
            )}
        </>
    );
};

export default ButtonCustom;