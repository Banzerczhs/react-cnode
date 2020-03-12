import React,{Component} from "react";
import {Card} from "antd";

class Pubcard extends Component{
    render(){
        let {data,title,load}=this.props;
        return (
            data.map((item,index)=>(
                <Card
                    title={title?title:item.title}
                    type="inner"
                    loading={load}
                    key={index}
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: item.content
                        }}
                    ></div>
                </Card>
            ))
        )
    }
}

export default Pubcard;