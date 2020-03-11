import React from "react";
import {Row,Col,Menu} from "antd";
import {NavLink} from "react-router-dom";
import Xlist from "./list";
import "./style.css";

class Home extends React.Component {
    render(){
        let tab=JSON.stringify(this.props.match.params)!=='{}'?this.props.match.params.name:'all';
        let tabArr=['all','good','ask','share','job','dev'];
 
        if(tabArr.indexOf(tab)===-1){
            return (
                <div style={{width:"100%"}}>
                    <h1 style={{textAlign:"center",lineHeight:"100px"}}>您访问的资源不存在</h1>
                </div>
            )
        }else{
            return (
                <div className="main">
                    <Row className="main-wrap">
                        <Col md={6} xs={0} className="main-sider">
                            <Menu className="Menu-list">
                                <Menu.Item>
                                    <NavLink to="/index/all">全部</NavLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <NavLink to="/index/good">精华</NavLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <NavLink to="/index/ask">问题</NavLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <NavLink to="/index/share">分享</NavLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <NavLink to="/index/job">招聘</NavLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <NavLink to="/index/dev">测试</NavLink>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col md={18} xs={24} className="main-content">
                            <Xlist tab={tab} />
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

export default Home;