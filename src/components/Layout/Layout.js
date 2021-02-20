import React from 'react';
import Aux from '../../hoc/Auxiliary';
import style from '../Layout/Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop </div>
        <main className={style.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;