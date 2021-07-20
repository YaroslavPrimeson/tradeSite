import React from 'react';

const Select = ({fromBinance, pairs, returnPair}) => {
    return (
        <select className="form-select selected " aria-label="Default select example" onChange={returnPair}>
            <option key={-1} selected>Pairs</option>
            {pairs.map( (p, index) => (
                <>
                    {fromBinance ?
                        (<option key={index} className="select__pairs" value={p.baseAsset + '/' + p.quoteAsset}>{p.baseAsset + '/' + p.quoteAsset}</option>)
                        :
                        (<option key={index} className="select__pairs" value={p}>{p}</option>)
                    }
                </>
            ))}
        </select>
    );
};

export default Select;