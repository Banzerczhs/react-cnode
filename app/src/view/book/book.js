import React from "react";
import data from "./data";
import PubCard from "../../components/pubCard/pubcard";

import "./book.css";

class Book extends React.Component{
    constructor(props){
        super(props);

        this.state={
            data : [...data]
        };
    }

    render(){
        let {data}=this.state;

        return (
            <div className="book-wrap">
                <PubCard data={data} load={false}/>
            </div>
        )
    }
}

export default Book;