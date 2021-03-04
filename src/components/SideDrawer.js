import React from 'react';
import Logo from './Logo';
import NavigationItems from './Navigation/NavigationItems/NavigationItems';
import style from '../components/SideDrawer.module.css';
import Backdrop from './UI/Backdrop';
import Aux from '../hoc/Auxiliary';

const sideDrawer = (props) => {
    let attachedStyle = [style.SideDrawer, style.Close];
    if(props.open){
        attachedStyle = [style.SideDrawer, style.Open]; 
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedStyle.join(' ')}>
            <div className={style.Logo} >
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;