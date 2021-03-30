import React from 'react';
import style from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={style.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={style.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input
                className={style.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
    }

    return (
        <div className={style.Input}>
            <label className={style.Lable}> {props.lable} </label>
            {inputElement}
        </div>
    );
}


export default input;