import React from "react";
import {Layout,Row,Col} from "antd";
import Nav from "./nav";
import DropDown from "./drop-down";

class Header extends React.Component{
    constructor(props){
        super(props);

        this.state={};

        this.dropDownBtn=React.createRef();
    }

    render(){
        let {dropDownBtn}=this;

        return (
            <Layout.Header>
                <Row className="header-wrap">
                    <Col md={6} xs={24}>
                        <h1 className="logo">cNode</h1>
                    </Col>
                    <Col md={18} xs={0} className="md-nav-wrap">
                        <Nav name="md-nav"/>
                    </Col>
                    <Col md={0} xs={24} className="dropdown-wrap">
                        <DropDown
                            overlay={
                                <Nav />
                            }
                            placement="menu-right"
                            tigger={['click','touchend']}
                            elem={dropDownBtn}>
                            <span ref={dropDownBtn}><i></i></span>
                        </DropDown>
                    </Col>
                </Row>
            </Layout.Header>
        )
    }
}

export default Header;