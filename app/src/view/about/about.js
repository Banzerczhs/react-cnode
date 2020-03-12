import React from "react";
import data from "./data";
import Pubcard from "../../components/pubCard/pubcard";

import "./about.css";

class About extends React.Component{
    constructor(props){
        super(props);

        this.state={
            data : data
        };
    }

    render(){
        let {data}=this.state;
        return (
            <div className="about-wrap">
                <Pubcard data={data} load={false}/>
            </div>
        )
    }
}

export default About;