/*global chrome*/
import React, {Component} from 'react';
import QRCode from "qrcode.react";

function getAllOpenWindows(winData, that){
  const tabs = [];
  const tabs_url = [];
  const tabs_title = [];
  const tabs_favurl = [];

  for(let i in winData) {
    if (winData[i].focused === true) {
      const winTabs = winData[i].tabs;
      const totTabs = winTabs.length;
      for (let j=0; j < totTabs; j++){
        tabs.push(winTabs[j]);
        tabs_url.push(winTabs[j].url);
        tabs_title.push(winTabs[j].title);
        tabs_favurl.push(winTabs[j].favIconUrl);
      }
    }
  }
  that.setState({count: tabs.length});
  const url_temp = tabs_url[0];
  const title_temp = tabs_title[0];
  const favIconUrl_temp = tabs_favurl[0];
  that.setState({url: url_temp});
  that.setState({title: title_temp});
  that.setState({favIconUrl: favIconUrl_temp});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      url: [],
      title: [],
      favIconUrl: [],
    };
  }

  componentDidMount() {
    chrome.windows.getAll({populate:true},(winData) => {getAllOpenWindows(winData, this)});
  };


  render() {
    return(
        <div>
          <p>開いているタブの数{this.state.count}</p>
          <li>【URL】{this.state.url}</li>
          <li>【title】{this.state.title}</li>
          <li>【favIconUrl】{this.state.favIconUrl}</li>
          <QRCode value={this.state.url} />
          <img src={this.state.favIconUrl} alt="icon"/>
        </div>
    );
  }
}

export default App;
