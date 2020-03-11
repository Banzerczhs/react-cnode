import React,{Component} from "react";
import "./Tag.css";

class Tag extends Component{
    render(){
        let {name,text}=this.props;

        return (
            <em className={"tag "+name}>{text}</em>
        )
    }
}

export default Tag;