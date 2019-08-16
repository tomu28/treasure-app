/*global chrome*/
import React, {Component} from 'react';
import QRCode from "qrcode.react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [],
      title: [],
      favIconUrl: [],
      // object_tab: []
    };
  }
  componentDidMount() {
    // const that = this;
    chrome.tabs.getSelected(tab=>{
      const url_temp = tab.url;
      const title_temp = tab.title;
      const favIconUrl_temp = tab.favIconUrl;
      // const object_tab_temp = tab.object_tab;
      this.setState({url: url_temp});
      this.setState({title: title_temp});
      this.setState({favIconUrl: favIconUrl_temp});
      // that.setState({title: object_tab_temp});
    })
  }
  render() {
    return(
        <div>
          <p>{this.state.url}</p>
          <p>{this.state.title}</p>
          <QRCode value={this.state.url} />
          <img src={this.state.favIconUrl} alt="icon"/>
          {/*<p>{this.state.object_tab}</p>*/}
        </div>
    )
  }
}

export default App;
