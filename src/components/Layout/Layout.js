import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import style from '../Layout/Layout.module.css';
import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={style.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
}

export default Layout;