import React from "react";
import {Switch,Route} from "react-router-dom";

import Home from "../view/index/index";
import Book from "../view/book/book";
import About from "../view/about/about";
import Details from "../view/details/details";
import User from "../view/user/user";
import NotFind from "../view/notfind/notfind";

class RouterControl extends React.Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){
        return (
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/index" exact component={Home}></Route>
                <Route path="/index/:name" component={Home}></Route>
                <Route path="/book" component={Book}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/details/:id" component={Details}></Route>
                <Route path="/user/:name" component={User}></Route>
                <Redirect from="/" to="/index/all" exact></Redirect>
                <Redirect from="/:index" to="/index/all" exact></Redirect>
                <Route path="*" component={NotFind}></Route>
            </Switch>
        )
    }
}

export default RouterControl;