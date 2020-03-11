import React from "react";
import {NavLink} from "react-router-dom";
import {Icon} from "antd";

class Nav extends React.Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){

        let {name}=this.props;
        return (
            <div className={name}>
                <NavLink
                    to="/index"
                    activeClassName="nav-active">
                    <Icon
                        type="home"
                        style={{ 'padding': '0 8px 0 0' }}>
                    </Icon>
                    首页
                </NavLink>
                <NavLink
                    to="/book" 
                    activeClassName="nav-active">
                    <Icon
                        type="book" 
                        style={{ 'padding': '0 8px 0 0' }}>
                    </Icon>
                    教程
                </NavLink>
                <NavLink
                    to="/about"
                    activeClassName="nav-active">
                    <Icon
                        type="info-circle"
                        style={{ 'padding': '0 8px 0 0' }}>
                    </Icon>
                    关于
                </NavLink>
            </div>
        )
    }
}

export default Nav;