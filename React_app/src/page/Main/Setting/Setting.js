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
import { getUser } from '../../../graphql/queries'



export default function Setting() {
  const [email, setEmail] = useState('');
  const [wholekeywords, setWholekeywords] = useState([]);
  const [mykeywords, setMykeywords] = useState([]);

  //test code
  // useEffect(() => {
  //   const keywords = ['현민','지운','용성','현민','지운','용성','현민', '지운', '용성'];
  //   keywords.sort()
  //   setMykeywords(keywords);
  // }, [])

  
  useEffect(() => {
    API.graphql({ query: getUser, variables:{id:"1"}})
    .then(res => {
      setEmail(res.data.getUser.email)
      let keywordList = [];
      for (let key of res.data.getUser.keyword.items) {
        keywordList.push(key.keyword.name)
      }
      keywordList.sort()
      setMykeywords(keywordList);
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
                
              }}>
                {mykeywords.map((item) => 
                  <Button variant="contained" sx={{ width:50, mx: 1, my: 1 }}>
                    <Typography>
                    {item}
                    </Typography>
                  </Button>
                )}
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
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
