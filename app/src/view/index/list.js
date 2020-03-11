import React,{Component} from "react";
import {List,Avatar} from "antd";
import {NavLink} from "react-router-dom";
import Page from "../../components/page/page";
import Tag from "../../components/tag/Tag";
import getText from "../../common/util/TagText";
import {connect} from "react-redux";
import Axios from "axios";
// import listData from "./data";

// const {data}=listData;

class Xlist extends Component{
    constructor(props){
        super(props);

        this.state={
            pageNum : 1
        };

        this.getPageData=this.getPageData.bind(this);
        this.getData(props.tab);
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.tab!==this.props.tab){
            this.props.dispatch({
                type: "LIST_UPDATE",
                loading : true
            })
            this.getData(nextProps.tab);
        }

        return true;
    }

    getPageData(tab){
        let {pageNum}=this.state;
        let {List:{data}}=this.props;

        let total=data.length;
        pageNum=Number(pageNum);
        switch(tab){
            case "sub": pageNum--;break;
            case "add": pageNum++;break;
            case "prev5": pageNum-=5;break;
            case "next5": pageNum+=5;break;
            default: pageNum=Number(tab);break;
        }

        if(pageNum>=total){
            pageNum=total;
        }else if(pageNum<=0){
            pageNum=1;
        }

        this.setState({
            pageNum
        })

        setTimeout(()=>{
            this.props.dispatch({
                type: "LIST_UPDATE",
                loading : true
            })
            this.getData(this.props.tab);
        },50);
    }

    getData(tab){
        let {pageNum}=this.state;
        this.props.dispatch(function(dispatch){
            Axios.get('https://cnodejs.org/api/v1/topics?tab='+tab+'&limit=15&page='+pageNum)
                .then((res)=>{
                    let {data}=res;
                    dispatch({
                        type: "LIST_UPDATE_SUC",
                        data: data.data,
                        loading : false
                    })
                })
                .catch((error)=>{
                    dispatch({
                        type : "LIST_UPDATE_ERR",
                        data : error,
                        loading : false
                    })
                })
        })
    }

    render(){
        let {List:{data,loading}}=this.props;
        let {pageNum}=this.state;
        let {getPageData}=this;

        return (
            <div className="content-list">
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={data}
                    size="small"
                    renderItem={item=>{
                        let obj=getText(item.top,item.good,item.tab);
                        return (
                            <List.Item
                                actions={[<ul className="ant-list-item-action">
                                    <li>回复:{item.reply_count}<em className="divider"></em></li>
                                    <li>访问:{item.visit_count}</li>
                                </ul>]}
                                key={item.id}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url}/>}
                                    title={
                                        <div>
                                            <Tag name={obj?obj.color:null} text={obj?obj.txt:null}/>
                                            <a href={'/details/'+item.id}>{item.title}</a>
                                        </div>
                                    }
                                    description={<p><NavLink to={'/user/'+item.author.loginname}>{item.author.loginname}</NavLink>发表于:{item.create_at.split("T")[0]}</p>}
                                />
                            </List.Item>
                        )
                    }}
                />
                <Page
                    pageHandle={getPageData}
                    total={data.length}
                    pageIndex={pageNum}
                />
            </div>
        )
    }
}

export default connect(state=>({List:state.List}))(Xlist);