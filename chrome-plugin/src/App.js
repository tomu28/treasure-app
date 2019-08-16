/*global chrome*/
import React, {Component} from 'react';
import QRCode from "qrcode.react";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: []
    };
  }
  componentDidMount() {
    const that = this;
    chrome.tabs.getSelected(tab=>{
      var temp = tab.url;
      that.setState({url: temp});
    })
  }
  render() {
    return(
        <div>
          <p>{this.state.url}</p>
          <QRCode value={this.state.url} />
        </div>
    )
  }
}

export default App;
