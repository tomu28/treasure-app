/*global chrome*/
import React from "react";
import QRCode from "qrcode.react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import noimage from './noimage.png';
import Typography from '@material-ui/core/Typography';
import {Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

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
                <Typography variant="h5" color="textSecondary">
                    開いているタブの数：{this.state.count}
                </Typography>

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
                                    width="36"
                                    height="36"
                                    alt="favIcon"
                                    onError={(e) => e.target.src = noimage}
                                />

                                <Button color="secondary">
                                    <Typography variant="title" color="inherit" noWrap="true">
                                            <a
                                                onClick={() => chrome.tabs.create({url: tab.url}, tab => {})}
                                                href={tab.url}>
                                                {tab.title}
                                            </a>
                                    </Typography>
                                </Button>

                                <Box justifyContent="flex-end">
                                    <Button variant="contained" component="span" size="small"
                                        onClick={() => chrome.tabs.remove(tab.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <br/>

                <Typography variant="title" color="inherit" noWrap="true">
                    <ui>
                        {this.state.tabs.map(tab2 => (
                            <li key={tab2.id}>【URL】{tab2.url}</li>
                        ))}
                    </ui>
                </Typography>
            </div>
        );
    }
}

export default Items;
