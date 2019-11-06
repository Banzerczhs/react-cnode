import React, { Component } from 'react';
import Header from "./components/header/common-header";
import Footer from "./components/footer/common-footer";
import Main from "./components/main/main";
import "./common/css/base.css";
import "./components/components.css";

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Header></Header>
        <Main />
        <Footer></Footer>
      </div>
    )
  }
}

export default App;