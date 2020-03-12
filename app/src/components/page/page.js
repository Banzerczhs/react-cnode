import "./page.css";
import React,{Component} from "react";
import {Icon} from "antd";
import PT from "prop-types";


let propTypes={
    pageHandle : PT.func,
    total : PT.number,
    pageIndex : PT.number
}

class Page extends Component{
    constructor(props){
        super(props);

        this.state={
            showLeft : false,
            showRight : false,
            currentPage : 0,
            total : 0
        };

        this.normalState=this.normalState.bind(this);
        this.specialState=this.specialState.bind(this);
        this.beginPageArea=this.beginPageArea.bind(this);       //页码开始的逻辑处理
        this.closePageArea=this.closePageArea.bind(this);       //页码结束时的逻辑处理
        this.mibblePageArea=this.mibblePageArea.bind(this);     //中间页码的逻辑处理
        this.tabPage=this.tabPage.bind(this);
    }

    componentDidMount(){
        let {total,pageIndex}=this.props;
        this.setState({
            currentPage: pageIndex,
            total,
        });
    }

    shouldComponentUpdate(nextProps,nextState){
        let {pageIndex,total}=nextProps;
        nextState.currentPage=pageIndex;
        nextState.total=total;

        return true;
    }

    tabPage(ev){
        let {pageHandle}=this.props;
        let {path}=ev.nativeEvent;

        path.forEach(item=>{
            if(item&&item.nodeName&&item.nodeName.toLowerCase()==='li'){
                pageHandle(item.dataset.inum);
            }
        })
    }

    closePageArea(){
        let {currentPage,total}=this.state;
        var elems=[];
        
        for(var i=total-4;i<total;i++){
            elems.push(<li key={i} data-inum={i} className={currentPage===i?'active':''}><span>{i}</span></li>);
        }

        return elems;
    }

    beginPageArea(){
        let {currentPage,total}=this.state;
        var elems=[];

        total=currentPage===4?7:6;

        for(var i=2;i<total;i++){
            elems.push(<li key={i} data-inum={i} className={currentPage===i?'active':''}><span>{i}</span></li>);
        }
        return elems;
    }

    mibblePageArea(){
        let {currentPage}=this.state;
        var elems=[];

        for(var k=currentPage-2;k<=currentPage+2;k++){
            elems.push(<li key={k} data-inum={k} className={currentPage===k?'active':''}><span>{k}</span></li>);
        }

        return elems;
    }

    specialState(){
        let {showLeft,showRight,currentPage,total}=this.state;
        let {beginPageArea,closePageArea,mibblePageArea}=this;

        let renderElem=(
            <div>
                <li className="prevPage" title="prevPage" data-inum="sub">
                    <span>
                        <Icon type="left" />
                    </span>
                </li>
                <li className={currentPage===1?'active':''} data-inum={1}><span>1</span></li>
                {
                    currentPage>4?(
                        <li
                            data-inum="prev5"
                            className="prev5page"
                            onMouseEnter={()=>{this.setState({showLeft: true})}}
                            onMouseLeave={()=>{this.setState({showLeft: false})}}>
                            <Icon
                                type={showLeft ? 'double-left' : 'ellipsis'}
                            />
                        </li>
                    ):null
                }
                {currentPage<=4&&beginPageArea()}
                {currentPage>4&&currentPage<=total-3&&mibblePageArea()}
                {currentPage>total-3&&closePageArea()}
                {
                    currentPage<=total-4?(
                        <li
                            data-inum="next5"
                            className="next5page"
                            onMouseEnter={()=>{this.setState({showRight: true })}}
                            onMouseLeave={()=>{this.setState({showRight: false })}}>
                            <Icon
                                type={showRight ? 'double-right' : 'ellipsis'}
                            />
                        </li>
                    ):null
                }
                <li className={currentPage===total?'active':''} data-inum={total}><span>{total}</span></li>
                <li className="nextPage" title="nextPage" data-inum="add">
                    <span>
                        <Icon type="right" />
                    </span>
                </li>
            </div>
        )

        return renderElem;
    }

    normalState(){
        let {total,currentPage}=this.state;
        let elems=[];

        for(var i=1;i<=total;i++){
            elems.push(<li key={i} className={currentPage===i?'active':''}><span>{i}</span></li>);
        }

        let renderElem=(
            <div>
                <li className="prevPage" title="prevPage">
                    <span>
                        <Icon type="left" />
                    </span>
                </li>
                {elems}
                <li className="nextPage" title="nextPage">
                    <span>
                        <Icon type="right" />
                    </span>
                </li>
            </div>
        )

        return renderElem;
    }

    render(){
        let {total}=this.state;
        let {normalState,specialState,tabPage}=this;

        return (
            <div className="ant-list-pagination">
                <ul className="ant-pagination page-list" onClick={tabPage}>
                    {total>8?specialState():normalState()}
                </ul>
            </div>
        )
    }
}

Page.propTypes=propTypes;

export default Page;