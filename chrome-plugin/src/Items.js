/*global chrome*/
import React from "react";
import QRCode from "qrcode.react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
                console.log("tabs:" , tabs);

                tabs_url.push(winTabs[j].url);
                tabs_title.push(winTabs[j].title);
                tabs_favurl.push(winTabs[j].favIconUrl);

                // tabs[j].url
                // tabs[j].title
                // tabs[j].favIconUrl

                // で取得可能
            }
        }
    }
    const url_temp = tabs_url;
    const title_temp = tabs_title;
    const favIconUrl_temp = tabs_favurl;

    const tabs_mul = [tabs_url, tabs_title, tabs_favurl];
    // 1つ目：[1] url, [2] title, [3] favurl
    // 2つ目：取得した内容
    console.log("tabs_mul:::" + tabs_mul[1][1]);

    that.setState({count: tabs.length});
    that.setState({url: url_temp});
    that.setState({title: title_temp});
    that.setState({favIconUrl: favIconUrl_temp});

    that.setState({tabs: tabs});
}

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            tabs: [],
            url: [],
            title: [],
            favIconUrl: [],
        };
    }

    componentDidMount() {
        chrome.windows.getAll({populate:true},(winData) => {getAllOpenWindows(winData, this)});
    };

    render() {
        // Row　行
        // Col  列

        return(
            <div>
                <p>開いているタブの数：{this.state.count}</p>

                <Grid container
                      dirction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                >

                        {this.state.tabs.map(tab => (
                            <Grid item xs={12} key={tab.id}>
                                【favIconURL】
                                <Paper>
                                <img src={tab.favIconUrl} alt="favIcon"/>
                                <span>
                                    {tab.title}
                                </span>

                                </Paper>
                            </Grid>
                        ))}

                        {/*{this.state.title.map(title => (*/}
                        {/*    <Grid item xs={10} key={title}>*/}
                        {/*        <Paper>*/}
                        {/*            【title】{title}*/}
                        {/*        </Paper>*/}
                        {/*    </Grid>*/}
                        {/*))}*/}

                </Grid>

                <br/>
                <ui>
                    {this.state.url.map(url_item => (
                        <li key={url_item}>【URL】{url_item}</li>
                    ))}
                </ui>

            </div>
        );
    }
}

export default Items;
