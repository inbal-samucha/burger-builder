import React from 'react';
import style from '../BuildControls/BuildControls.module.css';
import BuildControl from './BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={style.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled = {props.disabled[ctrl.type]} />
        ))}
    </div>
);

export default buildControls;