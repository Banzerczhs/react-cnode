import React from "react";
import {List,Avatar,Row,Col} from "antd";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import Axios from "axios";

import "./style.css";

class User extends React.Component{
    constructor(props){
        super(props);

        this.state={
            replise : [],
            topics : []
        };

        this.getUserData();
    }

    shouldComponentUpdate(nextProps,nextState){
        let {User:{data:{recent_replies,recent_topics}}}=nextProps;
        nextState.replise=recent_replies;
        nextState.topics=recent_topics;
        
        return true;
    }

    getUserData(){
        let {name}=this.props.match.params;
        this.props.dispatch(function(dispatch){
            Axios.get(`https://cnodejs.org/api/v1/user/${name}`)
                .then((res)=>{
                    let {data}=res;
                    dispatch({
                        type : "USER_UPDATE_SUC",
                        data : data.data,
                        loading : false
                    })
                })
                .catch((error)=>{
                    dispatch({
                        type : "USER_UPDATE_ERR",
                        data : error,
                        loading : false
                    })
                })
        })
    }
    
    render(){
        let {User:{data,loading}}=this.props;
        let {replise,topics}=this.state;

        return (
            <div className="user-wrap">
                <div className="user-info">
                    <div className="user-avatar">
                        <img src={data.avatar_url} alt={data.githubUsername}/>
                    </div>
                    <Row className="user-data">
                        <Col md={8} xs={24}>用户名:{data.loginname}</Col>
                        <Col md={8} xs={24}>积分:{data.score}</Col>
                        <Col md={8} xs={24}>注册时间:{data.create_at&&data.create_at.split('T')[0]}</Col>
                    </Row>
                </div>
                <div className="user-list">
                    <List
                        loading={loading}
                        header="最近创建的话题"
                        dataSource={topics}
                        renderItem={(item)=>(
                            <List.Item
                                actions={[<span key="1">最近创建的的时间:{item.last_reply_at.split('T')[0]}</span>]}
                                key={item.id}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url} />}
                                    title={
                                        <div>
                                            <NavLink to={'/details/'+item.id}>{item.title}</NavLink>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    >
                    </List>
                    <List
                        loading={loading}
                        header="最近回复的话题"
                        dataSource={replise}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<span key="1">最后回复时间:{item.last_reply_at.split('T')[0]}</span>]}
                                key={item.id}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url} />}
                                    title={
                                        <div>
                                            <NavLink to={'/details'}>{item.title}</NavLink>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    >
                    </List>
                </div>
            </div>
        )
    }
}

export default connect(state=>({User:state.User}))(User);