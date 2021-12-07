import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import API from '@aws-amplify/api';
import { getUser, listKeywords } from '../../../graphql/queries'



export default function Setting() {
  const [email, setEmail] = useState('');
  const [myKeywords, setMyKeywords] = useState([]);
  const [remainKeywords, setRemainKeywords] = useState([]);

  
  useEffect(() => {
    // email, user info setting
    API.graphql({ query: getUser, variables:{ id:"1" }})
    .then(res => {
      setEmail(res.data.getUser.email);
      let keywordList = [];
      for (let key of res.data.getUser.keyword.items){
        keywordList.push(key.keyword.name);
      }
      keywordList.sort();
      setMyKeywords(keywordList);
      return API.graphql({ query: listKeywords, variables:{}});
    }).then(res => {
        let remainKeys = [];
        for (let key of res.data.listKeywords.items){
          if (myKeywords.indexOf(key.name) < 0) {
            remainKeys.push(key.name);
          }
        }
        setRemainKeywords(remainKeys);
      }).catch(e => console.log(e));

  },[])

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <EmailOutlinedIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item>
              <Typography color="text.secondary" align="center">
                {email}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {/* 내 키워드 */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}>
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
              >
                <Toolbar>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography color="text.secondary" align="center">
                        내 키워드
                      </Typography>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                px: 1,
                py: 0.5,
              }}>
                {myKeywords.length > 0 ?
                myKeywords.map((item) => 
                  <Button variant="contained" sx={{ width:'auto', mx: 1, my: 1 }}>
                    <Typography>
                    {item}
                    </Typography>
                  </Button>
                ) : ""
              }
              </Box>
          </Paper>
        </Grid>
        {/* 추가 가능한 키워드 */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}>
              <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
              >
                <Toolbar>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography color="text.secondary" align="center">
                        추가 가능한 키워드
                      </Typography>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                px: 1,
                py: 0.5,
              }}>
                {remainKeywords.length > 0 ?
                  remainKeywords.map((item) => 
                    <Button variant="contained" sx={{ width:'auto', mx: 1, my: 1 }}>
                      <Typography>
                      {item}
                      </Typography>
                    </Button>
                  ) : ""
                }
              </Box>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
