import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

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
import { Link } from '@mui/material';

export default function Setting(props){
  const [user, setUser] = useState({})
  const [email, setEmail] = useState('');
  const [listKeys, setListKeys] = useState([]);
  const [myKeys, setMyKeys] = useState([]);
  const [remainKeys, setRemainKeys] = useState([]);  
  
  useEffect(() => {
    setUser({id:props.userId})
  }, [])
  useEffect(() => {
    // email, user info setting
    console.log('user use Effect Start!')
    API.graphql({ query: getUser, variables:{ id: user.id }})
    .then(res => {
      setEmail(res.data.getUser.email);
      let mykeys_ = res.data.getUser.keywords.items;
      setMyKeys(mykeys_.map((item) => item.keyword.name));
    })
    .catch(e => console.log(e));
      
    API.graphql({ query: listKeywords, variables:{}})
    .then(res => {
        let listkeys_ = res.data.listKeywords.items;
        setListKeys(listkeys_.map((item) => item.name));
    })
    .catch(e => console.log(e));

  },[user]);

  useEffect(() => {
    let remain = listKeys.filter((item) => myKeys.indexOf(item) < 0);
    if (remain.length > 0) {
      setRemainKeys(listKeys.filter((item) => myKeys.indexOf(item) < 0));
    }
  }, [listKeys, myKeys]);


  const Mykeys = () => {
    return (myKeys.length > 0 ?
    myKeys.map((item) => 
      <Button variant="contained" sx={{ width:'auto', mx: 1, my: 1 }}>
        <Typography>
        {item}
        </Typography>
      </Button>
    ) : "")
  }

  const RemainKeys = () => {
    return (remainKeys.length > 0 && email != "" ?
      remainKeys.map((item) => 
        <Button variant="contained" sx={{ width:'auto', mx: 1, my: 1 }}>
          <Typography>
          {item}
          </Typography>
        </Button>
      ) : ""
    )
  }

  const login = (e) => {
    props.navigate("/login")
  }

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
              { email != "" ?
                <Typography color="text.secondary" align="center">
                  {email}
                </Typography> :
                <Button variant="contained" onClick={login} sx={{ width:'auto', mx: 1, my: 1 }}>
                  <Typography>
                    로그인
                  </Typography>
                </Button>
              }
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
                <Mykeys />
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
                <RemainKeys />
              </Box>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}
