import React from 'react';
import style from '../NavigationItems/NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={style.NavigationItems}>
        <NavigationItem link="/" active> BurgerBuilder </NavigationItem>
        <NavigationItem link="/"> Checkout </NavigationItem>

    </ul>
);

export default navigationItems;