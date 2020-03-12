import React from "react";
import {Avatar,Comment,List,Card} from "antd";
import Tag from "../../components/tag/Tag";
import Pubcard from "../../components/pubCard/pubcard";
import getText from "../../common/util/TagText";
import Axios from "axios";
import {connect} from "react-redux";

import "./details.css";

class Details extends React.Component{
    constructor(props){
        super(props);

        this.state={
            data: {}
        };
        
        this.getDetailsData();
    }

    shouldComponentUpdate(nextProps,nextState){
        let {Details:{data}}=nextProps;
        console.log(nextProps);
        nextState.data=data;

        return true;
    }

    getDetailsData(){
        let {id}=this.props.match.params;

        this.props.dispatch(dispatch=>{
            Axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
                .then((res)=>{
                    let {data}=res;
                    dispatch({
                        type : "DETAIL_UPDATE_SUC",
                        data : data.data,
                        loading : false
                    })
                })
                .catch((error)=>{
                    dispatch({
                        type : "DETAIL_UPDATE_ERR",
                        data : error,
                        loading : false
                    })
                })
        })
    }

    render(){
        let {Details:{loading,data}}=this.props;
        let obj=getText(data.top,data.good,data.tab);
        let arr=[data];
        let {replies}=data;

        if(Object.prototype.toString.call(data).indexOf('Error')!==-1){
            throw data;
        }else{
            return JSON.stringify(data)!=='{}'?(
                <div className="detail-wrap">
                    <Pubcard
                        load={loading}
                        data={arr}
                        title={
                            <div className="detail-head">
                                <h1>{data.title}</h1>
                                <p>
                                    <Tag name={obj?obj.color:null} text={obj?obj.txt:null} />
                                    <Avatar src={data.author.avatar_url} />
                                    <a href={'/user/'+data.author.loginname}>{data.author.loginname}</a>
                                    发表于:{data.create_at.split('T')[0]}
                                </p>
                            </div>
                        }>
                    </Pubcard>
                    <Card
                        title={data.reply_count + '条回复'}
                        type="inner"
                        loading={loading}
                    >
                        <List
                            dataSource={replies}
                            renderItem={item => {
                                return (
                                    <Comment
                                        author={
                                            <div>
                                                <a href={'/user/'+item.author.loginname}>{item.author.loginname}</a>
                                                发表于:{item.create_at.split("T")[0]}
                                            </div>
                                        }
                                        avatar={<Avatar src={item.author.avatar_url} />}
                                        actions={[<span>该评论被赞{item.ups.length}次</span>]}
                                        content={
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content
                                                }}
                                            >
                                            </p>
                                        }
                                    >
                                    </Comment>
                                )
                            }}
                        >
                        </List>
                    </Card>
                </div>
            ):null;
        }
    }
}

export default connect((state)=>({Details:state.Details}))(Details);