/*global chrome*/
import React from "react";
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
    const url_temp = tabs_url;
    const title_temp = tabs_title;
    const favIconUrl_temp = tabs_favurl;
    that.setState({count: tabs.length});
    that.setState({url: url_temp});
    that.setState({title: title_temp});
    that.setState({favIconUrl: favIconUrl_temp});
}

class Items extends React.Component {
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
                <p>開いているタブの数：{this.state.count}</p>


                <ui>
                    {this.state.url.map(url_item => (
                        <li key={url_item}>【URL】{url_item}</li>
                    ))}
                </ui>

                <ui>
                    {this.state.favIconUrl.map(favIcon_item => (
                        <li key={favIcon_item}>【favIconURL】
                            <img src={favIcon_item} alt="favIcon"/>
                        </li>
                    ))}
                </ui>

                <ui>
                    {this.state.title.map(title => (
                        <li key={title}>【title】{title}</li>
                    ))}
                </ui>
            </div>
        );
    }
}

export default Items;
