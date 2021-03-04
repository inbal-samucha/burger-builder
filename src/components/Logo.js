import Reacr from 'react';
import burgerLogo from '../assets/images/28.1 burger-logo.module.png';
import style from '../components/Logo.module.css';

const logo = (props) => (
    <div className={style.Logo}>
        <img src={burgerLogo} alt="MyBurgerApp" />
    </div>
);

export default logo;