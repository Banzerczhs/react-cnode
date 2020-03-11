import React from "react";
import Routerel from "../../router/router";
import {Layout} from "antd";

class Main extends React.Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){
        return (
            <Layout.Content className="top-content">
                <div className="content-wrap">
                    <Routerel />
                </div>
            </Layout.Content>
        )
    }
}

export default Main;