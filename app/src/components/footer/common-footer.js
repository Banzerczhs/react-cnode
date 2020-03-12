import React,{Component} from "react";
import {Layout} from "antd";

class Footer extends Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){
        return (
            <Layout.Footer className="footer-wrap">
                <span>京ICP备08102442号-1 2007-2018 MIAOV.COM 版权所有</span>
            </Layout.Footer>
        )
    }
}

export default Footer;