import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Field.css';

const Field = () => {
    const [fieldSize, setFiledSize] = useState(5);
    const [allSizes, setAllSizes] = useState([]);
    const fieldRef = useRef(null);

    useEffect(() => {
        getSizes();
    },[]);

    useEffect(() => {
        fieldRef.current.style.setProperty("--field-size", fieldSize);
    }, [fieldSize]);
    
    const createSquares = () => {
        let html = [];
        for (let i = 0; i < fieldSize * fieldSize; i++) {
            html.push(<div key={i} className="square"></div>);
        }
        return html;
    };

    const getSizes = () => {
        axios.get("http://demo1030918.mockable.io/").then(response => {
            const sizes = [];
            for (let elem in response.data) {
                sizes.push({mode: elem, size: response.data[elem].field})
            }

            setAllSizes(sizes);
        }).catch(err => {
            console.log("error", err.message);
        });
    };

    const changeFiledSize = (e) => {
        setFiledSize(parseInt(e.target.value));
    };

    const start = () => {
        console.log('start');
    };

    let selectOptions = "";
    if (allSizes.length) {
        selectOptions = allSizes.map((elem, index) => {
            return (
                <option key={index} value={elem.size}>{elem.mode}</option>
            );
        });
    }

    return (
        <div className="field-wrapper">
            <div className="grid-size-row">
                <select onChange={ (e) => changeFiledSize(e) } value={fieldSize}>
                    { selectOptions }
                </select>
                <button className="start-button" onClick={start}>
                    Start
                </button>
            </div>

            <div ref={fieldRef} className="field">
                {createSquares()}
            </div>
        </div>
    );
}

export default Field;
