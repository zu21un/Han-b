import React, { Component, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import {API} from 'aws-amplify'
import {getUser, listUsers} from './graphql/queries'

let ResultExample = (props) => {
    const [message, setMessage] = useState([]);
    const [keywords, setKeywords] = useState([]);
    useEffect(() => {
        console.log(message);
    }, [message])

    useEffect(()=> {
        console.log(keywords)
    }, [keywords])

    // let newKeywords = []
    console.log("How many render is called?")

    API.graphql({query:getUser, variables:{id:"1"}})
        .then(res => {
            setMessage(res.data.getUser.email)
            let keywordList = res.data.getUser.keyword;
            for(let key of keywordList.items){
                console.log( key.keyword.name)
                keywords.push(key.keyword.name)
                console.log(keywords)
                //setKeywords(newKeywords)
            }
        }).catch(e => console.log(e))
    
    return <Box sx = {{ display: 'inline-flex' }}>
            <Typography variant="h5">
                {message}
                {keywords}
            </Typography>
        </Box>
}


export default ResultExample;