import React, { Component } from 'react';
import KeywordTitle from './KeywordTitle';
import KeywordSearchbar from './KeywordSearchbar';
import KeywordRecommend from './KeywordRecommend';
import KeywordSidebar from './KeywordSidebar';
import ResultExample from './ResultExample';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import {API} from 'aws-amplify'
import {listUsers} from './graphql/queries'

class KeywordMain extends Component {
    constructor(){
        super();
        this.state = {
            currentKeyword : '',
        }
    }

    getUserList(){
        let result = API.graphql({query:listUsers, variables:null})
                    .then(result => console.log(result));
    }
    
    render() {
        return <Grid container spacing={10} sx = {{ display: 'flex'}}>
            <Grid item xs ={4}>
                <KeywordSidebar />
            </Grid>
            <Grid item xs = {8}>
                <Stack alignItems="center" justifyContent="flex-end">
                    <KeywordTitle />
                    <KeywordSearchbar />
                    <KeywordRecommend />
                    <ResultExample />
                </Stack>
            </Grid>
        </Grid>
    }
}

export default KeywordMain;