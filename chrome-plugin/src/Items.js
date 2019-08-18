/*global chrome*/
import React from "react";
import QRCode from "qrcode.react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import noimage from './noimage.png';

function getAllOpenWindows(winData, that){
    const tabs = [];
    for(let i in winData) {
        if (winData[i].focused === true) {
            const winTabs = winData[i].tabs;
            const totTabs = winTabs.length;
            for (let j=0; j < totTabs; j++){
                tabs.push(winTabs[j]);
                console.log("tabs:" , tabs);
            }
        }
    }

    that.setState({count: tabs.length});
    that.setState({tabs: tabs});
}

class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            tabs: [],
        };
    }

    componentDidMount() {
        chrome.windows.getAll({populate:true},(winData) => {getAllOpenWindows(winData, this)});
    };

    render() {
        return(
            <div>
                <li>開いているタブの数：{this.state.count}</li>

                <Grid container
                      dirction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                >
                    {this.state.tabs.map(tab => (
                        <Grid item xs={12} key={tab.id}>
                            <br/>
                            <Paper>
                                <img src={tab.favIconUrl}
                                    width="30"
                                    height="30"
                                    alt="favIcon"
                                    onError={(e) => e.target.src = noimage}
                                />
                                <a href={tab.url}>
                                    {tab.title}
                                </a>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <br/>
                <ui>
                    {this.state.tabs.map(tab2 => (
                        <li key={tab2.id}>【URL】{tab2.url}</li>
                    ))}
                </ui>

            </div>
        );
    }
}

export default Items;
