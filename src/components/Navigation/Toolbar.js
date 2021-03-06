import React from 'react';
import style from './Toolbar.module.css';
import Logo from '../Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle';

const toolbar = (props) => (
    <header className={style.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={style.Logo}>
            <Logo />
        </div>
        <nav className={style.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;