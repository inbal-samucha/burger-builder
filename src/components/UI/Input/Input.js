import React from 'react';
import style from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputStyle = [style.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){ //shoultValidate will be true if the object in the orderForm (ContactData) has a validation propty
        inputStyle.push(style.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputStyle.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputStyle}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>;
            break;
        default:
            inputElement = <input
                className={inputStyle}
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