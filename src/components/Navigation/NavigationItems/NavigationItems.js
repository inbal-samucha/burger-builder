import React from 'react';
import style from '../NavigationItems/NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) =>(
    <ul className={style.NavigationItems}>
        <NavigationItem link="/" exact > BurgerBuilder </NavigationItem>
        <NavigationItem link="/orders"> Orders </NavigationItem>
    </ul>
);

export default navigationItems;