import React, { useState, useEffect, useLayoutEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import API from '@aws-amplify/api';
import { getUser, listKeywords, listUserKeywords } from '../../../graphql/queries';
import { createUserKeyword, deleteUserKeyword } from '../../../graphql/mutations';

export default function Setting(props){
  const [myKeysId, setMyKeysId] = useState([]);
  const [myKeys, setMyKeys] = useState([]);
  const [listKeys, setListKeys] = useState([]);
  const [remainKeys, setRemainKeys] = useState([]);  

  // all Key info setting
  useLayoutEffect(() => {
    API.graphql({ query: listKeywords, variables:{}})
    .then(res => {
        // console.log('res' , res); 
        let listkeys_ = res.data.listKeywords.items;
        console.log('listkeys_' , listkeys_);
        // setListKeys(listkeys_.map((item) => item));
        setListKeys(listkeys_);
        console.log(props.userInfo.id)
      }).catch(e => console.log(e));
    }, [])

  // user Key's id setting
  useLayoutEffect(() => {
    API.graphql({ query: getUser, variables:{ id: props.userInfo.id }})
    .then(res => {
      let myItem = res.data.getUser.keywords.items;
      console.log('myItem' , myItem);
      let mykeys_id = myItem.map((item) => item.keyword.id);
      console.log('myKeys_id', mykeys_id);
      mykeys_id.sort()
      setMyKeysId(mykeys_id.map((id) => id));
    }).catch(e => console.log(e));
  }, [props])

  // myKeys and remainKeys setting
  useLayoutEffect(() => {
    let mykeys_ = listKeys.filter((item) => myKeysId.indexOf(item.id) >= 0);
    console.log('mykeys_', mykeys_);
    if (mykeys_.length > 0){
      setMyKeys(mykeys_.map((item) => item));
    }
    else {
      setMyKeys([]);
    }

    let remainkeys_ = listKeys.filter((item) => myKeysId.indexOf(item.id) < 0);
    console.log('remainkeys_', remainkeys_);
    if (remainkeys_.length > 0){
      setRemainKeys(remainkeys_.map((item) => item));
    }
    else {
      setRemainKeys([]);
    }
  }, [myKeysId, listKeys])



  const handleLogin = (e) => {
    props.navigate("/login")
  }

    
  const handleDeletekey = (item,e) => {
    console.log(item)
    console.log(e)
    API.graphql({ query: listUserKeywords, variables:
      { filter:{ userId: { eq: props.userInfo.id }, keywordId: { eq: item.id }}}})
      .then(res => {
        console.log('listUserKeywords',res.data.listUserKeywords.items[0]);
        
        API.graphql({ query: deleteUserKeyword, variables:
          { input:{ id: res.data.listUserKeywords.items[0].id }}});

        setMyKeys(myKeys.filter((key) => key != item));
        setRemainKeys([...remainKeys, item]);
      }).catch(e => console.log(e));

  }

  const handleAddkey = (item,e) => {
    API.graphql({ query: createUserKeyword, variables:
      { input:{ userId: props.userInfo.id, keywordId: item.id }}})
      .then(res => {
        setMyKeys([...myKeys, item]);
        setRemainKeys(remainKeys.filter((key) => key != item));
      }).catch(e => console.log(e));
  }

  
  const Mykeys = () => {
    // console.log('Mykeys', myKeys);
    return (myKeys.length > 0 && props.userInfo.id != "" ?
    myKeys.map((item, key) => 
      <Button variant="contained" onClick={(e)=>handleDeletekey(item,e)} sx={{ width:'auto', mx: 1, my: 1 }} key={key}>
        <Typography>
        {item.name}
        </Typography>
      </Button>
    ) : "")
  }

  const RemainKeys = () => {
    // console.log('RemainKeys', remainKeys);
    return (remainKeys.length > 0 && props.userInfo.id != "" ?
      remainKeys.map((item,key) => 
        <Button variant="contained" onClick={(e)=>handleAddkey(item,e)} sx={{ width:'auto', mx: 1, my: 1 }} key={key}>
          <Typography>
          {item.name}
          </Typography>
        </Button>
      ) : "")
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
              { props.userInfo.email != "" ?
                <Typography color="text.secondary" align="center">
                  {props.userInfo.email}
                </Typography> :
                <Button variant="contained" onClick={handleLogin} sx={{ width:'auto', mx: 1, my: 1 }}>
                  <Typography>
                    로그인
                  </Typography>
                </Button>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center" flexDirection="column" sx={{ my:1 }}>
        <Typography color="text.secondary" sx={{ mt:0.5 }} variant="h6">
          키워드 알람 이용 가이드
        </Typography>
        {/* <Typography color="text.secondary" sx={{ mt:0.3, fontSize: 15 }}>
          클릭으로 키워드 추가 및 삭제 
        </Typography> */}
        <Typography color="text.secondary" sx={{ mt:0.3, fontSize: 15 }}>
         매일 08시에 내 키워드가 포함된 최신 공지를 이메일로 보내드립니다
        </Typography>
      </Grid>
      <Grid container>
        {/* 내 키워드 */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              mx: 2,
              mt: 1,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 180,
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
              mx: 2,
              mt: 1,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 180,
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
