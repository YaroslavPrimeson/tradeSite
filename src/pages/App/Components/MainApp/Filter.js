import React from 'react';
import Input from "../../../../components/Input";

const Filter = ({filterUsers}) => {
    return (
        <>
            <Input
                type="text"
                placeholder={`Search user`}
                className={"input__different "}
                change={(e) => filterUsers(e.target.value.toLowerCase())}
            />
        </>
    );
};

export default Filter;