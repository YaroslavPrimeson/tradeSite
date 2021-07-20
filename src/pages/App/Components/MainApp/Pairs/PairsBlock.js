import React, {useEffect, useState} from "react";
import ReactTable from "react-table-6";
import Pagination from "./Pagination";
import "react-table-6/react-table.css";
import "../../../index.scss";
import Input from "../../../../../components/Input";

const PairsBlock = (props) => {
    const [pairs, setPairs] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        setPairs(makeData())
    }, [props])

    useEffect(() => {
        const filterPairs = makeData().filter((p) => p.name.includes(input))
        setPairs(filterPairs)
    }, [input, props.pairs])

    useEffect(() => {
    }, [pairs])

    function makeData() {
        return props.pairs.map(d => {
            if (typeof d === "string") {
                return {
                    className: d,
                    name: d
                }
            } else {
                return {
                    name: d.baseAsset + '/' + d.quoteAsset
                };
            }
        });
    }

    const inputFilter = (e) => {
        setInput(e.target.value)
    }
    const onStarClick = (e) => {
        props.click(e.name)
    }

    return (
        <div>
            <Input
                id={'search'}
                type={'text'}
                placeholder={'Search'}
                name={''}
                className={''}
                change={inputFilter}
            />
            <ReactTable
                PaginationComponent={Pagination}
                data={pairs}
                columns={[
                    {
                        id: 'serialno',
                        Header: "",
                        accessor: element => {
                            // return <div className={"pairs__star__relative"} key={element.name} onClick={() => {
                            return <div
                                className={props.currentPair === element.name.replace('/', '') ? "pairs__star__relative active__pair" : "pairs__star__relative"}
                                key={element.name}
                                onClick={() => {
                                    props.click(element.name)
                                }}>{element.name}
                                <span
                                    onClick={() => onStarClick(element)}
                                    className={props.pairsFavorite?.find(el => el === element.name) ? "pairs__star__yellow" : "pairs__star"}
                                >
                                </span>
                            </div>
                        },
                        // minWidth: 300,
                    }
                ]}
            />
        </div>
    );
};


export default PairsBlock;
